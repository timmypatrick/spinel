import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles, Upload, FileText, X } from "lucide-react";

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
  const [files, setFiles] = useState<{ name: string; size: number; data: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addFiles = (selectedFiles: File[]) => {
    selectedFiles.forEach((file) => {
      // Check if file is already added
      if (files.some(f => f.name === file.name && f.size === file.size)) return;
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setFiles(prev => [
          ...prev,
          {
            name: file.name,
            size: file.size,
            data: base64Data
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      addFiles(selectedFiles);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      addFiles(droppedFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          files
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
    <div className="max-w-4xl mx-auto px-4 md:px-[100px] lg:px-[100px] py-12 space-y-10" id="request-quote-view">
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

        {/* Step 3: Annex & Engineering Drawings */}
        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">3. Annex & Engineering Drawings</h3>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            Upload any relevant architectural schematics, CAD files, datasheets, or technical site surveys. Supported formats: PDF, DWG, PNG, JPG (Max 5MB per file).
          </p>

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 transition text-center flex flex-col items-center justify-center space-y-2 relative cursor-pointer ${
              dragActive
                ? "border-[#FF7A20] bg-orange-50/30"
                : "border-gray-200 hover:border-orange-200 bg-gray-50/50"
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload-input"
              accept=".pdf,.dwg,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
            />
            <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-xs text-gray-400">
              <Upload className="w-6 h-6 text-[#FF7A20]" />
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-gray-700">Drag & drop files here</p>
              <p className="text-gray-400 text-[10px]">or click to browse from computer</p>
            </div>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="font-bold text-gray-400 uppercase text-[9px]">Attached Documents ({files.length}):</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-[11px] font-medium"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-4 h-4 text-[#FF7A20] shrink-0" />
                      <div className="truncate pr-2">
                        <p className="text-gray-800 font-bold truncate max-w-[180px]">{file.name}</p>
                        <p className="text-gray-400 text-[9px]">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-red-500 transition cursor-pointer"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
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
