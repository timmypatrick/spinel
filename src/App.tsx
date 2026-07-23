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
import CategoryPage from "./pages/CategoryPage";

import { Product, CartItem, UserSession } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const isCleanAdmin = path === "/admin" || path === "/admin/" || path.endsWith("/admin") || path.endsWith("/admin/") || path.includes("/admin");
      const isHashAdmin = hash === "#admin" || hash === "admin" || hash.includes("admin");
      if (isCleanAdmin || isHashAdmin) {
        return "admin";
      }
    }
    return "home";
  });

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
  const [quotePrefill, setQuotePrefill] = useState<{ productName: string; sku: string } | null>(null);

  const handleRequestQuote = (product?: Product) => {
    if (product) {
      setQuotePrefill({ productName: product.name || "", sku: product.sku || "" });
    } else {
      setQuotePrefill(null);
    }
    setCurrentView("request-quote");
  };

  // Listen to popstate or route changes if needed
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const isCleanAdmin = path === "/admin" || path === "/admin/" || path.endsWith("/admin") || path.endsWith("/admin/") || path.includes("/admin");
      const isHashAdmin = hash === "#admin" || hash === "admin" || hash.includes("admin");
      if (isCleanAdmin || isHashAdmin) {
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

  // Sync currentView changes and user auth state to URL to support manual navigation, bookmarks, and refresh
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname.toLowerCase();
    const isAdminView = currentView === "admin";
    const isLoggedIn = user && user.role === "admin";

    if (isAdminView) {
      if (isLoggedIn) {
        // Admin is logged in, path should be /admin/dashboard
        if (currentPath !== "/admin/dashboard" && currentPath !== "/admin/dashboard/") {
          window.history.pushState(null, "", "/admin/dashboard");
        }
      } else {
        // Admin is not logged in, path should be /admin
        if (currentPath !== "/admin" && currentPath !== "/admin/") {
          window.history.pushState(null, "", "/admin");
        }
      }
    } else {
      // Non-admin virtual view. If the URL contains /admin, reset to root /
      if (currentPath.includes("/admin")) {
        window.history.pushState(null, "", "/");
      }
    }
  }, [currentView, user]);

  // Persistent currency state
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");

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
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans select-text selection:bg-orange-100 selection:text-[#FF7A20]" id="app-root">
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
            onRequestQuote={handleRequestQuote}
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
            onRequestQuote={handleRequestQuote}
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
            quotePrefill={quotePrefill}
          />
        )}

        {currentView === "contact" && (
          <Contact />
        )}

        {currentView === "about" && (
          <About setCurrentView={setCurrentView} />
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

        {currentView.startsWith("category-") && (
          <CategoryPage
            subcategoryName={currentView.substring(9)}
            currency={currency}
            addToCart={handleAddToCart}
            setSelectedProductId={setSelectedProductId}
            setCurrentView={setCurrentView}
            onRequestQuote={handleRequestQuote}
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
