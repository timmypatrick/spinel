import { Product, Category, Solution, OEMPartner, BlogArticle } from "../types";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "electronic-security",
    name: "Electronic Security",
    slug: "electronic-security",
    iconName: "Shield",
    subcategories: ["Dome Camera", "Bullet Camera", "PTZ Camera", "Box Camera", "Panoramic Camera", "Thermal Camera", "Explosion-Proof Camera", "ANPR Camera", "Fisheye Camera"]
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy",
    slug: "renewable-energy",
    iconName: "Sun",
    subcategories: ["Solar Panels", "Solar Batteries", "Inverters", "Charge Controllers", "Solar Accessories"]
  },
  {
    id: "racks-enclosures",
    name: "Racks & Enclosures",
    slug: "racks-enclosures",
    iconName: "Server",
    subcategories: ["Small Enclosures", "Wall Mounted", "Floor Standing", "Outdoor Enclosures", "Server Racks", "Network Cabinets"]
  },
  {
    id: "hazardous-communication",
    name: "Hazardous Area Communication",
    slug: "hazardous-communication",
    iconName: "PhoneCall",
    subcategories: ["Explosion Proof Telephone", "Explosion Proof IP Phone", "Explosion Proof Mobile Phone", "Explosion Proof Sounder"]
  },
  {
    id: "electrical-systems",
    name: "Electrical Systems",
    slug: "electrical-systems",
    iconName: "Cpu",
    subcategories: ["Junction Boxes", "Explosion Proof Junction Boxes", "Weatherproof Junction Boxes"]
  },
  {
    id: "telecom-infrastructure",
    name: "Telecom & Networking",
    slug: "telecom-infrastructure",
    iconName: "Network",
    subcategories: ["POE Switches", "Industrial Switches", "Video Recorders", "Hybrid Cables", "Power Cable", "Fiber Optic Cable", "Network Cable", "Armoured Cable"]
  }
];

export const INITIAL_SOLUTIONS: Solution[] = [
  {
    id: "security-surveillance",
    title: "Enterprise Video Surveillance & Access Control",
    slug: "security-surveillance",
    description: "End-to-end mission-critical security systems for high-security facilities, city monitoring, and critical infrastructures.",
    iconName: "Eye",
    details: [
      "Thermal mapping and perimeter laser barrier integrations",
      "AI-driven Automatic Number Plate Recognition (ANPR) algorithms",
      "Unified Access Control systems with biometric and smart card readers",
      "Explosion-proof cameras designed for chemical refinery monitoring"
    ]
  },
  {
    id: "industrial-telecom",
    title: "Hazardous & Industrial Communication Systems",
    slug: "industrial-telecom",
    description: "Fail-safe communications designed specifically for explosive atmospheres, oil rigs, marine, and extreme heavy industries.",
    iconName: "Activity",
    details: [
      "ATEX and IECEx certified explosion-proof VoIP IP telephones",
      "Public Address & General Alarm (PA/GA) emergency broadcast grids",
      "Industrial ruggedized microwave radios for remote backhaul links",
      "Heavy-duty composite hybrid fiber and armoured power cables"
    ]
  },
  {
    id: "renewable-microgrids",
    title: "Off-Grid & Hybrid Solar Microgrids",
    slug: "renewable-microgrids",
    description: "Continuous power backup and renewable microgrids for telecommunication base stations, commercial parks, and manufacturing complexes.",
    iconName: "BatteryCharging",
    details: [
      "High-yield solar photovoltaic matrices with active tracking system",
      "Industrial-grade Lithium Iron Phosphate (LiFePO4) storage banks",
      "Smart hybrid synchronous three-phase inverters (50kW to 1MW+)",
      "Remote SCADA power distribution telemetry and automatic load shedding"
    ]
  }
];

