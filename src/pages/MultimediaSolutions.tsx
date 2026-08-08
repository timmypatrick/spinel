import React, { useState, useEffect } from "react";
import { Volume2, Tv, Mic, Bell, Cpu, ArrowRight, CheckCircle2, Shield, Radio, ShoppingCart, Sliders } from "lucide-react";
import { Product } from "../types";
import { safeFetch } from "../lib/dataService";

interface MultimediaSolutionsProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  currency: "USD" | "NGN";
  onRequestQuote: (product?: Product) => void;
}

export default function MultimediaSolutions({
  setCurrentView,
  setSelectedProductId,
  addToCart,
  currency,
  onRequestQuote
}: MultimediaSolutionsProps) {
  const [multimediaProducts, setMultimediaProducts] = useState<Product[]>([]);

  useEffect(() => {
    safeFetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(p => {
          const cat = (p.category || "").toLowerCase();
          const sub = (p.subcategory || "").toLowerCase();
          const name = (p.name || "").toLowerCase();
          return (
            sub.includes("paga") ||
            cat.includes("ex-proof") ||
            name.includes("paga") ||
            name.includes("speaker") ||
            name.includes("sounder") ||
            name.includes("beacon") ||
            name.includes("workstation") ||
            name.includes("display")
          );
        });
        setMultimediaProducts(filtered.slice(0, 8));
      })
      .catch((err) => console.error("Error loading multimedia products", err));
  }, []);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  return (
    <div className="w-full bg-white flex flex-col min-h-screen" id="multimedia-solutions-page">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white py-16 lg:py-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(#FF7A20_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-[#FF7A20]/30 rounded-full px-4 py-1.5 text-xs font-bold text-[#FF7A20] uppercase tracking-wider">
                <Volume2 className="w-4 h-4" />
                <span>Industrial Multimedia & PAGA Systems</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Public Address, General Alarm & Control Room Video Wall Systems
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
                ATEX & IECEx certified Public Address and General Alarm (PAGA) systems engineered for zero-fail emergency broadcasting in high-noise refineries, offshore platforms, and corporate control room video walls.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onRequestQuote()}
                  className="bg-[#FF7A20] hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center space-x-2 text-sm sm:text-base"
                >
                  <span>Request PAGA & AV Proposal</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView("store")}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 font-bold px-8 py-3.5 rounded-xl transition duration-200 cursor-pointer text-sm sm:text-base"
                >
                  Explore PAGA & AV Store
                </button>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
              <div className="relative group max-w-lg w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7A20] to-amber-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900/80 shadow-2xl">
                  <img
                    src="https://i.ibb.co/HfBtC4FT/meeting-room-5.png"
                    alt="Multimedia and Control Room AV Infrastructure"
                    className="w-full h-[360px] xl:h-[420px] object-cover object-center transform hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Multimedia & PAGA Solution Pillars */}
      <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-20 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Integrated Multimedia & Acoustic Signaling Solutions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Delivering high-decibel acoustic intelligibility, fail-safe alarm matrix logic, and crystal-clear video wall visual consoles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">PAGA Systems (Zone 1 / Zone 2)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Centralized PAGA rack matrices, hot-swappable digital power amplifiers, voice alarm controllers, and automatic acoustic noise sensing.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> EN54-16 & ATEX IECEx Certified</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dual-Redundant A/B Broadcaster</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> High Speech Intelligibility STI &gt; 0.7</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Control Room Video Walls</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ultra-narrow bezel LED/LCD video walls, 4K multi-channel video processors, matrix switchers, and SCADA ergonomic console furniture.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 0.88mm Ultra-Bezel Display Panels</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 24/7 Continuous Mission-Critical Duty</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Multi-Source Canvas Switching</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Ex-Sounders & Visual Beacons</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Heavy-duty GRP and stainless steel sounders outputting up to 120dB at 1 meter, with multi-color Xenon/LED visual emergency beacons.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Up to 120dB High Sound Output</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 21 Joule High-Intensity Beacons</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> IP66 Marine & Chemical Proof</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Enterprise AV & Conferencing</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Smart boardroom automation, acoustic ceiling microphone arrays, digital signal processors (DSP), and integrated video conferencing suites.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Beamforming Noise-Cancelling Mics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> One-Touch Boardroom Control Panels</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dante & AES67 Audio Over IP</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Safety Standards Banner */}
      <section className="bg-gray-900 text-white py-16 border-y border-gray-800">
        <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[#FF7A20] font-extrabold text-xs uppercase tracking-widest">Regulatory Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Certified to Exceed Global Industrial Safety Specifications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl space-y-1">
              <span className="text-[#FF7A20] font-bold text-sm">EN54-16 Standard</span>
              <p className="text-xs text-gray-400">European fire detection and voice alarm systems certification.</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl space-y-1">
              <span className="text-[#FF7A20] font-bold text-sm">ATEX Zone 1 & 2</span>
              <p className="text-xs text-gray-400">Atmosphères Explosibles certified for hazardous gas/dust zones.</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl space-y-1">
              <span className="text-[#FF7A20] font-bold text-sm">IECEx Certification</span>
              <p className="text-xs text-gray-400">International Electrotechnical Commission explosive atmosphere compliance.</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl space-y-1">
              <span className="text-[#FF7A20] font-bold text-sm">IP66 / IP67 Rating</span>
              <p className="text-xs text-gray-400">Complete protection against heavy seas, dust ingress, and water jets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Multimedia Products */}
      {multimediaProducts.length > 0 && (
        <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-20 space-y-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured PAGA & Multimedia Equipment</h2>
              <p className="text-gray-500 text-sm">Centralized PAGA stations, beacons, sounders, and video processors.</p>
            </div>
            <button
              onClick={() => setCurrentView("store")}
              className="text-[#FF7A20] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Multimedia Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {multimediaProducts.map((p) => (
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
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Designing a PAGA System or Control Room Display?</h2>
            <p className="text-orange-100 text-sm sm:text-base max-w-xl">Our specialized acoustic and AV system engineers will assist with acoustic coverage calculations, SPL mapping, and equipment bill of materials.</p>
          </div>
          <button
            onClick={() => onRequestQuote()}
            className="bg-gray-950 hover:bg-gray-900 text-white font-extrabold px-8 py-4 rounded-xl shadow-2xl transition cursor-pointer whitespace-nowrap text-sm sm:text-base"
          >
            Request PAGA & AV Quote
          </button>
        </div>
      </section>
    </div>
  );
}
