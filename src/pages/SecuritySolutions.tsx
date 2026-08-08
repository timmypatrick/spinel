import React, { useState, useEffect } from "react";
import { Shield, Eye, Lock, Flame, Bell, Cpu, ArrowRight, CheckCircle2, ChevronRight, ShoppingCart, Download, Layers } from "lucide-react";
import { Product } from "../types";
import { safeFetch } from "../lib/dataService";

interface SecuritySolutionsProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  currency: "USD" | "NGN";
  onRequestQuote: (product?: Product) => void;
}

export default function SecuritySolutions({
  setCurrentView,
  setSelectedProductId,
  addToCart,
  currency,
  onRequestQuote
}: SecuritySolutionsProps) {
  const [securityProducts, setSecurityProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"cctv" | "access" | "intrusion" | "fire">("cctv");

  useEffect(() => {
    safeFetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Filter for security related hardware
        const filtered = data.filter(p => {
          const cat = (p.category || "").toLowerCase();
          const sub = (p.subcategory || "").toLowerCase();
          const name = (p.name || "").toLowerCase();
          return (
            cat.includes("cctv") ||
            sub.includes("camera") ||
            sub.includes("cctv") ||
            name.includes("camera") ||
            name.includes("reader") ||
            name.includes("nvr") ||
            name.includes("recorder") ||
            cat.includes("security")
          );
        });
        setSecurityProducts(filtered.slice(0, 8));
      })
      .catch((err) => console.error("Error loading security products", err));
  }, []);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  return (
    <div className="w-full bg-white flex flex-col min-h-screen" id="security-solutions-page">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white py-16 lg:py-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(#FF7A20_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-[#FF7A20]/30 rounded-full px-4 py-1.5 text-xs font-bold text-[#FF7A20] uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Enterprise Electronic Security</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Integrated Security & Electronic Surveillance Solutions
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
                From ATEX Zone 1 explosion-proof optics and multi-sensor 4K video surveillance to biometric access matrix systems and perimeter intrusion detection, Spinel delivers military-grade protection for industrial sites, refineries, and corporate headquarters.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onRequestQuote()}
                  className="bg-[#FF7A20] hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center space-x-2 text-sm sm:text-base"
                >
                  <span>Request Custom Security Architecture</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView("store")}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 font-bold px-8 py-3.5 rounded-xl transition duration-200 cursor-pointer text-sm sm:text-base"
                >
                  Explore Security Hardware Store
                </button>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
              <div className="relative group max-w-lg w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7A20] to-amber-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900/80 shadow-2xl">
                  <img
                    src="https://i.ibb.co/GvvX8p1N/image.png"
                    alt="Enterprise Security and Access Control System"
                    className="w-full h-[360px] xl:h-[420px] object-cover object-center transform hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Security Solution Pillars */}
      <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-20 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Core Security Solution Domains
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Engineered in partnership with premier global OEMs to guarantee multi-layered protection, compliance with international safety codes, and 24/7 continuous operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">CCTV & AI Video Analytics</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              High-definition thermal imaging, PTZ tracking, multi-sensor 360° coverage, ANPR license plate recognition, and ATEX explosion-proof stainless steel cameras.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> AI Perimeter Guard & Object Detection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> AISI 316L Stainless Steel Enclosures</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Real-time Thermal Monitoring</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Access Control & Biometrics</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Multi-door network controllers, contactless biometric facial/fingerprint scanners, smart card credentials, RFID turnstiles, and visitor management suites.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> HID PIV & Signo Smart Readers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Centralized Cloud/On-Prem Controller</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Anti-Passback & Muster Reporting</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Intrusion & Perimeter Fence</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fiber-optic fence sensors, microwave intrusion barriers, long-range active infrared beams, and integrated SCADA control room alarm matrices.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Fiber-Optic Acoustic Perimeter Sensing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Zero False Alarm Filtering</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Instant PTZ Auto-Tracking Slew</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Fire & Toxic Gas Detection</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Flameproof UV/IR optical flame detectors, aspire smoke detectors, toxic gas monitors, and hazardous-area optical alarm beacons for refineries and industrial plants.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> ATEX & SIL-2 Certified Gas Sensors</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Rapid Flame Detection (&lt;1 Second)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Seamless PAGA System Interlock</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. System Deployment Workflow */}
      <section className="bg-gray-900 text-white py-20 border-y border-gray-800">
        <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#FF7A20] font-extrabold text-xs uppercase tracking-widest">End-to-End Execution</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Our Security Project Execution Model</h2>
            <p className="text-gray-400 text-sm sm:text-base">We walk with you from initial threat assessment to final handover and SLA maintenance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-6 space-y-3 relative">
              <span className="text-4xl font-black text-[#FF7A20]/30 font-mono">01</span>
              <h4 className="text-lg font-bold text-white">Risk & Threat Survey</h4>
              <p className="text-xs text-gray-300 leading-relaxed">On-site technical evaluation of blind spots, environmental hazards, ingress points, and ATEX zoning compliance requirements.</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-6 space-y-3 relative">
              <span className="text-4xl font-black text-[#FF7A20]/30 font-mono">02</span>
              <h4 className="text-lg font-bold text-white">System Architecture</h4>
              <p className="text-xs text-gray-300 leading-relaxed">CAD schematic design, network bandwidth calculation, storage sizing, and OEM equipment specification bill of materials.</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-6 space-y-3 relative">
              <span className="text-4xl font-black text-[#FF7A20]/30 font-mono">03</span>
              <h4 className="text-lg font-bold text-white">Direct OEM Supply</h4>
              <p className="text-xs text-gray-300 leading-relaxed">Rapid procurement and supply of genuine factory-certified equipment directly from Avigilon, Pelco, Bosch, and HID.</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-6 space-y-3 relative">
              <span className="text-4xl font-black text-[#FF7A20]/30 font-mono">04</span>
              <h4 className="text-lg font-bold text-white">Integration & SLA</h4>
              <p className="text-xs text-gray-300 leading-relaxed">On-site commissioning, operator training, SCADA/VMS integration, and long-term preventive maintenance support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Security Hardware Grid */}
      {securityProducts.length > 0 && (
        <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-20 space-y-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Security Hardware Catalog</h2>
              <p className="text-gray-500 text-sm">Directly available from our inventory for immediate deployment.</p>
            </div>
            <button
              onClick={() => setCurrentView("store")}
              className="text-[#FF7A20] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Security Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {securityProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleProductClick(p.id)}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain mx-auto group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                      }}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded inline-block">
                      {p.sku}
                    </span>
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#FF7A20] transition line-clamp-2 leading-snug">
                      {p.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <span className="font-extrabold text-[#FF7A20] text-sm">
                    {p.priceUSD === 0 || p.isQuoteOnly ? "Quote Only" : (currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (p.priceUSD === 0 || p.isQuoteOnly) {
                        onRequestQuote(p);
                      } else {
                        addToCart(p);
                      }
                    }}
                    className="bg-[#FF7A20] hover:bg-orange-600 text-white p-2 rounded-lg transition shadow-xs flex items-center justify-center"
                    title={p.priceUSD === 0 || p.isQuoteOnly ? "Request Quote" : "Add to Cart"}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-[#FF7A20] text-white py-16">
        <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Need a Comprehensive Security Audit or Quote?</h2>
            <p className="text-orange-100 text-sm sm:text-base max-w-xl">Our certified electronic security engineers are available to review your project blueprints and prepare tailored bill of materials.</p>
          </div>
          <button
            onClick={() => onRequestQuote()}
            className="bg-gray-950 hover:bg-gray-900 text-white font-extrabold px-8 py-4 rounded-xl shadow-2xl transition cursor-pointer whitespace-nowrap text-sm sm:text-base"
          >
            Submit Security RFQ
          </button>
        </div>
      </section>
    </div>
  );
}