export const INITIAL_PARTNERS: OEMPartner[] = [
  {
    id: "partner-1",
    name: "HexaShield Security",
    logoUrl: "🛡️",
    description: "Global pioneer in intelligent optics, ATEX explosion-proof CCTV housings, and laser perimeter technology.",
    website: "https://hexashield-security.com",
    specialty: "Hazardous CCTV & Optics"
  },
  {
    id: "partner-2",
    name: "Vantage Power Systems",
    logoUrl: "🔋",
    description: "Market leader in enterprise-tier Lithium power backup modules and hybrid smart-grid solar hardware.",
    website: "https://vantagepower.com",
    specialty: "Industrial Solar & Storage"
  },
  {
    id: "partner-3",
    name: "CommsTect Rugged",
    logoUrl: "📞",
    description: "Specialized manufacture of intrinsically safe and explosion-proof telephones, intercoms, and horns.",
    website: "https://commstect-rugged.com",
    specialty: "Intrinsically Safe Comms"
  },
  {
    id: "partner-4",
    name: "DuraRack Cabinets",
    logoUrl: "🗄️",
    description: "Premium manufacturer of IP65/IP66 outdoor server enclosures, seismic server racks, and passive cooling cabinets.",
    website: "https://durarack.com",
    specialty: "Enterprise Enclosures"
  }
];

