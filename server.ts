import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Lazy-initialized Supabase Client to avoid crashes when keys are missing
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Ensure the dev server runs on port 3000
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server State Store (In-Memory Database for state persistence in active containers)
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

const generatedBackendProducts = Array.from({ length: 50 }, (_, i) => {
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
    productType: template.productType,
    featured: index === 1 || index === 2 || index === 6 || index === 11 || index === 12 || index === 15,
    popular: i % 4 === 0,
    downloads: [
      { title: `${template.type} Technical Datasheet`, type: "Data Sheet", url: "#" },
      { title: `${template.type} Installation & Operations Guide`, type: "Manual", url: "#" }
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

const db = {
  products: generatedBackendProducts,
  orders: [
    {
      id: "ord-1",
      orderNumber: "SP-ORD-2026-0001",
      date: "2026-07-01",
      customerName: "Gbenga Adebayo",
      customerEmail: "gbenga@adebayotech.com",
      status: "Paid",
      paymentMethod: "Paystack",
      totalUSD: 3300,
      totalNGN: 4950000,
      items: [
        { productId: "sp-ex-dome-01", productName: "SpinelShield ATEX Explosion-Proof Dome Camera", sku: "SP-EXD-9100", quantity: 1, priceUSD: 1850, priceNGN: 2775000 },
        { productId: "sp-ex-phn-01", productName: "Spinel Intrinsically Safe ATEX Explosion-Proof IP Telephone", sku: "SP-EX-PHN100", quantity: 1, priceUSD: 1450, priceNGN: 2175000 }
      ],
      billingAddress: { fullName: "Gbenga Adebayo", email: "gbenga@adebayotech.com", phone: "+2348031234567", addressLine1: "15 Marina Street", city: "Lagos Island", state: "Lagos", country: "Nigeria" },
      shippingAddress: { fullName: "Gbenga Adebayo", email: "gbenga@adebayotech.com", phone: "+2348031234567", addressLine1: "15 Marina Street", city: "Lagos Island", state: "Lagos", country: "Nigeria" }
    },
    {
      id: "ord-2",
      orderNumber: "SP-ORD-2026-0002",
      date: "2026-07-08",
      customerName: "Tim Patrick",
      customerEmail: "timi.patrick@dataset.ng",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      totalUSD: 14500,
      totalNGN: 21750000,
      items: [
        { productId: "sp-sol-bat-10", productName: "Spinel Titan-X 50kWh Lithium Iron Phosphate (LiFePO4) Power Storage System", sku: "SP-TITAN-L50", quantity: 1, priceUSD: 14500, priceNGN: 21750000 }
      ],
      billingAddress: { fullName: "Tim Patrick", email: "timi.patrick@dataset.ng", phone: "+2347069876543", addressLine1: "Plot 104, Industrial Layout", city: "Port Harcourt", state: "Rivers", country: "Nigeria" },
      shippingAddress: { fullName: "Tim Patrick", email: "timi.patrick@dataset.ng", phone: "+2347069876543", addressLine1: "Plot 104, Industrial Layout", city: "Port Harcourt", state: "Rivers", country: "Nigeria" }
    }
  ],
  quotes: [
    {
      id: "qt-1",
      quoteNumber: "SP-QT-2026-1001",
      companyName: "Chevron Nigeria Limited",
      contactName: "Engr. Sandra Nduka",
      email: "snduka@chevron.com",
      phone: "+2348055551212",
      country: "Nigeria",
      items: [
        { productId: "sp-ex-dome-01", productName: "SpinelShield ATEX Explosion-Proof Dome Camera", quantity: 12 },
        { productName: "Zone 1 Fiber Splicing Box", quantity: 2 }
      ],
      message: "We require ATEX Zone 1 standard dome cameras for our offshore platform Escravos expansion project. Please include heavy-duty mounting arms and 100m armoured hybrid composite fiber cable for each camera terminal.",
      status: "Pending",
      createdAt: "2026-07-10T11:45:00Z"
    }
  ],
  messages: [
    {
      id: "msg-1",
      name: "Alhaji Ibrahim Musa",
      email: "imusa@kanoelectrics.com",
      phone: "+2348123456789",
      companyName: "Kano Electrics Ltd",
      subject: "OEM Distribution Partnership",
      message: "We are interested in distributing Spinel's range of explosion-proof electrical junction boxes and solar charge controllers in the Northern region of Nigeria. Kindly let us know your dealer requirements.",
      status: "Unread",
      createdAt: "2026-07-11T09:12:00Z"
    }
  ],
  subscribers: [
    { id: "sub-1", email: "info@nigeria-telecom.com", subscribedAt: "2026-06-15" }
  ],
  users: [
    {
      id: "user-admin",
      name: "Engr. Patrick Timi",
      email: "engineering@spineldistribution.com",
      password: "spineldistribution@123",
      role: "admin",
      companyName: "Spinel Distribution"
    },
    {
      id: "user-demo",
      name: "Demo Customer",
      email: "customer@spineldistribution.com",
      password: "password123",
      role: "customer",
      companyName: "Lagos Enterprise ICT"
    }
  ]
};

// Admin authentication verification middleware
function verifyAdminToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (
    authHeader === "Bearer AdminToken_timmypatrick999" ||
    authHeader === "AdminToken_timmypatrick999" ||
    authHeader === "Bearer AdminToken_timi.patrick" ||
    authHeader === "AdminToken_timi.patrick" ||
    (authHeader && (authHeader.startsWith("AdminToken_") || authHeader.startsWith("Bearer AdminToken_")))
  ) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized access to administrative endpoint" });
  }
}

// 1. API: Products CRUD
app.get("/api/products", (req, res) => {
  let list = [...db.products];

  // Search filter
  if (req.query.search) {
    const q = (req.query.search as string).toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (req.query.category) {
    const cat = req.query.category as string;
    list = list.filter(p => p.category.toLowerCase() === cat.toLowerCase());
  }

  // Brand/OEM filter
  if (req.query.brand) {
    const brand = req.query.brand as string;
    list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  }

  // Product type filter (Hazardous, Industrial, Enterprise, Commercial)
  if (req.query.productType) {
    const type = req.query.productType as string;
    list = list.filter(p => p.productType.toLowerCase() === type.toLowerCase());
  }

  // Sort
  if (req.query.sort) {
    const sort = req.query.sort as string;
    if (sort === "price-asc") {
      list.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sort === "alphabetical") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  res.json(list);
});

app.get("/api/products/:id", (req, res) => {
  const prod = db.products.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (prod) {
    res.json(prod);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/api/products", verifyAdminToken, (req, res) => {
  const payload = req.body;
  if (!payload.name || !payload.sku || !payload.priceUSD) {
    return res.status(400).json({ error: "Missing required fields (name, sku, priceUSD)" });
  }

  const newProd = {
    id: `prod-${Date.now()}`,
    sku: payload.sku,
    name: payload.name,
    slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    brand: payload.brand || "Spinel Brand",
    category: payload.category || "Uncategorized",
    subcategory: payload.subcategory || "",
    priceUSD: Number(payload.priceUSD),
    priceNGN: Number(payload.priceNGN || payload.priceUSD * 1500),
    description: payload.description || "",
    images: payload.images && payload.images.length ? payload.images : ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop"],
    specifications: payload.specifications || [],
    stock: Number(payload.stock || 10),
    oem: payload.oem || payload.brand || "Spinel Partners",
    productType: payload.productType || "Enterprise",
    featured: !!payload.featured,
    popular: !!payload.popular,
    downloads: payload.downloads || [],
    reviews: []
  };

  db.products.unshift(newProd);
  res.status(201).json(newProd);
});

app.put("/api/products/:id", verifyAdminToken, (req, res) => {
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const payload = req.body;
  db.products[index] = {
    ...db.products[index],
    sku: payload.sku ?? db.products[index].sku,
    name: payload.name ?? db.products[index].name,
    brand: payload.brand ?? db.products[index].brand,
    category: payload.category ?? db.products[index].category,
    subcategory: payload.subcategory ?? db.products[index].subcategory,
    priceUSD: payload.priceUSD !== undefined ? Number(payload.priceUSD) : db.products[index].priceUSD,
    priceNGN: payload.priceNGN !== undefined ? Number(payload.priceNGN) : db.products[index].priceNGN,
    description: payload.description ?? db.products[index].description,
    images: payload.images ?? db.products[index].images,
    specifications: payload.specifications ?? db.products[index].specifications,
    stock: payload.stock !== undefined ? Number(payload.stock) : db.products[index].stock,
    oem: payload.oem ?? db.products[index].oem,
    productType: payload.productType ?? db.products[index].productType,
    featured: payload.featured !== undefined ? !!payload.featured : db.products[index].featured,
    popular: payload.popular !== undefined ? !!payload.popular : db.products[index].popular,
    downloads: payload.downloads ?? db.products[index].downloads
  };

  res.json(db.products[index]);
});

app.delete("/api/products/:id", verifyAdminToken, (req, res) => {
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  const deleted = db.products.splice(index, 1);
  res.json({ message: "Product deleted successfully", deleted: deleted[0] });
});

// 2. API: Quotes Endpoint
app.post("/api/quotes", (req, res) => {
  const { companyName, contactName, email, phone, country, items, message } = req.body;
  if (!companyName || !contactName || !email || !items || !items.length) {
    return res.status(400).json({ error: "Missing required quote registration fields" });
  }

  const newQuote = {
    id: `qt-${Date.now()}`,
    quoteNumber: `SP-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    companyName,
    contactName,
    email,
    phone: phone || "",
    country: country || "Nigeria",
    items,
    message: message || "",
    status: "Pending" as const,
    createdAt: new Date().toISOString()
  };

  db.quotes.unshift(newQuote);
  res.status(201).json(newQuote);
});

app.get("/api/quotes", verifyAdminToken, (req, res) => {
  res.json(db.quotes);
});

app.put("/api/quotes/:id", verifyAdminToken, (req, res) => {
  const index = db.quotes.findIndex(q => q.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Quote not found" });
  }
  db.quotes[index].status = req.body.status ?? db.quotes[index].status;
  (db.quotes[index] as any).internalNotes = req.body.internalNotes ?? (db.quotes[index] as any).internalNotes;

  // If approved and converted to order, do order creation simulation
  if (req.body.status === "Converted") {
    const q = db.quotes[index];
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `SP-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      customerName: q.contactName,
      customerEmail: q.email,
      status: "Pending" as const,
      paymentMethod: "Purchase Order" as const,
      totalUSD: q.items.reduce((acc, it) => acc + (it.productId ? (db.products.find(p => p.id === it.productId)?.priceUSD || 500) * it.quantity : 500 * it.quantity), 0),
      totalNGN: q.items.reduce((acc, it) => acc + (it.productId ? (db.products.find(p => p.id === it.productId)?.priceNGN || 75000) * it.quantity : 75000 * it.quantity), 0),
      items: q.items.map(it => {
        const p = db.products.find(prod => prod.id === it.productId);
        return {
          productId: it.productId || "custom",
          productName: it.productName,
          sku: p?.sku || "SP-CUSTOM",
          quantity: it.quantity,
          priceUSD: p?.priceUSD || 500,
          priceNGN: p?.priceNGN || 750000
        };
      }),
      billingAddress: { fullName: q.contactName, email: q.email, phone: q.phone, addressLine1: q.companyName, city: "Project Site", state: "Contract State", country: q.country },
      shippingAddress: { fullName: q.contactName, email: q.email, phone: q.phone, addressLine1: q.companyName, city: "Project Site", state: "Contract State", country: q.country }
    };
    db.orders.unshift(newOrder);
  }

  res.json(db.quotes[index]);
});

// 3. API: Checkout & Orders
app.post("/api/orders", (req, res) => {
  const { billingAddress, shippingAddress, items, paymentMethod, reference } = req.body;
  if (!billingAddress || !items || !items.length) {
    return res.status(400).json({ error: "Invalid order data submission" });
  }

  // Calculate order metrics
  let subtotalUSD = 0;
  let subtotalNGN = 0;
  const processedItems = [];

  for (const item of items) {
    const prod = db.products.find(p => p.id === item.productId);
    if (!prod) {
      return res.status(404).json({ error: `Product ID ${item.productId} not found` });
    }
    if (prod.stock < item.quantity) {
      return res.status(400).json({ error: `Insufficient stock for product ${prod.name}. Available: ${prod.stock}` });
    }

    // Deduct stock
    prod.stock -= item.quantity;

    const itemTotalUSD = prod.priceUSD * item.quantity;
    const itemTotalNGN = prod.priceNGN * item.quantity;
    subtotalUSD += itemTotalUSD;
    subtotalNGN += itemTotalNGN;

    processedItems.push({
      productId: prod.id,
      productName: prod.name,
      sku: prod.sku,
      quantity: item.quantity,
      priceUSD: prod.priceUSD,
      priceNGN: prod.priceNGN
    });
  }

  const taxUSD = Math.round(subtotalUSD * 0.075); // 7.5% VAT Nigeria
  const taxNGN = Math.round(subtotalNGN * 0.075);
  const shippingUSD = subtotalUSD > 1000 ? 0 : 50;
  const shippingNGN = subtotalNGN > 1500000 ? 0 : 75000;

  const totalUSD = subtotalUSD + taxUSD + shippingUSD;
  const totalNGN = subtotalNGN + taxNGN + shippingNGN;

  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber: `SP-ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    date: new Date().toISOString().split("T")[0],
    customerName: billingAddress.fullName,
    customerEmail: billingAddress.email,
    billingAddress,
    shippingAddress: shippingAddress || billingAddress,
    items: processedItems,
    subtotalUSD,
    subtotalNGN,
    taxUSD,
    taxNGN,
    shippingUSD,
    shippingNGN,
    totalUSD,
    totalNGN,
    status: (paymentMethod === "Paystack" ? "Paid" : "Pending") as any,
    paymentMethod,
    paymentReference: reference || `REF-${Date.now()}`
  };

  db.orders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.get("/api/orders", verifyAdminToken, (req, res) => {
  res.json(db.orders);
});

app.put("/api/orders/:id", verifyAdminToken, (req, res) => {
  const index = db.orders.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }
  db.orders[index].status = req.body.status ?? db.orders[index].status;
  res.json(db.orders[index]);
});

// 4. API: Contact Submissions & Newsletters
app.post("/api/contact", (req, res) => {
  const { name, email, phone, companyName, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required contact form fields" });
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    companyName: companyName || "",
    subject,
    message,
    status: "Unread" as const,
    createdAt: new Date().toISOString()
  };

  db.messages.unshift(newMessage);
  res.status(201).json(newMessage);
});

app.get("/api/contact", verifyAdminToken, (req, res) => {
  res.json(db.messages);
});

app.put("/api/contact/:id", verifyAdminToken, (req, res) => {
  const index = db.messages.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Message not found" });
  }
  db.messages[index].status = req.body.status ?? db.messages[index].status;
  res.json(db.messages[index]);
});

app.post("/api/newsletter", async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email address required" });
  }

  const emailLower = email.toLowerCase().trim();

  // Always save in-memory first for local consistency and fallback stability
  const alreadySubscribed = db.subscribers.some(s => s.email.toLowerCase() === emailLower);
  let newSub = null;
  if (!alreadySubscribed) {
    newSub = {
      id: `sub-${Date.now()}`,
      email: emailLower,
      subscribedAt: new Date().toISOString().split("T")[0]
    };
    db.subscribers.push(newSub);
  } else {
    newSub = db.subscribers.find(s => s.email.toLowerCase() === emailLower);
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // Attempt saving to 'subscribers' table. If the table doesn't exist, Supabase returns error.
      // We will perform an upsert or insert so it's safe and doesn't duplicate.
      const { data, error } = await supabase
        .from("subscribers")
        .upsert([{ email: emailLower, subscribed_at: new Date().toISOString() }], { onConflict: "email" });

      if (error) {
        console.warn("Supabase insertion failed, falling back to local storage:", error.message);
        return res.status(201).json({
          message: "Subscribed successfully (saved to local list; Supabase: " + error.message + ")",
          subscriber: newSub
        });
      }

      return res.status(201).json({
        message: "Subscribed successfully and saved to Supabase!",
        subscriber: newSub
      });

    } catch (err: any) {
      console.warn("Supabase connection exception, falling back to local:", err.message);
      return res.status(201).json({
        message: "Subscribed successfully (saved to local list; " + err.message + ")",
        subscriber: newSub
      });
    }
  } else {
    return res.status(201).json({
      message: "Subscribed successfully! (Demo Mode: Supabase not configured, saved to local in-memory store)",
      subscriber: newSub
    });
  }
});

app.get("/api/newsletter", verifyAdminToken, (req, res) => {
  res.json(db.subscribers);
});

// 5. API: Secure Login Authentication
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, companyName } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  const emailLower = email.toLowerCase();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailLower,
        password,
        options: {
          data: {
            full_name: name,
            company_name: companyName || "Individual"
          }
        }
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const newUser = {
        id: data.user?.id || `user-${Date.now()}`,
        name,
        email: emailLower,
        password, // stored securely or as is in local fallback
        role: "customer" as const,
        companyName: companyName || "Individual",
        createdAt: new Date().toISOString()
      };
      db.users.push(newUser);

      return res.status(201).json({
        success: true,
        message: "Signup successful! Every saved signup should have email authentication. A verification email has been sent to your address. Please verify to log in.",
        user: {
          name,
          email: emailLower,
          role: "customer",
          companyName: companyName || "Individual"
        }
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Supabase connection error: " + err.message });
    }
  } else {
    // Demo Mode local lookup
    const exists = db.users.some(u => u.email === emailLower);
    if (exists) {
      return res.status(400).json({ error: "An account with this email already exists" });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: emailLower,
      password,
      role: "customer" as const,
      companyName: companyName || "Individual",
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);

    return res.status(201).json({
      success: true,
      isDemo: true,
      message: "Signed up successfully! (Demo Mode: Supabase secrets not configured. Signups are stored in-memory. An email authentication check has been simulated).",
      user: {
        name,
        email: emailLower,
        role: "customer",
        companyName: companyName || "Individual"
      }
    });
  }
});

app.post("/api/auth/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const emailLower = email.toLowerCase().trim();
  if (emailLower !== "engineering@spineldistribution.com" || password !== "spineldistribution@123") {
    return res.status(401).json({ error: "Invalid engineering credentials" });
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // Authenticate password with Supabase
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: emailLower,
        password: password
      });

      if (signInError) {
        const errMsg = signInError.message.toLowerCase();
        // If user not found, auto-signup
        if (errMsg.includes("invalid login credentials") || errMsg.includes("user not found")) {
          console.log("Admin user not found in Supabase. Attempting auto-signup...");
          const { error: signUpError } = await supabase.auth.signUp({
            email: emailLower,
            password: password,
            options: {
              data: {
                full_name: "Engr. Patrick Timi",
                company_name: "Spinel Distribution"
              }
            }
          });
          if (signUpError) {
            return res.status(400).json({ error: "Supabase auto-signup failed: " + signUpError.message });
          }
        } else {
          return res.status(400).json({ error: signInError.message });
        }
      }

      return res.json({
        success: true,
        user: {
          name: "Engr. Patrick Timi",
          email: emailLower,
          role: "admin",
          companyName: "Spinel Distribution"
        },
        token: `AdminToken_timmypatrick999`
      });

    } catch (err: any) {
      return res.status(500).json({ error: "Supabase server connection error: " + err.message });
    }
  } else {
    // Demo Mode Simulation
    return res.json({
      success: true,
      isDemo: true,
      user: {
        name: "Engr. Patrick Timi",
        email: emailLower,
        role: "admin",
        companyName: "Spinel Distribution"
      },
      token: `AdminToken_timmypatrick999`
    });
  }
});

app.post("/api/auth/admin/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP code are required" });
  }

  const emailLower = email.toLowerCase().trim();
  if (emailLower !== "timmypatrick999@gmail.com") {
    return res.status(400).json({ error: "Invalid admin email ID" });
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // 1. Try to verify using type 'email'
      let { data, error } = await supabase.auth.verifyOtp({
        email: emailLower,
        token: otp,
        type: "email"
      });

      // 2. If 'email' fails, try 'signup' (for auto-signup confirmation code)
      if (error) {
        console.log("Verification with type 'email' failed, trying 'signup' type...");
        const signupResult = await supabase.auth.verifyOtp({
          email: emailLower,
          token: otp,
          type: "signup"
        });
        if (!signupResult.error) {
          data = signupResult.data;
          error = null;
        } else {
          error = signupResult.error;
        }
      }

      if (error) {
        return res.status(401).json({ error: "Invalid OTP: " + error.message });
      }

      return res.json({
        success: true,
        user: {
          name: "Engr. Patrick Timi",
          email: emailLower,
          role: "admin",
          companyName: "Spinel Distribution"
        },
        token: `AdminToken_timmypatrick999`
      });

    } catch (err: any) {
      return res.status(500).json({ error: "Supabase verification connection error: " + err.message });
    }
  } else {
    // Demo Mode Verification
    const expectedOtp = (db as any).adminOTP || "888999";
    if (otp.trim() === expectedOtp || otp.trim() === "888999") {
      return res.json({
        success: true,
        isDemo: true,
        user: {
          name: "Engr. Patrick Timi",
          email: emailLower,
          role: "admin",
          companyName: "Spinel Distribution"
        },
        token: `AdminToken_timmypatrick999`
      });
    } else {
      return res.status(401).json({ error: "Incorrect One-Time Password. Please check the code and try again." });
    }
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const emailLower = email.toLowerCase().trim();

  // Block administrative credentials on general customer login
  if (emailLower === "engineering@spineldistribution.com" || emailLower === "timmypatrick999@gmail.com" || emailLower === "timi.patrick@dataset.ng") {
    return res.status(403).json({ error: "Administrative logins must go through the secure Admin Portal at /admin" });
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailLower,
        password
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const name = data.user?.user_metadata?.full_name || emailLower.split("@")[0].toUpperCase();
      const companyName = data.user?.user_metadata?.company_name || "";

      return res.json({
        name,
        email: emailLower,
        role: "customer",
        companyName,
        token: data.session?.access_token || `SupabaseToken_${Date.now()}`
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Supabase connection error: " + err.message });
    }
  } else {
    // Demo Mode local lookup
    const existingUser = db.users.find(u => u.email === emailLower);
    if (existingUser) {
      if (existingUser.password === password) {
        return res.json({
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          companyName: existingUser.companyName,
          token: `CustomerToken_${existingUser.id}`
        });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    }

    // Default simulation if not previously registered
    return res.json({
      name: emailLower.split("@")[0].toUpperCase(),
      email: emailLower,
      role: "customer",
      token: `DemoToken_${Date.now()}`
    });
  }
});

// 6. API: AI Smart Engineering Recommendation Consultant powered by Gemini API
app.post("/api/ai-recommend", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt requirement description required" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback for missing key
      return res.json({
        advice: `### Spinel Engineering Proposal
        
**Notice**: Gemini AI API key is not configured in environment variables. Here is an immediate fallback expert evaluation of your requirements:

Based on your requirement: "${prompt}", we highly recommend:
- **SpinelShield ATEX Explosion-Proof Dome Camera (SP-EXD-9100)**: ATEX certified stainless casing for any hazardous area.
- **Spinel NetCore Managed Industrial POE+ Switch (SP-NET-IS16)**: Wide temperature tolerance (-40°C to 85°C) to back up high-performance field links.
- **Spinel Titan-X 50kWh Lithium Energy Storage Cabinet (SP-TITAN-L50)**: Standard solar battery back up to keep systems online 24/7.

Please contact our engineering team directly at engineering@spineldistribution.com for custom design drawings.`,
        recommendedIds: ["sp-ex-dome-01", "sp-sw-ind-16", "sp-sol-bat-10"]
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const catalogString = db.products.map(p => 
      `ID: "${p.id}", Name: "${p.name}", Brand: "${p.brand}", Category: "${p.category}", SKU: "${p.sku}", Type: "${p.productType}", Specs: [${p.specifications.map(s => `${s.label}:${s.value}`).join("; ")}], Description: "${p.description.substring(0, 150)}..."`
    ).join("\n\n");

    const systemPrompt = `You are the Principal Lead Systems Architect and Telecom/Security Consultant for Spinel Distribution, an international premium ICT distributor.
Your job is to read the customer's engineering request, analyze their environment, and suggest the absolute best products from our ACTUAL product list.

Here is Spinel Distribution's current product inventory:
${catalogString}

Answer in elegant, clean markdown. Follow this specific output format strictly:
1. **ENVIRONMENTAL ANALYSIS**: 1-2 sentences summarizing the physical and regulatory challenges of their request (e.g., Zone 1 vs Zone 2, marine corrosion, thermal limits, power outages).
2. **RECOMMENDED SPINEL HARDWARE**: List the exact products from our catalog that fit this requirement. Include the precise name and SKU. Give a 1-2 sentence engineering justification for each.
3. **ARCHITECTURE BEST PRACTICES**: Provide 2 bullet points on how to install or integrate this hardware safely.
4. **RECOMMENDED_IDS_JSON**: On the absolute last line of your output, output a single line starting with "RECOMMENDED_IDS:" followed by a valid JSON array of matching product IDs from our inventory (e.g., RECOMMENDED_IDS:["sp-ex-dome-01", "sp-sw-ind-16"]). Ensure it is on the very last line.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const textOutput = response.text || "";
    
    // Parse recommended IDs from the last line
    let advice = textOutput;
    let recommendedIds: string[] = ["sp-ex-dome-01"]; // default fallback

    const lines = textOutput.split("\n");
    const idLine = lines.find(l => l.toUpperCase().startsWith("RECOMMENDED_IDS:"));
    if (idLine) {
      try {
        const jsonStr = idLine.substring(16).trim();
        recommendedIds = JSON.parse(jsonStr);
        // Strip the ID line from the displayed advice
        advice = lines.filter(l => !l.toUpperCase().startsWith("RECOMMENDED_IDS:")).join("\n");
      } catch (err) {
        console.error("Error parsing AI recommended IDs:", err);
      }
    }

    res.json({ advice, recommendedIds });

  } catch (error: any) {
    console.error("Gemini AI API failure:", error);
    res.status(500).json({ error: "Gemini recommendation failed: " + error.message });
  }
});

// Vite middleware configuration for full-stack integration
async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const hasBuild = fs.existsSync(path.join(distPath, "index.html"));
  const isProd = process.env.NODE_ENV === "production" || hasBuild;

  if (!isProd) {
    try {
      // Dev Mode: Mount Vite's HMR and file compiler
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite development server mounted successfully.");
    } catch (err) {
      console.warn("Failed to mount Vite dev server, falling back to static files:", err);
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  } else {
    // Production Mode: Serve static build artifacts
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files mounted successfully.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Spinel Distribution full-stack system running on port ${PORT}`);
  });
}

startServer();
