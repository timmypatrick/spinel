import { useState, useEffect } from "react";
import { Shield, Sun, Server, Cpu, Network, ArrowRight, Zap, Award, Star, BookOpen, Clock, Globe, CheckCircle2, ShoppingCart } from "lucide-react";
import { Product, BlogArticle } from "../types";
import { safeFetch } from "../lib/dataService";
import { VortexParticlesCanvas } from "../components/VortexParticlesCanvas";
import { motion, AnimatePresence } from "motion/react";

const STATIC_FLYERS = [
  {
    title: "LiFePO4 Energy Storage",
    subtitle: "High-Density Smart Modular Battery Racks",
    badge: "Lithium Battery Systems",
    description: "Heavy-duty smart energy storage banks built for heavy-duty industrial backup power, grid stability, and deep daily cycles.",
    image: "https://i.ibb.co/HfTqzX2F/e4b2d89a-614a-4aa3-ae1d-5a6fce9b41a8.png",
    features: ["6000+ Deep Charge Cycles", "Built-in Smart BMS Protection", "Modular Scalable Rack Design"],
    cta: "View Lithium Storage"
  },
  {
    title: "Heavy-Duty Server Racks",
    subtitle: "IP65/IP66 Weatherproof and Seismic Enclosures",
    badge: "Server Racks & Cabinets",
    description: "Premium wall-mounted and floor-standing network cabinets and outdoor server enclosures with active thermostat ventilation.",
    image: "https://i.ibb.co/ktYSJd0/e4868fd7-d32e-4214-8de2-c1fc8a694adb.png",
    features: ["IP65/IP66 Outdoor Dust-Waterproof", "Seismic Load Rated Structures", "Integrated Smart Thermostat Fans"],
    cta: "View Racks & Cabinets"
  },
  {
    title: "Ex-Communication System",
    subtitle: "ATEX Zone 1 Intrinsically Safe VoIP Phones",
    badge: "Hazardous Communication",
    description: "Heavy-duty, weather-resistant, flameproof communications equipment engineered for hazardous industries, offshore platforms, and mines.",
    image: "https://i.ibb.co/BVk0bN2t/9e4bdef3-3007-4a0b-8117-9ea6305be664.png",
    features: ["Zone 1 ATEX Ex-d certified", "IP66 Weatherproof Enclosure", "Intrinsically Safe Handsets"],
    cta: "Explore Ex-Communication System"
  },
  {
    title: "Heavy-Duty Server Racks",
    subtitle: "IP65/IP66 Weatherproof and Seismic Enclosures",
    badge: "Server Racks & Cabinets",
    description: "Premium wall-mounted and floor-standing network cabinets and outdoor server enclosures with active thermostat ventilation.",
    image: "https://i.ibb.co/r2my2CSV/280f3ec5-82a7-449a-8e16-e98cbfcc54cf.png",
    features: ["IP65/IP66 Outdoor Dust-Waterproof", "Seismic Load Rated Structures", "Integrated Smart Thermostat Fans"],
    cta: "View Racks & Cabinets"
  },
  {
    title: "One Cable. Multiple Connections",
    subtitle: "Long-Range Fibre Optic & Armoured Power Cabling",
    badge: "Power • Fiber • Data",
    description: "High-durability combined data and high-voltage composite cables designed for subsea, offshore drilling, and cross-site industrial networks.",
    image: "https://i.ibb.co/rRw0xbjc/60e4e232-1282-49d7-be3c-524b598bbcee.png",
    features: ["Simultaneous Data + Power", "ATEX / Oil-Resistant Sheathing", "Crush-Proof Steel-Wire Armour"],
    cta: "Explore Custom Cables"
  },
  {
    title: "Smart Hybrid Inverters",
    subtitle: "High-Yield Three-Phase Grid Sync Systems",
    badge: "Solar Inverters",
    description: "Enterprise-grade solar hybrid inverters from 15kW to 500kW+. Seamless transition times (<4ms) with dual high-voltage MPPT efficiency.",
    image: "https://i.ibb.co/yn19C6Tb/5a45d505-065e-4482-8a37-1d12aeb79b2f.png",
    features: ["98.4% Peak Conversion Yield", "Dual HV MPPT Controllers", "Active Grid Peak Shaving"],
    cta: "Explore Hybrid Inverters"
  },
  {
    title: "Advanced CCTV & Video Surveillance",
    subtitle: "High-Throughput Ruggedized Telecom Backbone",
    badge: "24/7 Security Monitoring",
    description: "Protect your people, property, and operations with high-definition CCTV cameras and intelligent network video recorders that provide real-time monitoring, secure recording, and 24/7 surveillance.",
    image: "https://i.ibb.co/whSbjCv9/0b703286-756a-4685-98ab-d265e609242b.png",
    features: ["IEEE 802.3bt Ultra PoE 90W", "-40°C to 75°C Industrial Grade", "ERPS Ring Recovery <20ms"],
    cta: "View CCTV Camera"
  },
  {
    title: "Network Video Recorders",
    subtitle: "Fail-Safe, High-Throughput Network Recording (NVR)",
    badge: "NVR Storage Solutions",
    description: "Heavy-duty server-grade video recorders supporting high bandwidth, continuous RAID redundancy, and remote SCADA control room integration.",
    image: "https://i.ibb.co/rYdWyVy/1e9363de-2e5d-4f8f-8ad0-c74b346660f2.png",
    features: ["Up to 128 Channels RAID 5/6", "4K Synchronous Local Outputs", "Failover Hot-Spare Integration"],
    cta: "View Storage Systems"
  }
];

interface HomeProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  currency: "USD" | "NGN";
  addToCart: (product: Product, quantity?: number) => void;
}

