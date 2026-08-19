import React, { useState, useEffect } from "react";
import { Check, ShieldCheck, CreditCard, ArrowRight, ShieldAlert, FileText } from "lucide-react";
import { Product, CartItem, UserSession } from "../types";

interface CheckoutProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  currency: "USD" | "NGN";
  user: UserSession | null;
  setCurrentView: (view: string) => void;
  setLastOrderDetails: (details: any) => void;
}

export default function Checkout({
  cart,
  setCart,
  currency,
  user,
  setCurrentView,
  setLastOrderDetails
}: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    state: "Lagos",
    country: "Nigeria"
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "bank-transfer">("paystack");
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      setCurrentView("store");
    }

    // Load Paystack Inline script dynamically
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [cart]);

  // Subtotal values (VAT and Logistics removed per request)
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const subtotalNGN = cart.reduce((acc, item) => acc + item.product.priceNGN * item.quantity, 0);

  const totalUSD = subtotalUSD;
  const totalNGN = subtotalNGN;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      shippingDetails: formData,
      paymentMethod,
      currency
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("spinel_token") || ""
        },
        body: JSON.stringify(orderPayload)
      });

      if (!res.ok) {
        throw new Error("Failed to register order");
      }

      const orderData = await res.json();
      const now = new Date();

      const createdOrderObj = {
        id: orderData.orderId || orderData.id,
        orderNumber: orderData.invoiceNumber || orderData.orderNumber || orderData.id,
        invoiceNumber: orderData.invoiceNumber || orderData.orderNumber,
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }),
        customerName: formData.name,
        customerEmail: formData.email,
        shippingAddress: {
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.address,
          city: formData.state,
          state: formData.state,
          country: formData.country
        },
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          sku: item.product.sku,
          quantity: item.quantity,
          priceUSD: item.product.priceUSD,
          priceNGN: item.product.priceNGN,
          images: item.product.images
        })),
        totalUSD: totalUSD,
        totalNGN: totalNGN,
        status: "Pending",
        paymentMethod: (paymentMethod === "paystack" ? "Paystack" : "Bank Transfer"),
        paymentReference: orderData.paymentReference || orderData.invoiceNumber
      };

      // Set the order details so the ThankYou view can render details
      setLastOrderDetails({
        ...createdOrderObj,
        shippingDetails: formData,
        currency,
        items: cart,
        totalUSD,
        totalNGN,
        total: currency === "USD" ? totalUSD : totalNGN
      });

      // Automatically store in account profile if user is logged in or provides email
      if (formData.email) {
        try {
          const { saveOrderToAccount } = await import("../lib/supabase");
          saveOrderToAccount(createdOrderObj, formData.email);
        } catch (e) {
          console.warn("Error saving order to user account:", e);
        }
      }

      // Clear Shopping Cart on success
      setCart([]);

      if (paymentMethod === "paystack") {
        // Initialize Paystack checkout transaction with server API to navigate directly to user's payment portal
        try {
          const paystackInit = await fetch("/api/paystack/initialize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              amount: currency === "USD" ? totalUSD : totalNGN,
              currency: currency,
              reference: orderData.invoiceNumber,
              callback_url: `${window.location.origin}/invoice?reference=${encodeURIComponent(orderData.invoiceNumber)}&orderId=${encodeURIComponent(orderData.id || orderData.orderId || "")}`,
              metadata: {
                custom_fields: [
                  { display_name: "Customer Name", variable_name: "customer_name", value: formData.name },
                  { display_name: "Phone Number", variable_name: "phone_number", value: formData.phone },
                  { display_name: "Delivery Address", variable_name: "address", value: `${formData.address}, ${formData.state}` }
                ]
              }
            })
          });

          const initData = await paystackInit.json();
          if (initData.success && initData.authorization_url) {
            window.location.href = initData.authorization_url;
            return;
          }
        } catch (pErr) {
          console.warn("Paystack initialize endpoint error, using inline fallback:", pErr);
        }

        // Inline SDK fallback or popup
        const paystackPublicKey = (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || "";
        if (paystackPublicKey && (window as any).PaystackPop) {
          const handler = (window as any).PaystackPop.setup({
            key: paystackPublicKey,
            email: formData.email,
            amount: Math.round((currency === "USD" ? totalUSD : totalNGN) * 100),
            currency: currency,
            ref: orderData.invoiceNumber,
            callback: function () {
              setCurrentView("invoice");
            },
            onClose: function () {
              setCurrentView("invoice");
            }
          });
          handler.openIframe();
        } else {
          // Navigates to Invoice view with pending payment instructions when public key is not set
          setCurrentView("invoice");
        }
      } else {
        setCurrentView("invoice");
      }

    } catch (err: any) {
      console.error("Order completion failed", err);
      alert("Mainframe failed to process checkout. Please verify shipping credentials or try Bank Wire Option.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-12 space-y-10" id="checkout-view">
      <div className="flex items-center space-x-3">
        <CreditCard className="w-6 h-6 text-[#FF7A20]" />
        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Order Checkout ⭐</h1>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column Shipping Information (Cols 7) */}
        <div className="lg:col-span-7 space-y-8" id="checkout-form-container">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">1. Delivery Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex flex-col space-y-1.5 col-span-1 md:col-span-2 text-left">
                <label className="block text-gray-700 font-semibold text-xs sm:text-sm text-left">Representative Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Name In Full..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A20] focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col space-y-1.5 col-span-1 text-left">
                <label className="block text-gray-700 font-semibold text-xs sm:text-sm text-left">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A20] focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col space-y-1.5 col-span-1 text-left">
                <label className="block text-gray-700 font-semibold text-xs sm:text-sm text-left">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+234 801 234 5678"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A20] focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col space-y-1.5 col-span-1 md:col-span-2 text-left">
                <label className="block text-gray-700 font-semibold text-xs sm:text-sm text-left">Delivery Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Address in full..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A20] focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col space-y-1.5 col-span-1 text-left">
                <label className="block text-gray-700 font-semibold text-xs sm:text-sm text-left">State / Region</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A20] focus:bg-white transition"
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Rivers">PortHarcourt</option>
                  <option value="FCT">Abuja</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5 col-span-1 text-left">
                <label className="block text-gray-700 font-semibold text-xs sm:text-sm text-left">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm font-bold text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">2. Secure Payment Gateway</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod("paystack")}
                className={`p-4 border rounded-xl cursor-pointer transition flex items-start space-x-3 ${paymentMethod === "paystack" ? "border-[#FF7A20] bg-orange-50/20" : "border-gray-200"}`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "paystack"}
                  readOnly
                  className="mt-0.5 accent-[#FF7A20]"
                />
                <div className="text-xs">
                  <p className="font-bold text-gray-950">Secure & Fast Gateway</p>
                  <p className="text-gray-500 mt-1">Settle order with card, bank account or USD code. Instant documentation of all tranbsactions</p>
                </div>
              </div>

              <div
                onClick={() => { setPaymentMethod("bank-transfer"); setIsBankModalOpen(true); }}
                className={`p-4 border rounded-xl cursor-pointer transition flex items-start space-x-3 ${paymentMethod === "bank-transfer" ? "border-gray-950 bg-gray-50/50" : "border-gray-200"}`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "bank-transfer"}
                  readOnly
                  className="mt-0.5 accent-gray-950"
                />
                <div className="text-xs">
                  <p className="font-bold text-gray-950">Instant Bank Transfer</p>
                  <p className="text-gray-500 mt-1">Manual bank processing. Best suited for high-volume corporate PO disbursements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Column (Cols 5) */}
        <div className="lg:col-span-5" id="checkout-summary">
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-6 sticky top-24">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-200">3. Order Summary ⭐</h3>
            
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-xs font-semibold gap-4">
                  <span className="text-gray-700 truncate flex-1">{item.product.name} (x{item.quantity})</span>
                  <span className="font-mono text-gray-900 shrink-0">
                    {currency === "USD"
                      ? `$${(item.product.priceUSD * item.quantity).toLocaleString()}`
                      : `₦${(item.product.priceNGN * item.quantity).toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>Subtotal</span>
                <span className="font-mono">
                  {currency === "USD" ? `$${subtotalUSD.toLocaleString()}` : `₦${subtotalNGN.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>Logistics Delivery</span>
                <span className="font-mono text-emerald-600 font-bold">
                  FREE
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">Order Total</span>
              <span className="font-black text-lg text-[#FF7A20] font-mono">
                {currency === "USD" ? `$${totalUSD.toLocaleString()}` : `₦${totalNGN.toLocaleString()}`}
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7A20] text-white hover:bg-[#e06512] disabled:opacity-50 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>{loading ? "Preparing Your Secure Checkout..." : paymentMethod === "paystack" ? "Proceed to Pay Securely" : "Complete Secure Payment ⭐"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-gray-400 bg-white border border-gray-200 p-3 rounded-xl font-semibold">
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
              <span>By completing your payment, your selected products will be reserved for up to 48 hours, subject to successful payment verification and order confirmation.</span>
            </div>
          </div>
        </div>
      </form>

      {/* Credentials Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" id="bank-wire-modal">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-black text-gray-900 tracking-tight">Spinel Distribution Bank Account Details</h3>
                <p className="text-xs text-gray-500">Complete your bank transfer using the account details below. After making payment, please send your payment confirmation to sales@spineldistribution.com for verification and order processing.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Naira Account */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-[#FF7A20] tracking-wider">Naira Account (NGN)</span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">GTBank Corporate</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-gray-400">Account Name:</span> <span className="font-bold text-gray-800">Spinel Distribution Limited</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Account Number:</span> <span className="font-bold text-gray-900 font-mono text-sm">0123456789</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Bank Name:</span> <span className="font-bold text-gray-800">Guaranty Trust Bank Plc</span></div>
                </div>
              </div>

              {/* Dollar Account */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-[#FF7A20] tracking-wider">Dollar Account (USD)</span>
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">GTBank Corporate</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-gray-400">Account Name:</span> <span className="font-bold text-gray-800">Spinel Distribution Limited</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Account Number:</span> <span className="font-bold text-gray-900 font-mono text-sm">5092348571</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Bank Name:</span> <span className="font-bold text-gray-800">Guaranty Trust Bank Plc</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Swift Code:</span> <span className="font-bold text-gray-800 font-mono">GTBINGLAXXX</span></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="bg-gray-950 hover:bg-gray-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition"
              >
                Continue Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
