import React, { useState, useEffect } from "react";
import { Network, Radio, Wifi, PhoneCall, Cpu, ArrowRight, CheckCircle2, Shield, Server, ShoppingCart, Activity } from "lucide-react";
import { Product } from "../types";
import { safeFetch } from "../lib/dataService";

interface TelecomSolutionsProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  currency: "USD" | "NGN";
  onRequestQuote: (product?: Product) => void;
}

export default function TelecomSolutions({
  setCurrentView,
  setSelectedProductId,
  addToCart,
  currency,
  onRequestQuote
}: TelecomSolutionsProps) {
  const [telecomProducts, setTelecomProducts] = useState<Product[]>([]);

  useEffect(() => {
    safeFetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(p => {
          const cat = (p.category || "").toLowerCase();
          const sub = (p.subcategory || "").toLowerCase();
          const name = (p.name || "").toLowerCase();
          return (
            cat.includes("electrical") ||
            cat.includes("ex-proof") ||
            sub.includes("switch") ||
            sub.includes("cable") ||
            sub.includes("paga") ||
            name.includes("voip") ||
            name.includes("switch") ||
            name.includes("cable") ||
            name.includes("phone")
          );
        });
        setTelecomProducts(filtered.slice(0, 8));
      })
      .catch((err) => console.error("Error loading telecom products", err));
  }, []);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  return (
    <div className="w-full bg-white flex flex-col min-h-screen" id="telecom-solutions-page">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white py-16 lg:py-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(#FF7A20_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-[#FF7A20]/30 rounded-full px-4 py-1.5 text-xs font-bold text-[#FF7A20] uppercase tracking-wider">
                <Network className="w-4 h-4" />
                <span>Enterprise Telecommunications</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                High-Availability Telecommunication & Radio Network Solutions
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
                Engineered for 99.999% uptime in demanding operational environments. We provide long-range microwave backhauls, industrial Wi-Fi 6 mesh, hybrid subsea/armoured composite cables, and ATEX Zone 1 intrinsically safe telephony.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onRequestQuote()}
                  className="bg-[#FF7A20] hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center space-x-2 text-sm sm:text-base"
                >
                  <span>Consult Telecom Network Engineer</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView("store")}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 font-bold px-8 py-3.5 rounded-xl transition duration-200 cursor-pointer text-sm sm:text-base"
                >
                  View Telecom Hardware Store
                </button>
              </div>
            </div>

            <div className="flex lg:col-span-5 justify-center lg:justify-end mt-4 lg:mt-0 w-full">
              <div className="relative group max-w-lg w-full mx-auto lg:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7A20] to-amber-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900/80 shadow-2xl">
                  <img
                    src="https://i.ibb.co/HTYsLdMv/image.png"
                    alt="Enterprise Telecommunication Infrastructure"
                    className="w-full h-[220px] sm:h-[300px] md:h-[360px] xl:h-[420px] object-cover object-center transform hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Telecom Solution Pillars */}
      <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-20 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Comprehensive Telecommunication Systems
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Connecting offshore platforms, remote oilfields, industrial plants, and corporate hubs with zero packet loss and high throughput resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Microwave & Wireless Links</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Licensed and unlicensed Point-to-Point (PTP) and Point-to-Multipoint (PTMP) microwave backhauls providing multi-gigabit throughput over long distances.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Low Latency (&lt;2ms) Transmission</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dynamic Frequency Selection & ACM</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Subsea / Offshore Weather Proofing</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Industrial Wi-Fi & Private 5G</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ruggedized outdoor access points, private LTE/5G nodes, and self-healing wireless mesh networks for heavy machinery, mines, and refineries.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> IEEE 802.11ax Wi-Fi 6 Industrial Grade</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Seamless Roaming for Mobile Plant Assets</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> High-Density Client Connections</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Armoured Hybrid Cabling & Switches</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              One cable data + power composite cabling with steel wire armour, alongside IP67 IEEE 802.3bt Ultra PoE 90W industrial Ethernet switches.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> ERPS Ring Recovery &lt;20ms</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Steel Wire Armoured Sheathing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Extended Temp (-40°C to +75°C)</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4 hover:border-[#FF7A20] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF7A20]">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">ATEX Ex-Telephony Systems</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Zone 1/2 explosion-proof VoIP & analogue heavy-duty telephones, weatherproof emergency call stations, and noise-cancelling acoustic hoods.
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-gray-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> ATEX / IECEx Ex-d Flameproof Body</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> IP66/IP67 Extreme Weatherproof</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> SIP Protocol Compatibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Performance Metrics */}
      <section className="bg-gray-900 text-white py-16 border-y border-gray-800">
        <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-[#FF7A20] font-mono">99.999%</span>
              <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">Carrier Grade Uptime</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-[#FF7A20] font-mono">&lt; 2ms</span>
              <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">Ultra-Low Latency</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-[#FF7A20] font-mono">10 Gbps</span>
              <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">Backbone Capacity</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-[#FF7A20] font-mono">Zone 1</span>
              <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">Hazardous Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Telecom Products */}
      {telecomProducts.length > 0 && (
        <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-20 space-y-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Telecom & Networking Hardware</h2>
              <p className="text-gray-500 text-sm">Switches, cables, and explosion-proof telephones for site deployment.</p>
            </div>
            <button
              onClick={() => setCurrentView("store")}
              className="text-[#FF7A20] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Telecom Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {telecomProducts.map((p) => (
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
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Planning a Remote Site or Telecom Link Expansion?</h2>
            <p className="text-orange-100 text-sm sm:text-base max-w-xl">Consult our radio frequency and network routing engineers to build a custom link budget and bill of quantities.</p>
          </div>
          <button
            onClick={() => onRequestQuote()}
            className="bg-gray-950 hover:bg-gray-900 text-white font-extrabold px-8 py-4 rounded-xl shadow-2xl transition cursor-pointer whitespace-nowrap text-sm sm:text-base"
          >
            Request Telecom Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
