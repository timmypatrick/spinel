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
  FileText
} from "lucide-react";
import { UserSession, Order } from "../types";
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

  // Order Filtering
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      (o.orderNumber && o.orderNumber.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
      (o.id && o.id.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
      (o.items && o.items.some((it) => it.productName.toLowerCase().includes(orderSearchQuery.toLowerCase())));

    if (selectedOrderTab === "paid") {
      return matchesSearch && (o.status === "Paid" || o.status === "Completed");
    }
    if (selectedOrderTab === "pending") {
      return matchesSearch && (o.status === "Pending" || o.status === "Processing");
    }
    return matchesSearch;
  });

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
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF7A20] to-amber-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg border-2 border-white/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold tracking-tight text-white">{user.name}</h1>
                    <span className="bg-[#FF7A20]/20 text-[#FF7A20] border border-[#FF7A20]/30 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                      {user.role} Account
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" /> {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => loadUserOrders(user.email)}
                  disabled={ordersLoading}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer backdrop-blur-md"
                  title="Refresh order data"
                >
                  <RefreshCw className={`w-4 h-4 ${ordersLoading ? "animate-spin text-[#FF7A20]" : ""}`} />
                  <span>Sync Orders</span>
                </button>

                <button
                  onClick={onLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer backdrop-blur-md"
                  id="btn-user-logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700/60 text-xs">
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-medium text-[10px]">Total Orders Placed</span>
                <span className="text-xl font-bold text-white mt-1 block font-mono">{orders.length} Orders</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-medium text-[10px]">Total Order Volume</span>
                <span className="text-xl font-bold text-[#FF7A20] mt-1 block font-mono">
                  {currency === "USD" ? `$${totalSpentUSD.toLocaleString()}` : `₦${totalSpentNGN.toLocaleString()}`}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-gray-400 block uppercase tracking-wider font-medium text-[10px]">Security Status</span>
                <span className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Protected by Supabase
                </span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-gray-200 space-x-8">
            <button
              onClick={() => setActiveSubTab("orders")}
              className={`pb-3 text-sm font-bold flex items-center space-x-2 transition cursor-pointer border-b-2 ${
                activeSubTab === "orders"
                  ? "border-[#FF7A20] text-[#FF7A20]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders & Live Tracking ({orders.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab("profile")}
              className={`pb-3 text-sm font-bold flex items-center space-x-2 transition cursor-pointer border-b-2 ${
                activeSubTab === "profile"
                  ? "border-[#FF7A20] text-[#FF7A20]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>
          </div>

          {/* TAB 1: ORDERS LIST & TRACKING */}
          {activeSubTab === "orders" && (
            <div className="space-y-6">
              
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by Order Number or Product Name..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A20]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedOrderTab("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      selectedOrderTab === "all" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All ({orders.length})
                  </button>
                  <button
                    onClick={() => setSelectedOrderTab("paid")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      selectedOrderTab === "paid" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Paid / Completed
                  </button>
                  <button
                    onClick={() => setSelectedOrderTab("pending")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      selectedOrderTab === "pending" ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>

              {/* Orders List View */}
              {ordersLoading ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-2xs space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#FF7A20] animate-spin mx-auto" />
                  <p className="text-xs text-gray-500 font-medium">Fetching account orders from Supabase...</p>
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
                        ? "No orders match your search criteria. Try a different order number or product term."
                        : "You haven't placed any orders under this user account yet. When you purchase products while logged in, your full order history and live tracking details will appear right here."}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView("store")}
                    className="bg-[#FF7A20] hover:bg-[#e06816] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md inline-flex items-center space-x-2"
                  >
                    <span>Browse Product Catalog</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => {
                    const isPaid = order.status === "Paid" || order.status === "Completed";
                    const isPending = order.status === "Pending";

                    return (
                      <div
                        key={order.id || order.orderNumber}
                        className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden transition hover:border-gray-300"
                      >
                        {/* Order Header */}
                        <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-gray-400 uppercase tracking-wider text-[10px] block font-semibold">Order Reference</span>
                              <span className="font-mono font-bold text-gray-900 text-sm">{order.orderNumber || order.id}</span>
                            </div>
                            <div className="border-l border-gray-200 pl-4">
                              <span className="text-gray-400 uppercase tracking-wider text-[10px] block font-semibold">Date Placed</span>
                              <span className="text-gray-700 font-medium">{order.date || "Recent"}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                                isPaid
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : isPending
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              <span className={`w-2 h-2 rounded-full ${isPaid ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                              {order.status || "Paid"}
                            </span>

                            <span className="bg-gray-200/60 text-gray-700 px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold">
                              {order.paymentMethod || "Paystack"}
                            </span>
                          </div>
                        </div>

                        {/* Order Tracking Progress Bar */}
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50/30 to-amber-50/30">
                          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-[#FF7A20]" />
                            <span>Order Status Timeline</span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold relative">
                            {/* Step 1: Placed */}
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs mb-1">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <span className="text-gray-900">Order Placed</span>
                              <span className="text-[10px] text-gray-400 font-normal">Confirmed</span>
                            </div>

                            {/* Step 2: Payment Verified */}
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs mb-1 ${
                                isPaid ? "bg-emerald-500 text-white" : "bg-amber-500 text-white animate-pulse"
                              }`}>
                                {isPaid ? <CheckCircle2 className="w-4 h-4" /> : "2"}
                              </div>
                              <span className={isPaid ? "text-gray-900" : "text-amber-700 font-bold"}>
                                {isPaid ? "Payment Confirmed" : "Awaiting Verification"}
                              </span>
                              <span className="text-[10px] text-gray-400 font-normal">{order.paymentMethod || "Paystack"}</span>
                            </div>

                            {/* Step 3: Dispatched */}
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs mb-1 ${
                                isPaid ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"
                              }`}>
                                {isPaid ? <Truck className="w-4 h-4" /> : "3"}
                              </div>
                              <span className={isPaid ? "text-gray-900" : "text-gray-400"}>Dispatch Ready</span>
                              <span className="text-[10px] text-gray-400 font-normal">Logistics Warehouse</span>
                            </div>

                            {/* Step 4: Delivered */}
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs mb-1">
                                4
                              </div>
                              <span className="text-gray-400">Delivered</span>
                              <span className="text-[10px] text-gray-400 font-normal">Final Address</span>
                            </div>
                          </div>
                        </div>

                        {/* Items Purchased List */}
                        <div className="p-6 space-y-4">
                          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Ordered Hardware Items</h4>
                          
                          <div className="divide-y divide-gray-100">
                            {order.items && order.items.map((item, idx) => (
                              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                                <div className="flex items-center space-x-3 min-w-0">
                                  <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                                    <img
                                      src={
                                        (item as any).images?.[0] ||
                                        "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png"
                                      }
                                      alt={item.productName}
                                      className="w-full h-full object-contain"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{item.productName}</p>
                                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">SKU: {item.sku || "SP-HARDWARE"}</p>
                                  </div>
                                </div>

                                <div className="text-right shrink-0">
                                  <span className="text-gray-500 text-[11px] block">Qty: {item.quantity}</span>
                                  <span className="font-bold text-gray-900 font-mono">
                                    {currency === "USD"
                                      ? `$${(item.priceUSD * item.quantity).toLocaleString()}`
                                      : `₦${(item.priceNGN * item.quantity).toLocaleString()}`}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Summary Footer */}
                        <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                          {order.shippingAddress && (
                            <div className="flex items-start space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-[#FF7A20] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-gray-900 block">Shipping Destination</span>
                                <span>
                                  {order.shippingAddress.addressLine1}, {order.shippingAddress.city},{" "}
                                  {order.shippingAddress.state}, {order.shippingAddress.country}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="sm:text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200">
                            <span className="text-gray-500 block uppercase tracking-wider text-[10px] font-semibold">Total Amount Paid</span>
                            <span className="text-lg font-extrabold text-[#FF7A20] font-mono">
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
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">User Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="block text-gray-500 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    readOnly
                    value={user.name}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 font-semibold mb-1">Email Address</label>
                  <input
                    type="text"
                    readOnly
                    value={user.email}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 font-semibold mb-1">Account Role</label>
                  <input
                    type="text"
                    readOnly
                    value={user.role.toUpperCase()}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 font-semibold mb-1">Authentication Provider</label>
                  <div className="w-full p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-semibold text-emerald-800 flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Supabase Secured Email Authentication</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-2 shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
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
            {authMode === "login" && "Sign In to Your Account"}
            {authMode === "signup" && "Create Your Account"}
            {authMode === "forgot-password" && "Reset Password"}
          </h2>
          <p className="text-xs text-gray-500">
            {authMode === "login" && "Enter your email and password to access your account profile & track orders"}
            {authMode === "signup" && "Sign up with Supabase authentication to track orders & manage purchases"}
            {authMode === "forgot-password" && "Enter your email address to receive a secure Supabase password reset link"}
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
            <form onSubmit={onLoginSubmit} className="space-y-4" id="form-login">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-login-email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">Password</label>
                  <button
                    type="button"
                    onClick={() => { resetFormState(); setAuthMode("forgot-password"); }}
                    className="text-[11px] font-semibold text-[#FF7A20] hover:underline cursor-pointer"
                    id="btn-forgot-password-link"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-login-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3 rounded-xl text-xs font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                id="btn-submit-login"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">
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
            <form onSubmit={onSignupSubmit} className="space-y-4" id="form-signup">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-signup-phone"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-800 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Email Confirmation Flow</span>
                </p>
                <p className="text-[10px] leading-relaxed">
                  Before your account is activated, Supabase will send a confirmation link to your email. You can then log in with your email address.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3 rounded-xl text-xs font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                id="btn-submit-signup"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">
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
            <form onSubmit={onForgotPasswordSubmit} className="space-y-4" id="form-forgot-password">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                    id="input-forgot-email"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-[11px] text-blue-800 leading-relaxed">
                Supabase will send a password reset link to this email address. Your existing account profile and order records will remain completely untampered.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3 rounded-xl text-xs font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                id="btn-submit-forgot"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <Mail className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => { resetFormState(); setAuthMode("login"); }}
                  className="text-xs font-bold text-gray-600 hover:text-[#FF7A20] cursor-pointer"
                  id="btn-back-login"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Security assurance footer */}
        <div className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Secured with Supabase Authentication & SSL Encryption</span>
        </div>

      </div>
    </div>
  );
}
