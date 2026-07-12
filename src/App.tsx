import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Store from "./pages/Store";
import Oems from "./pages/Oems";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import RequestQuote from "./pages/RequestQuote";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ThankYou from "./pages/ThankYou";
import AdminDashboard from "./pages/AdminDashboard";

import { Product, CartItem, UserSession } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.endsWith("/admin") || hash === "#admin" || hash.endsWith("/admin") || hash.includes("admin")) {
        return "admin";
      }
    }
    return "home";
  });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Local storage persisted shopping cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const cached = localStorage.getItem("spinel_cart");
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      console.error("Failed to parse cart state", e);
      return [];
    }
  });

  // Compare specifications list
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Listen to popstate or route changes if needed
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.endsWith("/admin") || hash === "#admin" || hash.endsWith("/admin") || hash.includes("admin")) {
        setCurrentView("admin");
      } else {
        // Only reset to home if currently viewing admin (other views are virtual in-memory)
        setCurrentView(prev => (prev === "admin" ? "home" : prev));
      }
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  // Sync currentView changes to URL to support manual navigation back and forth cleanly
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isGitHubPages = window.location.hostname.endsWith("github.io") || window.location.pathname.split("/").filter(Boolean).length > 1;
    const currentPath = window.location.pathname;
    const endsWithAdmin = currentPath.toLowerCase().endsWith("/admin");

    if (currentView === "admin") {
      if (isGitHubPages) {
        // Under subdirectories or GitHub Pages, use hash-routing to prevent 404s on browser reload
        if (window.location.hash !== "#admin") {
          window.location.hash = "admin";
        }
      } else {
        // For clean-URL platforms like Vercel or localhost, push /admin path
        if (!endsWithAdmin) {
          const base = currentPath.endsWith("/") ? currentPath.slice(0, -1) : currentPath;
          window.history.pushState(null, "", base + "/admin");
        }
      }
    } else {
      if (isGitHubPages) {
        if (window.location.hash === "#admin" || window.location.hash === "admin") {
          window.location.hash = "";
        }
      } else {
        if (endsWithAdmin) {
          const base = currentPath.substring(0, currentPath.length - 6);
          window.history.pushState(null, "", base || "/");
        }
      }
    }
  }, [currentView]);

  // Persistent currency state
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");

  // Persistent session states
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const cached = localStorage.getItem("spinel_user");
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      console.error("Failed to parse user session", e);
      return null;
    }
  });

  // Completed invoice parameters holding
  const [lastOrderDetails, setLastOrderDetails] = useState<any | null>(null);

  // Sync cart adjustments to cache storage
  useEffect(() => {
    localStorage.setItem("spinel_cart", JSON.stringify(cart));
  }, [cart]);

  // Global Cart Manipulation helpers
  const handleAddToCart = (product: Product, quantity = 1) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity }]);
    }
    alert(`Added: "${product.name}" to your Quote Cart.`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-text selection:bg-orange-100 selection:text-[#FF7A20]" id="app-root">
      {/* 1. Global Navigation Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        setSelectedProductId={setSelectedProductId}
        cart={cart}
        compareList={compareList}
        currency={currency}
        setCurrency={setCurrency}
        user={user}
        setUser={setUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Primary Page Router Stage */}
      <main className="flex-1">
        {currentView === "home" && (
          <Home
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
            currency={currency}
            addToCart={handleAddToCart}
          />
        )}

        {currentView === "store" && (
          <Store
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
            currency={currency}
            addToCart={handleAddToCart}
            compareList={compareList}
            setCompareList={setCompareList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === "oems" && (
          <Oems
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "product-details" && selectedProductId && (
          <ProductDetails
            productId={selectedProductId}
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
            currency={currency}
            addToCart={handleAddToCart}
          />
        )}

        {currentView === "cart" && (
          <Cart
            cart={cart}
            setCart={setCart}
            currency={currency}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "checkout" && (
          <Checkout
            cart={cart}
            setCart={setCart}
            currency={currency}
            user={user}
            setCurrentView={setCurrentView}
            setLastOrderDetails={setLastOrderDetails}
          />
        )}

        {currentView === "request-quote" && (
          <RequestQuote
            currency={currency}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "contact" && (
          <Contact />
        )}

        {currentView === "about" && (
          <About />
        )}

        {currentView === "thank-you" && lastOrderDetails && (
          <ThankYou
            orderDetails={lastOrderDetails}
            currency={currency}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "admin" && (
          <AdminDashboard
            user={user}
            setUser={setUser}
            currency={currency}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      {/* 3. Brand Regulatory Footer */}
      <Footer
        currentView={currentView}
        setCurrentView={setCurrentView}
        currency={currency}
        setCurrency={setCurrency}
      />
    </div>
  );
}
