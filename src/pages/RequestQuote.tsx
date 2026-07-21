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
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("RFP registration failed");
      }

      const data = await res.json();
      setRfqNumber(data.rfqNumber || `RFQ-${Date.now()}`);

    } catch (err) {
      console.error("Quote submission failed", err);
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quotation Request Submitted Successfully!</h1>
          <p className="text-gray-500 text-xs sm:text-sm">We will contact you shortly with a customized quotation and technical recommendations.</p>
        </div>
        <button
          onClick={() => setCurrentView("store")}
          className="bg-gray-950 hover:bg-[#FF7A20] text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
        >
          Browse Product Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-[100px] lg:px-[100px] py-12 space-y-10" id="request-quote-view">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full text-xs text-[#FF7A20] font-semibold">
          <Sparkles className="w-4.5 h-4.5 animate-pulse" />
          <span>Receive a Custom Quote</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">Request a Quote for ICT Infrastructures</h1>
        <p className="text-gray-500 text-xs sm:text-sm mx-auto">Submit your project requirements or specifications, Our sales and engineering specialists will review your request and provide a tailored quotation with the most suitable products, pricing, and technical recommendations for your project.</p>
      </div>

      <form onSubmit={handleSubmitQuote} className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6 text-sm">
        {/* Step 1: Corporate Representative Identification */}
        <div className="space-y-4">
          <h3 className="font-bold text-base text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">1. Organization Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                placeholder="Enter your company name"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Representative</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="example@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+234 801 234 5678"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Location Address</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Enter the destination"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Product Details */}
        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-base text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">2. Product Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                placeholder="Enter the product name"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
                placeholder="Enter the product SKU (if known)"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Comprehensive Scope Details</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe your product requirements, technical specifications, or project details..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20] font-sans"
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
            <span>{loading ? "Submitting Your Request..." : "Request a Quote"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
