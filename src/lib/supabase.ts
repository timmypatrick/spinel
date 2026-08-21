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

  // Try server signup endpoint first (handles Supabase Admin/Anon + persistent DB seamlessly)
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: emailLower,
        password,
        phone: phone ? phone.trim() : ""
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to create account. Please check your details.");
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

    // Direct fallback if network error reaching server API
    const client = getSupabase();
    if (client) {
      try {
        const { data, error } = await client.auth.signUp({
          email: emailLower,
          password,
          options: {
            data: {
              full_name: name.trim(),
              name: name.trim(),
              phone: phone ? phone.trim() : "",
              password: password,
              company_name: "Customer Account"
            },
            emailRedirectTo: `${window.location.origin}/account`
          }
        });

        if (error) {
          throw new Error(extractErrorMessage(error, "Failed to create account. Please verify your details."));
        }

        return {
          message: `Account created successfully! You can now sign in with ${emailLower}.`,
          user: data.user
        };
      } catch (clientErr: any) {
        throw new Error(extractErrorMessage(clientErr, "Failed to create account. Please verify your details."));
      }
    }

    throw new Error(parsedServerMsg || "Failed to create account. Please check your connection and try again.");
  }
}

export async function handleSignIn({ email, password }: { email: string; password: string }): Promise<UserSession> {
  const emailLower = email.toLowerCase().trim();

  // 1. Primary: Authenticate via server login API (handles Supabase Auth + local DB seamlessly)
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailLower, password })
    });

    const data = await res.json();
    if (res.ok) {
      const userSession: UserSession = {
        email: data.email || emailLower,
        name: data.name || emailLower.split("@")[0].toUpperCase(),
        phone: data.phone || "",
        role: data.role || "customer",
        companyName: data.companyName || ""
      };

      localStorage.setItem("spinel_user", JSON.stringify(userSession));
      if (data.token) {
        localStorage.setItem("spinel_token", data.token);
      }
      return userSession;
    } else {
      if (data.error && !data.error.includes("Failed to fetch") && !data.error.includes("NetworkError")) {
        throw new Error(data.error);
      }
    }
  } catch (err: any) {
    if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
      throw err;
    }
  }

  // 2. Client-side Supabase direct login fallback if server was unreachable
  const client = getSupabase();
  if (client) {
    const { data, error } = await client.auth.signInWithPassword({
      email: emailLower,
      password
    });

    if (error) {
      throw new Error(extractErrorMessage(error, "Invalid login credentials. Please check your email and password."));
    }

    const userMeta = data.user?.user_metadata || {};
    const userSession: UserSession = {
      email: emailLower,
      name: userMeta.full_name || userMeta.name || emailLower.split("@")[0].toUpperCase(),
      phone: userMeta.phone || "",
      role: "customer",
      companyName: userMeta.company_name || ""
    };

    localStorage.setItem("spinel_user", JSON.stringify(userSession));
    if (data.session?.access_token) {
      localStorage.setItem("spinel_token", data.session.access_token);
    }

    return userSession;
  }

  throw new Error("Unable to sign in. Please check your connection and credentials.");
}

export async function sendPasswordResetEmail(email: string, customRedirect?: string) {
  const emailLower = email.toLowerCase().trim();
  const redirectUrl = customRedirect || (typeof window !== "undefined" ? `${window.location.origin}/reset-password` : "/reset-password");

  const client = getSupabase();
  if (client) {
    const { data, error } = await client.auth.resetPasswordForEmail(emailLower, {
      redirectTo: redirectUrl
    });
    if (error) {
      throw new Error(extractErrorMessage(error, "Could not send password reset email. Please try again."));
    }
    return { data, message: `Password reset email sent to ${emailLower}.` };
  }

  // Server-backed fallback
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailLower, redirectTo: redirectUrl })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to process password reset request.");
  }
  return data;
}

