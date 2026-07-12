import React, { useState, useEffect } from "react";
import { ShieldAlert, Cpu, Layers, DollarSign, FileCheck, CheckCircle, Trash, Plus, FileText, Send, UserCheck, RefreshCw } from "lucide-react";
import { Product, QuoteRequest, Order, ContactMessage, UserSession } from "../types";

interface AdminDashboardProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  currency: "USD" | "NGN";
  setCurrentView: (view: string) => void;
}

export default function AdminDashboard({
  user,
  setUser,
  currency,
  setCurrentView
}: AdminDashboardProps) {
  // Auth Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Cockpit States
  const [activeTab, setActiveTab] = useState<"products" | "quotes" | "orders" | "messages">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Product Add/Edit Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    brand: "HexaShield",
    category: "Electronic Security",
    productType: "Enterprise",
    priceUSD: 1000,
    priceNGN: 1500000,
    stock: 24,
    description: "",
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"],
    specifications: [
      { label: "IP Standard", value: "IP66 dustproof" },
      { label: "Country of Origin", value: "Germany" }
    ],
    downloads: [
      { title: "Technical Datasheet", type: "PDF", url: "#" }
    ],
    reviews: []
  });

  // Load Admin dashboard statistics and arrays on login
  useEffect(() => {
    if (user && user.role === "admin") {
      loadCockpitData();
    }
  }, [user]);

  const loadCockpitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("spinel_token") || "";

    try {
      const headers = { "Authorization": token };
      
      const [prodRes, quoteRes, orderRes, msgRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/quotes", { headers }),
        fetch("/api/orders", { headers }),
        fetch("/api/contact", { headers })
      ]);

      if (prodRes.ok) setProducts(await prodRes.json());
      if (quoteRes.ok) setQuotes(await quoteRes.json());
      if (orderRes.ok) setOrders(await orderRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());

    } catch (err) {
      console.error("Cockpit loading error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Credential verification failed");
      }

      // Store credentials and authorize cockpit entry straight away
      localStorage.setItem("spinel_token", data.token);
      localStorage.setItem("spinel_user", JSON.stringify(data.user));
      setUser(data.user);

    } catch (err: any) {
      setAuthError(err.message || "Credential verification failed");
    } finally {
      setAuthLoading(false);
    }
  };

  // Product Operations
  const handleOpenCreateForm = () => {
    setIsEditMode(false);
    setProductForm({
      name: "",
      sku: `SPN-${Math.floor(100 + Math.random() * 900)}`,
      brand: "HexaShield",
      category: "Electronic Security",
      productType: "Enterprise",
      priceUSD: 1200,
      priceNGN: 1800000,
      stock: 30,
      description: "High performance systems design matching ATEX standards.",
      images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"],
      specifications: [
        { label: "IP Standard", value: "IP66 dustproof" },
        { label: "Deployment Zone", value: "Zone 1 / 2 compliant" }
      ],
      downloads: [
        { title: "Technical Brochure", type: "PDF", url: "#" }
      ],
      reviews: []
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (p: Product) => {
    setIsEditMode(true);
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      sku: p.sku,
      brand: p.brand,
      category: p.category,
      productType: p.productType,
      priceUSD: p.priceUSD,
      priceNGN: p.priceNGN,
      stock: p.stock,
      description: p.description,
      images: p.images,
      specifications: p.specifications,
      downloads: p.downloads,
      reviews: (p.reviews as any) || []
    });
    setIsFormOpen(true);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("spinel_token") || "";
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `/api/products/${editingProductId}` : "/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(productForm)
      });

      if (res.ok) {
        setIsFormOpen(false);
        loadCockpitData();
      } else {
        alert("Action failed. Verify token access level.");
      }
    } catch (err) {
      console.error("Product catalog manipulation failed", err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to retire this product model from active distribution?")) return;
    const token = localStorage.getItem("spinel_token") || "";

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
      });

      if (res.ok) {
        loadCockpitData();
      } else {
        alert("Operation retired by system protection rules.");
      }
    } catch (err) {
      console.error("Delete operation rejected", err);
    }
  };

  const handleApproveQuote = async (id: string) => {
    alert("Quote RFP approved. Technical layout drawings assigned to Engineering Desk.");
    setQuotes(quotes.map(q => q.id === id ? { ...q, status: "approved" } : q));
  };

  const handleReleaseLogistics = async (id: string) => {
    alert("Order released. Cargo cleared for dispatch.");
    setOrders(orders.map(o => o.id === id ? { ...o, status: "completed" } : o));
  };

  // Login Panel Screen if not authenticated
  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-md mx-auto px-4 py-24" id="admin-login-screen">
        <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <img
              src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
              alt="Spinel Only Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 object-contain rounded mx-auto border border-gray-100"
            />
            <h1 className="text-lg font-black text-gray-900 uppercase">
              Spinel Admin Login
            </h1>
            <p className="text-xs text-gray-400">
              Restricted zone. Authorized administrative keys required.
            </p>
          </div>

          {authError && (
            <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-xl flex items-center space-x-2 text-rose-700 text-xs">
              <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Technical Email ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@spineldistribution.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Security Access Code</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>

            <div className="bg-orange-50 border border-orange-100 p-3.5 rounded-xl space-y-1 text-gray-600 leading-normal text-[10px]">
              <p className="font-bold text-[#FF7A20] uppercase tracking-wider">
                🔐 Secured Mainframe Access
              </p>
              <p>
                Enter your administrative email credentials to securely access order tracking, quotes, RFP designs, and inventory controls.
              </p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gray-950 hover:bg-[#FF7A20] text-white py-3 rounded-xl font-bold uppercase transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Entering Mainframe...</span>
                </>
              ) : (
                <span>Secure Log In</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10" id="admin-cockpit-view">
      {/* Cockpit Title Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-950 text-white p-6 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FF7A20] p-2 rounded-xl text-white">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight">Mainframe Administration Cockpit</h1>
            <p className="text-[10px] text-gray-400 font-mono">Welcome back, Engr. Patrick Timi ({user?.email || "timmypatrick999@gmail.com"})</p>
          </div>
        </div>
        <div className="flex space-x-3 shrink-0">
          <button
            onClick={loadCockpitData}
            className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition"
            title="Refresh Core registers"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("spinel_token");
              localStorage.removeItem("spinel_user");
              setUser(null);
              setCurrentView("home");
            }}
            className="bg-[#FF7A20] hover:bg-[#e06512] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
          >
            Terminate Session
          </button>
        </div>
      </div>

      {/* Grid Dashboard Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="admin-dashboard-stats">
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Logistics Release</span>
            <p className="text-lg font-black text-gray-900 mt-0.5">{orders.length} Invoices</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-orange-50 rounded-xl text-[#FF7A20]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Site RFPs</span>
            <p className="text-lg font-black text-gray-900 mt-0.5">{quotes.length} Submissions</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-slate-50 rounded-xl text-gray-500">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Catalog Range</span>
            <p className="text-lg font-black text-gray-900 mt-0.5">{products.length} Products</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Contact Tickets</span>
            <p className="text-lg font-black text-gray-900 mt-0.5">{messages.length} Tickets</p>
          </div>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-gray-100 space-x-6 text-xs uppercase font-bold tracking-wider pb-1" id="admin-tab-bar">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === "products" ? "border-[#FF7A20] text-gray-900 font-bold" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          1. Supply Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("quotes")}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === "quotes" ? "border-[#FF7A20] text-gray-900 font-bold" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          2. RFP Quote Proposals ({quotes.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === "orders" ? "border-[#FF7A20] text-gray-900 font-bold" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          3. Corporate Sales Release ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === "messages" ? "border-[#FF7A20] text-gray-900 font-bold" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          4. Contact tickets ({messages.length})
        </button>
      </div>

      {/* Tab Screen Contents */}
      {loading ? (
        <div className="py-24 text-center text-xs font-semibold text-gray-400">Loading cockpit telemetry...</div>
      ) : activeTab === "products" ? (
        /* TAB 1: PRODUCT LIST */
        <div className="space-y-6" id="tab-products-content">
          <div className="flex justify-between items-center bg-gray-50 border border-gray-100 p-4 rounded-xl">
            <span className="text-xs font-semibold text-gray-500">Inventory Distribution Index</span>
            <button
              onClick={handleOpenCreateForm}
              className="bg-gray-900 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1 hover:bg-[#FF7A20] transition"
              id="btn-admin-add-product"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll New Hardware Model</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-[10px] text-gray-400 font-bold uppercase border-b border-gray-100">
                <tr>
                  <th className="p-4">SKU Code</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4 text-right">USD price</th>
                  <th className="p-4 text-right">NGN Price</th>
                  <th className="p-4 text-center">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-gray-950">{p.sku}</td>
                    <td className="p-4 font-bold text-gray-900">{p.name}</td>
                    <td className="p-4">{p.brand}</td>
                    <td className="p-4 text-right font-mono font-bold">${p.priceUSD.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono font-bold">₦{p.priceNGN.toLocaleString()}</td>
                    <td className="p-4 text-center font-bold">
                      <span className={p.stock < 10 ? "text-rose-600" : "text-emerald-600"}>{p.stock}</span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditForm(p)}
                        className="text-gray-500 hover:text-[#FF7A20] font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "quotes" ? (
        /* TAB 2: QUOTE PROPOSALS */
        <div className="space-y-4" id="tab-quotes-content">
          {quotes.length === 0 ? (
            <div className="py-12 text-center text-gray-400">No active RFPs in the inbox.</div>
          ) : (
            quotes.map((q) => (
              <div key={q.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <div>
                    <span className="font-mono text-[10px] bg-orange-50 text-[#FF7A20] font-bold px-2 py-0.5 rounded-sm">RFP Ref: {q.rfqNumber}</span>
                    <h3 className="font-bold text-sm text-gray-900 mt-1">{q.company}</h3>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${q.status === "approved" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-[#FF7A20]"}`}>
                    {q.status === "approved" ? "SLA Design Released" : "Awaiting Engineering review"}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Contact Rep</span>
                    <p className="font-bold text-gray-900">{q.name}</p>
                    <p className="text-gray-500 text-[10px]">{q.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Project Site Location</span>
                    <p className="font-bold text-gray-900">{q.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Assigned Budget</span>
                    <p className="font-bold text-gray-900">{q.budget}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Scope Domain</span>
                    <p className="font-bold text-[#FF7A20]">{q.domain}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200/50">{q.description}</p>
                {q.status !== "approved" && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleApproveQuote(q.id)}
                      className="bg-gray-950 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#FF7A20] transition"
                    >
                      Release Technical Proposal RFP
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : activeTab === "orders" ? (
        /* TAB 3: LOGISTICS RELEASE ORDERS */
        <div className="space-y-4" id="tab-orders-content">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-gray-400">No sales release pending.</div>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <div>
                    <p className="font-mono text-[10px] text-gray-400">Invoice: {o.invoiceNumber}</p>
                    <h3 className="font-bold text-sm text-gray-900">{o.shippingDetails.name}</h3>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${o.status === "completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {o.status === "completed" ? "Cargo Dispatched" : "Awaiting Bank Settlement clearance"}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Destination Site</span>
                    <p className="font-bold text-gray-900">{o.shippingDetails.address}</p>
                    <p className="text-gray-500 text-[10px]">{o.shippingDetails.state} State</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Billing Contact</span>
                    <p className="font-bold text-gray-900">{o.shippingDetails.phone}</p>
                    <p className="text-gray-500 text-[10px]">{o.shippingDetails.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Method</span>
                    <p className="font-bold text-gray-900 uppercase font-mono">{o.paymentMethod}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Reserved Total</span>
                    <p className="font-bold text-[#FF7A20] font-mono">
                      {currency === "USD" ? `$${o.totalAmountUSD.toLocaleString()}` : `₦${o.totalAmountNGN.toLocaleString()}`}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-3">
                  <p className="text-[9px] font-bold uppercase text-gray-400 mb-1.5">Cargo Manifest Allocation</p>
                  <div className="space-y-1">
                    {o.items.map((it, index) => (
                      <div key={index} className="flex justify-between text-[11px] text-gray-600">
                        <span>Allocated Product ID: {it.productId}</span>
                        <span className="font-bold">Quantity Reserved: {it.quantity} units</span>
                      </div>
                    ))}
                  </div>
                </div>

                {o.status !== "completed" && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleReleaseLogistics(o.id)}
                      className="bg-gray-950 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
                    >
                      Release Cargo & Dispatch
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        /* TAB 4: CONTACT TICKETS */
        <div className="space-y-4" id="tab-messages-content">
          {messages.length === 0 ? (
            <div className="py-12 text-center text-gray-400">No active customer tickets.</div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="bg-white border border-gray-100 p-5 rounded-xl space-y-2.5">
                <div className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900">{m.name}</span>
                    <span className="text-gray-400 font-semibold ml-2">({m.email})</span>
                  </div>
                  <span className="font-bold text-[#FF7A20] bg-orange-50 px-2 py-0.5 rounded text-[9px]">{m.subject}</span>
                </div>
                <p className="text-xs text-gray-600 leading-normal font-sans bg-gray-50 p-3 rounded">{m.message}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Product Create/Edit Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative space-y-4 text-xs">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-500 font-bold"
            >
              ×
            </button>
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">
              {isEditMode ? "Modify Hardware Catalog Entry" : "Register New OEM Distribution Model"}
            </h3>

            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Equipment Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleFormInputChange}
                required
                placeholder="Titan-V Solar Energy Module"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">SKU Reference</label>
                <input
                  type="text"
                  name="sku"
                  value={productForm.sku}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 font-mono font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">OEM Supplier</label>
                <select
                  name="brand"
                  value={productForm.brand}
                  onChange={handleFormInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none"
                >
                  <option value="HexaShield">HexaShield Security</option>
                  <option value="Vantage Power Systems">Vantage Power Systems</option>
                  <option value="CommsTect">CommsTect Rugged</option>
                  <option value="DuraRack">DuraRack Cabinets</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Product Division</label>
                <select
                  name="category"
                  value={productForm.category}
                  onChange={handleFormInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none"
                >
                  <option value="Electronic Security">Electronic Security</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Critical Telecoms & Racks">Critical Telecoms & Racks</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Standard Rating</label>
                <select
                  name="productType"
                  value={productForm.productType}
                  onChange={handleFormInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none"
                >
                  <option value="Enterprise">Enterprise</option>
                  <option value="Hazardous Area">Hazardous Area</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Price (USD)</label>
                <input
                  type="number"
                  name="priceUSD"
                  value={productForm.priceUSD}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none font-mono font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Price (NGN)</label>
                <input
                  type="number"
                  name="priceNGN"
                  value={productForm.priceNGN}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none font-mono font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Ex-Stock Qty</label>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Detailed Product Specifications Summary</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleFormInputChange}
                required
                rows={3}
                placeholder="Describe deployment metrics and standards..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none font-sans"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-900 hover:bg-[#FF7A20] text-white px-6 py-2 rounded-lg font-bold transition cursor-pointer"
              >
                {isEditMode ? "Publish Changes" : "Enroll Hardware Model"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
