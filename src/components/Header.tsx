import React, { useState, useEffect, useRef } from "react";
import { Shield, Sun, Server, PhoneCall, Cpu, Network, Search, ShoppingCart, ArrowRight, Menu, X, User, ChevronDown, Check, Coins } from "lucide-react";
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
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
            setAuthMessage({ type: "success", text: "You can now log in. Standalone email confirmation has been sent/simulated." });
          }, 4500);
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
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs" id="main-header">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between" id="navbar-container">
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
            placeholder="Search enterprise ICT hardware by brand, specs or SKU..."
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
                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded bg-gray-50 border border-gray-100" referrerPolicy="no-referrer" />
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
            className="relative"
            onMouseEnter={() => setIsProductsMenuOpen(true)}
            onMouseLeave={() => setIsProductsMenuOpen(false)}
          >
            <button className="hover:text-[#FF7A20] flex items-center space-x-1 py-2 cursor-pointer text-base font-semibold">
              <span>Products</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Products Mega Menu */}
            {isProductsMenuOpen && (
              <div className="absolute top-10 left-[60%] -translate-x-1/2 w-[1200px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-5 grid grid-cols-5 gap-5" id="products-mega-menu">
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Shield className="w-5 h-5 text-[#FF7A20]" />
                    <span>CCTV Surveillance</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Box Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Dome Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Bullet Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">PTZ Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Panoramic Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Thermal Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Fisheye Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Multi-Sensor Camera</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Server className="w-5 h-5 text-[#FF7A20]" />
                    <span>Electrical Systems</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Industrial Switches</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Junction Box</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Network Video Recorders</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Electrical Workstation</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">UPS & PDU</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">PAGA System</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Hybrid Composite Cable</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Sun className="w-5 h-5 text-[#FF7A20]" />
                    <span>Renewable Energy</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Industrial Solar Panels</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Lithium LiFePO4 Batteries</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Smart Hybrid Inverters</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Server className="w-5 h-5 text-[#FF7A20]" />
                    <span>Rack & Enclosures</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Small Enclosures</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">IT Enclosures</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Wall-Mounted Enclosures</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Server Racks</button></li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-3">
                    <Server className="w-5 h-5 text-[#FF7A20]" />
                    <span>Ex-Proof Equipments</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">EX-Telephone</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Ex-Sounder</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">Ex-CCTV Camera</button></li>
                    <li><button onClick={() => { handleNavigate("store"); setIsProductsMenuOpen(false); }} className="hover:text-[#FF7A20] py-1 block">EX-Junction Box</button></li>
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
                  onClick={() => { handleNavigate("about"); setIsSolutionsMenuOpen(false); }}
                  className="p-3 hover:bg-orange-50 rounded-lg cursor-pointer transition"
                >
                  <p className="text-sm font-bold text-gray-900">Security Solutions</p>
                  <p className="text-xs text-gray-500 mt-0.5">CCTV, Access Control, Intrusion Detection, Fire Detection </p>
                </div>
                <div
                  onClick={() => { handleNavigate("about"); setIsSolutionsMenuOpen(false); }}
                  className="p-3 hover:bg-orange-50 rounded-lg cursor-pointer transition"
                >
                  <p className="text-sm font-bold text-gray-900">Telecommunication</p>
                  <p className="text-xs text-gray-500 mt-0.5">Wireless Solution, Microwave & Radio</p>
                </div>
                <div
                  onClick={() => { handleNavigate("about"); setIsSolutionsMenuOpen(false); }}
                  className="p-3 hover:bg-orange-50 rounded-lg cursor-pointer transition"
                >
                  <p className="text-sm font-bold text-gray-900">Multimedia Solutions</p>
                  <p className="text-xs text-gray-500 mt-0.5">PAGA, Audio/Video Solution</p>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => handleNavigate("store")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold">Store</button>
          <button onClick={() => handleNavigate("oems")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold">OEMs</button>
          <button onClick={() => handleNavigate("about")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold">About</button>
          <button onClick={() => handleNavigate("contact")} className="hover:text-[#FF7A20] cursor-pointer text-base font-semibold">Contact</button>
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-4" id="header-actions">
          {/* Compare list link */}
          {compareList.length > 0 && (
            <button
              onClick={() => setCurrentView("store")}
              className="text-gray-500 hover:text-[#FF7A20] text-xs font-semibold hidden md:flex items-center space-x-1"
              title="Compare selected products"
              id="compare-badge"
            >
              <Check className="w-4 h-4 text-[#FF7A20]" />
              <span>Compare ({compareList.length})</span>
            </button>
          )}

          {/* Cart Icon Badge */}
          <button
            onClick={() => setCurrentView("cart")}
            className="text-gray-600 hover:text-[#FF7A20] relative p-1.5 transition duration-150 cursor-pointer"
            id="btn-cart-view"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF7A20] text-white font-bold font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse" id="cart-item-count">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Request Quote Button */}
          <button
            onClick={() => setCurrentView("request-quote")}
            className="hidden sm:inline-block bg-gray-900 text-white hover:bg-[#FF7A20] px-4 py-2 rounded-lg text-xs font-semibold transition duration-150 cursor-pointer shadow-xs"
            id="btn-nav-request-quote"
          >
            Request Quote
          </button>

          {/* User Account / Auth Trigger */}
          {user ? (
            <div className="flex items-center space-x-2 border-l border-gray-100 pl-4" id="user-profile-menu">
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-gray-900 truncate max-w-28">{user.name}</span>
                {user.role === "admin" && (
                  <button
                    onClick={() => handleNavigate("admin")}
                    className="text-[9px] text-[#FF7A20] font-bold uppercase hover:underline"
                    id="btn-go-admin"
                  >
                    Admin Cockpit
                  </button>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-400 hover:text-[#FF7A20] p-1.5"
                title="Sign Out"
                id="btn-logout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : null}

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-600 p-1.5 hover:text-[#FF7A20]"
            id="btn-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sticky Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl relative z-40" id="mobile-drawer">
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
            <button onClick={() => { handleNavigate("store"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Hardware Store</button>
            <button onClick={() => { handleNavigate("oems"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">OEMs</button>
            <button onClick={() => { handleNavigate("about"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Engineering Solutions</button>
            <button onClick={() => { handleNavigate("about"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">About Company</button>
            <button onClick={() => { handleNavigate("contact"); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#FF7A20]">Contact Hub</button>
            <button onClick={() => { handleNavigate("request-quote"); setIsMobileMenuOpen(false); }} className="text-left text-[#FF7A20] py-1">Request Quote Forms</button>
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
                <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Secure Password</label>
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
                <div className="text-[10px] text-gray-400 bg-orange-50/50 p-2 rounded-lg leading-normal flex items-start gap-2 border border-orange-100/30">
                  <span className="text-[#FF7A20] font-bold text-xs">✉</span>
                  <span><strong>Email Authentication Required:</strong> Every saved signup is registered via Supabase Authentication. A verification trigger will require verifying your email address before logging in.</span>
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