const PRODUCT_TEMPLATES = [
  {
    type: "Axis Dome Cameras",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    brand: "Axis Communications",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop",
    baseName: "Axis Professional Dome IP Camera",
    description: "High-performance fixed dome camera with Axis Lightfinder and Forensic WDR technology. Delivers outstanding video quality even in challenging light conditions. Perfect for corporate offices, banks, and commercial facility perimeters.",
    specs: [
      { label: "Lens", value: "3-9 mm varifocal, F1.3" },
      { label: "Resolution", value: "1920x1080 @ 60fps (Full HD)" },
      { label: "Sensors", value: "Axis Lightfinder & OptimizedIR" },
      { label: "Ingress", value: "IP66 and IK10 Impact Rated" }
    ],
    priceUSD: 650,
    productType: "Enterprise"
  },
  {
    type: "Canon Cameras",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    brand: "Canon",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    baseName: "Canon VB-H Series Ultra-Compact Security Camera",
    description: "Premium optical sensor camera featuring Canon's high-precision 20x optical zoom lens and super-low light performance. Integrates on-board intelligence for motion tracking and volume peak analysis.",
    specs: [
      { label: "Optics", value: "20x Optical Zoom, 12x Digital Zoom" },
      { label: "Resolution", value: "1080p Full HD Video Stream" },
      { label: "Low Light", value: "Color: 0.03 Lux, B/W: 0.002 Lux" },
      { label: "Aperture", value: "f/1.6 - f/3.5" }
    ],
    priceUSD: 1150,
    productType: "Enterprise"
  },
  {
    type: "POE Switch",
    category: "Telecom & Networking",
    subcategory: "POE Switches",
    brand: "DuraRack",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
    baseName: "NetCore High-Power Active PoE+ Switch",
    description: "Managed industrial Ethernet switch with full PoE+ power delivery across all copper ports. Built with high-throughput switching fabric, redundant power inputs, and robust hardware layer shielding.",
    specs: [
      { label: "Ports", value: "24x Gigabit RJ45 PoE+ Ports, 4x SFP Uplinks" },
      { label: "PoE Budget", value: "370W Smart Power Allocation" },
      { label: "Layer Standard", value: "L2+/L3 Static Routing & VLAN Management" },
      { label: "Chassis", value: "1U Rackmount Steel Case" }
    ],
    priceUSD: 850,
    productType: "Industrial"
  },
  {
    type: "Network Video Recorders",
    category: "Telecom & Networking",
    subcategory: "Video Recorders",
    brand: "HexaShield",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    baseName: "SpinelShield Fail-Safe Network Video Recorder (NVR)",
    description: "Carrier-class network video recorder designed for continuous high-throughput IP recording. Supports dual power supplies, hot-swappable enterprise SATA drive bays, and automatic RAID arrays.",
    specs: [
      { label: "Channels", value: "64-Channel Ultra-HD IP Inputs" },
      { label: "Redundancy", value: "RAID 0, 1, 5, 6, 10 Configurations" },
      { label: "Bandwidth", value: "384 Mbps Incoming / 384 Mbps Outgoing" },
      { label: "Storage", value: "8x Hot-Swap SATA Bays (Up to 128TB)" }
    ],
    priceUSD: 1550,
    productType: "Enterprise"
  },
  {
    type: "Junction Box",
    category: "Electrical Systems",
    subcategory: "Junction Boxes",
    brand: "HexaShield",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    baseName: "Spinel Weatherproof Stainless Junction Box",
    description: "IP68 dust and water protection electrical enclosure. Fabricated from thick brushed AISI 316 stainless steel to withstand corrosive offshore marine, chemical plant, or mining environment applications.",
    specs: [
      { label: "Material", value: "316 Electro-Polished Stainless Steel" },
      { label: "IP Rating", value: "IP68 Dust and Submersion Proof" },
      { label: "Dimensions", value: "300 x 300 x 150 mm" },
      { label: "Entries", value: "6x M20 pre-threaded ports with sealing caps" }
    ],
    priceUSD: 290,
    productType: "Industrial"
  },
  {
    type: "Solar Inverters",
    category: "Renewable Energy",
    subcategory: "Inverters",
    brand: "Vantage Power Systems",
    image: "https://images.unsplash.com/photo-1620000617482-821324eb9a14?q=80&w=600&auto=format&fit=crop",
    baseName: "Vantage SynchroGrid Commercial Hybrid Inverter",
    description: "Heavy-duty three-phase hybrid inverter with dual independent high-voltage MPPT inputs. Provides smart peak-load shaving, rapid battery switching (<4ms), and complete remote cloud telemetry control.",
    specs: [
      { label: "Power Output", value: "30kW Continuous / 30kVA Three-Phase" },
      { label: "MPPT Inputs", value: "2 independent MPPT, 200V-950V DC Range" },
      { label: "Efficiency", value: "98.5% Euro-Efficiency" },
      { label: "Cooling", value: "Smart quiet fan active convection" }
    ],
    priceUSD: 4200,
    productType: "Industrial"
  },
  {
    type: "Lithium Batteries",
    category: "Renewable Energy",
    subcategory: "Solar Batteries",
    brand: "Vantage Power Systems",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=600&auto=format&fit=crop",
    baseName: "Spinel Titan-X Modular LiFePO4 Energy Bank",
    description: "High-density lithium iron phosphate rack battery featuring integrated active BMS monitoring, cell balancing, and deep cycle stability. Safe, long-lasting storage for industrial microgrids.",
    specs: [
      { label: "Chemistry", value: "Lithium Iron Phosphate (LiFePO4)" },
      { label: "Capacity", value: "10 kWh / 200Ah nominal" },
      { label: "Voltage", value: "51.2V nominal" },
      { label: "Cycles", value: ">6,000 Cycles @ 85% DoD" }
    ],
    priceUSD: 3900,
    productType: "Enterprise"
  },
  {
    type: "Solar Panels",
    category: "Renewable Energy",
    subcategory: "Solar Panels",
    brand: "Vantage Power Systems",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
    baseName: "Vantage N-Type Mono High-Yield Solar Panel",
    description: "Industrial-grade monocrystalline photovoltaic module built with premium N-type cells for extreme weather performance, low degradation, and top-tier power conversion efficiency.",
    specs: [
      { label: "Max Power", value: "450W Monocrystalline" },
      { label: "Efficiency", value: "22.3% Cell Conversion Efficiency" },
      { label: "Durability", value: "Salt-Mist and Ammonia resistant casing" },
      { label: "Warranty", value: "25-Year Linear Power Output Warranty" }
    ],
    priceUSD: 190,
    productType: "Industrial"
  },
  {
    type: "Hybrid Composite Cables",
    category: "Telecom & Networking",
    subcategory: "Hybrid Cables",
    brand: "CommsTect",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop",
    baseName: "Spinel Armoured Fiber Optic & Power Composite Cable",
    description: "Combined long-range data and high-voltage power transmission composite cable with heavy steel-wire armouring. Designed for subsea, offshore drilling rigs, and complex perimeter grids.",
    specs: [
      { label: "Fiber Cores", value: "4x Core Single-Mode G.652D" },
      { label: "Power Conductors", value: "3x 2.5mm² Copper Cores" },
      { label: "Armour", value: "Galvanized Steel Wire Braid (GSWB)" },
      { label: "Outer Jacket", value: "Oil-Resistant, Flame-Retardant LSZH PU" }
    ],
    priceUSD: 450,
    productType: "Industrial"
  },
  {
    type: "Power Distribution Units",
    category: "Telecom & Networking",
    subcategory: "Power Cable",
    brand: "DuraRack",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
    baseName: "DuraRack Smart Metered Rackmount PDU",
    description: "Enterprise rack-mount power distribution unit featuring real-time current and voltage monitoring per outlet bank, digital LED displays, and integrated overload safety breakers.",
    specs: [
      { label: "Outlets", value: "16x IEC C13, 4x IEC C19 Outlets" },
      { label: "Input Voltage", value: "230V Single-Phase / 32A Max" },
      { label: "Monitoring", value: "RS485 Modbus TCP network interface" },
      { label: "Form Factor", value: "1U Horizontal Rackmount" }
    ],
    priceUSD: 380,
    productType: "Enterprise"
  },
  {
    type: "IP Telephone",
    category: "Hazardous Area Communication",
    subcategory: "Explosion Proof IP Phone",
    brand: "CommsTect",
    image: "https://images.unsplash.com/photo-1520923642038-b4a53cbd00ab?q=80&w=600&auto=format&fit=crop",
    baseName: "CommsTect Rugged Industrial VOIP IP Telephone",
    description: "Extreme weatherproof VoIP telephone with mechanical keypad, GRP impact-resistant housing, and high-strength armoured handset cable. Built for heavy dust, wind, and noise areas.",
    specs: [
      { label: "Protocol", value: "SIP 2.0, PoE Powered (802.3af)" },
      { label: "Enclosure", value: "Glass-Fiber Reinforced Polyester (GRP)" },
      { label: "Handset Cable", value: "Armoured Steel Cord with 150kg pull rate" },
      { label: "Noise Reduction", value: "Acoustic Noise-Cancelling Microphone" }
    ],
    priceUSD: 950,
    productType: "Industrial"
  },
  {
    type: "Ex-Cameras",
    category: "Electronic Security",
    subcategory: "Explosion-Proof Camera",
    brand: "HexaShield",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop",
    baseName: "SpinelShield ATEX Zone 1 Explosion-Proof Bullet Camera",
    description: "ATEX explosion-proof certified heavy-duty bullet camera with flameproof casing. Features deep-learning video analytics, starlight night-vision optics, and AISI 316L build.",
    specs: [
      { label: "Certification", value: "ATEX Zone 1 & 2, IECEx certified" },
      { label: "Sensor", value: "1/1.8\" 8MP Starlight Optical Sensor" },
      { label: "Housing", value: "AISI 316L Stainless Steel Electro-Polished" },
      { label: "IR Distance", value: "Active Smart IR up to 60 meters" }
    ],
    priceUSD: 1950,
    productType: "Hazardous Area"
  },
  {
    type: "Ex-Sounders",
    category: "Hazardous Area Communication",
    subcategory: "Explosion Proof Sounder",
    brand: "CommsTect",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
    baseName: "CommsTect ATEX Explosion-Proof Horn Sounder & Beacon",
    description: "Hazardous-rated audio-visual signaling device. Emits dual-tone alarm signals exceeding 115dB paired with high-intensity xenon strobe flashes for instant emergency alert broadcast.",
    specs: [
      { label: "Alarm Sound Level", value: "115 dB @ 1 meter distance" },
      { label: "Beacon Light", value: "Xenon Strobe Starlight flashing at 1Hz" },
      { label: "Certification", value: "Ex d IIC T6 Zone 1 & 2 ATEX Certified" },
      { label: "Material", value: "Marine Grade LM6 Copper-Free Aluminum" }
    ],
    priceUSD: 680,
    productType: "Hazardous Area"
  }
];

