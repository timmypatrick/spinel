import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { UserSession, Order } from "../types";

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;
  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("YOUR_SUPABASE")) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
      return supabaseInstance;
    } catch (err) {
      console.warn("Failed to initialize client-side Supabase SDK:", err);
      return null;
    }
  }
  return null;
}

export function extractErrorMessage(err: any, fallback: string = "An error occurred. Please try again."): string {
  if (!err) return fallback;
  if (typeof err === "string") {
    const trimmed = err.trim();
    return trimmed && trimmed !== "{}" ? trimmed : fallback;
  }
  if (typeof err === "object") {
    if (typeof err.message === "string" && err.message.trim() && err.message.trim() !== "{}") {
      return err.message.trim();
    }
    if (typeof err.msg === "string" && err.msg.trim() && err.msg.trim() !== "{}") {
      return err.msg.trim();
    }
    if (typeof err.error_description === "string" && err.error_description.trim() && err.error_description.trim() !== "{}") {
      return err.error_description.trim();
    }
    if (typeof err.error === "string" && err.error.trim() && err.error.trim() !== "{}") {
      return err.error.trim();
    }
    if (err.error && typeof err.error === "object") {
      return extractErrorMessage(err.error, fallback);
    }
  }
  return fallback;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export async function handleSignUp({ name, email, password, phone }: SignUpData) {
  const emailLower = email.toLowerCase().trim();

  // Try server signup endpoint first (uses Supabase Admin API to create user cleanly)
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: emailLower, password, phone })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to create account");
    }

    return {
      message: data.message || `Account created successfully! You can now sign in with ${emailLower}.`,
      user: data.user
    };
  } catch (serverErr: any) {
    const parsedServerMsg = extractErrorMessage(serverErr, "");
    if (parsedServerMsg && !parsedServerMsg.includes("Failed to fetch") && !parsedServerMsg.includes("NetworkError")) {
      throw new Error(parsedServerMsg);
    }

    // Fallback: Client-side Supabase client call
    const client = getSupabase();
    if (client) {
      const { data, error } = await client.auth.signUp({
        email: emailLower,
        password,
        options: {
          data: {
            full_name: name,
            name,
            phone,
            company_name: "Customer Account"
          },
          emailRedirectTo: `${window.location.origin}/account`
        }
      });

      if (error) {
        throw new Error(extractErrorMessage(error, "Failed to create account with Supabase. Please verify your details."));
      }

      return {
        message: `Account created successfully! A confirmation notification has been sent to ${emailLower}.`,
        user: data.user
      };
    }

    throw new Error(parsedServerMsg || "Failed to create account. Please check your connection and try again.");
  }
}

export async function handleSignIn({ email, password }: { email: string; password: string }): Promise<UserSession> {
  const client = getSupabase();
  const emailLower = email.toLowerCase().trim();

  if (client) {
    const { data, error } = await client.auth.signInWithPassword({
      email: emailLower,
      password
    });

    if (error) {
      // Fallback to server login API route
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailLower, password })
        });
        const dataJson = await res.json();
        if (res.ok) {
          const userSession: UserSession = {
            email: dataJson.email || emailLower,
            name: dataJson.name || emailLower.split("@")[0].toUpperCase(),
            role: dataJson.role || "customer",
            companyName: dataJson.companyName || ""
          };
          localStorage.setItem("spinel_user", JSON.stringify(userSession));
          if (dataJson.token) localStorage.setItem("spinel_token", dataJson.token);
          return userSession;
        }
      } catch (e) {
        console.warn("Server login fallback notice:", e);
      }

      throw new Error(extractErrorMessage(error, "Invalid login credentials. Please check your email and password."));
    }

    const userMeta = data.user?.user_metadata || {};
    const userSession: UserSession = {
      email: emailLower,
      name: userMeta.full_name || userMeta.name || emailLower.split("@")[0].toUpperCase(),
      role: "customer",
      companyName: userMeta.company_name || ""
    };

    // Save local session
    localStorage.setItem("spinel_user", JSON.stringify(userSession));
    if (data.session?.access_token) {
      localStorage.setItem("spinel_token", data.session.access_token);
    }

    return userSession;
  } else {
    // Server API login
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailLower, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(extractErrorMessage(data, "Sign in failed. Please verify your credentials."));
    }

    const userSession: UserSession = {
      email: data.email || emailLower,
      name: data.name || emailLower.split("@")[0].toUpperCase(),
      role: data.role || "customer",
      companyName: data.companyName || ""
    };

    localStorage.setItem("spinel_user", JSON.stringify(userSession));
    if (data.token) {
      localStorage.setItem("spinel_token", data.token);
    }

    return userSession;
  }
}