export async function updateUserPassword(newPassword: string) {
  const client = getSupabase();
  if (!client) {
    throw new Error("Supabase client is not available.");
  }

  const { data, error } = await client.auth.updateUser({ password: newPassword });
  if (error) {
    throw new Error(extractErrorMessage(error, "Failed to update password. Please check your recovery session."));
  }
  return data;
}

export async function handleForgotPassword(email: string) {
  const emailLower = email.toLowerCase().trim();
  const redirectUrl = typeof window !== "undefined" ? `${window.location.origin}/reset-password` : "/reset-password";

  // 1. Try client-side Supabase Auth direct resetPasswordForEmail first
  const client = getSupabase();
  if (client) {
    try {
      const { error } = await client.auth.resetPasswordForEmail(emailLower, {
        redirectTo: redirectUrl
      });

      if (!error) {
        return `A password reset link has been dispatched to ${emailLower}. Please check your email inbox.`;
      }
      console.warn("Client-side resetPasswordForEmail notice, trying server endpoint:", error.message);
    } catch (e) {
      console.warn("Client-side resetPasswordForEmail exception:", e);
    }
  }

  // 2. Call server endpoint
  try {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailLower, redirectTo: redirectUrl })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to process password reset request");
    }

    return data.message || `A password reset link has been sent to ${emailLower}.`;
  } catch (serverErr: any) {
    const parsedServerMsg = extractErrorMessage(serverErr, "");
    throw new Error(parsedServerMsg || "Failed to request password reset.");
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

  const ordersMap = new Map<string, Order>();

  // 1. Read existing local cache first
  try {
    const local = localStorage.getItem(`spinel_user_orders_${emailLower}`);
    if (local) {
      const parsed: Order[] = JSON.parse(local);
      if (Array.isArray(parsed)) {
        parsed.forEach(o => {
          const key = o.id || o.orderNumber || (o as any).invoiceNumber;
          if (key) ordersMap.set(key, o);
        });
      }
    }
  } catch (e) {}

  // 2. Fetch from server API (Source of truth)
  try {
    const res = await fetch(`/api/orders/user?email=${encodeURIComponent(emailLower)}`, {
      headers: {
        "Authorization": localStorage.getItem("spinel_token") || ""
      }
    });
    if (res.ok) {
      const serverOrders: Order[] = await res.json();
      if (Array.isArray(serverOrders)) {
        serverOrders.forEach(o => {
          const key = o.id || o.orderNumber || (o as any).invoiceNumber;
          if (key) ordersMap.set(key, o);
        });
      }
    }
  } catch (err) {
    console.warn("Server user orders fetch notice, falling back to local storage:", err);
  }

  const merged = Array.from(ordersMap.values());
  // Sort orders descending by date
  merged.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  // Save merged permanent list to localStorage
  try {
    localStorage.setItem(`spinel_user_orders_${emailLower}`, JSON.stringify(merged));
  } catch (e) {}

  return merged;
}

export function saveOrderToAccount(orderData: any, userEmail: string) {
  if (!userEmail) return;
  const emailLower = userEmail.toLowerCase().trim();

  try {
    const existingKey = `spinel_user_orders_${emailLower}`;
    const raw = localStorage.getItem(existingKey);
    const list: any[] = raw ? JSON.parse(raw) : [];

    const now = new Date();
    const formattedDate = orderData.date || `${now.toISOString().split("T")[0]} ${now.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" })}`;

    // Avoid duplicates
    const index = list.findIndex(o => o.id === orderData.id || o.orderNumber === orderData.orderNumber || o.invoiceNumber === orderData.invoiceNumber);
    if (index >= 0) {
      list[index] = { ...list[index], ...orderData, date: formattedDate };
    } else {
      list.unshift({
        ...orderData,
        date: formattedDate,
        status: orderData.status || "Pending"
      });
    }

    localStorage.setItem(existingKey, JSON.stringify(list));
  } catch (err) {
    console.warn("Failed saving order to account local storage:", err);
  }
}
