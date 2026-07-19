import React, { useState } from "react";
import { Mail, ShieldCheck, FileCheck, Globe, Linkedin, MessageSquare, Phone, Facebook, Instagram, Youtube } from "lucide-react";

interface FooterProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currency: "USD" | "NGN";
  setCurrency: (currency: "USD" | "NGN") => void;
}

export default function Footer({
  currentView,
  setCurrentView,
  currency,
  setCurrency
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCookie, setShowCookie] = useState(true);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error("Newsletter submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 text-sm border-t border-gray-800" id="main-footer">
      {/* Newsletter signup top band */}
      <div className="w-full border-gray-800 py-10">
        <div className="max-w-[1536px] mx-auto px-4 lg:px-[70px] md:px-[70px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">Subscribe to Spinel Distribution Briefings</h3>
            <p className="text-gray-300 text-sm sm:text-base mt-2">Stay informed with the latest product launches, industry insights, and exclusive offers, from Spinel Distribution Ltd</p>
          </div>
          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-lg flex items-center space-x-3 text-emerald-300 text-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>Thank you! Your email is enrolled in our Catalog.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-950 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent min-w-0"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF7A20] hover:bg-[#e06512] disabled:opacity-50 text-white font-bold text-sm px-6 py-3 rounded-lg transition duration-200 cursor-pointer shadow-md whitespace-nowrap"
                >
                  {loading ? "Registering..." : "Join Catalog"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap Grid */}
      <div className="max-w-[1536px] mx-auto px-4 lg:px-[70px] md:px-[70px] py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Spinel Identity Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
              alt="Spinel Only Logo"
              referrerPolicy="no-referrer"
              className="w-16 h-16 object-contain rounded-[10px]"
            />
            <div className="flex flex-col">
              <span className="text-[#FF7A20] font-extrabold text-2xl tracking-tight leading-none">SPINEL</span>
              <span className="text-gray-300 font-bold text-xs tracking-[0.25em] leading-none mt-1">DISTRIBUTION</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Spinel Distribution is a global ICT Distribution company. We are a leading provider of industrial products, security surveillance, solar power system and equipment related to ICT.
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="https://web.facebook.com/profile.php?id=61558951755204" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-md text-gray-400 hover:text-[#FF7A20] transition duration-150 flex items-center justify-center" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/spineldistribution" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-md text-gray-400 hover:text-[#FF7A20] transition duration-150 flex items-center justify-center" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://x.com/SpinelDistrLtd" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-md text-gray-400 hover:text-[#FF7A20] transition duration-150 flex items-center justify-center" aria-label="X (Twitter)">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/spineldistribution" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-md text-gray-400 hover:text-[#FF7A20] transition duration-150 flex items-center justify-center" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@SpinelDistributionLtd" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-md text-gray-400 hover:text-[#FF7A20] transition duration-150 flex items-center justify-center" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Our Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => setCurrentView("store")} className="hover:text-white block py-0.5">Explosion-Proof CCTV</button></li>
            <li><button onClick={() => setCurrentView("store")} className="hover:text-white block py-0.5">Commercial Solar Panels</button></li>
            <li><button onClick={() => setCurrentView("store")} className="hover:text-white block py-0.5">Lithium Energy Vaults</button></li>
            <li><button onClick={() => setCurrentView("store")} className="hover:text-white block py-0.5">Rugged IP Telephony</button></li>
            <li><button onClick={() => setCurrentView("store")} className="hover:text-white block py-0.5">Seismic Rack Cabinets</button></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Our Solutions</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => setCurrentView("about")} className="hover:text-white block py-0.5">Video Surveillance</button></li>
            <li><button onClick={() => setCurrentView("about")} className="hover:text-white block py-0.5">Off-Grid Microgrids</button></li>
            <li><button onClick={() => setCurrentView("about")} className="hover:text-white block py-0.5">Refinery PA/GA Grids</button></li>
            <li><button onClick={() => setCurrentView("about")} className="hover:text-white block py-0.5">Telecom Node Backups</button></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => setCurrentView("store")} className="hover:text-white block py-0.5">Enterprise Store</button></li>
            <li><button onClick={() => setCurrentView("about")} className="hover:text-white block py-0.5">About Us</button></li>
            <li><button onClick={() => setCurrentView("request-quote")} className="hover:text-white block py-0.5">Request Quote</button></li>
            <li><button onClick={() => setCurrentView("contact")} className="hover:text-white block py-0.5">Contact Us</button></li>
          </ul>
        </div>

        {/* Regulatory & Safety Badges */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Certifications</h4>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-center space-x-1.5 font-mono">
              <ShieldCheck className="w-5 h-5 text-[#FF7A20]" />
              <span>ATEX ZONE 1 STANDARD</span>
            </div>
            <div className="flex items-center space-x-1.5 font-mono">
              <FileCheck className="w-5 h-5 text-[#FF7A20]" />
              <span>ISO 9001:2015 SYSTEM</span>
            </div>
            <div className="flex items-center space-x-1.5 font-mono">
              <Globe className="w-5 h-5 text-[#FF7A20]" />
              <span>IECEx HARZARDOUS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Copyright Bottom */}
      <div className="w-full border-gray-800 py-6 bg-gray-950">
        <div className="max-w-[1536px] mx-auto px-4 lg:px-[70px] md:px-[70px] flex items-center justify-center text-xs text-gray-500">
          <span className="text-center text-sm">© 2026 Spinel Distribution Limited. All Rights Reserved.</span>
        </div>
      </div>

      {/* Dynamic Currency Toggle Widget */}
      <div className="fixed bottom-[46px] left-4 z-40 bg-gray-900 border border-gray-800 p-1.5 rounded-full shadow-2xl flex items-center space-x-1">
        <button
          onClick={() => setCurrency("USD")}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition duration-200 cursor-pointer ${
            currency === "USD"
              ? "bg-[#FF7A20] text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
          id="toggle-usd-btn"
        >
          <span>🇺🇸</span>
          <span>USD</span>
        </button>
        <button
          onClick={() => setCurrency("NGN")}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition duration-200 cursor-pointer ${
            currency === "NGN"
              ? "bg-[#FF7A20] text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
          id="toggle-ngn-btn"
        >
          <span>🇳🇬</span>
          <span>NGN</span>
        </button>
      </div>
    </footer>
  );
}
