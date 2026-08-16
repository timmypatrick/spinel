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
import Invoice from "./pages/Invoice";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryPage from "./pages/CategoryPage";
import SecuritySolutions from "./pages/SecuritySolutions";
import TelecomSolutions from "./pages/TelecomSolutions";
import MultimediaSolutions from "./pages/MultimediaSolutions";
import AccountPage from "./pages/AccountPage";

import { Product, CartItem, UserSession } from "./types";

// Route path mapping helper functions
function getPathForView(view: string, productId?: string | null): string {
  if (view === "home") return "/";
  if (view === "store") return "/store";
  if (view === "oems") return "/oems";
  if (view === "product-details" && productId) return `/product/${encodeURIComponent(productId)}`;
  if (view === "cart") return "/cart";
  if (view === "checkout") return "/checkout";
  if (view === "request-quote") return "/request-quote";
  if (view === "contact") return "/contact";
  if (view === "about") return "/about";
  if (view === "solution-security") return "/solutions/security";
  if (view === "solution-telecom") return "/solutions/telecom";
  if (view === "solution-multimedia") return "/solutions/multimedia";
  if (view === "invoice" || view === "thank-you") return "/invoice";
  if (view === "admin") return "/admin";
  if (view === "account") return "/account";
  if (view.startsWith("category-")) return `/category/${encodeURIComponent(view.substring(9))}`;
  return "/";
}

function getViewForPath(pathname: string, search: string, hash: string): { view: string; productId: string | null } {
  const path = pathname.toLowerCase().replace(/\/$/, "") || "/";
  const params = new URLSearchParams(search);

  const isCleanAdmin = path === "/admin" || path === "/admin/dashboard" || path.startsWith("/admin");
  const isHashAdmin = hash === "#admin" || hash === "admin" || hash.includes("admin");
  if (isCleanAdmin || isHashAdmin) {
    return { view: "admin", productId: null };
  }

  if (path === "" || path === "/") return { view: "home", productId: null };
  if (path === "/store") return { view: "store", productId: null };
  if (path === "/oems") return { view: "oems", productId: null };
  if (path === "/cart") return { view: "cart", productId: null };
  if (path === "/checkout") return { view: "checkout", productId: null };
  if (path === "/request-quote") return { view: "request-quote", productId: null };
  if (path === "/contact") return { view: "contact", productId: null };
  if (path === "/about") return { view: "about", productId: null };
  if (path === "/solutions/security" || path === "/security") return { view: "solution-security", productId: null };
  if (path === "/solutions/telecom" || path === "/telecom") return { view: "solution-telecom", productId: null };
  if (path === "/solutions/multimedia" || path === "/multimedia") return { view: "solution-multimedia", productId: null };
  if (path === "/invoice" || path === "/thank-you" || path === "/thankyou") return { view: "invoice", productId: null };
  if (path === "/account" || path === "/login" || path === "/signup" || path === "/forgot-password") return { view: "account", productId: null };

  if (path.startsWith("/product/")) {
    const rawId = pathname.substring(9);
    const prodId = decodeURIComponent(rawId);
    return { view: "product-details", productId: prodId };
  }

  if (path.startsWith("/category/")) {
    const rawSub = pathname.substring(10);
    const sub = decodeURIComponent(rawSub);
    return { view: `category-${sub}`, productId: null };
  }

  if (params.get("product")) {
    return { view: "product-details", productId: params.get("product") };
  }

  return { view: "home", productId: null };
}

export default function App() {
  // Initialize route from current window URL
  const initialRoute = typeof window !== "undefined"
    ? getViewForPath(window.location.pathname, window.location.search, window.location.hash)
    : { view: "home", productId: null };

  const [currentView, setCurrentViewInternal] = useState<string>(initialRoute.view);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(initialRoute.productId);

  // Wrapper setter that forces scroll-to-top on navigation
  const setCurrentView = (viewOrFn: string | ((prev: string) => string)) => {
    setCurrentViewInternal(prev => {
      const nextView = typeof viewOrFn === "function" ? viewOrFn(prev) : viewOrFn;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      return nextView;
    });
  };

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

  // Listen for browser Back/Forward navigation (popstate & hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getViewForPath(window.location.pathname, window.location.search, window.location.hash);
      setCurrentViewInternal(route.view);
      setSelectedProductId(route.productId);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  // Sync currentView and selectedProductId changes to browser URL history & scroll to top
  useEffect(() => {
    if (typeof window === "undefined") return;

    let targetPath = getPathForView(currentView, selectedProductId);

    if (currentView === "admin") {
      if (user && user.role === "admin") {
        targetPath = "/admin/dashboard";
      } else {
        targetPath = "/admin";
      }
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: currentView, productId: selectedProductId }, "", targetPath);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentView, selectedProductId, user]);

  // Persistent currency state
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");

  // Completed invoice parameters holding with localStorage cache
  const [lastOrderDetails, setLastOrderDetailsState] = useState<any | null>(() => {
    try {
      const cached = localStorage.getItem("spinel_last_order");
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      console.error("Failed to parse cached last order details", e);
      return null;
    }
  });

  const setLastOrderDetails = (details: any) => {
    setLastOrderDetailsState(details);
    if (details) {
      try {
        localStorage.setItem("spinel_last_order", JSON.stringify(details));
      } catch (e) {
        console.error("Failed to save last order details", e);
      }
    } else {
      try {
        localStorage.removeItem("spinel_last_order");
      } catch (e) {
        // ignore
      }
    }
  };

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
      <main className="flex-1 pt-24 sm:pt-[96px]">
        {currentView === "home" && (
          <Home
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
            currency={currency}
            addToCart={handleAddToCart}
            onRequestQuote={handleRequestQuote}
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

        {currentView === "solution-security" && (
          <SecuritySolutions
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
            addToCart={handleAddToCart}
            currency={currency}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentView === "solution-telecom" && (
          <TelecomSolutions
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
            addToCart={handleAddToCart}
            currency={currency}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentView === "solution-multimedia" && (
          <MultimediaSolutions
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
            addToCart={handleAddToCart}
            currency={currency}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {(currentView === "invoice" || currentView === "thank-you") && (
          <Invoice
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

        {currentView === "account" && (
          <AccountPage
            user={user}
            setUser={setUser}
            currency={currency}
            setCurrentView={setCurrentView}
            setSelectedProductId={setSelectedProductId}
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