export const INITIAL_PRODUCTS: Product[] = Array.from({ length: 50 }, (_, i) => {
  const index = i + 1;
  const template = PRODUCT_TEMPLATES[i % PRODUCT_TEMPLATES.length];
  
  const models = ["Pro", "X", "Ultra", "Max", "Prime", "Matrix", "Titan", "Elite", "Core", "Optima"];
  const modelSuffix = models[i % models.length] + "-" + (100 + index);
  
  const name = `${template.baseName} (${modelSuffix})`;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const sku = `${template.brand.substring(0, 3).toUpperCase()}-${template.subcategory.substring(0, 3).toUpperCase()}-${2000 + index}`;
  
  const priceUSD = template.priceUSD + (i % 8) * 45 - (i % 3) * 15;
  const priceNGN = priceUSD * 1500;
  
  return {
    id: `sp-prod-${index}`,
    sku,
    name,
    slug,
    brand: template.brand,
    category: template.category,
    subcategory: template.subcategory,
    priceUSD,
    priceNGN,
    description: `Enterprise-tier ${template.type.toLowerCase()} system. ${template.description} Part of Spinel Distribution's certified lines, backed by OEM warranty and full offshore technical integration compliance certificates.`,
    images: [template.image],
    specifications: [
      ...template.specs,
      { label: "Model Number", value: `SP-${modelSuffix}` },
      { label: "OEM Partner", value: template.brand },
      { label: "Compliance", value: "CE, FCC, RoHS, ISO 9001" }
    ],
    stock: 12 + (i % 9) * 4,
    oem: template.brand,
    productType: template.productType as "Enterprise" | "Hazardous Area" | "Industrial" | "Commercial",
    featured: index === 1 || index === 2 || index === 6 || index === 11 || index === 12 || index === 15,
    popular: i % 4 === 0,
    downloads: [
      { title: `${template.type} Technical Datasheet`, type: "Data Sheet" as const, url: "#" },
      { title: `${template.type} Installation & Operations Guide`, type: "Manual" as const, url: "#" }
    ],
    reviews: i % 5 === 0 ? [
      {
        id: `rev-${index}`,
        userName: i % 2 === 0 ? "Engr. Yusuf Alao" : "Marcus Olayinka",
        rating: 5,
        comment: `Excellent product! The SP-${modelSuffix} performed fully up to specifications during commissioning. Highly recommend.`,
        date: "2026-06-25"
      }
    ] : []
  };
});

