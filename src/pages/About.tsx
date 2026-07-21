import { useState } from "react";
import { 
  Eye, 
  Target, 
  Award, 
  ShieldCheck, 
  Globe, 
  Check, 
  Tag, 
  Cpu, 
  Truck, 
  Wrench, 
  ShieldAlert, 
  Settings, 
  Users, 
  Camera, 
  Sun, 
  Network, 
  Router, 
  Zap, 
  Database, 
  Cable, 
  Layers, 
  Plug, 
  Flame, 
  Radio, 
  Building2, 
  Factory, 
  HeartPulse, 
  GraduationCap, 
  Landmark, 
  Server, 
  Building, 
  Briefcase,
  ChevronRight,
  Info
} from "lucide-react";

export default function About() {
  // Interactive state for Vision/Mission Pillars
  const [activeStrategicTab, setActiveStrategicTab] = useState<"vision" | "mission">("vision");

  // Interactive state for Why Choose Spinel Distribution (glowing highlighted details)
  const [selectedWhyIdx, setSelectedWhyIdx] = useState<number>(0);

  // Interactive state for Product Portfolio tab
  const [selectedPortfolioTab, setSelectedPortfolioTab] = useState<number>(0);

  // Interactive state for Industries We Serve selector
  const [selectedIndustryIdx, setSelectedIndustryIdx] = useState<number>(0);

  const coreValues = [
    {
      title: "Explosion-Proof Safety Standards",
      desc: "Our hardware complies strictly with global ATEX / IECEx directives. We prioritize structural survival in volatile refinery zones.",
      icon: ShieldCheck
    },
    {
      title: "OEM Supply Integrity",
      desc: "Zero gray-market policy. Every battery, switch, and camera is sourced direct from certified production lines with active warrantee keys.",
      icon: Award
    },
    {
      title: "Logistics Excellence",
      desc: "Direct ex-stock delivery from regional hubs in Lagos and PH to reduce lead delays and secure bid compliance milestones.",
      icon: Globe
    }
  ];

  // Vision & Mission Pillars
  const strategicPillars = {
    vision: [
      { title: "Gateway to Innovation", desc: "Bringing the most advanced and robust industrial technologies directly to the African landscape." },
      { title: "Empowering Sustainability", desc: "Pioneering hybrid solar and clean distribution setups to secure critical infrastructure uptime." },
      { title: "Uncompromising Safety", desc: "Setting the standard for explosion-proof safety designs in maritime and volatile sectors." }
    ],
    mission: [
      { title: "Sourcing Integrity", desc: "Ensuring 100% genuine products with full backing directly from certified international OEMs." },
      { title: "Engineering First", desc: "Supporting our clients with design checks, site surveys, and continuous post-delivery technical audits." },
      { title: "Logistics Reliability", desc: "Optimizing supply chain timelines through strategic localized distribution hubs." }
    ]
  };

  // Why Choose Spinel Distribution Dataset (8 core items)
  const whyChooseUsData = [
    {
      title: "Genuine OEM Products",
      icon: Award,
      short: "100% verified authentic systems with active warranty certificates.",
      detail: "We operate a strict zero gray-market policy. Every camera, router, switch, solar controller, and battery is sourced directly from certified production lines. This ensures your project benefits from authentic hardware, secure firmware upgrades, and reliable manufacturer warranty compliance."
    },
    {
      title: "Competitive Pricing",
      icon: Tag,
      short: "Optimized corporate and project distribution pricing tier.",
      detail: "By leveraging our direct factory relationships and bulk purchasing agreements, we eliminate unnecessary middlemen. This cost optimization is passed directly to our corporate clients, ensuring maximum value for capital budgets and highly competitive tenders."
    },
    {
      title: "Technical Expertise",
      icon: Cpu,
      short: "Led by certified physical security and systems engineers.",
      detail: "Our company is engineering-led. Our specialists have deep technical certifications from major global brands. We don't just sell components; we analyze systems, verify compatibility, and assist in designing robust, long-term technical architectures."
    },
    {
      title: "Fast Nationwide Delivery",
      icon: Truck,
      short: "Direct ex-stock distribution from regional warehouse hubs.",
      detail: "With strategic inventory holding facilities in major industrial hubs, we are uniquely equipped to meet pressing deployment timelines. Our established transport network secures swift transit to project sites across Lagos, Port Harcourt, and beyond."
    },
    {
      title: "Engineering Support",
      icon: Wrench,
      short: "Comprehensive pre-sales design study and architecture validation.",
      detail: "We assist corporate engineering offices during the critical planning stages of RFPs and RFQs. We help compile technical submittals, run site calculation metrics, check electrical compatibility, and validate system designs before orders are finalized."
    },
    {
      title: "After-Sales Service",
      icon: ShieldAlert,
      short: "Dedicated post-delivery assistance and warranty handling.",
      detail: "Our commitment does not end at delivery. We provide thorough after-sales setup guidance, firmware updating protocols, diagnostic assistance, and fast-track warranty processing. Our service desk ensures your systems maintain absolute uptime."
    },
    {
      title: "Trusted Global Partnerships",
      icon: Globe,
      short: "Direct alignment with elite international technology OEMs.",
      detail: "Spinel Distribution is a certified, recognized distributor for top-tier international manufacturers. We participate in direct product training, roadmap discussions, and specialized design integrations to keep your projects at the global leading edge."
    },
    {
      title: "Customized Solutions",
      icon: Settings,
      short: "Fully tailored, modular hardware bundles for distinct tasks.",
      detail: "Every operating zone has unique environmental and regulatory conditions. We specialize in assembling tailored hardware bundles, custom cable lengths, specific enclosure ratings (IP66/IP67/ATEX), and customized systems built to survive your site requirements."
    }
  ];

  // Product Portfolio Dataset (9 core categories)
  const productPortfolioData = [
    {
      title: "Security Surveillance",
      icon: Camera,
      badge: "Commercial & Rugged",
      desc: "High-capacity security systems designed to protect critical assets.",
      systems: [
        "Intelligent AI-Powered IP CCTV Cameras",
        "AISI 316L Stainless Explosion-Proof Dome Cameras",
        "High-definition PTZ Thermal Imaging Scanners",
        "Enterprise-grade Network Video Recorders (NVR) with RAID Backup"
      ],
      specHighlight: "Zone 1 & 2 ATEX / IECEx certified housings with intelligent motion analytical software."
    },
    {
      title: "Renewable Energy",
      icon: Sun,
      badge: "High-Efficiency Solar",
      desc: "Reliable power architectures to offset rising operational energy costs.",
      systems: [
        "Monocrystalline Solar PV Panels with high salt-mist resistance",
        "Smart Hybrid Inverters and Grid-Interactive Inverters",
        "High-voltage Modular MPPT Solar Chargers",
        "Premium stackable Lithium Iron Phosphate (LiFePO4) Battery Vaults"
      ],
      specHighlight: "Thermal management enclosures designed for continuous active operations in desert climates."
    },
    {
      title: "ICT Infrastructure",
      icon: Network,
      badge: "Enterprise Core",
      desc: "Robust backbones for high-speed corporate network distribution.",
      systems: [
        "High-density optical fiber terminal distribution panels",
        "Layer 3 enterprise routing engines and trunking cards",
        "SIP-compatible VoIP communication exchanges",
        "High-capacity wireless microwave point-to-point transmission grids"
      ],
      specHighlight: "Enterprise-grade packet routing with hardware-level encryption and full redundancy."
    },
    {
      title: "Industrial Networking",
      icon: Router,
      badge: "Hardened Systems",
      desc: "Reliable communications in physically challenging environments.",
      systems: [
        "Weatherproof IP67 Managed/Unmanaged PoE Switches",
        "Hardened fiber optic media transceivers",
        "DIN-rail mounted signal surge surge arrestors",
        "Industrial wireless repeaters for extreme temperatures"
      ],
      specHighlight: "-40°C to +85°C operating threshold, heavy shock and vibration resistance."
    },
    {
      title: "Power Distribution",
      icon: Zap,
      badge: "Grid Stability",
      desc: "Comprehensive power backup and safety switches.",
      systems: [
        "Double-conversion Online UPS Racks",
        "Automatic Transfer Switches (ATS) with remote telemetry",
        "Main Distribution Boards (MDB) with automated breakers",
        "Isolation transformers for sensitive instrumentation panels"
      ],
      specHighlight: "Pure sine-wave output with sub-millisecond transfer times for critical control rooms."
    },
    {
      title: "Racks & Enclosures",
      icon: Database,
      badge: "Equipment Housing",
      desc: "Secure physical enclosures with active environment cooling.",
      systems: [
        "Premium 19-inch floor-standing server racks",
        "IP66 weatherproof outdoor telecommunication field enclosures",
        "Acoustically insulated soundproof cabinets",
        "Wall-mounted swing-out network distribution panels"
      ],
      specHighlight: "Heavy-duty steel gauge, electrostatically treated against humid saline air corrosion."
    },
    {
      title: "Hybrid Composite Cables",
      icon: Cable,
      badge: "Integrated Signal",
      desc: "Combined power and fiber optic transmission lines.",
      systems: [
        "Armored fiber-copper hybrid composite cabling reels",
        "Direct-burial high-bandwidth communication lines",
        "Low-Smoke Zero-Halogen (LSZH) marine-grade cables",
        "Extreme-duty flexible trailing cabling arrays"
      ],
      specHighlight: "Dual-core power and multi-strand single-mode fiber with heavy-gauge galvanized steel armor."
    },
    {
      title: "Ex-Proof Equipments",
      icon: ShieldCheck,
      badge: "Explosion Safety",
      desc: "Specialized equipment built to mitigate electrical sparks in volatile areas.",
      systems: [
        "Ex-d and Ex-e certified explosion-protected junctions boxes",
        "Intrinsically safe field communication intercom stations",
        "Flameproof acoustic sounders and strobe warning arrays",
        "ATEX-certified specialized handheld thermal diagnostic devices"
      ],
      specHighlight: "Fully certified by European ATEX, International IECEx, and local maritime regulators."
    },
    {
      title: "Electrical Accessories",
      icon: Plug,
      badge: "Industrial Connections",
      desc: "Premium grade terminal links and cabling structures.",
      systems: [
        "Heavy-duty industrial connectors and multi-phase plugs",
        "High-conductivity copper grounding strips and lightning kits",
        "Flexible metal-core liquid-tight conduit tubing",
        "Precision multi-tier terminal blocks for electrical panels"
      ],
      specHighlight: "Built using solid copper blocks and heat-resistant self-extinguishing polycarbonates."
    }
  ];

  // Industries We Serve Dataset (10 sectors)
  const industriesWeServeData = [
    {
      name: "Oil & Gas",
      icon: Flame,
      summary: "Petrochemical Refineries, Drilling Rigs, and Floating Production Vessels.",
      solution: "We supply specialized AISI 316L stainless steel explosion-proof cameras (ATEX/IECEx certified), rugged single-mode fiber infrastructure, intrinsically safe communication intercoms, and flameproof instrumentation power accessories configured to withstand offshore salt spray and combustible atmospheres."
    },
    {
      name: "Telecommunications",
      icon: Radio,
      summary: "Cellular Towers, Signal Distribution Arrays, and Central Nodes.",
      solution: "Provision of high-performance off-grid solar energy systems utilizing Vantage hybrid solar inverters, dual-MPPT smart controllers, and stackable lithium-iron phosphate (LiFePO4) battery systems to guarantee continuous cellular tower operations and eliminate operational diesel expenditure."
    },
    {
      name: "Government",
      icon: Building2,
      summary: "Municipal Buildings, Emergency Response Agencies, and Civil Command Hubs.",
      solution: "Secure, state-of-the-art municipal security backbones. We offer unified, high-density optical fiber grids, high-definition IP camera networks with AI facial and vehicle analytics, central server rack cabinets, and emergency double-conversion online UPS systems."
    },
    {
      name: "Manufacturing",
      icon: Factory,
      summary: "Heavy Assembly Lines, Automated Plants, and Storage Depots.",
      solution: "Hardened industrial network communications. Our portfolio provides managed IP67 PoE switches designed for high temperature swings, hardened media converters, armored hybrid cabling, and surge isolation panels to insulate robotic assembly lines."
    },
    {
      name: "Healthcare",
      icon: HeartPulse,
      summary: "Hospital Centers, Critical Medical Laboratories, and Storage Vaults.",
      solution: "Reliable power stability and networks. Double-conversion online UPS arrays designed to safeguard sensitive scanning devices, clean surgical suite network enclosures, high-capacity CAT6A networking, and robust hospital-wide Wi-Fi distribution switches."
    },
    {
      name: "Education",
      icon: GraduationCap,
      summary: "University Campuses, Academic Research Parks, and Administration Complexes.",
      solution: "Structured campus-wide high-capacity network routing, fiber optic connection trunks, high-density smart routers, outdoor surveillance systems for safe campuses, and robust server racks for administrative database systems."
    },
    {
      name: "Banking & Finance",
      icon: Landmark,
      summary: "Corporate Bank Head Offices, Vault Vaults, and Cash Centers.",
      solution: "Elite, high-bandwidth surveillance and communication paths. Centralized NVR video vaults with multi-terabyte RAID arrays, network switches with advanced packet encryption, access-controlled equipment cabinets, and reliable backup battery systems."
    },
    {
      name: "Data Centers",
      icon: Server,
      summary: "High-Tier Server Facilities, Colocation Sites, and Fiber Entry Vaults.",
      solution: "Heavy-duty server cabinet grids, precise horizontal cable organizers, intelligent PDU switches, highly stable copper-fiber hybrid trunks, copper earthing grounding bars, and secure environmental sensor monitoring frameworks."
    },
    {
      name: "Commercial Buildings",
      icon: Building,
      summary: "Skyscraper Complexes, Corporate Office Towers, and Luxury Warehouses.",
      solution: "Integrated structured cabling, smart building power accessories, fiber-to-the-desk routing distribution panels, outdoor-indoor IP dome security arrays, central network racks, and ATS automated transfer units."
    },
    {
      name: "Enterprise Business",
      icon: Briefcase,
      summary: "Multi-branch companies, large offices, and trade facilities.",
      solution: "Fully scalable enterprise routers, managed gigabit PoE network switches, unified telecommunication VOIP boxes, standard 19-inch racks, and integrated visual security configurations tailored for corporate networks."
    }
  ];

  return (
    <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-12 space-y-20" id="about-view">
      {/* 1. Company Mission/Vision Intro Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-intro">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[#FF7A20] font-bold text-xs uppercase tracking-widest font-mono">About Spinel Distribution</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight uppercase">
            Delivering Innovative ICT, Electronic Security & Renewable Energy Products Across Africa
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed font-sans">
            Spinel is a leading ICT and engineering Distribution company, delivering high-quality ICT products, renewable energy systems, industrial communication system, networking equipment, and power distribution infrastructure. Through strategic partnerships with globally recognized OEMs, we help businesses across Africa build secure, connected, and future-ready infrastructures.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed font-sans">
            Our company is not merely a supplier; we are an engineering-led team that conducts site studies, design checks, and regulatory assessments to ensure that when hardware leaves our warehouses, it thrives in active environments.
          </p>
        </div>
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="border border-gray-100 p-2.5 rounded-2xl bg-gray-50/50 shadow-xs">
            <img
              src="https://i.ibb.co/SwCdYPGr/spinel-team-1.png"
              alt="Systems Testing Bench"
              className="rounded-xl object-cover w-full h-[280px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 2. Interactive Strategic Direction: Our Vision & Our Mission Section */}
      <section className="space-y-8 bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl" id="vision-mission-strategic">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-6">
          <div className="space-y-2">
            <span className="text-[#FF7A20] font-extrabold text-xs uppercase tracking-wider font-mono">Strategic Framework</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Our Core Purpose & Vision</h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Click the tabs below to explore our core strategic mandate and the fundamental pillars that drive Spinel's daily operations.
            </p>
          </div>
          
          {/* Interactive Navigation Tabs */}
          <div className="flex bg-white border border-gray-200 p-1.5 rounded-xl self-start md:self-end">
            <button
              onClick={() => setActiveStrategicTab("vision")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeStrategicTab === "vision"
                  ? "bg-[#FF7A20] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
              }`}
            >
              <Eye className="w-4.5 h-4.5" />
              <span>Our Vision</span>
            </button>
            <button
              onClick={() => setActiveStrategicTab("mission")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeStrategicTab === "mission"
                  ? "bg-[#FF7A20] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
              }`}
            >
              <Target className="w-4.5 h-4.5" />
              <span>Our Mission</span>
            </button>
          </div>
        </div>

        {/* Vision/Mission Display Pane with Interactive Animation/Card layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="inline-flex p-3 bg-orange-50 rounded-xl text-[#FF7A20]">
                  {activeStrategicTab === "vision" ? <Eye className="w-7 h-7" /> : <Target className="w-7 h-7" />}
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase">
                  {activeStrategicTab === "vision" ? "The Horizon We Aim For" : "The Core Mission We Live"}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                  {activeStrategicTab === "vision" 
                    ? "To be the ultimate and most reliable distribution gateway for world-class ICT, electronic security, and renewable energy technologies in Africa and emerging markets, powering sustainable industrial growth and connectivity."
                    : "To deliver exceptional value to our clients and OEM partners through the seamless procurement and supply of genuine, high-performance technology products, backed by technical engineering support, responsive logistics, and unyielding integrity."
                  }
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-6 text-xs text-[#FF7A20] font-bold tracking-wider uppercase flex items-center space-x-1.5">
                <span>Active strategic target</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Strategic Pillars of Excellence</h4>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              {strategicPillars[activeStrategicTab].map((pillar, idx) => (
                <div key={idx} className="bg-white hover:border-orange-200 border border-gray-200/60 p-5 rounded-2xl flex items-start space-x-4 transition shadow-xs group">
                  <div className="bg-orange-50/75 text-[#FF7A20] group-hover:bg-[#FF7A20] group-hover:text-white transition w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold font-mono text-sm">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide group-hover:text-[#FF7A20] transition">{pillar.title}</h5>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="space-y-8" id="corporate-values">
        <div className="text-center space-y-1.5">
          <span className="text-[#FF7A20] font-bold text-xs uppercase tracking-widest font-mono">Our Directives</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Our Corporate Values</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">The unyielding principles guiding Spinel's engineering distributions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl space-y-4 hover:shadow-md transition">
                <div className="bg-orange-50 text-[#FF7A20] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 uppercase tracking-wide">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-sans">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "Why Choose Spinel Distribution" Highly Engaging Interactive Grid Section */}
      <section className="space-y-8 bg-gray-950 text-white p-8 sm:p-12 rounded-3xl" id="why-choose-spinel">
        <div className="max-w-3xl space-y-2">
          <span className="text-[#FF7A20] font-bold text-xs uppercase tracking-widest font-mono">The Spinel Advantage</span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Why Choose Spinel Distribution?</h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Click on any advantage card below to inspect the dedicated execution standards and system assurances we guarantee for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Active advantage detailed presentation panel (Cols 5) */}
          <div className="lg:col-span-5 flex">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col justify-between w-full h-full relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-orange-500/10 border border-orange-500/20 text-[#FF7A20] rounded-xl">
                  {(() => {
                    const IconComponent = whyChooseUsData[selectedWhyIdx].icon;
                    return <IconComponent className="w-8 h-8" />;
                  })()}
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-wide border-b border-gray-800 pb-3">
                  {whyChooseUsData[selectedWhyIdx].title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {whyChooseUsData[selectedWhyIdx].detail}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-800 flex items-center space-x-2 text-xs text-gray-500">
                <Info className="w-4 h-4 text-[#FF7A20]" />
                <span>Verified Spinel Operational Standard</span>
              </div>
            </div>
          </div>

          {/* Selector Grid of 8 Advantages (Cols 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseUsData.map((item, idx) => {
              const ItemIcon = item.icon;
              const isSelected = selectedWhyIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedWhyIdx(idx)}
                  className={`text-left p-5 rounded-2xl border transition duration-300 flex items-start space-x-4 cursor-pointer focus:outline-none ${
                    isSelected
                      ? "bg-[#FF7A20] border-[#FF7A20] text-white shadow-xl translate-x-1"
                      : "bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-gray-900/80"
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-white/15 text-white" : "bg-gray-800 text-[#FF7A20]"}`}>
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-extrabold text-sm uppercase tracking-wide ${isSelected ? "text-white" : "text-white"}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isSelected ? "text-orange-50" : "text-gray-400"}`}>
                      {item.short}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. "Our Product Portfolio" Segment with Dynamic Profile Display */}
      <section className="space-y-8" id="product-portfolio">
        <div className="space-y-1.5 text-center">
          <span className="text-[#FF7A20] font-bold text-xs uppercase tracking-widest font-mono">Our Distribution Reach</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Our Product Portfolio</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Explore the 9 major technology divisions under Spinel Distribution. Click a tab division to view its core components and technical advantages.
          </p>
        </div>

        {/* Portfolio Tabs Navigation Grid */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-gray-100 pb-4">
          {productPortfolioData.map((cat, idx) => {
            const CatIcon = cat.icon;
            const isSelected = selectedPortfolioTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedPortfolioTab(idx)}
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer border ${
                  isSelected
                    ? "bg-[#FF7A20] border-[#FF7A20] text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                }`}
              >
                <CatIcon className="w-4 h-4" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Division Presentation Panel */}
        <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="bg-orange-50 text-[#FF7A20] font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-orange-100">
                {productPortfolioData[selectedPortfolioTab].badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 uppercase">
                {productPortfolioData[selectedPortfolioTab].title} Division
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {productPortfolioData[selectedPortfolioTab].desc}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Core Systems Distributed</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {productPortfolioData[selectedPortfolioTab].systems.map((sys, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-gray-700 text-xs sm:text-sm">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span className="font-sans font-medium">{sys}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border-l-4 border-[#FF7A20] p-4 rounded-r-xl">
              <h5 className="font-bold text-xs text-gray-900 uppercase mb-0.5">Engineering Specifications Guarantee</h5>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">
                {productPortfolioData[selectedPortfolioTab].specHighlight}
              </p>
            </div>
          </div>

          {/* Visual Presentation side for portfolio division */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl flex flex-col justify-center items-center text-center space-y-4">
              <div className="p-5 bg-white rounded-full text-[#FF7A20] shadow-md border border-gray-100">
                {(() => {
                  const CurrentIcon = productPortfolioData[selectedPortfolioTab].icon;
                  return <CurrentIcon className="w-10 h-10" />;
                })()}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900 text-sm sm:text-base uppercase">Premium Sourcing Alignment</p>
                <p className="text-xs text-gray-500 font-sans max-w-xs">
                  We verify each batch with laser telemetry test rigs before scheduling client delivery and port dispatch.
                </p>
              </div>
              <span className="inline-flex items-center space-x-1.5 text-xs text-[#FF7A20] font-bold">
                <span>Direct Ex-Stock Available</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "Industries We Serve" Dynamic Interactive Segment */}
      <section className="space-y-8 bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl" id="industries-we-serve">
        <div className="space-y-1.5">
          <span className="text-[#FF7A20] font-bold text-xs uppercase tracking-widest font-mono">Operational Environments</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Industries We Serve</h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Click on any key sector below to discover how Spinel Distribution configures premium technological setups to match physical and regulatory standards of that industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* List of Sectors Grid (Cols 5) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {industriesWeServeData.map((ind, idx) => {
              const IndIcon = ind.icon;
              const isSelected = selectedIndustryIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndustryIdx(idx)}
                  className={`text-left p-4 rounded-xl border transition flex flex-col justify-between cursor-pointer text-xs focus:outline-none ${
                    isSelected
                      ? "bg-[#FF7A20] border-[#FF7A20] text-white shadow-lg -translate-y-1"
                      : "bg-white border-gray-200 text-gray-600 hover:border-orange-200 hover:text-gray-950"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg w-fit mb-4 ${isSelected ? "bg-white/20 text-white" : "bg-orange-50 text-[#FF7A20]"}`}>
                    <IndIcon className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold uppercase tracking-wide text-[11px] leading-tight block">
                    {ind.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Solution Presentation Container (Cols 7) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200/60 p-6 sm:p-8 rounded-2xl shadow-xs h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                  <div className="p-2.5 bg-orange-50 text-[#FF7A20] rounded-xl">
                    {(() => {
                      const ActiveIndIcon = industriesWeServeData[selectedIndustryIdx].icon;
                      return <ActiveIndIcon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-black text-base text-gray-900 uppercase">
                      {industriesWeServeData[selectedIndustryIdx].name} Solutions
                    </h3>
                    <p className="text-xs text-gray-400 font-sans">
                      Sector Application: {industriesWeServeData[selectedIndustryIdx].summary}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wide">Custom-Tailored Solution Statement</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">
                    {industriesWeServeData[selectedIndustryIdx].solution}
                  </p>
                </div>
              </div>

              <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs text-gray-900 font-extrabold uppercase tracking-wide">Need technical consultation for this sector?</p>
                  <p className="text-[11px] text-gray-500 font-sans">Our design engineers will review your site plans.</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-orange-200 text-[#FF7A20] shadow-xs">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