export async function handleForgotPassword(email: string) {
  const client = getSupabase();
  const emailLower = email.toLowerCase().trim();

  if (client) {
    const { error } = await client.auth.resetPasswordForEmail(emailLower, {
      redirectTo: `${window.location.origin}/account`
    });

    if (error) {
      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailLower })
        });
        const dataJson = await res.json();
        if (res.ok) {
          return dataJson.message || `A password reset link has been sent to ${emailLower}.`;
        }
      } catch (e) {
        console.warn("Server reset fallback notice:", e);
      }

      throw new Error(extractErrorMessage(error, "Could not send password reset email. Please try again."));
    }

    return "A password reset link has been sent to " + emailLower + ". Please check your inbox.";
  } else {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailLower })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(extractErrorMessage(data, "Failed to send reset link"));
    }

    return data.message || "A password reset link has been sent to " + emailLower + ". Check your email inbox to reset your password.";
  }
}

export async function handleSignOut() {
  const client = getSupabase();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn("Supabase signout notice:", e);
    }
  }
  localStorage.removeItem("spinel_user");
  localStorage.removeItem("spinel_token");
}

export async function getUserOrders(email: string): Promise<Order[]> {
  if (!email) return [];
  const emailLower = email.toLowerCase().trim();

  let orders: Order[] = [];

  // 1. Check local storage saved orders
  try {
    const local = localStorage.getItem(`spinel_user_orders_${emailLower}`);
    if (local) {
      orders = JSON.parse(local);
    }
  } catch (err) {
    console.warn("Failed to parse local user orders:", err);
  }

  // 2. Fetch from server API
  try {
    const res = await fetch(`/api/orders/user?email=${encodeURIComponent(emailLower)}`, {
      headers: {
        "Authorization": localStorage.getItem("spinel_token") || ""
      }
    });
    if (res.ok) {
      const serverOrders: Order[] = await res.json();
      if (Array.isArray(serverOrders) && serverOrders.length > 0) {
        // Merge without duplicates
        const map = new Map<string, Order>();
        serverOrders.forEach(o => map.set(o.id || o.orderNumber, o));
        orders.forEach(o => map.set(o.id || o.orderNumber, o));
        orders = Array.from(map.values());
      }
    }
  } catch (err) {
    console.warn("Server user orders fetch failed:", err);
  }

  // Sort orders descending by date
  orders.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  return orders;
}

export function saveOrderToAccount(orderData: any, userEmail: string) {
  if (!userEmail) return;
  const emailLower = userEmail.toLowerCase().trim();

  try {
    const existingKey = `spinel_user_orders_${emailLower}`;
    const raw = localStorage.getItem(existingKey);
    const list: any[] = raw ? JSON.parse(raw) : [];

    // Avoid duplicates
    const index = list.findIndex(o => o.id === orderData.id || o.orderNumber === orderData.orderNumber || o.invoiceNumber === orderData.invoiceNumber);
    if (index >= 0) {
      list[index] = { ...list[index], ...orderData, date: orderData.date || new Date().toISOString().split("T")[0] };
    } else {
      list.unshift({
        ...orderData,
        date: orderData.date || new Date().toISOString().split("T")[0],
        status: orderData.status || "Paid"
      });
    }

    localStorage.setItem(existingKey, JSON.stringify(list));
  } catch (err) {
    console.warn("Failed saving order to account local storage:", err);
  }
}
