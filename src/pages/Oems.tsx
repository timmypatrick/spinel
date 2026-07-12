import React from "react";
import { Shield, Sun, PhoneCall, Server, ArrowRight, ExternalLink } from "lucide-react";

interface OemsProps {
  setCurrentView: (view: string) => void;
}

const PARTNERS = [
  {
    name: "HexaShield Security",
    logo: "🛡️",
    icon: Shield,
    specialty: "Hazardous CCTV & Optics",
    tagline: "Certified Zone 1 / Zone 2 Explosion-Proof Vision",
    description: "HexaShield is a global pioneer in heavy-duty surveillance housings and electro-optical thermal cameras. Designed with electropolished AISI 316L stainless steel, their camera systems operate in chemical processing, oil rigs, and munitions vaults worldwide with full ATEX & IECEx certification.",
    website: "https://hexashield-security.com",
    keyProducts: ["ATEX Dome Cameras", "Dual-Spectrum Thermal PTZ", "Optical Defoggers", "Zone 1 Junction Modules"]
  },
  {
    name: "Vantage Power Systems",
    logo: "🔋",
    icon: Sun,
    specialty: "Industrial Solar & Storage",
    tagline: "High-yield photovoltaic matrices & energy vaults",
    description: "Vantage Power Systems delivers commercial-grade solar power backup systems. Known for their high-yield monocrystalline panels and heavy-duty Lithium Iron Phosphate (LiFePO4) energy vaults, they power off-grid telecommunication base stations and seismic monitoring hubs.",
    website: "https://vantagepower.com",
    keyProducts: ["Lithium Energy Vaults", "Industrial Solar Arrays", "Synchronous Hybrid Inverters", "SCADA Power Telemetry"]
  },
  {
    name: "CommsTect Rugged",
    logo: "📞",
    icon: PhoneCall,
    specialty: "Intrinsically Safe Comms",
    tagline: "Fail-safe communications for extreme atmospheres",
    description: "CommsTect specializes in explosion-proof IP intercoms, weatherproof SIP voice nodes, and high-decibel warning sirens. Their products are fully dust-ignition-proof, corrosion-proof, and moisture-sealed for safe application in combustible environments.",
    website: "https://commstect-rugged.com",
    keyProducts: ["Explosion-Proof IP Telephones", "ATEX SIP Intercom Units", "Intrinsically Safe Sounders", "Sealed PA/GA Hubs"]
  },
  {
    name: "DuraRack Cabinets",
    logo: "🗄️",
    icon: Server,
    specialty: "Enterprise Enclosures",
    tagline: "IP66 outdoor server enclosures & seismic server racks",
    description: "DuraRack is a premier manufacturer of server cabinets designed for high-vibration and harsh outdoor sites. Featuring thermal climate isolation, dual-wall air flow design, and heavy seismic cross-bracing, they secure rack-mount IT core assets in remote and rugged environments.",
    website: "https://durarack.com",
    keyProducts: ["42U Seismic Server Racks", "IP66 Double-Wall Enclosures", "Passive Heat Exchange Cabinets", "Climate Control Units"]
  }
];

export default function Oems({ setCurrentView }: OemsProps) {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="oems-page">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full text-xs font-bold text-[#FF7A20] uppercase tracking-wider">
            <span>Authorized Global Representation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight uppercase">
            Represented <span className="text-[#FF7A20]">OEM</span> Partners
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Spinel Distribution is the exclusive bridge bringing world-leading industrial engineering, power automation, and ATEX communication manufacturers directly to enterprise procurement and telecommunication operators.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          {PARTNERS.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-gray-100 hover:border-orange-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-6"
                id={`oem-card-${idx}`}
              >
                <div className="space-y-4">
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between gap-4 border-b border-gray-50 pb-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-3xl shadow-xs">
                        {partner.logo}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">{partner.name}</h2>
                        <span className="text-[10px] uppercase font-mono font-bold text-[#FF7A20] tracking-widest bg-orange-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                          {partner.specialty}
                        </span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-orange-50 rounded-xl text-[#FF7A20]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-800 tracking-tight">{partner.tagline}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-normal">{partner.description}</p>
                  </div>

                  {/* Core OEM Products list */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Featured Line Products</span>
                    <div className="flex flex-wrap gap-2">
                      {partner.keyProducts.map((p, pIdx) => (
                        <span key={pIdx} className="bg-gray-50 text-gray-600 border border-gray-200/50 rounded-lg px-2.5 py-1 text-[10px] font-medium font-mono">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 gap-4 flex-wrap">
                  <span className="text-[10px] text-gray-400 font-medium">Fully Stocked & Supported</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setCurrentView("store")}
                      className="bg-gray-900 text-white hover:bg-[#FF7A20] text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition duration-150 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Bottom Callout */}
        <div className="bg-gray-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
          <div className="space-y-3 z-10 max-w-2xl text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide">Looking to become a Registered Partner?</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              We routinely assist licensed engineering firms, offshore contractors, and telecommunication network operators in deploying ATEX, Solar, and CCTV infrastructure. Contact our Solutions Desk to receive official OEM manufacturer product authorization.
            </p>
          </div>
          <button 
            onClick={() => setCurrentView("contact")}
            className="bg-[#FF7A20] hover:bg-[#e06512] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition shadow-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact Solutions Desk
          </button>
        </div>
      </div>
    </div>
  );
}
