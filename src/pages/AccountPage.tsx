import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Package,
  Clock,
  Truck,
  ShieldCheck,
  LogOut,
  Search,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  MapPin,
  Calendar,
  CreditCard,
  Building,
  KeyRound,
  FileText,
  Trash2
} from "lucide-react";
import { UserSession, Order } from "../types";
import { getOrderProductImage } from "../data/productsData";
import {
  handleSignUp,
  handleSignIn,
  handleForgotPassword,
  handleSignOut,
  getUserOrders,
  extractErrorMessage
} from "../lib/supabase";

interface AccountPageProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  currency: "USD" | "NGN";
  setCurrentView: (view: string) => void;
  setSelectedProductId?: (id: string) => void;
}

type AuthMode = "login" | "signup" | "forgot-password";

export default function AccountPage({
  user,
  setUser,
  currency,
  setCurrentView,
  setSelectedProductId
}: AccountPageProps) {
  // Auth Form State
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // User Dashboard State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [selectedOrderTab, setSelectedOrderTab] = useState<"all" | "paid" | "pending">("all");
  const [activeSubTab, setActiveSubTab] = useState<"orders" | "profile">("orders");

  // User Profile Edit State
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "");
  const [profileCompany, setProfileCompany] = useState(user?.companyName || "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);

  // Sync profile state when user object updates
  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
      setProfilePhone(user.phone || "");
      setProfileCompany(user.companyName || "");

      // Auto-populate phone number and latest profile details from server
      fetch(`/api/user/profile?email=${encodeURIComponent(user.email)}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            if (data.phone) setProfilePhone(data.phone);
            if (data.name) setProfileName(data.name);
            if (data.companyName) setProfileCompany(data.companyName);
          }
        })
        .catch(err => console.warn("Error fetching user profile:", err));
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccessMsg(null);
    setProfileErrorMsg(null);

    if (!profileName.trim()) {
      setProfileErrorMsg("Full Name cannot be blank.");
      return;
    }

    setSavingProfile(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          name: profileName.trim(),
          phone: profilePhone.trim(),
          companyName: profileCompany.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed updating profile details.");
      }

      const updatedUser: UserSession = {
        ...user!,
        name: profileName.trim(),
        phone: profilePhone.trim(),
        companyName: profileCompany.trim()
      };

      setUser(updatedUser);
      localStorage.setItem("spinel_user_session", JSON.stringify(updatedUser));
      setProfileSuccessMsg("Profile details saved successfully!");
    } catch (err: any) {
      setProfileErrorMsg(err.message || "Failed saving profile changes.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Fetch orders on mount or user change
  useEffect(() => {
    if (user && user.email) {
      loadUserOrders(user.email);
    }
  }, [user]);

  const loadUserOrders = async (email: string) => {
    setOrdersLoading(true);
    try {
      const fetched = await getUserOrders(email);
      setOrders(fetched);
    } catch (err) {
      console.warn("Failed loading user orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const resetFormState = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Handlers
  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    if (!loginEmail || !loginPassword) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const session = await handleSignIn({ email: loginEmail, password: loginPassword });
      setUser(session);
      setSuccessMessage("Signed in successfully! Welcome back.");
    } catch (err: any) {
      setErrorMessage(extractErrorMessage(err, "Failed to sign in. Please verify your credentials."));
    } finally {
      setLoading(false);
    }
  };

  const onSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!signupName || !signupEmail || !signupPassword || !signupPhone) {
      setErrorMessage("All fields (Name, Email, Password, and Phone) are required.");
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await handleSignUp({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone
      });

      setSuccessMessage(res.message);
      // Pre-fill login email
      setLoginEmail(signupEmail);
      // Switch back to login view after successful signup notification
      setAuthMode("login");
      setSignupName("");
      setSignupPassword("");
      setSignupPhone("");
    } catch (err: any) {
      setErrorMessage(extractErrorMessage(err, "Failed to register account. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!forgotEmail) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      const msg = await handleForgotPassword(forgotEmail);
      setSuccessMessage(msg);
    } catch (err: any) {
      setErrorMessage(extractErrorMessage(err, "Could not process password reset request. Please check your email."));
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await handleSignOut();
    setUser(null);
    setOrders([]);
    resetFormState();
  };

  // Order Filtering (Supports All, Completed/Paid, and Pending orders)
  const filteredOrders = orders.filter((o) => {
    const statusLower = (o.status || "").toLowerCase();
    const isCompleted = statusLower === "paid" || statusLower === "completed";
    const isPending = statusLower === "pending";

    if (selectedOrderTab === "paid" && !isCompleted) return false;
    if (selectedOrderTab === "pending" && !isPending) return false;

    const matchesSearch =
      !orderSearchQuery ||
      (o.orderNumber && o.orderNumber.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
      (o.id && o.id.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
      (o.items && o.items.some((it) => it.productName.toLowerCase().includes(orderSearchQuery.toLowerCase())));

    return matchesSearch;
  });

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order? This will permanently remove it from your account.")) {
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE"
      });

      // Remove from state
      setOrders(prev => prev.filter(o => o.id !== orderId && o.orderNumber !== orderId));

      // Remove from local storage cache if present
      if (user?.email) {
        const userOrdersKey = `spinel_user_orders_${user.email.toLowerCase().trim()}`;
        const cached = localStorage.getItem(userOrdersKey);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            const updated = parsed.filter((o: any) => o.id !== orderId && o.orderNumber !== orderId);
            localStorage.setItem(userOrdersKey, JSON.stringify(updated));
          } catch (e) {}
        }
      }

      setSuccessMessage("Order record deleted successfully.");
    } catch (err: any) {
      setErrorMessage(err.message || "Could not delete order.");
    }
  };

  // Calculate stats
  const totalSpentUSD = orders.reduce((acc, o) => acc + (o.totalUSD || 0), 0);
  const totalSpentNGN = orders.reduce((acc, o) => acc + (o.totalNGN || 0), 0);

  // -------------------------------------------------------------
  // RENDER: LOGGED IN USER ACCOUNT & ORDER TRACKER
  // -------------------------------------------------------------
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8" id="account-dashboard">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Top Banner Header */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#FF7A20]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center space-x-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF7A20] to-amber-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">{user.name}</h1>
                    <span className="bg-[#FF7A20]/20 text-[#FF7A20] border border-[#FF7A20]/30 text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
                      {user.role} Account
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs mt-0.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => loadUserOrders(user.email)}
                  disabled={ordersLoading}
                  className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer backdrop-blur-md"
                  title="Refresh order data"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${ordersLoading ? "animate-spin text-[#FF7A20]" : ""}`} />
                  <span>Refresh Orders</span>
                </button>

                <button
                  onClick={onLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer backdrop-blur-md"
                  id="btn-user-logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-700/60 text-xs">
              <div>
                <span className="text-gray-300 block uppercase tracking-wider font-semibold text-[10px]">Total Orders Placed</span>
                <span className="text-lg sm:text-xl font-extrabold text-white mt-0.5 block font-mono">{orders.length} Orders</span>
              </div>
              <div>
                <span className="text-gray-300 block uppercase tracking-wider font-semibold text-[10px]">Amount</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#FF7A20] mt-0.5 block font-mono">
                  {currency === "USD" ? `$${totalSpentUSD.toLocaleString()}` : `₦${totalSpentNGN.toLocaleString()}`}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-gray-300 block uppercase tracking-wider font-semibold text-[10px]">Security Status</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Your information is protected
                </span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-gray-200 space-x-6">
            <button
              onClick={() => setActiveSubTab("orders")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center space-x-2 transition cursor-pointer border-b-2 ${
                activeSubTab === "orders"
                  ? "border-[#FF7A20] text-[#FF7A20]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders ({filteredOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab("profile")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center space-x-2 transition cursor-pointer border-b-2 ${
                activeSubTab === "profile"
                  ? "border-[#FF7A20] text-[#FF7A20]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>

          {/* TAB 1: COMPLETED ORDERS LIST */}
          {activeSubTab === "orders" && (
            <div className="space-y-6">
              
              {/* Search Bar & Order Filter Tabs */}
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search orders by order reference or product term..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A20]"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg shrink-0 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setSelectedOrderTab("all")}
                    className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                      selectedOrderTab === "all" ? "bg-white text-gray-900 shadow-xs font-bold" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    All Orders ({orders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrderTab("paid")}
                    className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1 ${
                      selectedOrderTab === "paid" ? "bg-white text-emerald-800 shadow-xs font-bold" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Completed</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrderTab("pending")}
                    className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1 ${
                      selectedOrderTab === "pending" ? "bg-white text-amber-800 shadow-xs font-bold" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pending</span>
                  </button>
                </div>
              </div>

              {/* Orders List View */}
              {ordersLoading ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-2xs space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#FF7A20] animate-spin mx-auto" />
                  <p className="text-xs text-gray-500 font-medium">Please wait...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-2xs space-y-4">
                  <div className="w-16 h-16 bg-orange-50 text-[#FF7A20] rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">No Orders Found</h3>
                    <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                      {orderSearchQuery
                        ? "No orders match your search query."
                        : "You have no product purchases recorded. Kindly explore our protuct catalog to make orders."}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView("store")}
                    className="bg-[#FF7A20] hover:bg-[#e06816] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md inline-flex items-center space-x-2"
                  >
                    <span>Explore Product Catalog</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => {
                    const orderId = order.id || order.orderNumber;

                    return (
                      <div
                        key={orderId}
                        className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden transition hover:border-gray-300"
                      >
                        {/* Order Header */}
                        <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-gray-500 uppercase tracking-wider text-xs font-extrabold block">Order Reference</span>
                              <span className="font-mono font-bold text-gray-950 text-sm sm:text-base bg-gray-100 px-3 py-1 rounded-md mt-0.5 inline-block">{order.orderNumber || order.id}</span>
                            </div>
                            <div className="border-l border-gray-200 pl-4">
                              <span className="text-gray-500 uppercase tracking-wider text-xs font-extrabold block">Date & Time Placed</span>
                              <span className="text-gray-700 font-medium font-mono text-xs sm:text-sm mt-0.5 block">{order.date || "Recent"}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {(order.status === "Paid" || order.status === "Completed") ? (
                              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Completed</span>
                              </span>
                            ) : (
                              <span className="bg-amber-100 text-amber-800 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-amber-600" />
                                <span>Pending Payment</span>
                              </span>
                            )}

                            <button
                              onClick={() => handleDeleteOrder(orderId)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer flex items-center space-x-1.5 shadow-xs"
                              title="Delete Order Record"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                              <span>Delete Order</span>
                            </button>
                          </div>
                        </div>

                        {/* Items Purchased List */}
                        <div className="p-6 space-y-4">
                          <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wider">Purchased Hardware Items</h4>
                          
                          <div className="divide-y divide-gray-100 space-y-4">
                            {order.items && order.items.map((item, idx) => {
                              const imgUrl = getOrderProductImage(item);
                              const qty = item.quantity || 1;
                              const prodName = item.productName || item.name || item.product?.name || "Hardware Equipment";
                              const sku = item.sku || item.product?.sku || "SP-HARDWARE";
                              const priceUSD = item.priceUSD || item.price || item.product?.priceUSD || 0;
                              const priceNGN = item.priceNGN || item.price || item.product?.priceNGN || 0;

                              return (
                                <div key={idx} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                  {/* Large Product Image Container - Equal with Admin Section */}
                                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center overflow-hidden shadow-2xs">
                                    <img
                                      src={imgUrl}
                                      alt={prodName}
                                      className="w-full h-full object-contain"
                                      referrerPolicy="no-referrer"
                                      crossOrigin="anonymous"
                                      onError={(e) => {
                                        e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                                      }}
                                    />
                                  </div>

                                  {/* Hardware Info */}
                                  <div className="flex-1 min-w-0 space-y-1">
                                    <p className="font-bold text-gray-950 text-sm sm:text-base leading-snug">{prodName}</p>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs sm:text-sm font-mono text-gray-600">
                                      <span>SKU: <strong className="text-gray-900">{sku}</strong></span>
                                      <span>•</span>
                                      <span>Qty: <strong className="text-gray-900">{qty}</strong></span>
                                    </div>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-500">
                                      Unit Price:{" "}
                                      <span className="font-mono text-gray-900 font-bold">
                                        {currency === "USD" ? `$${priceUSD.toLocaleString()}` : `₦${priceNGN.toLocaleString()}`}
                                      </span>
                                    </p>
                                  </div>

                                  {/* Item Subtotal Price */}
                                  <div className="sm:text-right shrink-0">
                                    <span className="text-gray-400 text-xs block font-mono">Item Total</span>
                                    <span className="text-base sm:text-lg font-bold font-mono text-gray-950">
                                      {currency === "USD"
                                        ? `$${(priceUSD * qty).toLocaleString()}`
                                        : `₦${(priceNGN * qty).toLocaleString()}`}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Order Summary Footer */}
                        <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm">
                          {order.shippingAddress && (
                            <div className="flex items-start space-x-2 text-gray-700">
                              <MapPin className="w-5 h-5 text-[#FF7A20] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-gray-950 block text-sm">Shipping Destination</span>
                                <span className="text-xs sm:text-sm text-gray-800 font-medium">
                                  {order.shippingAddress.addressLine1}, {order.shippingAddress.city},{" "}
                                  {order.shippingAddress.state}, {order.shippingAddress.country}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="sm:text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200">
                            <span className="text-gray-500 block uppercase tracking-wider text-xs font-extrabold">Total Amount Paid</span>
                            <span className="text-xl sm:text-2xl font-black text-[#FF7A20] font-mono">
                              {currency === "USD"
                                ? `$${(order.totalUSD || 0).toLocaleString()}`
                                : `₦${(order.totalNGN || 0).toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE SETTINGS */}
          {activeSubTab === "profile" && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-2xs space-y-6">
              <div className="border-b border-gray-100 pb-3.5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">Profile Details</h3>
                </div>
                <span className="bg-[#FF7A20]/10 text-[#FF7A20] text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  Customer Profile
                </span>
              </div>

              {profileErrorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm flex items-center space-x-2.5">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>{profileErrorMsg}</span>
                </div>
              )}

              {profileSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {/* Name Input (Editable) */}
                  <div>
                    <label className="block text-gray-800 font-bold mb-2 text-sm sm:text-base flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#FF7A20]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full p-3.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-900 text-sm sm:text-base focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                      placeholder="Enter your full name"
                      id="input-profile-name"
                    />
                  </div>

                  {/* Phone Number Input (Editable) */}
                  <div>
                    <label className="block text-gray-800 font-bold mb-2 text-sm sm:text-base flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#FF7A20]" />
                      <span>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full p-3.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-900 text-sm sm:text-base focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                      placeholder="e.g. +234 812 345 6789 "
                      id="input-profile-phone"
                    />
                  </div>

                  {/* Email Address (Non-Editable / Locked) */}
                  <div>
                    <label className="block text-gray-600 font-bold mb-2 text-sm sm:text-base flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>Email Address</span>
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-gray-400" /> registered email
                      </span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user.email}
                      className="w-full p-3.5 bg-gray-100 border border-gray-200 rounded-xl font-semibold text-gray-600 text-sm sm:text-base cursor-not-allowed select-none"
                    />
                  </div>

                  {/* Company Name (Editable) */}
                  <div>
                    <label className="block text-gray-800 font-bold mb-2 text-sm sm:text-base flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-[#FF7A20]" />
                      <span>Company Name (Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={profileCompany}
                      onChange={(e) => setProfileCompany(e.target.value)}
                      className="w-full p-3.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-900 text-sm sm:text-base focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                      placeholder="e.g. Lagos Telecommunications Ltd"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="w-full sm:w-auto bg-[#FF7A20] hover:bg-[#e06816] text-white px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                    id="btn-save-profile"
                  >
                    {savingProfile ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Save Profile</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATION FORMS (LOGIN / SIGNUP / FORGOT PASSWORD)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50/60 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center" id="account-auth-container">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header Branding Card */}
        <div className="text-center space-y-2">
          <div
            onClick={() => setCurrentView("home")}
            className="inline-flex items-center space-x-2 cursor-pointer group"
          >
            <img
              src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
              alt="Spinel Logo"
              className="w-12 h-12 object-contain rounded-lg shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col text-left">
              <span className="text-[#FF7A20] font-extrabold text-xl tracking-tight leading-none">SPINEL</span>
              <span className="text-gray-700 font-bold text-[10px] tracking-[0.2em] leading-none mt-1">DISTRIBUTION</span>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight pt-2">
            {authMode === "login" && "Login to Your Account"}
            {authMode === "signup" && "Create Your Account"}
            {authMode === "forgot-password" && "Reset Password"}
          </h2>
          <p className="text-xs text-gray-500">
            {authMode === "login" && "Enter your email and password to access your account"}
            {authMode === "signup" && "Sign up with your details"}
            {authMode === "forgot-password" && "Enter your email address to receive a password reset link"}
          </p>
        </div>

        {/* Global Alert Banners */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs flex items-start space-x-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{successMessage}</div>
          </div>
        )}

        {/* MAIN AUTH FORM CARD */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
          
          {/* MODE 1: LOGIN */}
          {authMode === "login" && (
            <form onSubmit={onLoginSubmit} className="space-y-5" id="form-login">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter Email Address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-login-email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-bold text-gray-800">Password</label>
                  <button
                    type="button"
                    onClick={() => { resetFormState(); setAuthMode("forgot-password"); }}
                    className="text-xs sm:text-sm font-bold text-[#FF7A20] hover:underline cursor-pointer"
                    id="btn-forgot-password-link"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-login-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3.5 rounded-xl text-sm sm:text-base font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                id="btn-submit-login"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { resetFormState(); setAuthMode("signup"); }}
                    className="font-bold text-[#FF7A20] hover:underline cursor-pointer"
                    id="btn-goto-signup"
                  >
                    Create your account
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* MODE 2: CREATE YOUR ACCOUNT (SIGN UP) */}
          {authMode === "signup" && (
            <form onSubmit={onSignupSubmit} className="space-y-5" id="form-signup">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+234 812 345 6789"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-phone"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3.5 rounded-xl text-sm sm:text-base font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                id="btn-submit-signup"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { resetFormState(); setAuthMode("login"); }}
                    className="font-bold text-[#FF7A20] hover:underline cursor-pointer"
                    id="btn-goto-login"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* MODE 3: FORGOT PASSWORD */}
          {authMode === "forgot-password" && (
            <form onSubmit={onForgotPasswordSubmit} className="space-y-5" id="form-forgot-password">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your registered email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-forgot-email"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs sm:text-sm text-blue-900 leading-relaxed">
                A password reset link will be sent to this email address.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3.5 rounded-xl text-sm sm:text-base font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                id="btn-submit-forgot"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <Mail className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => { resetFormState(); setAuthMode("login"); }}
                  className="text-sm font-bold text-gray-700 hover:text-[#FF7A20] cursor-pointer"
                  id="btn-back-login"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
