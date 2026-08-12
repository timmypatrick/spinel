import React, { useState, useEffect } from "react";
import {
  ShieldAlert, Cpu, Layers, DollarSign, FileCheck, CheckCircle, CheckCircle2,
  Trash, Plus, FileText, Send, UserCheck, RefreshCw, Layers3, FolderEdit,
  Image as ImageIcon, Mail, Search, Package, Menu, X, BarChart3, UploadCloud,
  Download, LogOut, Users, ShoppingBag, KeyRound, Clock
} from "lucide-react";
import { Product, QuoteRequest, Order, ContactMessage, UserSession } from "../types";
import { safeFetch } from "../lib/dataService";
import * as XLSX from "xlsx";

interface AdminDashboardProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  currency: "USD" | "NGN";
  setCurrentView: (view: string) => void;
}

const CATEGORY_SECTIONS = [
  "All Products (Store Page)",
  "Box Camera",
  "Dome Camera",
  "Bullet Camera",
  "PTZ Camera",
  "Panoramic Camera",
  "Thermal Camera",
  "Fisheye Camera",
  "Camera Bundle",
  "Multi-Sensor Camera",
  "Industrial Switches",
  "Junction Box",
  "Network Video Recorders",
  "Electrical Workstation",
  "UPS & PDU",
  "PAGA System",
  "Hybrid Composite Cable",
  "Accessories",
  "Industrial Solar Panels",
  "Lithium LiFePO4 Batteries",
  "Smart Hybrid Inverters",
  "Small Enclosures",
  "IT Enclosures",
  "Wall-Mounted Enclosures",
  "Server Racks",
  "Ex-CCTV Camera",
  "EX-Junction Box"
];