export default function Home({
  setCurrentView,
  setSelectedProductId,
  currency,
  addToCart
}: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [shopMoreProducts, setShopMoreProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Randomly shuffle the 10 flyer images on load
  const [shuffledFlyers] = useState(() => {
    return [...STATIC_FLYERS].sort(() => Math.random() - 0.5);
  });

  // Auto-rotate background carousel of flyers every 5 seconds
  useEffect(() => {
    if (shuffledFlyers.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % shuffledFlyers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [shuffledFlyers]);

  useEffect(() => {
    // Load products and filter featured
    safeFetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setFeaturedProducts(data.filter((p) => p.featured).slice(0, 3));
        // Shuffle and take 50 products randomly
        const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 50);
        setShopMoreProducts(shuffled);
      })
      .catch((err) => console.error("Error loading products", err));

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
    { q: "What products does Spinel Distribution offer?", a: "Spinel supplies a wide range of ICT, electronic security, renewable energy, multimedia and industrial products" },
    { q: "How reliable are your products?", a: "We partner with leading global OEMs to provide genuine, high-quality products backed by manufacturer warranties and technical support." },
    { q: "Can I request a quotation before placing an order?", a: "Absolutely. You can use our Request Quote page to submit your requirements, and our sales team will provide a customized quotation tailored to your need." },
    { q: "What about your products with fixed price tag?", a: "They give you access to instant procurement and on-time delivery" },
    { q: "Do you provide installation services?", a: "Yes. We can connect you with our technical team or trusted partners for installation, commissioning, and technical support on selected solutions." },
    { q: "How can I track my order?", a: "Once your order has been processed, you'll receive updates on its status. You can also contact our support team for order tracking assistance." },
    { q: "How do I know which product is right for my project?", a: "Our technical sales team is available to help you select the most suitable products based on your project requirements, and application." },
  ];

  const handleProductDetails = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  return (
    <div className="w-full flex flex-col bg-white" id="home-view">
      {/* 1. Pure Image High-Visibility Carousel of Shuffled Flyers */}
      <section className="relative w-full bg-[#0A0F1A] overflow-hidden h-[240px] sm:h-[380px] md:h-[500px] lg:h-[600px] flex items-center justify-center border-b border-gray-900" id="hero-banner">
        {/* Glowing Orange Vortex Particles Canvas Background */}
        <VortexParticlesCanvas />

        {/* Center Carousel Slide Image with Professional Animation */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.06, rotate: 1.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-8 select-none"
            >
              {shuffledFlyers[currentSlide] && (
                <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-12 max-w-6xl mx-auto px-6 md:px-12">
                  {/* Left Column: Campaign / Product Text floating over vortex */}
                  <div className="hidden md:flex md:col-span-5 text-left space-y-3 md:space-y-4 select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex-col justify-center items-start">
                    <span className="inline-block bg-[#FF7A20] text-white text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {shuffledFlyers[currentSlide].badge}
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight font-sans">
                      {shuffledFlyers[currentSlide].title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium">
                      {shuffledFlyers[currentSlide].description}
                    </p>
                  </div>

                  {/* Right Column: Product Image with beautiful dropshadow */}
                  <div className="col-span-1 md:col-span-7 h-full w-full flex items-center justify-center max-h-[90%] md:max-h-[95%]">
                    <img
                      src={shuffledFlyers[currentSlide].image}
                      alt={shuffledFlyers[currentSlide].title}
                      className="max-h-full max-w-full scale-120 md:scale-115 object-contain mx-auto select-none filter drop-shadow-[0_15px_40px_rgba(255,122,32,0.35)] transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selection Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-20 bg-black/40 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
          {shuffledFlyers.map((_, sIdx) => (
            <button
              key={sIdx}
              onClick={() => setCurrentSlide(sIdx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === sIdx ? "bg-[#FF7A20] w-5" : "bg-gray-500/60 hover:bg-white"
              }`}
              aria-label={`Go to Slide ${sIdx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Shop More Products (50 random items) - Inserted as requested */}
      <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-16 space-y-8" id="shop-more-products">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <h2 
              onClick={() => setCurrentView("store")}
              className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 hover:text-[#FF7A20] cursor-pointer transition flex items-center gap-2"
            >
              <span>View More Products</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF7A20]" />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {shopMoreProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => handleProductDetails(p.id)}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 hover:scale-[1.03] transition-all duration-300 transform flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-square bg-gray-50/50 flex items-center justify-center p-2 overflow-hidden">
                  <img 
                    src={p.images[0]} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain mx-auto group-hover:scale-105 transition-transform duration-300" 
                    referrerPolicy="no-referrer" 
                    onError={(e) => {
                      e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                    }}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] sm:text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded inline-block">
                    {p.sku}
                  </span>
                  <h3
                    className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#FF7A20] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]"
                  >
                    {p.name}
                  </h3>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50/40 flex justify-between items-center">
                <span className="font-extrabold text-[#FF7A20] text-sm sm:text-base">
                  {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                  className="bg-[#FF7A20] hover:bg-orange-600 text-white p-2.5 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center"
                  title="Add to Quote Cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Accordion Grid */}
      <section className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-20 space-y-12" id="faqs">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">ICT, Security & Renewable Energy FAQs</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">Learn more about our electronic security products, hazardous-area communication systems, renewable energy equipment, networking solutions, delivery, quotations, and after-sales support.</p>
        </div>
        <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-4 bg-gray-50/50 hover:bg-gray-50 flex items-center justify-between font-semibold text-sm sm:text-base text-gray-900 focus:outline-none cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-[#FF7A20] text-sm sm:text-base">{activeFaq === idx ? "−" : "+"}</span>
              </button>
              {activeFaq === idx && (
                <div className="p-4 text-sm text-gray-600 bg-white border-t border-gray-200 leading-relaxed">
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
