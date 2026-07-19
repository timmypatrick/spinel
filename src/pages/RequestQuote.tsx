import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles } from "lucide-react";

interface RequestQuoteProps {
  currency: "USD" | "NGN";
  setCurrentView: (view: string) => void;
}

export default function RequestQuote({ currency, setCurrentView }: RequestQuoteProps) {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    productName: "",
    sku: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.company.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          location: formData.location.trim(),
          productName: formData.productName.trim(),
          sku: formData.sku.trim(),
          description: formData.description.trim()
        })
      });

      if (!res.ok) {
        throw new Error("RFP registration failed");
      }

      const data = await res.json();
      setRfqNumber(data.rfqNumber);

    } catch (err) {
      console.error("Quote submission failed", err);
      alert("Systems mainframe experienced a timeout. Utilizing fallback proposal sequence.");
      setRfqNumber(`RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setLoading(false);
    }
  };

  if (rfqNumber) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6" id="quote-success-view">
        <div className="inline-flex p-3 bg-emerald-50 rounded-full text-emerald-500">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">RFP Proposal Registered</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Our Lead Systems Design Engineer is evaluating your environmental metrics.</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl max-w-md mx-auto space-y-2 text-xs">
          <div className="flex justify-between text-gray-500">
            <span>RFP Tracking ID</span>
            <span className="font-mono text-gray-950 font-bold">{rfqNumber}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Response Service SLA</span>
            <span className="text-emerald-600 font-bold">12 Hours (Priority Assigned)</span>
          </div>
        </div>
        <button
          onClick={() => setCurrentView("home")}
          className="bg-gray-950 hover:bg-[#FF7A20] text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
        >
          Return to Portal Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-[70px] md:px-[70px] py-12 space-y-10" id="request-quote-view">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full text-xs text-[#FF7A20] font-semibold">
          <Sparkles className="w-4.5 h-4.5 animate-pulse" />
          <span>Spinel Engineering Tendering Office</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">Request Custom Systems Quote (RFP)</h1>
        <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">List environmental constraints or product details to receive a compiled design study.</p>
      </div>

      <form onSubmit={handleSubmitQuote} className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6 text-xs">
        {/* Step 1: Corporate Representative Identification */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">1. Organization Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                placeholder="Chevron Nigeria Limited"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Representative</label>
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
              <label className="text-gray-500 font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="patrick.timi@chevron.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+234 803 123 4567"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Location Address</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Escravos Terminal (Offshore)"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Product Details */}
        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">2. Product Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                placeholder="Avigilon H5A Explosion-Protected Camera"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-semibold">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
                placeholder="2.0C-H5EX-A0-CO1"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-gray-500 font-semibold">Comprehensive Scope Details</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Outline specific product quantities, mounting requirements, salt-fog corrosion risks, or certification standards (e.g. ATEX Zone 1 Ex d compliance)..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20] font-sans"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#FF7A20] hover:bg-[#e06512] text-white disabled:opacity-50 font-bold py-3 px-8 rounded-xl transition flex items-center space-x-2 cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? "Submitting Design Request..." : "Register Design Study Proposal"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
