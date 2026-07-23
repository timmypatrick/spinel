import { Product, Category, Solution, OEMPartner, BlogArticle } from "../types";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "electronic-security",
    name: "Electronic Security",
    slug: "electronic-security",
    iconName: "Shield",
    subcategories: ["Dome Camera", "Bullet Camera", "PTZ Camera", "Box Camera", "Panoramic Camera", "Thermal Camera", "Explosion-Proof Camera", "ANPR Camera", "Fisheye Camera", "Camera Bundle"]
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy",
    slug: "renewable-energy",
    iconName: "Sun",
    subcategories: ["Industrial Solar Panels", "Lithium LiFePO4 Batteries", "Smart Hybrid Inverters", "Solar Panels", "Solar Batteries", "Inverters", "Charge Controllers", "Solar Accessories"]
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
    subcategories: ["Junction Boxes", "Explosion Proof Junction Boxes", "Weatherproof Junction Boxes", "Accessories"]
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

import { ACCESSORIES_PRODUCTS } from "./productsData";

export const INITIAL_PRODUCTS: Product[] = ACCESSORIES_PRODUCTS;

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
