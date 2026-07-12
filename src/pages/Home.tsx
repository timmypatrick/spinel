import { useState, useEffect } from "react";
import { Shield, Sun, Server, Cpu, Network, ArrowRight, Zap, Award, Star, BookOpen, Clock, Globe, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Product, BlogArticle } from "../types";
import { safeFetch } from "../lib/dataService";

interface HomeProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  currency: "USD" | "NGN";
}

export default function Home({
  setCurrentView,
  setSelectedProductId,
  currency
}: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate background carousel of 8 flyers every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 8);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const flyers = [
    {
      title: "Advanced CCTV Cameras",
      subtitle: "Enterprise-Grade Intelligent Optical Security",
      badge: "CCTV Cameras & Thermal Optics",
      description: "ATEX & IECEx certified Zone 1 & 2 explosion-proof and standard dome, bullet, and PTZ cameras. AISI 316L stainless steel for marine & refinery environments.",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200&auto=format&fit=crop",
      features: ["Zone 1 & 2 ATEX Certified", "AISI 316L Stainless Steel", "4K UHD with Starlight Low-light"],
      cta: "Explore Security Cameras"
    },
    {
      title: "Network Video Recorders",
      subtitle: "Fail-Safe, High-Throughput Network Recording (NVR)",
      badge: "NVR Storage Solutions",
      description: "Heavy-duty server-grade video recorders supporting high bandwidth, continuous RAID redundancy, and remote SCADA control room integration.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      features: ["Up to 128 Channels RAID 5/6", "4K Synchronous Local Outputs", "Failover Hot-Spare Integration"],
      cta: "View Storage Systems"
    },
    {
      title: "Smart Hybrid Inverters",
      subtitle: "High-Yield Three-Phase Grid Sync Systems",
      badge: "Solar Inverters",
      description: "Enterprise-grade solar hybrid inverters from 15kW to 500kW+. Seamless transition times (<4ms) with dual high-voltage MPPT efficiency.",
      image: "https://images.unsplash.com/photo-1620000617482-821324eb9a14?q=80&w=1200&auto=format&fit=crop",
      features: ["98.4% Peak Conversion Yield", "Dual HV MPPT Controllers", "Active Grid Peak Shaving"],
      cta: "Explore Hybrid Inverters"
    },
    {
      title: "High-Yield Solar Panels",
      subtitle: "Industrial-Grade Monocrystalline Modules",
      badge: "Solar PV Panels",
      description: "Highest conversion rate solar panels engineered for extreme tropical climates, salt-mist coastal deployment, and heavy industrial load demands.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
      features: ["Premium N-Type Mono Cells", "PID-free / Salt-Mist Resistant", "25-Year Linear Warranty"],
      cta: "View Solar Panels"
    },
    {
      title: "Heavy-Duty Server Racks",
      subtitle: "IP65/IP66 Weatherproof and Seismic Enclosures",
      badge: "Server Racks & Cabinets",
      description: "Premium wall-mounted and floor-standing network cabinets and outdoor server enclosures with active thermostat ventilation.",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop",
      features: ["IP65/IP66 Outdoor Dust-Waterproof", "Seismic Load Rated Structures", "Integrated Smart Thermostat Fans"],
      cta: "View Racks & Cabinets"
    },
    {
      title: "Industrial Junction Boxes",
      subtitle: "Flameproof and Weatherproof Distribution Hubs",
      badge: "Junction Boxes & Panels",
      description: "ATEX explosion-proof and standard IP68 weatherproof junction boxes. Solid impact-resistant GRP and electro-polished stainless steel structures.",
      image: "https://images.unsplash.com/photo-1581092334247-44f23bc37315?q=80&w=1200&auto=format&fit=crop",
      features: ["Zone 1 ATEX Ex-d & Ex-e", "Silicone Gasket IP68 Waterproof", "Pre-machined Custom Cable Entries"],
      cta: "View Junction Boxes"
    },
    {
      title: "Hybrid Composite Cables",
      subtitle: "Long-Range Fibre Optic & Armoured Power Cabling",
      badge: "Hybrid Composite & Armoured Cables",
      description: "High-durability combined data and high-voltage composite cables designed for subsea, offshore drilling, and cross-site industrial networks.",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
      features: ["Simultaneous Data + Power", "ATEX / Oil-Resistant Sheathing", "Crush-Proof Steel-Wire Armour"],
      cta: "Explore Custom Cables"
    },
    {
      title: "Active PoE+ Network Switches",
      subtitle: "High-Throughput Ruggedized Telecom Backbone",
      badge: "Industrial PoE Network Switches",
      description: "Industrial layer 2/3 active network switches engineered for extreme temperature tolerance and rapid redundant ring failovers.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
      features: ["IEEE 802.3bt Ultra PoE 90W", "-40°C to 75°C Industrial Grade", "ERPS Ring Recovery <20ms"],
      cta: "View Network Switches"
    }
  ];

  useEffect(() => {
    // Load products and filter featured
    safeFetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setFeaturedProducts(data.filter((p) => p.featured).slice(0, 3));
      })
      .catch((err) => console.error("Error loading featured products", err));

    // Simulation of blog articles
    setArticles([
      {
        id: "art-1",
        title: "Revolutionizing Zone 1 Security Monitoring with AISI 316L Stainless Optics",
        summary: "How industrial offshore installations are shifting to high-durability stainless steel housings and intelligent AI analytics to protect multi-billion dollar LNG facilities.",
        content: "",
        slug: "revolutionary-zone-1-monitoring-stainless-optics",
        category: "Technical Security",
        date: "2026-06-18",
        author: "Engr. Patrick Timi, CTO",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "art-2",
        title: "Optimizing Off-Grid Solar Microgrids for Rural Telecommunication Nodes",
        summary: "Discover the thermal management techniques and high-yield LiFePO4 configurations that guarantee 99.999% uptime for GSM towers under harsh tropical sun.",
        content: "",
        slug: "optimizing-off-grid-solar-telecom-nodes",
        category: "Renewable Energy",
        date: "2026-07-02",
        author: "Marcus Olayinka, Head of Energy Solutions",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop"
      }
    ]);
  }, []);

  const stats = [
    { label: "Years Experience", value: "15+" },
    { label: "OEM Brands Represented", value: "20+" },
    { label: "Corporate Projects Delivered", value: "850+" },
    { label: "Regional Hubs", value: "4" }
  ];

  const categories = [
    { id: "electronic-security", title: "Electronic Security", icon: Shield, desc: "ATEX Certified CCTV, PTZs, Thermal Scanners, and biometric entry matrices." },
    { id: "renewable-energy", title: "Renewable Energy", icon: Sun, desc: "Stackable LiFePO4 battery modules, dual MPPT hybrid inverters, solar panels." },
    { id: "racks-enclosures", title: "Server Racks & Cabinets", icon: Server, desc: "IP66 outdoor server racks, dynamic cooling server enclosures, vertical PDUs." },
    { id: "hazardous-communication", title: "ATEX Ex Comms", icon: Network, desc: "Intrinsically safe VoIP telephones, flameproof horn sounders, Zone 1 mobiles." }
  ];

  const industries = [
    { title: "Oil & Gas Refineries", tag: "ATEX Zone 1/Zone 2", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop" },
    { title: "Telecommunication Networks", tag: "99.999% Power Uptime", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop" },
    { title: "Marine & Heavy Industry", tag: "Corrosive Grade AISI 316L", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop" }
  ];

  const faqs = [
    { q: "Are Spinel Distribution's hazardous area products certified for Zone 1?", a: "Yes, all hazardous area items are fully certified under ATEX, IECEx, and standard Zone 1 & 2 regulations, crafted with robust flameproof cast housings and intrinsically safe electronics." },
    { q: "Do you supply customized technical engineering drawings for bids?", a: "Yes, our in-house systems design team compiles full single-line diagrams, solar microgrid telemetry drawings, and CCTV optical spacing layouts for corporate project bids." },
    { q: "What is your standard delivery timeline for regional hubs in Nigeria?", a: "Ex-stock items deliver within 24-48 hours to Lagos and Port Harcourt. Special custom OEM builds carry standard factory lead times of 3-6 weeks with expedited air freight options." }
  ];

  const handleProductDetails = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  return (
    <div className="w-full flex flex-col bg-white" id="home-view">
      {/* 1. Stunning Background Carousel of 8 Flyers */}
      <section className="relative w-full bg-[#0a0a0a] text-white overflow-hidden min-h-[580px] flex items-center border-b border-gray-800" id="hero-banner">
        {/* Background slide image with transitions */}
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          <img
            src={flyers[currentSlide].image}
            alt={flyers[currentSlide].title}
            className="w-full h-full object-cover scale-105 filter brightness-[0.22] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          {/* Custom tech scanline gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(0,0,0,0.85)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main content pane */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-black/60 border border-gray-800 px-3.5 py-1.5 rounded-full text-[11px] text-gray-300 font-mono tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7A20] animate-ping" />
              <span>{flyers[currentSlide].badge}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase font-sans">
                {flyers[currentSlide].title.split(" ").map((word, idx) => (
                  <span key={idx} className={idx === flyers[currentSlide].title.split(" ").length - 1 ? "text-[#FF7A20]" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h1>
              <p className="text-[#FF7A20] text-sm sm:text-lg font-bold tracking-wide uppercase font-mono">
                {flyers[currentSlide].subtitle}
              </p>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {flyers[currentSlide].description}
            </p>

            {/* Flyer Specifications Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {flyers[currentSlide].features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center space-x-2 bg-black/40 border border-gray-800/60 p-2.5 rounded-lg backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A20] shrink-0" />
                  <span className="text-xs text-gray-200 font-medium font-mono">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setCurrentView("store")}
                className="bg-[#FF7A20] text-white hover:bg-[#e06512] font-black text-xs px-6 py-3.5 rounded-xl transition cursor-pointer flex items-center space-x-1.5 uppercase tracking-wider shadow-lg shadow-orange-500/10"
                id="hero-btn-browse"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentView("request-quote")}
                className="bg-black/50 border border-gray-700 text-white hover:bg-gray-950 font-bold text-xs px-6 py-3.5 rounded-xl transition cursor-pointer uppercase tracking-wider"
                id="hero-btn-quote"
              >
                Request Custom Quote
              </button>
            </div>
          </div>

          {/* Interactive flyer status pane */}
          <div className="lg:col-span-4 relative hidden lg:flex flex-col items-end space-y-4">
            <div className="bg-black/80 border border-gray-800 p-5 rounded-2xl max-w-[280px] text-right font-mono space-y-3 shadow-2xl">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Active Advertising Campaign</p>
              <p className="text-2xl font-black text-gray-100">0{currentSlide + 1} <span className="text-gray-600">/ 08</span></p>
              <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#FF7A20] h-full transition-all duration-500"
                  style={{ width: `${((currentSlide + 1) / 8) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400">Exclusive distribution and technical commissioning across West Africa.</p>
            </div>
          </div>
        </div>

        {/* Previous / Next Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 8) % 8)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF7A20] text-white border border-gray-800 hover:border-[#FF7A20] w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer z-20"
          aria-label="Previous Campaign"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 8)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF7A20] text-white border border-gray-800 hover:border-[#FF7A20] w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer z-20"
          aria-label="Next Campaign"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Selection Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {flyers.map((_, sIdx) => (
            <button
              key={sIdx}
              onClick={() => setCurrentSlide(sIdx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === sIdx ? "bg-[#FF7A20] w-6" : "bg-gray-600/60 hover:bg-gray-400"
              }`}
              aria-label={`Go to Slide ${sIdx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Interactive Statistics Dashboard */}
      <section className="w-full py-8 bg-gray-50 border-b border-gray-100" id="statistics-dashboard">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white border border-gray-200/60 p-5 rounded-xl shadow-xs flex flex-col justify-center">
              <span className="text-3xl font-black text-[#FF7A20] font-mono leading-none">{s.value}</span>
              <span className="text-xs text-gray-500 font-semibold mt-2">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Product Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 space-y-12" id="featured-categories">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Featured Business Domains</h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-lg mx-auto">Supply, integration and certification services for critical engineering systems.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => setCurrentView("store")}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs hover:shadow-lg hover:border-orange-200 cursor-pointer transition duration-200 group"
              >
                <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center text-[#FF7A20] group-hover:bg-[#FF7A20] group-hover:text-white transition duration-200 mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#FF7A20] transition">{cat.title}</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{cat.desc}</p>
                <div className="flex items-center space-x-1 text-xs font-semibold text-[#FF7A20] mt-4 opacity-0 group-hover:opacity-100 transition">
                  <span>Enter Store Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Core Hardware Showcase */}
      <section className="w-full bg-gray-50 border-t border-b border-gray-100 py-20" id="featured-products">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Featured Core Hardware</h2>
              <p className="text-gray-500 text-xs sm:text-sm">In-stock systems from our certified global engineering OEM lines.</p>
            </div>
            <button
              onClick={() => setCurrentView("store")}
              className="text-[#FF7A20] text-xs font-bold hover:underline flex items-center space-x-1"
            >
              <span>View Entire Hardware Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-gray-50">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute top-3 left-3 bg-gray-900/90 text-white font-semibold font-mono text-[9px] px-2 py-0.5 rounded-sm">
                      {p.productType}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">{p.sku}</span>
                      <span>OEM: {p.brand}</span>
                    </div>
                    <h3
                      onClick={() => handleProductDetails(p.id)}
                      className="font-bold text-sm text-gray-900 hover:text-[#FF7A20] cursor-pointer line-clamp-1"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>
                </div>
                <div className="p-5 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center">
                  <span className="font-black text-[#FF7A20] text-sm">
                    {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                  </span>
                  <button
                    onClick={() => handleProductDetails(p.id)}
                    className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industries Served Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 space-y-12" id="industries-served">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Key Sectors Served</h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">We construct systems that survive the most challenging regulatory and physical environments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind, idx) => (
            <div key={idx} className="relative aspect-3/4 rounded-2xl overflow-hidden group border border-gray-100 shadow-xs">
              <img src={ind.img} alt={ind.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-[10px] text-[#FF7A20] font-mono uppercase tracking-widest font-bold">{ind.tag}</span>
                <h3 className="text-white font-bold text-sm sm:text-base">{ind.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Partner Brands Marquee */}
      <section className="w-full py-12 border-t border-b border-gray-100 bg-gray-50" id="partner-marquee">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
          <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">Representing World-Class Technology Leaders</p>
          <div className="flex flex-wrap items-center justify-around gap-6 grayscale opacity-60">
            <span className="font-mono font-black text-gray-600 text-base">🛡️ HexaShield Security</span>
            <span className="font-mono font-black text-gray-600 text-base">🔋 Vantage Power Systems</span>
            <span className="font-mono font-black text-gray-600 text-base">📞 CommsTect Rugged</span>
            <span className="font-mono font-black text-gray-600 text-base">🗄️ DuraRack Cabinets</span>
          </div>
        </div>
      </section>

      {/* 7. Latest Technical Articles Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 space-y-12" id="technical-articles">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Knowledge Hub & Case Studies</h2>
            <p className="text-gray-500 text-xs sm:text-sm">Technical writeups authored by Spinel's field systems design architects.</p>
          </div>
          <button onClick={() => setCurrentView("about")} className="text-gray-900 text-xs font-bold hover:underline flex items-center space-x-1">
            <span>Enter Knowledge Base</span>
            <BookOpen className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <div key={art.id} className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden hover:shadow-md transition flex flex-col sm:flex-row">
              <img src={art.image} alt={art.title} className="w-full sm:w-48 h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] text-[#FF7A20] uppercase font-mono font-bold">{art.category}</span>
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{art.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{art.summary}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 mt-4 border-t border-gray-50 pt-3">
                  <span>{art.author}</span>
                  <span>{art.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Accordion Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 space-y-12 border-t border-gray-100" id="faqs">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Technical FAQ Desk</h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-sm mx-auto">Get instant clarifications regarding logistics, certifications and specifications.</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-4 bg-gray-50/50 hover:bg-gray-50 flex items-center justify-between font-semibold text-xs sm:text-sm text-gray-900 focus:outline-none cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-[#FF7A20] text-sm">{activeFaq === idx ? "−" : "+"}</span>
              </button>
              {activeFaq === idx && (
                <div className="p-4 text-xs text-gray-600 bg-white border-t border-gray-200 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
