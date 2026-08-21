import React, { useState, useEffect, useRef } from "react";
import { Shield, Sun, Server, PhoneCall, Cpu, Network, Search, ShoppingCart, ArrowRight, X, User, ChevronDown, Coins } from "lucide-react";
import { Product, Category, UserSession, CartItem } from "../types";
import { safeFetch } from "../lib/dataService";

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  cart: CartItem[];
  compareList: Product[];
  currency: "USD" | "NGN";
  setCurrency: (currency: "USD" | "NGN") => void;
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  currentView,
  setCurrentView,
  setSelectedProductId,
  cart,
  compareList,
  currency,
  setCurrency,
  user,
  setUser,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [activeMobileSubcategory, setActiveMobileSubcategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const isAdminDashboard = currentView === "admin" && user && user.role === "admin";

  const handleNavigate = (view: string, clearSearch = true) => {
    if (clearSearch) {
      setSearchQuery("");
    }
    setCurrentView(view);
    setSelectedProductId(null);
  };

  // Auth Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authCompany, setAuthCompany] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);
    setAuthLoading(true);

    const url = authTab === "login" ? "/api/auth/login" : "/api/auth/signup";
    const payload = authTab === "login"
      ? { email: authEmail, password: authPassword }
      : { name: authName, email: authEmail, password: authPassword, companyName: authCompany };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthMessage({ type: "error", text: data.error || "Authentication failed" });
      } else {
        if (authTab === "signup") {
          setAuthMessage({ type: "success", text: data.message });
          setAuthName("");
          setAuthEmail("");
          setAuthPassword("");
          setAuthCompany("");
          setTimeout(() => {
            setAuthTab("login");
            setAuthMessage({ type: "success", text: "Registration complete! You can now log in with your email and password." });
          }, 3000);
        } else {
          setUser(data);
          localStorage.setItem("spinel_user", JSON.stringify(data));
          if (data.token) {
            localStorage.setItem("spinel_token", data.token);
          }
          setIsAuthModalOpen(false);
          if (data.role === "admin") {
            setCurrentView("admin");
          } else {
            setCurrentView("home");
          }
        }
      }
    } catch (err: any) {
      setAuthMessage({ type: "error", text: "Connection error: " + err.message });
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch quick search results from our Express backend
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      safeFetch(`/api/products?search=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(data => setSearchResults(data.slice(0, 5)))
        .catch(err => console.error("Search fetch failed", err));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle outside clicks to close search autocomplete
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchResultClick = (product: Product) => {
    setSelectedProductId(product.id);
    setCurrentView("product-details");
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      setCurrentView("store");
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("spinel_token");
    localStorage.removeItem("spinel_user");
    setCurrentView("home");
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-100 z-50 shadow-xs" id="main-header">
      {/* Main Navbar */}
      <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-3 flex items-center justify-between relative" id="navbar-container">
        {/* Logo Section (SVG mirroring orange/dark grey interlaced logo) */}
        <div
          onClick={() => handleNavigate("home")}
          className="flex flex-col items-start cursor-pointer group"
          id="brand-logo"
        >
          <div className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
              alt="Spinel Logo"
              referrerPolicy="no-referrer"
              className="w-18 h-18 object-contain rounded-[10px]"
            />
            <div className="flex flex-col">
              <span className="text-[#FF7A20] font-extrabold text-2xl sm:text-3xl tracking-tight leading-none">SPINEL</span>
              <span className="text-[#404040] font-bold text-xs tracking-[0.25em] leading-none mt-1">DISTRIBUTION</span>
            </div>
          </div>
        </div>

        {/* Global Instant Search Autocomplete Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-lg mx-8 relative" ref={searchRef} id="global-search-form">
          <input
            type="text"
            placeholder="Search ICT Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition-all"
            id="input-global-search"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-[#FF7A20]">
            <Search className="w-4 h-4" />
          </button>

          {/* Autocomplete Results Box */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-11 left-0 right-0 bg-white border border-gray-100 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 p-2" id="search-autocomplete-box">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-3 py-1.5 border-b border-gray-50">Instant Matches</div>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSearchResultClick(p)}
                  className="flex items-center p-3 hover:bg-orange-50/50 rounded-md cursor-pointer transition duration-150 border-b border-gray-50 last:border-0"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded bg-gray-50 border border-gray-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                    }}
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mt-0.5">
                      <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">{p.sku}</span>
                      <span className="font-bold text-[#FF7A20]">
                        {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div
                onClick={() => { setIsSearchFocused(false); handleNavigate("store", false); }}
                className="text-xs text-center text-[#FF7A20] font-semibold py-2 hover:bg-orange-50 rounded-md cursor-pointer mt-1"
              >
                Show all matching hardware →
              </div>
            </div>
          )}
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-base font-semibold text-gray-700" id="desktop-nav">
          <div
            className=""
            onMouseEnter={() => setIsProductsMenuOpen(true)}
            onMouseLeave={() => setIsProductsMenuOpen(false)}
          >
            <button className="hover:text-[#FF7A20] flex items-center space-x-1 py-2 cursor-pointer text-base font-semibold">
              <span>Products</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Products Mega Menu */}
            {isProductsMenuOpen && (
              <div className="absolute top-[75%] left-4 md:left-[100px] lg:left-[100px] right-4 md:right-[100px] lg:right-[100px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-6 grid grid-cols-5 gap-6 before:content-[''] before:absolute before:-top-6 before:left-0 before:right-0 before:h-6" id="products-mega-menu">
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Shield className="w-5 h-5 text-[#FF7A20]" />
                    <span>CCTV Surveillance</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("category-Box Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Box Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-Dome Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Dome Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-Bullet Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Bullet Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-PTZ Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">PTZ Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-Panoramic Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Panoramic Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-Thermal Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Thermal Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-Fisheye Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Fisheye Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-Camera Bundle"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Camera Bundle</button></li>
                    <li><button onClick={() => { handleNavigate("category-Multi-Sensor Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Multi-Sensor Camera</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Server className="w-5 h-5 text-[#FF7A20]" />
                    <span>Electrical Systems</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("category-Industrial Switches"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Industrial Switches</button></li>
                    <li><button onClick={() => { handleNavigate("category-Junction Box"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Junction Box</button></li>
                    <li><button onClick={() => { handleNavigate("category-Network Video Recorders"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Network Video Recorders</button></li>
                    <li><button onClick={() => { handleNavigate("category-Electrical Workstation"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Electrical Workstation</button></li>
                    <li><button onClick={() => { handleNavigate("category-UPS & PDU"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">UPS & PDU</button></li>
                    <li><button onClick={() => { handleNavigate("category-Hybrid Composite Cable"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Hybrid Composite Cable</button></li>
                    <li><button onClick={() => { handleNavigate("category-Accessories"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Accessories</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Sun className="w-5 h-5 text-[#FF7A20]" />
                    <span>Renewable Energy</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("category-Industrial Solar Panels"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Industrial Solar Panels</button></li>
                    <li><button onClick={() => { handleNavigate("category-Lithium LiFePO4 Batteries"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Lithium LiFePO4 Batteries</button></li>
                    <li><button onClick={() => { handleNavigate("category-Smart Hybrid Inverters"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Smart Hybrid Inverters</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Server className="w-5 h-5 text-[#FF7A20]" />
                    <span>Rack & Enclosures</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("category-Small Enclosures"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Small Enclosures</button></li>
                    <li><button onClick={() => { handleNavigate("category-IT Enclosures"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">IT Enclosures</button></li>
                    <li><button onClick={() => { handleNavigate("category-Wall-Mounted Enclosures"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Wall-Mounted Enclosures</button></li>
                    <li><button onClick={() => { handleNavigate("category-Server Racks"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Server Racks</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Server className="w-5 h-5 text-[#FF7A20]" />
                    <span>Ex-Proof Equipments</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("category-PAGA System"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">PAGA System</button></li>
                    <li><button onClick={() => { handleNavigate("category-Ex-CCTV Camera"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">Ex-CCTV Camera</button></li>
                    <li><button onClick={() => { handleNavigate("category-EX-Junction Box"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block text-left w-full cursor-pointer">EX-Junction Box</button></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsSolutionsMenuOpen(true)}
            onMouseLeave={() => setIsSolutionsMenuOpen(false)}
          >
            <button className="hover:text-[#FF7A20] flex items-center space-x-1 py-2 cursor-pointer text-base font-semibold">
              <span>Solutions</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Solutions Mega Menu */}
            {isSolutionsMenuOpen && (
              <div className="absolute top-10 left-0 w-88 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-5 space-y-4" id="solutions-mega-menu">
                <div
                  onClick={() => { handleNavigate("solution-security"); setIsSolutionsMenuOpen(false); }}
                  className="p-3 hover:bg-orange-50 rounded-lg cursor-pointer transition"
                >
                  <p className="text-base font-bold text-gray-900">Security Solutions</p>
                  <p className="text-sm text-gray-500 mt-0.5">CCTV, Access Control, Intrusion Detection, Fire Detection </p>
                </div>
                <div
                  onClick={() => { handleNavigate("solution-telecom"); setIsSolutionsMenuOpen(false); }}
                  className="p-3 hover:bg-orange-50 rounded-lg cursor-pointer transition"
                >
                  <p className="text-base font-bold text-gray-900">Telecommunication</p>
                  <p className="text-sm text-gray-500 mt-0.5">Wireless Solution, Microwave & Radio</p>
                </div>
                <div
                  onClick={() => { handleNavigate("solution-multimedia"); setIsSolutionsMenuOpen(false); }}
                  className="p-3 hover:bg-orange-50 rounded-lg cursor-pointer transition"
                >
                  <p className="text-base font-bold text-gray-900">Multimedia Solutions</p>
                  <p className="text-sm text-gray-500 mt-0.5">PAGA, Audio/Video Solution</p>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => handleNavigate("store")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold">Store</button>
          <button onClick={() => handleNavigate("oems")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold">OEMs</button>
          <button onClick={() => handleNavigate("about")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold">About</button>
          <button onClick={() => handleNavigate("contact")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold lg:mr-12">Contact</button>
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center ml-auto pl-2 sm:pl-4 space-x-2 sm:space-x-4 lg:space-x-6" id="header-actions">
          {/* Cart Icon Badge with Continuous Attention-Grabbing Slow Pulse */}
          <button
            onClick={() => setCurrentView("cart")}
            className="text-gray-700 hover:text-[#FF7A20] relative p-2 rounded-lg hover:bg-gray-100/80 transition duration-150 cursor-pointer mr-0.5 sm:mr-1 lg:-translate-x-5"
            id="btn-cart-view"
            title="View Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span
              className="absolute -top-1 -right-1 bg-[#FF7A20] text-white font-bold font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse"
              id="cart-item-count"
            >
              {totalCartItems}
            </span>
          </button>

          {/* User Account and Hamburger Menu closely grouped on mobile with 5px right offset */}
          <div className="flex items-center space-x-1 sm:space-x-2" id="user-mobile-nav-group">
            {/* User Account / SignIn Icon - Full Classic User Icon */}
            <button
              onClick={() => setCurrentView("account")}
              className={`relative p-2 rounded-lg transition duration-150 cursor-pointer translate-x-[5px] sm:translate-x-0 ${
                currentView === "account"
                  ? "text-[#FF7A20] bg-orange-50"
                  : "text-gray-700 hover:text-[#FF7A20] hover:bg-gray-100/80"
              }`}
              title={user ? `Account Profile (${user.name})` : "Sign In / Login"}
              id="btn-user-account"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              {user && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" id="user-active-badge" />
              )}
            </button>

            {/* Mobile Menu Icon with Equal Line Widths */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-800 p-2 rounded-lg hover:bg-gray-100 hover:text-[#FF7A20] transition cursor-pointer translate-x-[5px] sm:translate-x-0"
              id="btn-mobile-menu-toggle"
              title="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>

          {/* Request Quote Button - Always Displayed */}
          <button
            onClick={() => setCurrentView("request-quote")}
            className="hidden sm:inline-block bg-gray-900 text-white hover:bg-[#FF7A20] px-4 py-2 rounded-lg text-xs font-semibold transition duration-150 cursor-pointer shadow-xs"
            id="btn-nav-request-quote"
          >
            Request Quote
          </button>
        </div>
      </div>

      {/* Mobile Sticky Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl relative z-40 max-h-[80vh] overflow-y-auto" id="mobile-drawer">
          <form onSubmit={handleSearchSubmit} className="flex relative" id="mobile-search-form">
            <input
              type="text"
              placeholder="Search specifications, SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF7A20]"
            />
            <button type="submit" className="absolute right-2.5 top-2.5 text-gray-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <nav className="flex flex-col space-y-3 text-sm font-semibold text-gray-700">
            {/* Products Accordion */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="w-full text-left py-1.5 font-extrabold text-gray-900 hover:text-[#FF7A20] flex justify-between items-center"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transform transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isMobileProductsOpen && (
                <div className="pl-3 mt-2 space-y-3 border-l-2 border-orange-100 animate-fade-in text-xs">
                  {/* CCTV Surveillance Group */}
                  <div>
                    <button
                      onClick={() => setActiveMobileSubcategory(activeMobileSubcategory === "cctv" ? null : "cctv")}
                      className="w-full text-left py-1 font-bold text-gray-800 flex justify-between items-center hover:text-[#FF7A20]"
                    >
                      <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#FF7A20]" /> CCTV Surveillance</span>
                      <ChevronDown className={`w-3 h-3 transform transition-transform ${activeMobileSubcategory === "cctv" ? "rotate-180" : ""}`} />
                    </button>
                    {activeMobileSubcategory === "cctv" && (
                      <div className="pl-5 py-1 space-y-1.5 flex flex-col text-[11px] text-gray-500">
                        <button onClick={() => { handleNavigate("category-Box Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Box Camera</button>
                        <button onClick={() => { handleNavigate("category-Dome Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Dome Camera</button>
                        <button onClick={() => { handleNavigate("category-Bullet Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Bullet Camera</button>
                        <button onClick={() => { handleNavigate("category-PTZ Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">PTZ Camera</button>
                        <button onClick={() => { handleNavigate("category-Panoramic Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Panoramic Camera</button>
                        <button onClick={() => { handleNavigate("category-Thermal Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Thermal Camera</button>
                        <button onClick={() => { handleNavigate("category-Fisheye Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Fisheye Camera</button>
                        <button onClick={() => { handleNavigate("category-Camera Bundle"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Camera Bundle</button>
                        <button onClick={() => { handleNavigate("category-Multi-Sensor Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Multi-Sensor Camera</button>
                      </div>
                    )}
                  </div>

                  {/* Electrical Systems Group */}
                  <div>
                    <button
                      onClick={() => setActiveMobileSubcategory(activeMobileSubcategory === "electrical" ? null : "electrical")}
                      className="w-full text-left py-1 font-bold text-gray-800 flex justify-between items-center hover:text-[#FF7A20]"
                    >
                      <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-[#FF7A20]" /> Electrical Systems</span>
                      <ChevronDown className={`w-3 h-3 transform transition-transform ${activeMobileSubcategory === "electrical" ? "rotate-180" : ""}`} />
                    </button>
                    {activeMobileSubcategory === "electrical" && (
                      <div className="pl-5 py-1 space-y-1.5 flex flex-col text-[11px] text-gray-500">
                        <button onClick={() => { handleNavigate("category-Industrial Switches"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Industrial Switches</button>
                        <button onClick={() => { handleNavigate("category-Junction Box"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Junction Box</button>
                        <button onClick={() => { handleNavigate("category-Network Video Recorders"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Network Video Recorders</button>
                        <button onClick={() => { handleNavigate("category-Electrical Workstation"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Electrical Workstation</button>
                        <button onClick={() => { handleNavigate("category-UPS & PDU"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">UPS & PDU</button>
                        <button onClick={() => { handleNavigate("category-Hybrid Composite Cable"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Hybrid Composite Cable</button>
                        <button onClick={() => { handleNavigate("category-Accessories"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Accessories</button>
                      </div>
                    )}
                  </div>

                  {/* Renewable Energy Group */}
                  <div>
                    <button
                      onClick={() => setActiveMobileSubcategory(activeMobileSubcategory === "renewable" ? null : "renewable")}
                      className="w-full text-left py-1 font-bold text-gray-800 flex justify-between items-center hover:text-[#FF7A20]"
                    >
                      <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-[#FF7A20]" /> Renewable Energy</span>
                      <ChevronDown className={`w-3 h-3 transform transition-transform ${activeMobileSubcategory === "renewable" ? "rotate-180" : ""}`} />
                    </button>
                    {activeMobileSubcategory === "renewable" && (
                      <div className="pl-5 py-1 space-y-1.5 flex flex-col text-[11px] text-gray-500">
                        <button onClick={() => { handleNavigate("category-Industrial Solar Panels"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Industrial Solar Panels</button>
                        <button onClick={() => { handleNavigate("category-Lithium LiFePO4 Batteries"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Lithium LiFePO4 Batteries</button>
                        <button onClick={() => { handleNavigate("category-Smart Hybrid Inverters"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Smart Hybrid Inverters</button>
                      </div>
                    )}
                  </div>

                  {/* Rack & Enclosures Group */}
                  <div>
                    <button
                      onClick={() => setActiveMobileSubcategory(activeMobileSubcategory === "racks" ? null : "racks")}
                      className="w-full text-left py-1 font-bold text-gray-800 flex justify-between items-center hover:text-[#FF7A20]"
                    >
                      <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-[#FF7A20]" /> Rack & Enclosures</span>
                      <ChevronDown className={`w-3 h-3 transform transition-transform ${activeMobileSubcategory === "racks" ? "rotate-180" : ""}`} />
                    </button>
                    {activeMobileSubcategory === "racks" && (
                      <div className="pl-5 py-1 space-y-1.5 flex flex-col text-[11px] text-gray-500">
                        <button onClick={() => { handleNavigate("category-Small Enclosures"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Small Enclosures</button>
                        <button onClick={() => { handleNavigate("category-IT Enclosures"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">IT Enclosures</button>
                        <button onClick={() => { handleNavigate("category-Wall-Mounted Enclosures"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Wall-Mounted Enclosures</button>
                        <button onClick={() => { handleNavigate("category-Server Racks"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Server Racks</button>
                      </div>
                    )}
                  </div>

                  {/* Ex-Proof Equipments Group */}
                  <div>
                    <button
                      onClick={() => setActiveMobileSubcategory(activeMobileSubcategory === "exproof" ? null : "exproof")}
                      className="w-full text-left py-1 font-bold text-gray-800 flex justify-between items-center hover:text-[#FF7A20]"
                    >
                      <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#FF7A20]" /> Ex-Proof Equipments</span>
                      <ChevronDown className={`w-3 h-3 transform transition-transform ${activeMobileSubcategory === "exproof" ? "rotate-180" : ""}`} />
                    </button>
                    {activeMobileSubcategory === "exproof" && (
                      <div className="pl-5 py-1 space-y-1.5 flex flex-col text-[11px] text-gray-500">
                        <button onClick={() => { handleNavigate("category-PAGA System"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">PAGA System</button>
                        <button onClick={() => { handleNavigate("category-Ex-CCTV Camera"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Ex-CCTV Camera</button>
                        <button onClick={() => { handleNavigate("category-EX-Junction Box"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">EX-Junction Box</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Accordion */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                className="w-full text-left py-1.5 font-extrabold text-gray-900 hover:text-[#FF7A20] flex justify-between items-center"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transform transition-transform ${isMobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isMobileSolutionsOpen && (
                <div className="pl-3 mt-2 space-y-2 border-l-2 border-orange-100 animate-fade-in text-xs">
                  <button onClick={() => { handleNavigate("solution-security"); setIsMobileMenuOpen(false); }} className="text-left w-full py-1 text-gray-600 hover:text-[#FF7A20] block font-semibold">Security Solutions</button>
                  <button onClick={() => { handleNavigate("solution-telecom"); setIsMobileMenuOpen(false); }} className="text-left w-full py-1 text-gray-600 hover:text-[#FF7A20] block font-semibold">Telecommunication</button>
                  <button onClick={() => { handleNavigate("solution-multimedia"); setIsMobileMenuOpen(false); }} className="text-left w-full py-1 text-gray-600 hover:text-[#FF7A20] block font-semibold">Multimedia Solutions</button>
                </div>
              )}
            </div>

            {/* Hardware Store direct link */}
            <button onClick={() => { handleNavigate("store"); setIsMobileMenuOpen(false); }} className="text-left py-1.5 font-bold hover:text-[#FF7A20] border-b border-gray-100 pb-2">Catalog Store</button>
            <button onClick={() => { handleNavigate("oems"); setIsMobileMenuOpen(false); }} className="text-left py-1.5 font-bold hover:text-[#FF7A20] border-b border-gray-100 pb-2">Our OEMs</button>
            <button onClick={() => { handleNavigate("about"); setIsMobileMenuOpen(false); }} className="text-left py-1.5 font-bold hover:text-[#FF7A20] border-b border-gray-100 pb-2">About Us</button>
            <button onClick={() => { handleNavigate("contact"); setIsMobileMenuOpen(false); }} className="text-left py-1.5 font-bold hover:text-[#FF7A20] border-b border-gray-100 pb-2">Contact Us</button>
            {!isAdminDashboard && (
              <button onClick={() => { handleNavigate("request-quote"); setIsMobileMenuOpen(false); }} className="text-left text-[#FF7A20] py-1.5 font-bold">Request Quote</button>
            )}
          </nav>
        </div>
      )}

      {/* Beautiful unified Signup/Login Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4 animate-fade-in" id="auth-modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden relative" id="auth-modal-box">
            {/* Close button */}
            <button 
              onClick={() => { setIsAuthModalOpen(false); setAuthMessage(null); }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
              id="btn-close-auth-modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo and title */}
            <div className="p-6 pb-4 text-center border-b border-gray-50 bg-gray-50/50">
              <img
                src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
                alt="Spinel Only Logo"
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-contain rounded-md mx-auto border border-gray-100 shadow-xs mb-3"
              />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Spinel Authorized Portal</h2>
              <p className="text-[10px] text-gray-400 mt-1">Enterprise Hardware Distribution & Procurement Network</p>
            </div>

            {/* Tab selector */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => { setAuthTab("login"); setAuthMessage(null); }}
                className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${authTab === "login" ? "border-[#FF7A20] text-[#FF7A20]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                id="btn-tab-login"
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthTab("signup"); setAuthMessage(null); }}
                className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${authTab === "signup" ? "border-[#FF7A20] text-[#FF7A20]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                id="btn-tab-signup"
              >
                Register Account
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4 text-xs">
              {authMessage && (
                <div className={`p-3 rounded-xl border leading-normal ${authMessage.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"}`} id="auth-alert">
                  <p className="font-semibold text-[10px] uppercase tracking-wider mb-0.5">{authMessage.type === "success" ? "Success Notification" : "Authentication Alert"}</p>
                  <p className="text-[11px]">{authMessage.text}</p>
                </div>
              )}

              {authTab === "signup" && (
                <>
                  <div className="space-y-1">
                    <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Full Representative Name</label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g. Engr. Kola Tubosun"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                      id="input-auth-name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Corporate Company (Optional)</label>
                    <input
                      type="text"
                      value={authCompany}
                      onChange={(e) => setAuthCompany(e.target.value)}
                      placeholder="e.g. Nigeria Telecoms Ltd"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                      id="input-auth-company"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Enterprise Email ID</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="e.g. kola@telecoms.ng"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                  id="input-auth-email"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Secure Password</label>
                  {authTab === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAuthModalOpen(false);
                        setCurrentView("forgot-password");
                      }}
                      className="text-[10px] font-bold text-[#FF7A20] hover:underline cursor-pointer"
                      id="btn-modal-forgot-password"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                  id="input-auth-password"
                />
              </div>

              {authTab === "signup" && (
                <div className="text-[10px] text-gray-500 bg-orange-50/70 p-2.5 rounded-lg leading-normal flex items-start gap-2 border border-orange-100">
                  <span className="text-[#FF7A20] font-bold text-xs">✓</span>
                  <span><strong>Instant Portal Access:</strong> Your account is registered securely with our distribution network. You can immediately access your account and checkout after registration.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-gray-900 text-white hover:bg-[#FF7A20] py-3 rounded-xl font-bold uppercase tracking-wider transition disabled:opacity-50 cursor-pointer shadow-md mt-2 flex items-center justify-center space-x-2"
                id="btn-auth-submit"
              >
                {authLoading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>{authTab === "login" ? "Sign In to Portal" : "Submit & Register"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {authTab === "login" && (
                <div className="text-[10px] text-center text-gray-400 mt-2">
                  <p><strong>Demo customer credentials:</strong> <span className="text-[#FF7A20] font-semibold font-mono bg-orange-50 px-1 py-0.5 rounded">customer@spineldistribution.com</span> / <span className="font-semibold font-mono bg-orange-50 px-1 py-0.5 rounded text-gray-600">password123</span></p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