export const INITIAL_ARTICLES: BlogArticle[] = [
  {
    id: "art-1",
    title: "Revolutionizing Zone 1 Security Monitoring with AISI 316L Stainless Optics",
    summary: "How industrial offshore installations are shifting to high-durability stainless steel housings and intelligent AI analytics to protect multi-billion dollar LNG facilities.",
    content: "Surveillance inside Zone 1 explosion-prone environments has always represented an immense challenge for structural engineers. Standard aluminium casings easily erode under constant saline spray, and standard gaskets decompose when exposed to acidic hydrocarbons. The introduction of AISI 316L electro-polished stainless steel CCTV housings, paired with intelligent thermal infrared analytics, represents a generational leap in pipeline monitoring and flare stack flame verification...",
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
    content: "Telecom nodes are the lifelines of the modern economy, yet keeping them powered in off-grid tropical environments represents a continuous expense. Traditional lead-acid battery matrices suffer from thermal runway and short lifespans under intense cyclic heat. Upgrading base stations to modular Lithium Iron Phosphate (LiFePO4) storage cabinets coupled with dual MPPT high-voltage hybrid inverters reduces operational maintenance costs by over 74%...",
    slug: "optimizing-off-grid-solar-telecom-nodes",
    category: "Renewable Energy",
    date: "2026-07-02",
    author: "Marcus Olayinka, Head of Energy Solutions",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop"
  }
];
