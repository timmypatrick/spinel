import React from "react";
import { ArrowRight, Building2 } from "lucide-react";

const oemBanner = "https://i.ibb.co/mZH3GMt/pokecutweb-17843025187811.jpg";

interface OemsProps {
  setCurrentView: (view: string) => void;
}

const OEMS_LIST = [
  {
    name: "Ubiquity Networks",
    image: "https://i.ibb.co/gFc4WVxZ/images-13.png",
    description: "Industry-leading enterprise cybersecurity solutions designed to deliver unified protection and deep visibility across critical network infrastructures."
  },
  {
    name: "Technovideo",
    image: "https://i.ibb.co/5xSR8hBw/images-12.png",
    description: "Specialized building network architectures, high-quality wiring systems, and professional cable management designs for robust enterprise facilities."
  },
  {
    name: "Huawei Enterprise",
    image: "https://i.ibb.co/PsjGr1gB/huaweilogo-new.png",
    description: "World-class ICT infrastructure, cloud computing hardware, and advanced smart device systems built for modern telecommunications operators."
  },
  {
    name: "Hikvision",
    image: "https://i.ibb.co/rKKrgn7J/images-10.png",
    description: "Comprehensive structured cabling systems and robust connectivity solutions designed to optimize high-performance corporate data centers."
  },
  {
    name: "Gennex",
    image: "https://i.ibb.co/zwxkR6g/Logo-2.png",
    description: "Global manufacturer of high-end physical infrastructure, network cabling, and industrial electrical systems for maximum operational efficiency."
  },
  {
    name: "Dahua",
    image: "https://i.ibb.co/21yZtrQV/logo-1.png",
    description: "A pioneer in optical science, producing world-leading fiber optic cabling and premium hardware systems for high-bandwidth networks."
  },
  {
    name: "Cambium Networks",
    image: "https://i.ibb.co/YFYsvYyT/images-9.png",
    description: "Advanced electrical cabling and power transmission systems engineered for heavy industry, telecom, and critical energy projects."
  },
  {
    name: "Cisco",
    image: "https://i.ibb.co/BR1Szky/images-8.png",
    description: "Swiss-quality structured cabling systems and high-density copper/fiber connections that power enterprise digital communications."
  },
  {
    name: "Sophos",
    image: "https://i.ibb.co/pjwrzySb/images-7.png",
    description: "A global engineering giant delivering cutting-edge industrial automation controllers and smart grid electrical systems."
  },
  {
    name: "DELL Technologies",
    image: "https://i.ibb.co/Mk8tZFRb/images-6.png",
    description: "The global leader in energy and telecom cable solutions, specialized for complex marine, underground, and industrial applications."
  },
  {
    name: "IBM Enterprise Servers",
    image: "https://i.ibb.co/fdqsWR2V/ibm.png",
    description: "Highly secure enterprise servers, cognitive computing clusters, and hybrid cloud infrastructures optimized for critical database workloads."
  },
  {
    name: "Helukabel Solutions",
    image: "https://i.ibb.co/hRm8RDkb/helukabel.png",
    description: "A premier international manufacturer of industrial cabling, control wires, and specialty automation system connection products."
  },
  {
    name: "CommScope Infrastructure",
    image: "https://i.ibb.co/Wvny0p8r/commscope.png",
    description: "Advanced physical infrastructure solutions designed to expand bandwidth, improve capacity, and streamline wireless networking."
  },
  {
    name: "TRENDnet Networking",
    image: "https://i.ibb.co/VYkdNHWt/trednet.png",
    description: "Reliable, award-winning networking hardware solutions, including robust industrial PoE switches and high-speed fiber media converters."
  },
  {
    name: "Techno Connectors",
    image: "https://i.ibb.co/67JkcBsG/techno.png",
    description: "High-grade IP68 waterproof connector systems and robust junction boxes designed for extreme environments and high-moisture sites."
  },
  {
    name: "Eaton Power Management",
    image: "https://i.ibb.co/jvGKq9kJ/eaton.png",
    description: "Leading manufacturer of intelligent uninterruptible power supplies (UPS) and advanced power distribution units (PDU) for server racks."
  },
  {
    name: "Schneider Electric",
    image: "https://i.ibb.co/GQLBtRLM/schneider.png",
    description: "Global specialist in energy management and digital automation systems, ensuring unparalleled reliability for enterprise facilities."
  },
  {
    name: "Bartec ATEX Systems",
    image: "https://i.ibb.co/kVQc5vJp/bartec.png",
    description: "World leader in explosion protection and ATEX safety equipment, offering certified electrical materials for hazardous environments."
  },
  {
    name: "Rittal Enclosures",
    image: "https://i.ibb.co/xq2ZKfD2/rittal.png",
    description: "Pioneering systems for industrial enclosures, climate control solutions, and premium server cabinets used in enterprise data centers."
  },
  {
    name: "Pelco Video Security",
    image: "https://i.ibb.co/23KQxhNN/pelco.png",
    description: "Robust IP video surveillance cameras and open-platform physical security systems designed to protect high-risk installations."
  },
  {
    name: "Aruba Enterprise Networking",
    image: "https://i.ibb.co/F4WsX91L/aruba.png",
    description: "Next-generation secure edge-to-cloud networking hardware, offering intelligent enterprise access points and scalable campus switches."
  },
  {
    name: "Axis Communications",
    image: "https://i.ibb.co/p66dC6Fz/axis.png",
    description: "The global market leader in network video surveillance, providing high-definition smart cameras and edge audio technologies."
  },
  {
    name: "Milestone Open VMS",
    image: "https://i.ibb.co/kV8sByjc/milestone.png",
    description: "Industry-leading open platform IP video management software (VMS) engineered to support a vast ecosystem of physical security devices."
  }
];

