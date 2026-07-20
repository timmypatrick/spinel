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
  }, [cart]);

  // Subtotal values
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const subtotalNGN = cart.reduce((acc, item) => acc + item.product.priceNGN * item.quantity, 0);
  const taxUSD = Math.round(subtotalUSD * 0.075);
  const taxNGN = Math.round(subtotalNGN * 0.075);
  const shippingUSD = subtotalUSD > 1000 ? 0 : 50;
  const shippingNGN = subtotalNGN > 1500000 ? 0 : 75000;

  const totalUSD = subtotalUSD + taxUSD + shippingUSD;
  const totalNGN = subtotalNGN + taxNGN + shippingNGN;

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

      // Set the order details so the ThankYou view can render details
      setLastOrderDetails({
        invoiceNumber: orderData.invoiceNumber,
        orderId: orderData.orderId,
        shippingDetails: formData,
        paymentMethod,
        currency,
        items: cart,
        total: currency === "USD" ? totalUSD : totalNGN
      });

      // Clear Shopping Cart on success
      setCart([]);

      if (paymentMethod === "paystack") {
        // Redirect to Paystack secure completion page
        window.location.href = "https://paystack.com";
      } else {
        setCurrentView("thank-you");
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
        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Corporate Site Checkout</h1>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column Shipping Information (Cols 7) */}
        <div className="lg:col-span-7 space-y-8" id="checkout-form-container">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">1. Delivery Destination Specs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 col-span-2">
                <label className="text-gray-500 font-semibold">Corporate Representative Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Engr. Patrick Timi"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Enterprise Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="representative@dataset.ng"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Authorized Phone Line</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+234 803 555 1234"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <label className="text-gray-500 font-semibold">Site Delivery Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Plot 15, Industrial Estate, Trans-Amadi"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">State / Region</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none"
                >
                  <option value="Lagos">Lagos State (Hub 1)</option>
                  <option value="Rivers">Rivers State (PH Hub 2)</option>
                  <option value="FCT">Federal Capital Territory (Abuja Hub 3)</option>
                  <option value="Delta">Delta State</option>
                  <option value="Kano">Kano State</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500 font-semibold">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">2. Secured Billing Gateway</h3>
            
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
                  <p className="font-bold text-gray-950">Paystack Fast Gateway</p>
                  <p className="text-gray-500 mt-1">Settle order with card, bank account or USD code. Automated release of logistics invoice.</p>
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
                  <p className="font-bold text-gray-950">Bank Wire / TT Transfer</p>
                  <p className="text-gray-500 mt-1">Manual bank wire processing. Best suited for high-volume corporate PO disbursements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Column (Cols 5) */}
        <div className="lg:col-span-5" id="checkout-summary">
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-6 sticky top-24">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-200">3. Equipment Valuation</h3>
            
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
                <span>Value Added Tax (VAT 7.5%)</span>
                <span className="font-mono">
                  {currency === "USD" ? `$${taxUSD.toLocaleString()}` : `₦${taxNGN.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>Logistics Delivery</span>
                <span className="font-mono">
                  {currency === "USD" ? `$${shippingUSD.toLocaleString()}` : `₦${shippingNGN.toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">Total Secured Payment</span>
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
                <span>{loading ? "Registering Hardware Allocation..." : paymentMethod === "paystack" ? "Proceed to Paystack" : "Finalize secured payment"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-gray-400 bg-white border border-gray-200 p-3 rounded-xl font-semibold">
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
              <span>By finalizing this order, Spinel reserves the stock allocations in the warehouse for 48 hours pending clearing.</span>
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
                <h3 className="text-base font-black text-gray-900 tracking-tight">Spinel Distribution Banking Credentials</h3>
                <p className="text-xs text-gray-500">Please execute wire/transfer and send confirmation details to sales@spinel.ng</p>
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
                  <div className="flex justify-between"><span className="text-gray-400">Account Number:</span> <span className="font-bold text-gray-900 font-mono text-sm">0124598731</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Bank Name:</span> <span className="font-bold text-gray-800">Guaranty Trust Bank Plc</span></div>
                </div>
              </div>

              {/* Dollar Account */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-[#FF7A20] tracking-wider">Dollar Account (USD)</span>
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Citibank Dom</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-gray-400">Account Name:</span> <span className="font-bold text-gray-800">Spinel Distribution Limited</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Account Number:</span> <span className="font-bold text-gray-900 font-mono text-sm">5092348571</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Bank Name:</span> <span className="font-bold text-gray-800">Citibank Nigeria Limited</span></div>
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
                Close & Continue Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