const formatDateToDDMMYYYY = (dateStr: string | undefined | null) => {
  if (!dateStr) return "N/A";
  const parts = dateStr.split("-");
  if (parts.length === 3 && parts[0].length === 4) {
    // YYYY-MM-DD to DD-MM-YYYY
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
  } catch (e) {
    // ignore
  }
  return dateStr;
};

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

  // Cockpit Sidebar States
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "quotes" | "orders" | "messages" | "subscribers">("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<{ id: string; email: string; subscribedAt: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // CSV Bulk Upload Modal State
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const [csvUploading, setCsvUploading] = useState(false);
  const [csvImportMessage, setCsvImportMessage] = useState<string | null>(null);

  // Redesigned: Selected Category Section for filtering
  const [selectedCategorySection, setSelectedCategorySection] = useState<string>("All Products (Store Page)");

  // Product Add/Edit Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    brand: "HexaShield Security",
    category: "Electronic Security",
    subcategory: "",
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

  // Scalable subscriber management states
  const [subscribersSearch, setSubscribersSearch] = useState("");
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [editingSubscriberId, setEditingSubscriberId] = useState<string | null>(null);
  const [editingSubscriberEmail, setEditingSubscriberEmail] = useState("");
  const [subscribersPage, setSubscribersPage] = useState(1);
  const subscribersPerPage = 10;

  // Search and Pagination states for Admin Cockpit
  const [productsSearch, setProductsSearch] = useState("");
  const [productsPage, setProductsPage] = useState(1);

  const [quotesSearch, setQuotesSearch] = useState("");
  const [quotesPage, setQuotesPage] = useState(1);

  const [messagesSearch, setMessagesSearch] = useState("");
  const [messagesPage, setMessagesPage] = useState(1);

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
      
      const [prodRes, quoteRes, orderRes, msgRes, subRes] = await Promise.all([
        safeFetch("/api/products"),
        safeFetch("/api/quotes", { headers }),
        safeFetch("/api/orders", { headers }),
        safeFetch("/api/contact", { headers }),
        safeFetch("/api/newsletter", { headers })
      ]);

      if (prodRes.ok) setProducts(await prodRes.json());
      if (quoteRes.ok) setQuotes(await quoteRes.json());
      if (orderRes.ok) setOrders(await orderRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
      if (subRes.ok) setSubscribers(await subRes.json());

    } catch (err) {
      console.error("Cockpit loading error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data: any[] = XLSX.utils.sheet_to_json(ws);

        if (data && data.length > 0) {
          setCsvPreview(data);
          setCsvImportMessage(`Parsed ${data.length} product rows from CSV. Review preview below before confirming bulk upload.`);
        } else {
          alert("No valid product data found in the selected CSV file.");
        }
      } catch (err: any) {
        alert("Failed to parse CSV file: " + err.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDownloadCsvTemplate = () => {
    const templateData = [
      {
        SKU: "SP-CAM-2026-X",
        Name: "SpinelShield ATEX Explosion-Proof Camera 4K",
        Brand: "Spinel Hardware",
        Category: "Electronic Security",
        Subcategory: "Ex-CCTV Camera",
        PriceUSD: 1850,
        PriceNGN: 2775000,
        IsQuoteOnly: "FALSE",
        Stock: 25,
        Image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
        Description: "Industrial ATEX certified 4K optical camera for Zone 1 hazardous environments.",
        ProductType: "Hazardous Area"
      },
      {
        SKU: "SP-EX-PAGA-101",
        Name: "Spinel PAGA Station Control Unit",
        Brand: "FHF",
        Category: "Ex-Proof Equipments",
        Subcategory: "PAGA System",
        PriceUSD: 0,
        PriceNGN: 0,
        IsQuoteOnly: "TRUE",
        Stock: 100,
        Image: "https://i.ibb.co/RT6kr8S4/60f7bec3-c7f5-4e00-aa4e-5b1358894f82.png",
        Description: "Heavy-duty explosionproof station control unit for offshore oil rigs. Request a custom quote.",
        ProductType: "Enterprise"
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ProductTemplate");
    XLSX.writeFile(wb, "Spinel_Products_Bulk_Upload_Template.csv");
  };

  const handleConfirmCsvImport = async () => {
    if (csvPreview.length === 0) return;
    setCsvUploading(true);
    const token = localStorage.getItem("spinel_token") || "";

    try {
      const res = await safeFetch("/api/products/bulk-csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ products: csvPreview })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "CSV Bulk Import failed.");
      }

      alert(data.message || "CSV Bulk Import completed successfully!");
      setIsCsvModalOpen(false);
      setCsvPreview([]);
      setCsvImportMessage(null);
      loadCockpitData();
    } catch (err: any) {
      alert(err.message || "Failed importing products from CSV.");
    } finally {
      setCsvUploading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await safeFetch("/api/auth/admin/login", {
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

  const getCategoryForSubcategory = (subcat: string): string => {
    const s = subcat.toLowerCase();
    if (s.includes("accessories")) return "Electrical Systems";
    if (s.includes("camera")) return "Electronic Security";
    if (s.includes("solar") || s.includes("batter") || s.includes("inverter")) return "Renewable Energy";
    if (s.includes("enclosure") || s.includes("rack") || s.includes("cabinet")) return "Racks & Enclosures";
    if (s.includes("telephone") || s.includes("phone") || s.includes("sounder")) return "Hazardous Area Communication";
    if (s.includes("junction") || s.includes("box")) return "Electrical Systems";
    if (s.includes("switch") || s.includes("recorder") || s.includes("cable") || s.includes("network")) return "Telecom & Networking";
    return "Electronic Security"; // Default fallback
  };

  // Product Operations
  const handleOpenCreateForm = () => {
    setIsEditMode(false);
    
    // Pre-fill fields based on selected division
    const prefilledSubcat = selectedCategorySection !== "All Products (Store Page)" ? selectedCategorySection : "";
    const prefilledCat = prefilledSubcat ? getCategoryForSubcategory(prefilledSubcat) : "Electronic Security";

    setProductForm({
      name: "",
      sku: `SPN-${Math.floor(100 + Math.random() * 900)}`,
      brand: "HexaShield Security",
      category: prefilledCat,
      subcategory: prefilledSubcat,
      productType: prefilledSubcat.toLowerCase().includes("ex-") || prefilledSubcat.toLowerCase().includes("explosion") ? "Hazardous Area" : "Enterprise",
      priceUSD: 1200,
      priceNGN: 1800000,
      stock: 30,
      description: "High performance systems design matching ATEX/IECEx standards.",
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
      brand: p.brand || "HexaShield Security",
      category: p.category || "Electronic Security",
      subcategory: p.subcategory || "",
      productType: p.productType || "Enterprise",
      priceUSD: p.priceUSD,
      priceNGN: p.priceNGN,
      stock: p.stock,
      description: p.description,
      images: p.images && p.images.length ? p.images : ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"],
      specifications: p.specifications && p.specifications.length ? p.specifications : [
        { label: "IP Standard", value: "IP66 dustproof" },
        { label: "Deployment Zone", value: "Zone 1 / 2 compliant" }
      ],
      downloads: p.downloads || [],
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
      const res = await safeFetch(url, {
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
      const res = await safeFetch(`/api/products/${id}`, {
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

  // RFQ Quote Proposal Deletion
  const handleDeleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this RFQ proposal record?")) return;
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch(`/api/quotes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
      });
      if (res.ok) {
        setQuotes(quotes.filter(q => q.id !== id && (q as any).quoteNumber !== id && (q as any).rfqNumber !== id));
      } else {
        alert("Failed to delete quote proposal");
      }
    } catch (err) {
      console.error("Delete quote error", err);
      setQuotes(quotes.filter(q => q.id !== id));
    }
  };

  // Contact Details Submission Deletion
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact details submission?")) return;
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
      });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
      } else {
        alert("Failed to delete contact details entry");
      }
    } catch (err) {
      console.error("Delete message error", err);
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  // Order Status Update
  const handleUpdateOrderStatusAdmin = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => (o.id === id || o.orderNumber === id) ? { ...o, status: newStatus as any } : o));
      }
    } catch (err) {
      console.error("Update order status error", err);
      setOrders(orders.map(o => (o.id === id || o.orderNumber === id) ? { ...o, status: newStatus as any } : o));
    }
  };

  // Order Deletion
  const handleDeleteOrderAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order record from the admin dashboard?")) return;
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
      });
      if (res.ok) {
        setOrders(orders.filter(o => o.id !== id && o.orderNumber !== id));
      }
    } catch (err) {
      console.error("Delete order admin error", err);
      setOrders(orders.filter(o => o.id !== id && o.orderNumber !== id));
    }
  };

  const handleEditSubscriber = async (id: string, newEmail: string) => {
    if (!newEmail.trim()) return;
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch(`/api/newsletter/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ email: newEmail.trim() })
      });
      if (res.ok) {
        setSubscribers(subscribers.map(s => s.id === id ? { ...s, email: newEmail.trim() } : s));
        setEditingSubscriberId(null);
      } else {
        const d = await res.json();
        alert(d.error || "Failed to edit subscriber email");
      }
    } catch (err) {
      console.error("Edit subscriber error", err);
      setSubscribers(subscribers.map(s => s.id === id ? { ...s, email: newEmail.trim() } : s));
      setEditingSubscriberId(null);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch(`/api/newsletter/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
      });
      if (res.ok) {
        setSubscribers(subscribers.filter(s => s.id !== id));
        setSelectedSubscribers(selectedSubscribers.filter(sid => sid !== id));
      } else {
        alert("Failed to delete subscriber");
      }
    } catch (err) {
      console.error("Delete subscriber error", err);
      setSubscribers(subscribers.filter(s => s.id !== id));
      setSelectedSubscribers(selectedSubscribers.filter(sid => sid !== id));
    }
  };

  const handleBulkDeleteSubscribers = async () => {
    if (selectedSubscribers.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedSubscribers.length} selected subscribers?`)) return;
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch("/api/newsletter/bulk-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ ids: selectedSubscribers })
      });
      if (res.ok) {
        setSubscribers(subscribers.filter(s => !selectedSubscribers.includes(s.id)));
        setSelectedSubscribers([]);
      } else {
        alert("Failed to bulk delete subscribers");
      }
    } catch (err) {
      console.error("Bulk delete error", err);
      setSubscribers(subscribers.filter(s => !selectedSubscribers.includes(s.id)));
      setSelectedSubscribers([]);
    }
  };

  // Delete All Subscribers from Briefing Catalog
  const handleDeleteAllSubscribers = async () => {
    if (subscribers.length === 0) return;
    if (!confirm("Are you sure you want to completely delete ALL subscriber details from the Briefing Catalog? This action is irreversible.")) return;
    const token = localStorage.getItem("spinel_token") || "";
    try {
      const res = await safeFetch("/api/newsletter/delete-all", {
        method: "DELETE",
        headers: {
          "Authorization": token
        }
      });
      if (res.ok) {
        setSubscribers([]);
        setSelectedSubscribers([]);
        alert("All subscriber details have been deleted successfully.");
      } else {
        alert("Failed to delete all subscribers.");
      }
    } catch (err) {
      console.error("Delete all subscribers error", err);
      setSubscribers([]);
      setSelectedSubscribers([]);
    }
  };

  // Download massive product upload Excel/CSV template
  // Redesigned: Fuzzy match product for Category Sections
  const matchProduct = (p: Product, subName: string) => {
    if (subName === "All Products (Store Page)") return true;
    const nameLower = subName.toLowerCase().trim();
    const catLower = p.category ? p.category.toLowerCase() : "";
    const subcatLower = p.subcategory ? p.subcategory.toLowerCase() : "";
    const prodNameLower = p.name ? p.name.toLowerCase() : "";

    if (p.sku && p.sku.startsWith("PS-YA-HA-")) {
      return (
        nameLower === "paga system" ||
        nameLower === "paga" ||
        nameLower === "paga-system" ||
        nameLower === "ex-proof equipments" ||
        nameLower === "ex-proof equipment"
      );
    }

    if (p.sku && p.sku.startsWith("EC-YA-HA-")) {
      return (
        nameLower.includes("ex-cctv") ||
        nameLower === "ex-cctv camera" ||
        nameLower === "ex-cctv-camera" ||
        nameLower === "ex-proof equipments" ||
        nameLower === "ex-proof equipment"
      );
    }

    if (
      nameLower.includes("ex-cctv") ||
      nameLower === "ex-cctv camera" ||
      nameLower === "ex-cctv-camera"
    ) {
      if (p.sku && p.sku.startsWith("EC-YA-HA-")) return true;
      if (subcatLower.includes("ex-cctv") || catLower.includes("ex-cctv")) return true;
      return subcatLower === "ex-cctv camera" || catLower === "ex-cctv camera";
    }

    // Direct exact match
    if (catLower === nameLower || subcatLower === nameLower) return true;

    // Partial match of subcategory/category
    if (subcatLower.includes(nameLower) || nameLower.includes(subcatLower)) return true;
    if (catLower.includes(nameLower) || nameLower.includes(catLower)) return true;

    // Specific mapping helpers
    if (nameLower === "box camera" && subcatLower === "box-camera") return true; // fallback
    if (nameLower === "box camera" && subcatLower === "box camera") return true;
    if (nameLower === "dome camera" && (subcatLower.includes("dome") || prodNameLower.includes("dome"))) return true;
    if (nameLower === "bullet camera" && (subcatLower.includes("bullet") || prodNameLower.includes("bullet"))) return true;
    if (nameLower === "ptz camera" && (subcatLower.includes("ptz") || prodNameLower.includes("ptz"))) return true;
    if (nameLower === "panoramic camera" && (subcatLower.includes("panoramic") || prodNameLower.includes("panoramic"))) return true;
    if (nameLower === "thermal camera" && (subcatLower.includes("thermal") || prodNameLower.includes("thermal"))) return true;
    if (nameLower === "fisheye camera" && (subcatLower.includes("fisheye") || prodNameLower.includes("fisheye"))) return true;
    if (nameLower === "multi-sensor camera" && (subcatLower.includes("sensor") || prodNameLower.includes("sensor"))) return true;

    if (nameLower === "camera bundle") {
      if (subcatLower.includes("bundle") || prodNameLower.includes("bundle")) return true;
      if (subcatLower.includes("panel") || prodNameLower.includes("panel")) return true;
      if (subcatLower.includes("telephone") || subcatLower.includes("phone") || prodNameLower.includes("phone") || prodNameLower.includes("telephone")) return true;
    }

    if (nameLower === "industrial switches" && (subcatLower.includes("switch") || catLower.includes("telecom") || prodNameLower.includes("switch"))) return true;
    if (nameLower === "junction box" && (subcatLower.includes("junction") || prodNameLower.includes("junction"))) return true;
    if (nameLower === "network video recorders" && (subcatLower.includes("recorder") || prodNameLower.includes("recorder") || prodNameLower.includes("nvr"))) return true;
    if (nameLower === "electrical workstation" && (subcatLower.includes("workstation") || prodNameLower.includes("workstation"))) return true;
    if (nameLower === "ups & pdu" && (subcatLower.includes("ups") || subcatLower.includes("pdu") || prodNameLower.includes("ups") || prodNameLower.includes("pdu"))) return true;
    if ((nameLower === "paga system" || nameLower === "paga" || nameLower === "ex-sounder") && (subcatLower.includes("paga") || prodNameLower.includes("paga") || subcatLower.includes("sounder") || prodNameLower.includes("horn"))) return true;
    if (nameLower === "hybrid composite cable" && (subcatLower.includes("cable") || prodNameLower.includes("cable"))) return true;


    if (nameLower === "lithium lifepo4 batteries" && (subcatLower.includes("batter") || prodNameLower.includes("batter") || prodNameLower.includes("lifepo4"))) return true;
    if (nameLower === "smart hybrid inverters" && (subcatLower.includes("inverter") || prodNameLower.includes("inverter"))) return true;


    if (nameLower === "it enclosures" && (subcatLower.includes("it") || subcatLower.includes("enclosure") || prodNameLower.includes("enclosure"))) return true;
    if (nameLower === "wall-mounted enclosures" && (subcatLower.includes("wall") || prodNameLower.includes("wall") || prodNameLower.includes("cabinet"))) return true;
    if (nameLower === "server racks" && (subcatLower.includes("rack") || prodNameLower.includes("rack") || prodNameLower.includes("cabinet"))) return true;


    // Completely removed / disabled pages
    if (nameLower === "industrial solar panels") return false;
    if (nameLower === "ex-telephone") return false;
    if (nameLower === "small enclosures") return false;
    if (nameLower === "ex-junction box") return false;

    return false;
  };

  const filteredProducts = products.filter(p => matchProduct(p, selectedCategorySection));

  // SEARCH & PAGINATION COMPILATION
  const itemsPerPage60 = 60;

  // 1. Supply Inventory (Products)
  const searchedProducts = filteredProducts.filter(p => {
    if (!productsSearch.trim()) return true;
    const query = productsSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(query))
    );
  });
  const totalProductsPages = Math.ceil(searchedProducts.length / itemsPerPage60) || 1;
  const safeProductsPage = Math.min(productsPage, totalProductsPages);
  const paginatedProducts = searchedProducts.slice((safeProductsPage - 1) * itemsPerPage60, safeProductsPage * itemsPerPage60);

  // 2. RFP Quote Proposals (Quotes)
  const searchedQuotes = quotes.filter(q => {
    if (!quotesSearch.trim()) return true;
    const query = quotesSearch.toLowerCase();
    return (
      (q.name && q.name.toLowerCase().includes(query)) ||
      (q.company && q.company.toLowerCase().includes(query)) ||
      (q.email && q.email.toLowerCase().includes(query)) ||
      (q.rfqNumber && q.rfqNumber.toLowerCase().includes(query)) ||
      (q.description && q.description.toLowerCase().includes(query)) ||
      (q.domain && q.domain.toLowerCase().includes(query)) ||
      (q.location && q.location.toLowerCase().includes(query)) ||
      (q.productName && q.productName.toLowerCase().includes(query)) ||
      (q.sku && q.sku.toLowerCase().includes(query))
    );
  });
  const totalQuotesPages = Math.ceil(searchedQuotes.length / itemsPerPage60) || 1;
  const safeQuotesPage = Math.min(quotesPage, totalQuotesPages);
  const paginatedQuotes = searchedQuotes.slice((safeQuotesPage - 1) * itemsPerPage60, safeQuotesPage * itemsPerPage60);

  // 3. Contact tickets (Messages)
  const searchedMessages = messages.filter(m => {
    if (!messagesSearch.trim()) return true;
    const query = messagesSearch.toLowerCase();
    return (
      (m.name && m.name.toLowerCase().includes(query)) ||
      (m.email && m.email.toLowerCase().includes(query)) ||
      (m.subject && m.subject.toLowerCase().includes(query)) ||
      (m.message && m.message.toLowerCase().includes(query)) ||
      (m.company && m.company.toLowerCase().includes(query))
    );
  });
  const totalMessagesPages = Math.ceil(searchedMessages.length / itemsPerPage60) || 1;
  const safeMessagesPage = Math.min(messagesPage, totalMessagesPages);
  const paginatedMessages = searchedMessages.slice((safeMessagesPage - 1) * itemsPerPage60, safeMessagesPage * itemsPerPage60);

  // Login Panel Screen if not authenticated
  if (!user || user.role !== "admin") {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20" id="admin-login-screen">
        <div className="bg-white border border-gray-100 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <img
              src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
              alt="Spinel Only Logo"
              referrerPolicy="no-referrer"
              className="w-12 h-12 object-contain rounded-xl mx-auto border border-gray-100 p-1 bg-white shadow-xs"
            />
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
              Spinel Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Restricted zone. Authorized administrative keys required.
            </p>
          </div>

          {authError && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center space-x-2.5 text-rose-700 text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="text-gray-700 font-semibold text-xs sm:text-sm block">Technical Email ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Secured Email ID"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A20] focus:bg-white transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-700 font-semibold text-xs sm:text-sm block">Security Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A20] focus:bg-white transition"
              />
            </div>

            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl space-y-1 text-gray-600 leading-relaxed text-xs">
              <p className="font-bold text-[#FF7A20] uppercase tracking-wider text-xs">
                🔐 Secured Mainframe Access
              </p>
              <p>
                Enter your authorized credentials to securely access order tracking, quotes, and inventory controls.
              </p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gray-950 hover:bg-[#FF7A20] text-white py-3.5 rounded-xl font-bold uppercase transition flex items-center justify-center space-x-2 cursor-pointer text-xs sm:text-sm shadow-md"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span>LOADING DASHBOARD...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarMenuItems = [
    { id: "overview", label: "Dashboard Overview", icon: BarChart3, count: null, color: "text-blue-400" },
    { id: "products", label: "Supply Inventory", icon: Layers, count: products.length, color: "text-[#FF7A20]" },
    { id: "orders", label: "Paystack Orders", icon: FileCheck, count: orders.length, color: "text-teal-400" },
    { id: "quotes", label: "RFQ Proposals", icon: DollarSign, count: quotes.length, color: "text-amber-400" },
    { id: "subscribers", label: "Briefing Catalog", icon: Mail, count: subscribers.length, color: "text-purple-400" },
    { id: "messages", label: "Contact Details", icon: Send, count: messages.length, color: "text-rose-400" },
  ];

  const totalRevenueNGN = orders.reduce((sum, o) => sum + (o.totalNGN || 0), 0);
  const totalRevenueUSD = orders.reduce((sum, o) => sum + (o.totalUSD || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-900" id="admin-cockpit-view">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-gray-950 text-white p-4 flex items-center justify-between border-b border-gray-800 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FF7A20] p-2 rounded-lg text-white">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm uppercase tracking-wider text-white">Mainframe Admin</h1>
            <p className="text-[10px] text-gray-400">Timmy Patrick (Admin)</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-gray-900 text-gray-300 hover:text-white cursor-pointer border border-gray-800"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE SIDEBAR BACKDROP */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-25 md:hidden"
        />
      )}

      {/* ADMIN SIDEBAR - FIXED, REQUISITE HEIGHT BELOW HEADER */}
      <aside
        className={`fixed top-20 sm:top-[96px] left-0 bottom-0 w-64 lg:w-72 bg-gray-950 text-white flex flex-col justify-between z-30 transition-transform duration-300 shrink-0 border-r border-gray-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FF7A20] p-2.5 rounded-xl text-white shadow-lg shadow-orange-950">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="font-black text-base uppercase tracking-wider text-white">Spinel Admin</h2>
                <span className="inline-block bg-orange-950/80 text-[#FF7A20] border border-orange-800/50 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Master Control
                </span>
              </div>
            </div>
          </div>

          {/* User Badge */}
          <div className="bg-gray-900/90 border border-gray-800 p-3.5 rounded-xl flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#FF7A20]/20 text-[#FF7A20] border border-[#FF7A20]/40 flex items-center justify-center font-black text-sm">
              TP
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Timmy Patrick</p>
              <p className="text-[10px] text-gray-400 truncate">System Administrator</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" title="Session Active" />
          </div>

          {/* Navigation Items */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 px-3 block">
              Cockpit Navigation
            </span>
            {sidebarMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                    isActive
                      ? "bg-[#FF7A20] text-white shadow-md shadow-orange-950"
                      : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : item.color}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span
                      className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-900 text-gray-300 border border-gray-800"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Actions Card in Sidebar */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/60 border border-gray-800 p-4 rounded-xl space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF7A20] block">
              Quick CSV Import
            </span>
            <p className="text-[11px] text-gray-400 leading-snug">
              Massive upload products across all store pages using a CSV file.
            </p>
            <button
              onClick={() => {
                setIsCsvModalOpen(true);
                setIsSidebarOpen(false);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center space-x-2 transition cursor-pointer shadow-sm"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Massive CSV Upload</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-950/80 space-y-2 shrink-0">
          <button
            onClick={loadCockpitData}
            className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-bold py-2 px-3 rounded-lg transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh All Data</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("spinel_token");
              localStorage.removeItem("spinel_user");
              setUser(null);
              setCurrentView("home");
            }}
            className="w-full bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/50 text-xs font-bold py-2 px-3 rounded-lg transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 lg:ml-72 min-w-0 p-4 md:p-8 lg:p-10 space-y-8 overflow-y-auto">
        {/* Top Content Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
          <div>
            <h1 className="text-2xl font-black text-gray-950 uppercase tracking-tight flex items-center gap-2.5">
              {activeTab === "overview" && <BarChart3 className="w-7 h-7 text-[#FF7A20]" />}
              {activeTab === "products" && <Layers className="w-7 h-7 text-[#FF7A20]" />}
              {activeTab === "orders" && <FileCheck className="w-7 h-7 text-[#FF7A20]" />}
              {activeTab === "quotes" && <DollarSign className="w-7 h-7 text-[#FF7A20]" />}
              {activeTab === "subscribers" && <Mail className="w-7 h-7 text-[#FF7A20]" />}
              {activeTab === "messages" && <Send className="w-7 h-7 text-[#FF7A20]" />}
              <span>
                {activeTab === "overview" && "Dashboard Overview & System Metrics"}
                {activeTab === "products" && "Supply Inventory & Product Catalog"}
                {activeTab === "orders" && "Paystack Orders & Payment Records"}
                {activeTab === "quotes" && "RFQ Proposals & Custom Quotations"}
                {activeTab === "subscribers" && "Briefing Catalog Subscriptions"}
                {activeTab === "messages" && "Customer Contact Messages"}
              </span>
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              {activeTab === "overview" && "High-level summary of active store products, verified sales, quote proposals, and inquiries."}
              {activeTab === "products" && "Manage product items across all store pages and divisions or bulk import hardware via CSV/Excel."}
              {activeTab === "orders" && "Track Paystack-verified completed hardware purchases and order items."}
              {activeTab === "quotes" && "Review custom engineering RFQ quote requests submitted by institutional clients."}
              {activeTab === "subscribers" && "Manage email newsletter subscribers in the Spinel Briefing Catalog."}
              {activeTab === "messages" && "Review inquiries and contact form submissions sent by prospective clients."}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {activeTab === "products" && (
              <>
                <button
                  onClick={() => setIsCsvModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center space-x-2 shadow-xs"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Massive CSV Upload</span>
                </button>
                <button
                  onClick={handleOpenCreateForm}
                  className="bg-gray-950 hover:bg-[#FF7A20] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center space-x-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </>
            )}
            <button
              onClick={loadCockpitData}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {loading ? (
          <div className="py-24 text-center text-xs font-semibold text-gray-400 flex flex-col items-center justify-center space-y-2">
            <RefreshCw className="w-8 h-8 animate-spin text-[#FF7A20]" />
            <span>Loading cockpit telemetry...</span>
          </div>
        ) : activeTab === "overview" ? (
          /* TAB 0: OVERVIEW METRICS & QUICK ACTIONS */
          <div className="space-y-8">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div
                onClick={() => setActiveTab("orders")}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-[#FF7A20] transition cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Total Completed Sales</span>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <FileCheck className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-950 font-mono">
                    {currency === "USD" ? `$${totalRevenueUSD.toLocaleString()}` : `₦${totalRevenueNGN.toLocaleString()}`}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">
                    {orders.length} Verified Paystack Orders
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("products")}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-[#FF7A20] transition cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Supply Catalog</span>
                  <div className="p-2 bg-orange-50 text-[#FF7A20] rounded-xl">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-950 font-mono">
                    {products.length}
                  </div>
                  <p className="text-[11px] text-[#FF7A20] font-bold mt-1">
                    Active Product Models
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("quotes")}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-[#FF7A20] transition cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">RFQ Requests</span>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-950 font-mono">
                    {quotes.length}
                  </div>
                  <p className="text-[11px] text-amber-600 font-bold mt-1">
                    Pending Quotes & Proposals
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Hub & CSV Upload Trigger */}
            <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-[#FF7A20]" />
                    <span>Massive Product CSV / Excel Upload Hub</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Batch import hundreds of hardware products into store pages automatically using CSV or Excel spreadsheets.
                  </p>
                </div>
                <div className="flex space-x-3 shrink-0">
                  <button
                    onClick={handleDownloadCsvTemplate}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-700 transition cursor-pointer flex items-center space-x-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Sample Template</span>
                  </button>
                  <button
                    onClick={() => setIsCsvModalOpen(true)}
                    className="bg-[#FF7A20] hover:bg-[#e06512] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center space-x-2 shadow-md"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Launch CSV Bulk Upload</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-[#FF7A20] block">1. Prepare CSV File</span>
                  <p className="text-gray-400 text-[11px]">Include SKU, Name, Category, Subcategory, PriceUSD, PriceNGN, IsQuoteOnly, Stock, Image, Description.</p>
                </div>
                <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-[#FF7A20] block">2. Automatic Placement</span>
                  <p className="text-gray-400 text-[11px]">Products automatically route to their Store, Category, Subcategory, and OEM brand pages.</p>
                </div>
                <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-[#FF7A20] block">3. Instant Storefront Sync</span>
                  <p className="text-gray-400 text-[11px]">Supports both priced items and "Request Quote" items with product image links.</p>
                </div>
              </div>
            </div>

            {/* Recent RFQs & Paystack Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Pending RFQ Proposals */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-sm text-gray-950 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#FF7A20]" />
                    <span>Recent RFQ Proposals</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("quotes")}
                    className="text-xs font-bold text-[#FF7A20] hover:underline cursor-pointer"
                  >
                    View All ({quotes.length})
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {quotes.slice(0, 5).map((q, idx) => (
                    <div key={q.id || idx} className="py-3 flex items-center justify-between text-xs">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{q.companyName || q.name}</p>
                        <p className="text-[11px] text-gray-500 font-mono truncate">{q.email}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-1 rounded font-semibold shrink-0">
                        {q.productName ? q.productName.slice(0, 20) + "..." : "Custom RFQ"}
                      </span>
                    </div>
                  ))}
                  {quotes.length === 0 && (
                    <p className="text-xs text-gray-400 py-4 text-center">No recent RFQ proposals.</p>
                  )}
                </div>
              </div>

              {/* Recent Paystack Completed Orders */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-sm text-gray-950 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Recent Paystack Orders</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-[#FF7A20] hover:underline cursor-pointer"
                  >
                    View All ({orders.length})
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((o, idx) => (
                    <div key={o.id || idx} className="py-3 flex items-center justify-between text-xs">
                      <div className="min-w-0">
                        <p className="font-mono font-bold text-gray-900 truncate">{o.orderNumber || o.id}</p>
                        <p className="text-[11px] text-gray-500 truncate">{o.customerEmail || o.billingAddress?.email || "Paystack Customer"}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-emerald-600 font-mono block">
                          {currency === "USD" ? `$${(o.totalUSD || 0).toLocaleString()}` : `₦${(o.totalNGN || 0).toLocaleString()}`}
                        </span>
                        <span className="text-[10px] text-gray-400">{o.date || "Recent"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "products" ? (
        /* TAB 1: PRODUCT LIST */
        <div className="space-y-6" id="tab-products-content">
          
          {/* Redesigned User-Friendly Division Selection Bar */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-4 shadow-xs">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="space-y-1">
                <h3 className="font-black text-gray-950 text-xl lg:text-2xl flex items-center gap-2">
                  <Layers3 className="w-5 h-5 text-[#FF7A20]" />
                  <span>Interactive Inventory Division Manager</span>
                </h3>
                <p className="text-xs text-gray-500 leading-normal">
                  Select a specific header page division or choose the general "Store Page" to upload, update or delete products. Any action syncs globally across all user views instantly.
                </p>
              </div>

              {/* Division Dropdown Selector */}
              <div className="flex items-center space-x-2 w-full lg:max-w-xs shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0">Show Division:</span>
                <select
                  value={selectedCategorySection}
                  onChange={(e) => setSelectedCategorySection(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 font-semibold text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#FF7A20]"
                >
                  {CATEGORY_SECTIONS.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visual Indicator of Selected Division */}
            <div className="bg-orange-50/50 border border-orange-100/50 rounded-lg p-3 flex justify-between items-center">
              <div className="text-xs">
                Currently Managing: <span className="font-extrabold text-[#FF7A20] uppercase">{selectedCategorySection}</span>
                <span className="text-gray-400 font-semibold ml-2">({filteredProducts.length} models present)</span>
              </div>
              <button
                onClick={handleOpenCreateForm}
                className="bg-gray-950 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1 hover:bg-[#FF7A20] transition cursor-pointer"
                id="btn-admin-add-product"
              >
                <Plus className="w-4 h-4" />
                <span>Enroll Product in {selectedCategorySection.replace("All Products (", "").replace(")", "")}</span>
              </button>
            </div>
          </div>



          {/* Search Bar for Supply Inventory */}
          <div className="flex justify-end bg-white border border-gray-100 rounded-xl p-4 shadow-xs">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search inventory by name, SKU, brand, category..."
                value={productsSearch}
                onChange={(e) => {
                  setProductsSearch(e.target.value);
                  setProductsPage(1); // Reset page to 1 on search
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF7A20] focus:border-transparent"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-xs">
            {searchedProducts.length === 0 ? (
              <div className="py-16 text-center text-gray-400 space-y-2">
                <p className="font-bold text-sm text-gray-900">No products found matching filters/search</p>
                <p className="text-xs">Try adjusting your search criteria or division filter above.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50 text-[10px] text-gray-400 font-bold uppercase border-b border-gray-100">
                  <tr>
                    <th className="p-4">Model Preview</th>
                    <th className="p-4">SKU Code</th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">USD Price</th>
                    <th className="p-4 text-right">NGN Price</th>
                    <th className="p-4 text-center">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="p-4">
                        <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded overflow-hidden flex items-center justify-center">
                          <img
                            src={p.images && p.images[0]}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                            }}
                          />
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-gray-950">{p.sku}</td>
                      <td className="p-4 font-bold text-gray-900 max-w-xs truncate">{p.name}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px]">
                          {p.subcategory || p.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-bold">${p.priceUSD.toLocaleString()}</td>
                      <td className="p-4 text-right font-mono font-bold">₦{p.priceNGN.toLocaleString()}</td>
                      <td className="p-4 text-center font-bold">
                        <span className={p.stock < 10 ? "text-rose-600" : "text-emerald-600"}>{p.stock}</span>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button
                          onClick={() => handleOpenEditForm(p)}
                          className="text-gray-500 hover:text-[#FF7A20] font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-rose-500 hover:text-rose-700 font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Bar */}
          {searchedProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-xs text-xs text-gray-500">
              <div>
                Showing <span className="font-bold text-gray-900">{((safeProductsPage - 1) * itemsPerPage60) + 1}</span> to{" "}
                <span className="font-bold text-gray-900">{Math.min(safeProductsPage * itemsPerPage60, searchedProducts.length)}</span> of{" "}
                <span className="font-bold text-gray-900">{searchedProducts.length}</span> models
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setProductsPage(p => Math.max(1, p - 1))}
                  disabled={safeProductsPage === 1}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                <span className="px-3">
                  Page <span className="font-bold text-gray-900">{safeProductsPage}</span> of{" "}
                  <span className="font-bold text-gray-900">{totalProductsPages}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setProductsPage(p => Math.min(totalProductsPages, p + 1))}
                  disabled={safeProductsPage === totalProductsPages}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === "orders" ? (
        /* TAB 3: PAYSTACK COMPLETED ORDERS */
        <div className="space-y-6" id="tab-orders-content">
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs">
            <div>
              <h3 className="font-black text-gray-950 text-xl flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#FF7A20]" />
                <span>Paystack Verified Hardware Orders ({orders.length})</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Completed hardware orders placed by customers displaying exact product breakdown, date, time, and payment reference.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-2xs space-y-2">
                <Package className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="text-sm font-bold text-gray-900">No Paystack Orders Recorded Yet</p>
                <p className="text-xs text-gray-400">When customers complete purchases via Paystack, orders will appear here automatically.</p>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id || ord.orderNumber} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
                  <div className="flex flex-wrap justify-between items-center pb-3 border-b border-gray-100 gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">Order Ref: {ord.orderNumber || ord.id}</span>
                      <span className="text-xs text-gray-400 ml-3">{ord.date || "Recent"}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {(ord.status === "Paid" || ord.status === "Completed") ? (
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Completed (Paystack Received)</span>
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-100 text-amber-800 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Pending Payment</span>
                          </span>
                          <button
                            onClick={() => handleUpdateOrderStatusAdmin(ord.id || ord.orderNumber, "Completed")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-2.5 py-1 rounded-lg transition cursor-pointer"
                            title="Mark Order as Completed"
                          >
                            Mark Completed
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => handleDeleteOrderAdmin(ord.id || ord.orderNumber)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                        title="Delete Order Record"
                      >
                        <Trash className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 font-bold uppercase text-[10px] block">Customer Details</span>
                      <p className="font-bold text-gray-900 mt-0.5">{ord.userEmail || "Guest Customer"}</p>
                      {ord.shippingAddress && (
                        <p className="text-gray-500 text-[11px] mt-0.5">
                          Phone: {ord.shippingAddress.phone || "N/A"}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="text-gray-400 font-bold uppercase text-[10px] block">Shipping Destination</span>
                      {ord.shippingAddress ? (
                        <p className="text-gray-700 mt-0.5">
                          {ord.shippingAddress.addressLine1}, {ord.shippingAddress.city}, {ord.shippingAddress.state}, {ord.shippingAddress.country}
                        </p>
                      ) : (
                        <p className="text-gray-400 mt-0.5">Direct Delivery</p>
                      )}
                    </div>

                    <div>
                      <span className="text-gray-400 font-bold uppercase text-[10px] block">Total Amount</span>
                      <p className="text-lg font-black text-[#FF7A20] font-mono mt-0.5">
                        {currency === "USD" ? `$${(ord.totalUSD || 0).toLocaleString()}` : `₦${(ord.totalNGN || 0).toLocaleString()}`}
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  {ord.items && ord.items.length > 0 && (
                    <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 text-xs space-y-2">
                      <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block">Purchased Products ({ord.items.length})</span>
                      <div className="divide-y divide-gray-200/60">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex justify-between items-center text-xs">
                            <div className="font-semibold text-gray-900">
                              {item.productName} <span className="text-gray-400 font-normal font-mono">(Qty: {item.quantity})</span>
                            </div>
                            <div className="font-mono font-bold text-gray-800">
                              {currency === "USD" ? `$${(item.priceUSD * item.quantity).toLocaleString()}` : `₦${(item.priceNGN * item.quantity).toLocaleString()}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : activeTab === "quotes" ? (
        /* TAB 2: QUOTE PROPOSALS */
        <div className="space-y-4" id="tab-quotes-content">
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">RFQ Proposals ({searchedQuotes.length})</h3>
              <p className="text-[11px] text-gray-500">Search and manage client requests for quotes.</p>
            </div>
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search quotes by contact, company, email, rfq ref..."
                value={quotesSearch}
                onChange={(e) => {
                  setQuotesSearch(e.target.value);
                  setQuotesPage(1); // Reset page to 1 on search
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF7A20] focus:border-transparent"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>

          {searchedQuotes.length === 0 ? (
            <div className="py-12 text-center text-gray-400">No active RFQs found matching search.</div>
          ) : (
            paginatedQuotes.map((q: any) => (
              <div key={q.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <div>
                    <span className="font-mono text-[10px] bg-orange-50 text-[#FF7A20] font-bold px-2 py-0.5 rounded-sm">RFQ Ref: {q.rfqNumber || q.quoteNumber}</span>
                    <h3 className="font-bold text-sm text-gray-900 mt-1">{q.companyName || q.company || "Enterprise Corp"}</h3>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${q.status === "approved" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-[#FF7A20]"}`}>
                    {q.status === "approved" ? "SLA Design Released" : "Awaiting Engineering review"}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Contact Rep</span>
                    <p className="font-bold text-gray-900">{q.contactName || q.name || "Representative"}</p>
                    <p className="text-gray-500 text-[10px]">{q.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Project Site Location</span>
                    <p className="font-bold text-gray-900">{q.location || q.country || "Nigeria"}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Product Name</span>
                    <p className="font-bold text-gray-900">{q.productName || (q.domain ? `Design [${q.domain}]` : "N/A")}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px]">SKU</span>
                    <p className="font-bold text-[#FF7A20]">{q.sku || "N/A"}</p>
                  </div>
                </div>
                {/* Render selected products if they exist (from cart quote request) */}
                {q.items && q.items.length > 0 && (
                  <div className="text-[11px] bg-gray-50/50 p-3 rounded-lg border border-gray-100 space-y-1.5">
                    <p className="font-bold text-gray-400 uppercase text-[9px]">Requested Inventory Items:</p>
                    {q.items.map((it: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-gray-700">
                        <span>• {it.productName}</span>
                        <span className="font-bold">Qty {it.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
                {q.files && q.files.length > 0 && (
                  <div className="text-[11px] bg-gray-50/50 p-3 rounded-lg border border-gray-100 space-y-1.5">
                    <p className="font-bold text-gray-400 uppercase text-[9px]">Annex & Engineering Drawings ({q.files.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {q.files.map((file: any, idx: number) => (
                        <a
                          key={idx}
                          href={file.data}
                          download={file.name}
                          className="inline-flex items-center space-x-1.5 bg-white border border-gray-200 hover:border-orange-200 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-gray-700 transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#FF7A20] shrink-0" />
                          <span className="underline max-w-[150px] truncate">{file.name}</span>
                          <span className="text-gray-400 text-[8px]">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-600 font-sans leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200/50">{q.description || q.message}</p>
                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  {q.status !== "approved" && (
                    <button
                      onClick={() => handleApproveQuote(q.id)}
                      className="bg-gray-950 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#FF7A20] transition cursor-pointer"
                    >
                      Release Technical Proposal RFQ
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteQuote(q.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5"
                    title="Delete RFQ Proposal"
                  >
                    <Trash className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Pagination Bar */}
          {searchedQuotes.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-xs text-xs text-gray-500">
              <div>
                Showing <span className="font-bold text-gray-900">{((safeQuotesPage - 1) * itemsPerPage60) + 1}</span> to{" "}
                <span className="font-bold text-gray-900">{Math.min(safeQuotesPage * itemsPerPage60, searchedQuotes.length)}</span> of{" "}
                <span className="font-bold text-gray-900">{searchedQuotes.length}</span> proposals
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setQuotesPage(p => Math.max(1, p - 1))}
                  disabled={safeQuotesPage === 1}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                <span className="px-3">
                  Page <span className="font-bold text-gray-900">{safeQuotesPage}</span> of{" "}
                  <span className="font-bold text-gray-900">{totalQuotesPages}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setQuotesPage(p => Math.min(totalQuotesPages, p + 1))}
                  disabled={safeQuotesPage === totalQuotesPages}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === "orders" ? (
        /* TAB 3: BRIEFING CATALOG */
        <div className="space-y-6" id="tab-subscribers-content">
          <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-4 shadow-xs">
            <div className="space-y-1">
              <h3 className="font-black text-gray-950 text-xl lg:text-2xl flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#FF7A20]" />
                <span>Briefing Catalog</span>
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white border border-gray-100 p-4 rounded-xl shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search by email..."
                value={subscribersSearch}
                onChange={(e) => {
                  setSubscribersSearch(e.target.value);
                  setSubscribersPage(1); // Reset page to 1 on search
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF7A20] focus:border-transparent"
              />
            </div>

            {/* Bulk Actions */}
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              {selectedSubscribers.length > 0 && (
                <button
                  onClick={handleBulkDeleteSubscribers}
                  className="bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs px-4 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <Trash className="w-3.5 h-3.5" />
                  Delete Selected ({selectedSubscribers.length})
                </button>
              )}
              {subscribers.length > 0 && (
                <button
                  onClick={handleDeleteAllSubscribers}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <Trash className="w-3.5 h-3.5" />
                  Delete All Subscribers
                </button>
              )}
            </div>
          </div>

          {(() => {
            const filtered = subscribers.filter(s =>
              s.email.toLowerCase().includes(subscribersSearch.toLowerCase().trim())
            );

            // Paginated items
            const totalItems = filtered.length;
            const totalPages = Math.ceil(totalItems / subscribersPerPage) || 1;
            const currentPage = Math.min(subscribersPage, totalPages);
            const startIndex = (currentPage - 1) * subscribersPerPage;
            const endIndex = Math.min(startIndex + subscribersPerPage, totalItems);
            const pageItems = filtered.slice(startIndex, endIndex);

            const allSelectedOnPage = pageItems.length > 0 && pageItems.every(item => selectedSubscribers.includes(item.id));

            const handleSelectAllPage = (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                // Add all visible page item IDs
                const toAdd = pageItems.filter(item => !selectedSubscribers.includes(item.id)).map(item => item.id);
                setSelectedSubscribers([...selectedSubscribers, ...toAdd]);
              } else {
                // Remove all visible page item IDs
                const pageIds = pageItems.map(item => item.id);
                setSelectedSubscribers(selectedSubscribers.filter(id => !pageIds.includes(id)));
              }
            };

            const handleToggleSelect = (id: string) => {
              if (selectedSubscribers.includes(id)) {
                setSelectedSubscribers(selectedSubscribers.filter(sid => sid !== id));
              } else {
                setSelectedSubscribers([...selectedSubscribers, id]);
              }
            };

            return (
              <div className="space-y-4">
                {totalItems === 0 ? (
                  <div className="py-12 text-center text-gray-400 bg-white border border-gray-100 rounded-2xl shadow-xs">
                    No matching subscribers in the Briefing Catalog.
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-400 uppercase font-bold tracking-wider text-[10px] border-b border-gray-100">
                            <th className="p-4 w-12 text-center">
                              <input
                                type="checkbox"
                                checked={allSelectedOnPage}
                                onChange={handleSelectAllPage}
                                className="rounded border-gray-300 text-[#FF7A20] focus:ring-[#FF7A20] accent-[#FF7A20] checked:text-white cursor-pointer h-4 w-4"
                              />
                            </th>
                            <th className="p-4">Email Address</th>
                            <th className="p-4 hidden md:table-cell">Joined Date</th>
                            <th className="p-4 w-28 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {pageItems.map((sub) => {
                            const isEditing = editingSubscriberId === sub.id;
                            return (
                              <tr key={sub.id} className="hover:bg-gray-50/50 transition">
                                <td className="p-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedSubscribers.includes(sub.id)}
                                    onChange={() => handleToggleSelect(sub.id)}
                                    className="rounded border-gray-300 text-[#FF7A20] focus:ring-[#FF7A20] accent-[#FF7A20] checked:text-white cursor-pointer h-4 w-4"
                                  />
                                </td>
                                <td className="p-4">
                                  {isEditing ? (
                                    <div className="flex items-center gap-2 max-w-sm">
                                      <input
                                        type="email"
                                        value={editingSubscriberEmail}
                                        onChange={(e) => setEditingSubscriberEmail(e.target.value)}
                                        className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-[#FF7A20]"
                                        placeholder="user@example.com"
                                        autoFocus
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleEditSubscriber(sub.id, editingSubscriberEmail)}
                                        className="bg-[#FF7A20] hover:bg-[#e06512] text-white p-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                                        title="Save email"
                                      >
                                        ✓
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingSubscriberId(null)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                                        title="Cancel"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="font-semibold text-gray-900 break-all">{sub.email}</span>
                                  )}
                                </td>
                                <td className="p-4 text-gray-400 hidden md:table-cell">
                                  {formatDateToDDMMYYYY(sub.subscribedAt)}
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    {!isEditing && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingSubscriberId(sub.id);
                                          setEditingSubscriberEmail(sub.email);
                                        }}
                                        className="text-[#FF7A20] hover:text-[#e06512] font-bold py-1 px-2 hover:bg-orange-50 rounded transition cursor-pointer"
                                      >
                                        Edit
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteSubscriber(sub.id)}
                                      className="text-red-500 hover:text-red-700 font-bold py-1 px-2 hover:bg-red-50 rounded transition cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-xs text-xs text-gray-500">
                      <div>
                        Showing <span className="font-bold text-gray-900">{startIndex + 1}</span> to{" "}
                        <span className="font-bold text-gray-900">{endIndex}</span> of{" "}
                        <span className="font-bold text-gray-900">{totalItems}</span> subscribers
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSubscribersPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Previous
                        </button>
                        <span className="px-3">
                          Page <span className="font-bold text-gray-900">{currentPage}</span> of{" "}
                          <span className="font-bold text-gray-900">{totalPages}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSubscribersPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        /* TAB 4: CONTACT TICKETS */
        <div className="space-y-4" id="tab-messages-content">
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Contact Details ({searchedMessages.length})</h3>
              <p className="text-[11px] text-gray-500">Review client messages and contact form submissions.</p>
            </div>
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search tickets by name, email, subject, message..."
                value={messagesSearch}
                onChange={(e) => {
                  setMessagesSearch(e.target.value);
                  setMessagesPage(1); // Reset page to 1 on search
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF7A20] focus:border-transparent"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>

          {searchedMessages.length === 0 ? (
            <div className="py-12 text-center text-gray-400">No active customer tickets found matching search.</div>
          ) : (
            paginatedMessages.map((m: any) => (
              <div key={m.id} className="bg-white border border-gray-100 p-5 rounded-xl space-y-2.5 shadow-xs">
                <div className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900">{m.name}</span>
                    <span className="text-gray-400 font-semibold ml-2">({m.email})</span>
                  </div>
                  <span className="font-bold text-[#FF7A20] bg-orange-50 px-2 py-0.5 rounded text-[9px]">{m.subject}</span>
                </div>
                {/* Extra contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[10px] text-gray-500 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 font-mono">
                  {m.companyName && (
                    <div>
                      <span className="text-gray-400">Company:</span> <span className="font-bold text-gray-700">{m.companyName}</span>
                    </div>
                  )}
                  {m.phone && (
                    <div>
                      <span className="text-gray-400">Phone:</span> <span className="font-bold text-gray-700">{m.phone}</span>
                    </div>
                  )}
                  {m.address && (
                    <div className="sm:col-span-1 md:col-span-1">
                      <span className="text-gray-400">Location:</span> <span className="font-bold text-gray-700">{m.address}, {m.state}, {m.country}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-600 leading-normal font-sans bg-gray-50 p-3 rounded flex-1">{m.message}</p>
                  <button
                    onClick={() => handleDeleteMessage(m.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 shrink-0"
                    title="Delete Contact Ticket"
                  >
                    <Trash className="w-3.5 h-3.5" />
                    <span>Delete Ticket</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Pagination Bar */}
          {searchedMessages.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-xs text-xs text-gray-500">
              <div>
                Showing <span className="font-bold text-gray-900">{((safeMessagesPage - 1) * itemsPerPage60) + 1}</span> to{" "}
                <span className="font-bold text-gray-900">{Math.min(safeMessagesPage * itemsPerPage60, searchedMessages.length)}</span> of{" "}
                <span className="font-bold text-gray-900">{searchedMessages.length}</span> tickets
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMessagesPage(p => Math.max(1, p - 1))}
                  disabled={safeMessagesPage === 1}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                <span className="px-3">
                  Page <span className="font-bold text-gray-900">{safeMessagesPage}</span> of{" "}
                  <span className="font-bold text-gray-900">{totalMessagesPages}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMessagesPage(p => Math.min(totalMessagesPages, p + 1))}
                  disabled={safeMessagesPage === totalMessagesPages}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </main>

      {/* Redesigned Product Create/Edit Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative space-y-4 text-xs border border-gray-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-500 font-extrabold text-sm"
            >
              ×
            </button>
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">
              {isEditMode ? "Modify Hardware Catalog Entry" : `Enroll New Model under: ${selectedCategorySection}`}
            </h3>

            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Equipment Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleFormInputChange}
                required
                placeholder="Titan-V Solar Energy Module"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#FF7A20]"
              />
            </div>

            {/* Direct Image URL input - Fully fulfilling the requirement */}
            <div className="space-y-1.5 bg-orange-50/20 border border-orange-100/30 p-3 rounded-lg">
              <label className="text-gray-600 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#FF7A20]" />
                <span>Product Picture (Direct src Link URL)</span>
              </label>
              <input
                type="text"
                value={productForm.images && productForm.images[0] ? productForm.images[0] : ""}
                onChange={(e) => {
                  setProductForm({
                    ...productForm,
                    images: [e.target.value]
                  });
                }}
                required
                placeholder="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop"
                className="w-full bg-white border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#FF7A20] font-mono text-gray-700"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Provide a direct HTTP/HTTPS web address of the image asset.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">SKU Reference</label>
                <input
                  type="text"
                  name="sku"
                  value={productForm.sku}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <FolderEdit className="w-3.5 h-3.5 text-[#FF7A20]" />
                  <span>Category (The specific page to upload the product)</span>
                </label>
                <select
                  name="subcategory"
                  value={productForm.subcategory}
                  onChange={(e) => {
                    const subcat = e.target.value;
                    const cat = getCategoryForSubcategory(subcat);
                    setProductForm({
                      ...productForm,
                      subcategory: subcat,
                      category: cat
                    });
                  }}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none font-semibold text-gray-800"
                >
                  <option value="">-- Choose Target Page --</option>
                  {CATEGORY_SECTIONS.filter(s => s !== "All Products (Store Page)").map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Ex-Stock Qty</label>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none font-bold text-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Price (USD)</label>
                <input
                  type="number"
                  name="priceUSD"
                  value={productForm.priceUSD}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none font-mono font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Price (NGN)</label>
                <input
                  type="number"
                  name="priceNGN"
                  value={productForm.priceNGN}
                  onChange={handleFormInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none font-mono font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Detailed Product Specifications Summary</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleFormInputChange}
                required
                rows={3}
                placeholder="Describe deployment metrics and standards..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none font-sans"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg font-bold cursor-pointer"
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

      {/* CSV Bulk Product Import Modal */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative space-y-6 text-xs border border-gray-100">
            <button
              onClick={() => {
                setIsCsvModalOpen(false);
                setCsvPreview([]);
                setCsvImportMessage(null);
              }}
              className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-500 font-extrabold text-sm"
            >
              ×
            </button>

            <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>Massive Product CSV / Excel Bulk Upload</span>
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  Upload a CSV file containing hardware product records to enroll or update catalog items in bulk.
                </p>
              </div>

              <button
                onClick={handleDownloadCsvTemplate}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition cursor-pointer shrink-0"
              >
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            {/* Upload File Box */}
            <div className="bg-orange-50/40 border-2 border-dashed border-orange-200 rounded-2xl p-6 text-center space-y-3">
              <FileText className="w-8 h-8 text-[#FF7A20] mx-auto" />
              <div>
                <p className="font-bold text-gray-900 text-xs">Select your CSV File (.csv or .xlsx)</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Expected columns: SKU, Name, Brand, Category, Subcategory, PriceUSD, PriceNGN, IsQuoteOnly, Stock, Image, Description, ProductType</p>
              </div>

              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleCsvFileUpload}
                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#FF7A20] file:text-white hover:file:bg-[#e06816] cursor-pointer"
              />
            </div>

            {csvImportMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{csvImportMessage}</span>
              </div>
            )}

            {/* CSV Preview Table */}
            {csvPreview.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
                  Parsed Product Preview ({csvPreview.length} items found)
                </h4>

                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-gray-100 font-bold text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-2">SKU</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Price (USD)</th>
                        <th className="p-2">Price (NGN)</th>
                        <th className="p-2">Quote Only?</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Image Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {csvPreview.slice(0, 50).map((row: any, idx: number) => {
                        const isQuoteRaw = row.IsQuoteOnly ?? row.isQuoteOnly ?? row["Is Quote Only"] ?? row.RequestQuote ?? row["Request Quote"];
                        const isQuote = String(isQuoteRaw).toLowerCase() === "true" || String(isQuoteRaw) === "1" || isQuoteRaw === true || (Number(row.PriceUSD || row.priceUSD || 0) === 0 && Number(row.PriceNGN || row.priceNGN || 0) === 0);
                        const imgUrl = row.Image || row.image || row.Images || row.images || row["Image Link"] || row["Image URL"] || "No Image Link";

                        return (
                          <tr key={idx} className="hover:bg-gray-50 font-mono text-gray-800">
                            <td className="p-2 font-bold">{row.SKU || row.sku || `SP-HARDWARE-${idx}`}</td>
                            <td className="p-2 font-sans font-medium text-gray-900">{row.Name || row.name || "Hardware Model"}</td>
                            <td className="p-2 font-sans text-gray-600">{row.Category || row.category || "Electronic Security"}</td>
                            <td className="p-2">${row.PriceUSD || row.priceUSD || 0}</td>
                            <td className="p-2">₦{row.PriceNGN || row.priceNGN || 0}</td>
                            <td className="p-2 font-sans">
                              {isQuote ? (
                                <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">YES (Quote)</span>
                              ) : (
                                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">NO (Priced)</span>
                              )}
                            </td>
                            <td className="p-2 font-bold">{row.Stock || row.stock || 10}</td>
                            <td className="p-2 font-mono text-[10px] text-gray-500 max-w-[140px] truncate">{String(imgUrl)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[11px] text-gray-400">Products are added or updated matching SKUs</span>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCsvModalOpen(false);
                    setCsvPreview([]);
                    setCsvImportMessage(null);
                  }}
                  className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCsvImport}
                  disabled={csvPreview.length === 0 || csvUploading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-bold transition cursor-pointer disabled:opacity-50 flex items-center space-x-2"
                >
                  {csvUploading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm & Import All Products</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