export default function Oems({ setCurrentView }: OemsProps) {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white flex flex-col min-h-screen" id="oems-page">
      {/* Injecting marquee animation rules */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* 1. Solutions-Style Hero Section */}
      <section className="relative w-full max-w-full bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white py-12 sm:py-16 lg:py-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(#FF7A20_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-[100px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-[#FF7A20]/30 rounded-full px-3.5 py-1.5 text-xs font-bold text-[#FF7A20] uppercase tracking-wider max-w-full truncate">
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="truncate">Authorized Global OEM Network</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight break-words">
                Strategic OEM Partnerships & Global Manufacturer Network
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed">
                Spinel Distribution collaborates with globally recognized Original Equipment Manufacturers (OEMs) to deliver authentic products, cutting-edge innovations, and comprehensive technical support across ICT, electronic security, telecommunications, networking, renewable energy, and industrial infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => setCurrentView("request-quote")}
                  className="w-full sm:w-auto bg-[#FF7A20] hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>Request Official OEM Quote</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </button>
                <button
                  onClick={() => setCurrentView("store")}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 font-bold px-6 sm:px-8 py-3.5 rounded-xl transition duration-200 cursor-pointer text-sm sm:text-base text-center"
                >
                  Explore Our Catalogue
                </button>
              </div>
            </div>

            <div className="flex lg:col-span-5 justify-center lg:justify-end mt-4 lg:mt-0 w-full">
              <div className="relative group max-w-lg w-full mx-auto lg:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7A20] to-amber-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900/80 shadow-2xl">
                  <img
                    src={oemBanner}
                    alt="Global OEM Partnerships"
                    className="w-full h-[220px] sm:h-[300px] md:h-[360px] xl:h-[420px] object-cover object-center transform hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-[100px] py-10 sm:py-16 space-y-12 sm:space-y-16">

        {/* 23 Partners Grid */}
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">Our Manufacturers</h2>
            <p className="text-base text-gray-600 mt-1">Feel free to contact our Expertise Desk for official quotes, project designs, and technical support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            {OEMS_LIST.map((oem, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentView("contact")}
                className="group bg-white border border-gray-200 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer relative"
                id={`oem-card-${idx}`}
              >
                <div className="space-y-4">
                  {/* Image container with fixed ratio to align logo neatly */}
                  <div className="h-28 bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-center transition group-hover:bg-orange-50/30">
                    <img 
                      src={oem.image} 
                      alt={oem.name} 
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-gray-900 uppercase tracking-tight group-hover:text-[#FF7A20] transition duration-200">
                      {oem.name}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {oem.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-3 border-t border-gray-100 text-xs sm:text-sm text-[#FF7A20] font-bold uppercase tracking-wider transition duration-200">
                  <span>Contact Solutions Desk</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Marquee of OEM Logos */}
        <div className="space-y-6 pt-8 border-t border-gray-200 max-w-full overflow-hidden">
          <div className="text-center space-y-2 px-2">
            <span className="text-xs sm:text-sm text-[#FF7A20] font-extrabold uppercase tracking-widest block">Leading Global OEM Partners for ICT, Security & Engineering products</span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900">Authorized Technology Brands & Manufacturing Partners</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">Explore our portfolio of world-class OEM partners delivering innovative ICT infrastructure, electronic security systems, renewable energy products, industrial networking equipment, hazardous-area communication systems, power distribution products, and engineering technologies.</p>
          </div>

          <div className="w-full max-w-full overflow-hidden relative bg-gray-50/80 border border-gray-100 py-8 sm:py-10 rounded-2xl">
            {/* Soft gradient edge fade overlays */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee shrink-0">
              {/* First original set of logos */}
              <div className="flex items-center gap-10 sm:gap-16 pr-10 sm:pr-16">
                {OEMS_LIST.map((oem, idx) => (
                  <div key={`marq-1-${idx}`} className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center shrink-0">
                    <img 
                      src={oem.image} 
                      alt={oem.name} 
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Second duplicated set of logos for seamless infinite loop scroll */}
              <div className="flex items-center gap-10 sm:gap-16 pr-10 sm:pr-16">
                {OEMS_LIST.map((oem, idx) => (
                  <div key={`marq-2-${idx}`} className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center shrink-0">
                    <img 
                      src={oem.image} 
                      alt={oem.name} 
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
