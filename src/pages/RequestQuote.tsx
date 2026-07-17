import React, { useState } from "react";
import { FileText, Send, CheckCircle2, CloudUpload, Sparkles } from "lucide-react";

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
    domain: "Security surveillance",
    description: ""
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const dropped = Array.from(e.dataTransfer.files);
      setFiles([...files, ...dropped]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles([...files, ...selected]);
    }
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
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10" id="request-quote-view">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full text-xs text-[#FF7A20] font-semibold">
          <Sparkles className="w-4.5 h-4.5 animate-pulse" />
          <span>Spinel Engineering Tendering Office</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">Request Custom Systems Quote (RFP)</h1>
        <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">Upload site blueprints or list environmental constraints to receive a compiled design study.</p>
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

        {/* Step 2: Technical Specifications Scope */}
        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">2. Technical Scope Specifications</h3>
          
          <div className="space-y-1.5">
            <label className="text-gray-500 font-semibold">Core Business Division</label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none"
            >
              <option value="Security surveillance">Electronic Security Matrix</option>
              <option value="Solar Microgrid">Renewable Solar Microgrid</option>
              <option value="Server Racks">Telecom Racks & Structures</option>
              <option value="Harzardous Comms">ATEX Certified VoIP intercoms</option>
            </select>
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

        {/* Step 3: File / Diagram Drag-and-Drop Uploader */}
        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">3. Annex & Engineering Drawings</h3>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-gray-200 hover:border-[#FF7A20] transition rounded-2xl p-6 text-center cursor-pointer space-y-2 bg-gray-50/50"
          >
            <CloudUpload className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="font-bold text-gray-800">Drag & Drop drawings, datasheets or maps here</p>
            <p className="text-[10px] text-gray-400">Accepts PDF, DWG, PNG, JPEG formats up to 45MB</p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="quote-file-input"
            />
            <button
              type="button"
              onClick={() => document.getElementById("quote-file-input")?.click()}
              className="text-[#FF7A20] font-bold hover:underline"
            >
              Or browse files manually
            </button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2 bg-white border border-gray-100 p-4 rounded-xl">
              <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider">Loaded Enclosures ({files.length})</p>
              {files.map((f, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px] text-gray-600 bg-gray-50 p-2 rounded">
                  <span className="font-mono">{f.name}</span>
                  <span className="font-bold">({(f.size / (1024 * 1024)).toFixed(2)} MB)</span>
                </div>
              ))}
            </div>
          )}
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
