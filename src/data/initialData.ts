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

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "sp-ex-dome-01",
    sku: "SP-EXD-9100",
    name: "SpinelShield ATEX Explosion-Proof Dome Camera",
    slug: "spinelshield-atex-explosion-proof-dome-camera",
    brand: "HexaShield",
    category: "Electronic Security",
    subcategory: "Explosion-Proof Camera",
    priceUSD: 1850,
    priceNGN: 2775000,
    description: "Enterprise-grade explosion-proof dome camera designed specifically for Zone 1 and Zone 2 hazardous areas. Features 4K UHD resolution, advanced starlight low-light sensor, robust AISI 316L stainless steel enclosure, and active optical defogging. Perfect for oil & gas refinery surveillance, chemical processing plants, and offshore platforms.",
    images: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop", // Camera
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop"
    ],
    specifications: [
      { label: "Certification", value: "ATEX, IECEx, Zone 1 & 2, Zone 21 & 22" },
      { label: "Material", value: "AISI 316L Electro-Polished Stainless Steel" },
      { label: "Sensor", value: "1/1.8\" 8MP Progressive Scan CMOS" },
      { label: "Resolution", value: "3840 x 2160 @ 30fps (4K UHD)" },
      { label: "Minimum Illumination", value: "Color: 0.003 Lux @ F1.2, B/W: 0 Lux with IR" },
      { label: "Smart Analytics", value: "Intrusion, Line Crossing, Face Detection, Loitering, ANPR" },
      { label: "Ingress Protection", value: "IP68 & NEMA 4X, IK10 Impact Rated" }
    ],
    stock: 24,
    oem: "HexaShield Security",
    productType: "Hazardous Area",
    featured: true,
    popular: true,
    downloads: [
      { title: "Technical Datasheet", type: "Data Sheet", url: "#" },
      { title: "ATEX Zone Certification PDF", type: "Certificates", url: "#" },
      { title: "Installation Manual", type: "Manual", url: "#" }
    ],
    seoTitle: "ATEX Explosion-Proof 4K Dome Camera | Spinel Distribution",
    seoDescription: "Buy enterprise-grade Zone 1/2 ATEX explosion-proof 4K dome camera. Heavy-duty AISI 316L stainless steel for oil rigs and chemical plants.",
    reviews: [
      { id: "rev-1", userName: "Engr. Yusuf Alao", rating: 5, comment: "Exceptional build quality. We installed 40 units at our LNG pipeline and they have operated flawlessly under extreme humidity.", date: "2026-04-12" }
    ]
  },
  {
    id: "sp-sol-bat-10",
    sku: "SP-TITAN-L50",
    name: "Spinel Titan-X 50kWh Lithium Iron Phosphate (LiFePO4) Power Storage System",
    slug: "spinel-titan-x-50kwh-lifepo4-battery",
    brand: "Vantage Power Systems",
    category: "Renewable Energy",
    subcategory: "Solar Batteries",
    priceUSD: 14500,
    priceNGN: 21750000,
    description: "High-capacity server-room level 50kWh Lithium Energy Storage system designed for heavy commercial backup, base transceiver stations (BTS), and industrial solar mini-grids. Integrates an intelligent BMS, active balance thermal management, and supports stackable modular expansions up to 1.2MWh. Offers an ultra-long cycle life exceeding 6000 cycles at 90% depth of discharge.",
    images: [
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=600&auto=format&fit=crop", // Battery bank
      "https://images.unsplash.com/photo-1548613053-22008df479f6?q=80&w=600&auto=format&fit=crop"
    ],
    specifications: [
      { label: "Chemistry", value: "Lithium Iron Phosphate (LiFePO4)" },
      { label: "Nominal Capacity", value: "50 kWh / 1000 Ah" },
      { label: "Nominal Voltage", value: "51.2 V" },
      { label: "Standard Cycle Life", value: ">6,000 Cycles @ 90% DoD, 25°C" },
      { label: "Max Discharge Current", value: "250A Continuous" },
      { label: "Communication Protocols", value: "CAN, RS485, Modbus TCP" },
      { label: "Dimensions", value: "800 x 600 x 1200 mm (Cabinet)" },
      { label: "Weight", value: "485 kg" }
    ],
    stock: 8,
    oem: "Vantage Power Systems",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "Commercial Battery Brochure", type: "Brochure", url: "#" },
      { title: "BMS Configuration Guide", type: "Manual", url: "#" }
    ],
    seoTitle: "Spinel Titan-X 50kWh Industrial LiFePO4 Battery Pack",
    seoDescription: "Industrial-grade stackable 50kWh LiFePO4 Lithium Solar battery cabinet for telecommunications and commercial grids.",
    reviews: [
      { id: "rev-2", userName: "Marcus Olayinka", rating: 5, comment: "Installed at our regional telecom switching centers. Excellent energy density and smooth Modbus telemetry integration.", date: "2026-05-30" }
    ]
  },
  {
    id: "sp-inv-hyb-20",
    sku: "SP-GRID-S15",
    name: "Spinel SynchroGrid 15kW Hybrid Three-Phase Inverter",
    slug: "spinel-synchrogrid-15kw-hybrid-three-phase-inverter",
    brand: "Vantage Power Systems",
    category: "Renewable Energy",
    subcategory: "Inverters",
    priceUSD: 3200,
    priceNGN: 4800000,
    description: "Next-generation 15kW three-phase hybrid solar inverter equipped with dual high-voltage MPPT controllers. Features grid-tying capability, active load-shaving synchronization, seamless UPS transition (<4ms response), and a cloud-integrated telemetry system. Ideal for industrial telecom towers and small commercial office buildings.",
    images: [
      "https://images.unsplash.com/photo-1620000617482-821324eb9a14?q=80&w=600&auto=format&fit=crop" // Solar equipment
    ],
    specifications: [
      { label: "Rated Power Output", value: "15,000W / 15kVA Three-Phase" },
      { label: "Grid Type", value: "Three Phase 400V / 230V, 50/60Hz" },
      { label: "MPPT Inputs", value: "2 Channels (High Voltage, up to 1000V DC)" },
      { label: "Peak Efficiency", value: "98.4%" },
      { label: "Battery Compatibility", value: "Lithium-Ion / Lead-Acid (48V nominal)" },
      { label: "Protection", value: "Surge Protection, Islanding, Ground Fault, IP65 Waterproof" }
    ],
    stock: 15,
    oem: "Vantage Power Systems",
    productType: "Industrial",
    featured: false,
    popular: true,
    downloads: [
      { title: "SynchroGrid Datasheet v4", type: "Data Sheet", url: "#" }
    ]
  },
  {
    id: "sp-ex-phn-01",
    sku: "SP-EX-PHN100",
    name: "Spinel intrinsically Safe ATEX Explosion-Proof IP Telephone",
    slug: "spinel-intrinsically-safe-atex-explosion-proof-ip-telephone",
    brand: "CommsTect",
    category: "Hazardous Area Communication",
    subcategory: "Explosion Proof IP Phone",
    priceUSD: 1450,
    priceNGN: 2175000,
    description: "Rugged ATEX Zone 1 rated industrial IP Telephone. Engineered with a corrosion-proof, impact-resistant GRP body and an armoured steel-sheathed handset cable. Supports standard SIP protocol, PoE (Power over Ethernet), and dynamic noise-cancelling microphone filters for loud industrial backgrounds such as engine rooms, drilling bays, and power plants.",
    images: [
      "https://images.unsplash.com/photo-1520923642038-b4a53cbd00ab?q=80&w=600&auto=format&fit=crop" // Phone
    ],
    specifications: [
      { label: "Certification", value: "ATEX Zone 1, IECEx, intrinsically safe Ex d ib IIC T6" },
      { label: "Protocol", value: "SIP 2.0 (RFC3261), PoE IEEE 802.3af" },
      { label: "Housing Material", value: "Glass Reinforced Polyester (GRP) Impact Resistant" },
      { label: "Handset Cord", value: "Stainless Steel Armoured (supports up to 150kg tensile pull)" },
      { label: "Sound Level", value: "Ringing volume: 95dB @ 1 meter distance" },
      { label: "Ingress Protection", value: "IP66 dust and liquid spray proof" }
    ],
    stock: 40,
    oem: "CommsTect Rugged",
    productType: "Hazardous Area",
    featured: true,
    popular: false,
    downloads: [
      { title: "ATEX Intrinsically Safe Certification", type: "Certificates", url: "#" },
      { title: "User Configuration Guide", type: "Manual", url: "#" }
    ]
  },
  {
    id: "sp-rack-fs-42",
    sku: "SP-DUR-42U",
    name: "Spinel DuraRack 42U Server Cabinet (1000mm depth)",
    slug: "spinel-durarack-42u-server-cabinet-1000mm-depth",
    brand: "DuraRack",
    category: "Racks & Enclosures",
    subcategory: "Server Racks",
    priceUSD: 1100,
    priceNGN: 1650000,
    description: "Heavy-duty 42U floor-standing server cabinet designed for data centers, industrial command stations, and telecom hubs. Features a high-airflow perforated front door (83% open area), split mesh rear doors, integrated vertical PDU wiring rails, and high-load load-bearing casters supporting up to 1500kg static load.",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop" // Server rack rows
    ],
    specifications: [
      { label: "Size", value: "42U (Standard 19-inch mounting rails)" },
      { label: "Dimensions", value: "2050mm (Height) x 600mm (Width) x 1000mm (Depth)" },
      { label: "Static Load Capacity", value: "1,500 kg" },
      { label: "Material", value: "High-grade cold-rolled SPCC steel" },
      { label: "Doors", value: "High perforation wave front door, double-mesh rear doors with keys" },
      { label: "Standard Compliances", value: "EIA-310-D, IEC 60297, RoHS compliant" }
    ],
    stock: 35,
    oem: "DuraRack Cabinets",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "Server Rack Dimensions Blueprint", type: "Data Sheet", url: "#" }
    ]
  },
  {
    id: "sp-sw-ind-16",
    sku: "SP-NET-IS16",
    name: "Spinel NetCore 16-Port Managed Industrial POE+ Switch",
    slug: "spinel-netcore-16-port-managed-industrial-poe-switch",
    brand: "DuraRack",
    category: "Telecom & Networking",
    subcategory: "Industrial Switches",
    priceUSD: 750,
    priceNGN: 1125000,
    description: "Ruggedized Layer 2+ managed industrial Ethernet switch equipped with 16 high-power PoE+ Gigabit ports and 4 SFP uplink fiber cages. Built with a robust DIN-rail IP40 fanless metal casing, redundant dual 48V power terminals, and operates within extreme temperature limits of -40°C to 85°C. Features dynamic ring protection recovery (<20ms).",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop" // Network gears
    ],
    specifications: [
      { label: "Ports", value: "16 x 10/100/1000Base-TX RJ45 PoE+, 4 x 1000Base-X SFP fiber ports" },
      { label: "PoE Budget", value: "Up to 30W per port, Total Budget 480W" },
      { label: "Operating Temperature", value: "-40°C to 85°C (-40°F to 185°F)" },
      { label: "Cooling", value: "IP40 fanless metal housing, optimized thermal dispersion" },
      { label: "Ring Redundancy", value: "ERPS G.8032 Ring recovery time < 20ms" },
      { label: "Mounting", value: "DIN-Rail and Wall mount bracket accessories" }
    ],
    stock: 50,
    oem: "DuraRack Cabinets",
    productType: "Industrial",
    featured: true,
    popular: false,
    downloads: [
      { title: "Switch Administration Manual", type: "Manual", url: "#" },
      { title: "Datasheet and Specs v2", type: "Data Sheet", url: "#" }
    ]
  },
  {
    id: "sp-ex-jbox-02",
    sku: "SP-EX-JB220",
    name: "Spinel Shield Zone 1 Explosion Proof Junction Box",
    slug: "spinel-shield-zone-1-explosion-proof-junction-box",
    brand: "HexaShield",
    category: "Electrical Systems",
    subcategory: "Explosion Proof Junction Boxes",
    priceUSD: 450,
    priceNGN: 675000,
    description: "Intrinsically safe stainless steel junction box designed to house critical connections in Zone 1/Zone 2 explosive gas or combustible dust atmospheres. Fitted with internal DIN rail terminals, earthing studs, and multiple M20 entry ports with brass flameproof cable gland inserts.",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop" // Industry components
    ],
    specifications: [
      { label: "Material", value: "Heavy 316 Stainless Steel with brushed finish" },
      { label: "Classification", value: "Ex d IIC T6 Gb / Ex tD A21 IP66 T80°C" },
      { label: "Ingress Rating", value: "IP66 / NEMA 4X" },
      { label: "Ports", value: "4 x M20 Threaded Entries (brass plugs included)" },
      { label: "Terminals", value: "12-pole rail terminals (2.5mm² wiring max)" }
    ],
    stock: 60,
    oem: "HexaShield Security",
    productType: "Hazardous Area",
    featured: false,
    popular: false,
    downloads: [
      { title: "Installation Blueprint & Glands Specs", type: "Data Sheet", url: "#" }
    ]
  }
];

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
