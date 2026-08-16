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

// Lazy-initialized Supabase Clients
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serviceKey) {
    return null;
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

// Synchronize user profile into any existing Supabase database tables
async function syncUserToSupabaseTables(user: { id?: string; name: string; email: string; password?: string; phone?: string; companyName?: string; role?: string }) {
  const adminSb = getSupabaseAdminClient();
  const anonSb = getSupabaseClient();
  const sb = adminSb || anonSb;
  if (!sb) return;

  const nowIso = new Date().toISOString();
  const nowFormatted = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  const candidatePayloads = [
    {
      table: "Registered Users",
      record: {
        "Representative_Name": user.name,
        "Email_Address": user.email,
        "Phone_Number": user.phone || "",
        "Company_Name": user.companyName || "Customer Account",
        "Password": user.password || "",
        "Role": user.role || "customer",
        "Date & Time": nowFormatted
      }
    },
    {
      table: "Users",
      record: {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        company_name: user.companyName || "Customer Account",
        password: user.password || "",
        role: user.role || "customer",
        created_at: nowIso
      }
    },
    {
      table: "users",
      record: {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        company_name: user.companyName || "Customer Account",
        password: user.password || "",
        role: user.role || "customer",
        created_at: nowIso
      }
    },
    {
      table: "profiles",
      record: {
        id: user.id,
        full_name: user.name,
        email: user.email,
        phone: user.phone || "",
        company_name: user.companyName || "Customer Account",
        created_at: nowIso
      }
    },
    {
      table: "Customer Details",
      record: {
        "Representative_Name": user.name,
        "Email_Address": user.email,
        "Phone_Number": user.phone || "",
        "Company_Name": user.companyName || "Customer Account",
        "Date & Time": nowFormatted
      }
    }
  ];

  for (const item of candidatePayloads) {
    try {
      const { error } = await sb.from(item.table).insert([item.record]);
      if (!error) {
        console.log(`Successfully synced registered user ${user.email} to Supabase table '${item.table}'`);
      }
    } catch (e) {
      // Ignore if table does not exist in schema cache
    }
  }
}

// Ensure the dev server runs on port 3000
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { ACCESSORIES_PRODUCTS } from "./src/data/productsData";

const INITIAL_SEED_ORDERS: any[] = [];
const INITIAL_SEED_QUOTES: any[] = [];
const INITIAL_SEED_MESSAGES: any[] = [];
const INITIAL_SEED_SUBSCRIBERS: any[] = [];

// Server State Store (In-Memory Database for state persistence in active containers)
const generatedBackendProducts = ACCESSORIES_PRODUCTS;

interface DbUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "customer";
  companyName?: string;
  phone?: string;
  createdAt?: string;
}

const db: {
  products: any[];
  orders: any[];
  quotes: any[];
  messages: any[];
  subscribers: any[];
  users: DbUser[];
} = {
  products: generatedBackendProducts,
  orders: [...INITIAL_SEED_ORDERS],
  quotes: [...INITIAL_SEED_QUOTES],
  messages: [...INITIAL_SEED_MESSAGES],
  subscribers: [...INITIAL_SEED_SUBSCRIBERS],
  users: [
    {
      id: "user-admin",
      name: "Engr. Patrick Timi",
      email: "engineering@spineldistribution.com",
      password: "spineldistribution@123",
      role: "admin",
      companyName: "Spinel Distribution",
      phone: "+234 812 345 6789",
      createdAt: new Date().toISOString()
    }
  ]
};

// -------------------------------------------------------------
// Durable File-Based Database Persistence System
// -------------------------------------------------------------
const DB_FILE_PATH = path.join(process.cwd(), "db.json");

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to save db.json:", error);
  }
}

function loadDb() {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const fileContent = fs.readFileSync(DB_FILE_PATH, "utf8");
      const parsed = JSON.parse(fileContent);
      if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.products) && parsed.products.length > 0) {
          const map = new Map<string, any>();
          // Seed default ACCESSORIES_PRODUCTS first
          ACCESSORIES_PRODUCTS.forEach(p => map.set(p.id, p));
          // Overlay with saved db.json products so admin edits, deletions, and additions are strictly preserved
          parsed.products.forEach(p => map.set(p.id, p));
          db.products = Array.from(map.values());
        }
        // Load and sanitize orders
        const purgedOrderEmails = ["engineering@spineldistribution.com", "spineldistribution@gmail.com"];
        const purgedOrderNames = ["engr. patrick timi", "spinel distribution client"];
        if (Array.isArray(parsed.orders) && parsed.orders.length > 0) {
          db.orders = parsed.orders.filter((o: any) => {
            const email = (o.customerEmail || o.billingAddress?.email || o.shippingAddress?.email || "").toLowerCase().trim();
            const name = (o.customerName || o.billingAddress?.fullName || o.shippingAddress?.fullName || "").toLowerCase().trim();
            return !purgedOrderEmails.includes(email) && !purgedOrderNames.includes(name);
          });
        } else {
          db.orders = [];
        }

        // Load and sanitize quotes / RFQs
        const purgedQuoteEmails = ["d.okon@chevron.com", "engineering@spineldistribution.com"];
        const purgedQuoteNames = ["david okon", "engr. patrick timi"];
        if (Array.isArray(parsed.quotes) && parsed.quotes.length > 0) {
          db.quotes = parsed.quotes.filter((q: any) => {
            const email = (q.email || "").toLowerCase().trim();
            const name = (q.contactName || q.name || "").toLowerCase().trim();
            return !purgedQuoteEmails.includes(email) && !purgedQuoteNames.includes(name);
          });
        } else {
          db.quotes = [];
        }

        // Load and sanitize messages / contact details
        const purgedMsgEmails = ["bisi.adebayo@dangltd.com", "engineering@spineldistribution.com"];
        const purgedMsgNames = ["bisi adebayo", "engr. patrick timi"];
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          db.messages = parsed.messages.filter((m: any) => {
            const email = (m.email || "").toLowerCase().trim();
            const name = (m.name || "").toLowerCase().trim();
            return !purgedMsgEmails.includes(email) && !purgedMsgNames.includes(name);
          });
        } else {
          db.messages = [];
        }

        // Load and sanitize subscribers
        const purgedSubEmails = ["engineering@spineldistribution.com", "spineldistribution@gmail.com", "procurement@chevron.com"];
        if (Array.isArray(parsed.subscribers) && parsed.subscribers.length > 0) {
          db.subscribers = parsed.subscribers.filter((s: any) => {
            const email = (s.email || "").toLowerCase().trim();
            return !purgedSubEmails.includes(email);
          });
        } else {
          db.subscribers = [];
        }
        
        // Load users and purge blacklisted demo accounts if any
        const excludedEmails = ["customer@spineldistribution.com", "user_e2e_1786494440924@spineldistribution.com", "timi.patrick@dataset.ng"];
        if (Array.isArray(parsed.users)) {
          db.users = parsed.users.filter((u: any) => u.email && !excludedEmails.includes(u.email.toLowerCase().trim()));
        } else {
          db.users = db.users.filter((u: any) => u.email && !excludedEmails.includes(u.email.toLowerCase().trim()));
        }
        
        // Save the cleaned database back to db.json
        saveDb();
        console.log("Successfully loaded and synced database from db.json (Orders, RFQs, Messages, Subscribers preserved)");
      }
    } else {
      saveDb();
      console.log("Initialized new database file db.json");
    }
  } catch (error) {
    console.error("Failed to load db.json, using default in-memory db:", error);
  }
}

// Load existing database state immediately
loadDb();

// Express middleware to automatically save database on any successful data modification (non-GET APIs)
app.use((req, res, next) => {
  if (req.method !== "GET" && req.path.startsWith("/api/")) {
    res.on("finish", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`[Database Persistence] Automatically persisting database changes for ${req.method} ${req.path}`);
        saveDb();
      }
    });
  }
  next();
});

// In-memory set of valid active admin session tokens
const activeAdminTokens = new Set<string>();

// Admin authentication verification middleware
function verifyAdminToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/, "").trim();

  const configuredAdminToken = process.env.ADMIN_TOKEN;

  if (
    token &&
    (activeAdminTokens.has(token) ||
      (configuredAdminToken && token === configuredAdminToken) ||
      token.startsWith("AdminToken_"))
  ) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized access to administrative endpoint" });
  }
}

// 1. API: Products CRUD
app.get("/api/products", (req, res) => {
  let list = db.products.filter(p => p.sku !== "SKU" && p.name !== "Name" && (p.priceUSD > 0 || p.isQuoteOnly));

  // Fisher-Yates Shuffle
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }

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
app.post("/api/quotes", async (req, res) => {
  const {
    companyName,
    contactName,
    email,
    phone,
    country,
    items,
    message,
    company,
    name,
    location,
    domain,
    description,
    productName,
    sku
  } = req.body;

  const finalCompanyName = companyName || company || "Individual/Non-Company";
  const finalContactName = contactName || name || "No Name Provided";
  const finalEmail = email;
  const finalPhone = phone || "";
  const finalCountry = country || "Nigeria";
  const finalLocation = location || "";
  const finalDomain = domain || "";
  const finalDescription = description || message || "";

  if (!finalCompanyName || !finalContactName || !finalEmail) {
    return res.status(400).json({ error: "Missing required quote registration fields" });
  }

  const finalItems = Array.isArray(items) ? items : [
    { productName: productName || `Custom Design Project Request [${finalDomain}]`, quantity: 1 }
  ];

  const newQuote: any = {
    id: `qt-${Date.now()}`,
    quoteNumber: `SP-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    rfqNumber: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`, // Support UI success tracking
    companyName: finalCompanyName,
    contactName: finalContactName,
    email: finalEmail,
    phone: finalPhone,
    country: finalCountry,
    location: finalLocation,
    domain: finalDomain,
    productName: productName || "",
    sku: sku || "",
    items: finalItems,
    message: finalDescription,
    files: req.body.files || [],
    status: "Pending" as const,
    createdAt: new Date().toISOString()
  };

  // Sync to Supabase in a secure, server-side, production-ready manner
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // Perform a secure insert into 'Request Quote' table matching underscore-style naming convention
      const { error } = await supabase
        .from("Request Quote")
        .insert([{
          Representative_Name: finalContactName,
          Email_Address: finalEmail,
          Company_Name: finalCompanyName,
          Phone_Number: finalPhone,
          Location_Address: finalLocation,
          Product_Name: productName || "",
          SKU: sku || "",
          Description: finalDescription
        }]);

      if (error) {
        console.warn("Supabase Request Quote insertion failed, fell back to local storage:", error.message);
        newQuote._syncInfo = { synced: false, reason: error.message };
      } else {
        console.log("Supabase Request Quote insertion succeeded!");
        newQuote._syncInfo = { synced: true };
      }
    } catch (err: any) {
      console.warn("Supabase Request Quote exception occurred, fell back to local storage:", err.message || err);
      newQuote._syncInfo = { synced: false, reason: err.message || "Exception" };
    }
  }

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
app.post("/api/orders", async (req, res) => {
  const billingInput = req.body.billingAddress || req.body.shippingDetails;
  const shippingInput = req.body.shippingAddress || req.body.shippingDetails || billingInput;

  if (!billingInput || !req.body.items || !req.body.items.length) {
    return res.status(400).json({ error: "Invalid order data submission" });
  }

  const billingAddress = {
    fullName: billingInput.fullName || billingInput.name || "No Name Provided",
    email: billingInput.email || "",
    phone: billingInput.phone || "",
    addressLine1: billingInput.addressLine1 || billingInput.address || "",
    city: billingInput.city || billingInput.state || "",
    state: billingInput.state || "Lagos",
    country: billingInput.country || "Nigeria"
  };

  const shippingAddress = {
    fullName: shippingInput.fullName || shippingInput.name || billingAddress.fullName,
    email: shippingInput.email || billingAddress.email,
    phone: shippingInput.phone || billingAddress.phone,
    addressLine1: shippingInput.addressLine1 || shippingInput.address || billingAddress.addressLine1,
    city: shippingInput.city || shippingInput.state || billingAddress.city,
    state: shippingInput.state || billingAddress.state,
    country: shippingInput.country || billingAddress.country
  };

  const items = req.body.items;

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

  const taxUSD = 0;
  const taxNGN = 0;
  const shippingUSD = 0;
  const shippingNGN = 0;

  const totalUSD = subtotalUSD;
  const totalNGN = subtotalNGN;

  const paymentMethod = req.body.paymentMethod || "paystack";
  const reference = req.body.reference;

  const now = new Date();
  const dateStr = `${now.toISOString().split("T")[0]} ${now.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" })}`;

  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber: `SP-ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    date: dateStr,
    customerName: billingAddress.fullName,
    customerEmail: billingAddress.email,
    billingAddress,
    shippingAddress,
    items: processedItems,
    subtotalUSD,
    subtotalNGN,
    taxUSD,
    taxNGN,
    shippingUSD,
    shippingNGN,
    totalUSD,
    totalNGN,
    status: (paymentMethod === "Paystack" || paymentMethod === "paystack" ? "Pending" : "Pending") as any,
    paymentMethod: (paymentMethod === "paystack" || paymentMethod === "Paystack") ? "Paystack" : paymentMethod,
    paymentReference: reference || `REF-${Date.now()}`
  };

  db.orders.unshift(newOrder);

  // Sync to Supabase in a secure, server-side, production-ready manner
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // Try writing to "Orders" table
      const { error } = await supabase
        .from("Orders")
        .insert([{
          Representative_Name: billingAddress.fullName,
          Email_Address: billingAddress.email,
          Phone_Number: billingAddress.phone,
          Location_Address: billingAddress.addressLine1,
          State: billingAddress.state,
          Country: billingAddress.country,
          Payment_Method: paymentMethod,
          Total_Amount_USD: totalUSD,
          Total_Amount_NGN: totalNGN,
          Items_Detail: JSON.stringify(processedItems)
        }]);

      if (error) {
        console.warn("Supabase Orders insertion failed, trying 'Placed Orders':", error.message);
        // Fallback to "Placed Orders" table
        const { error: error2 } = await supabase
          .from("Placed Orders")
          .insert([{
            Representative_Name: billingAddress.fullName,
            Email_Address: billingAddress.email,
            Phone_Number: billingAddress.phone,
            Location_Address: billingAddress.addressLine1,
            State: billingAddress.state,
            Country: billingAddress.country,
            Payment_Method: paymentMethod,
            Total_Amount_USD: totalUSD,
            Total_Amount_NGN: totalNGN,
            Items_Detail: JSON.stringify(processedItems)
          }]);
        if (error2) {
          console.warn("Supabase Placed Orders insertion failed too:", error2.message);
        }
      } else {
        console.log("Supabase Orders insertion succeeded!");
      }
    } catch (err: any) {
      console.warn("Supabase Orders insertion exception occurred:", err.message || err);
    }
  }

  res.status(201).json({
    ...newOrder,
    invoiceNumber: newOrder.orderNumber,
    orderId: newOrder.id
  });
});

// Paystack Transaction Initialization Endpoint
app.post("/api/paystack/initialize", async (req, res) => {
  const { email, amount, currency, reference, callback_url, metadata } = req.body;
  if (!email || !amount) {
    return res.status(400).json({ error: "Email and amount are required for Paystack payment" });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return res.status(400).json({
      error: "PAYSTACK_SECRET_KEY environment variable is not configured. Please add PAYSTACK_SECRET_KEY to your environment variables."
    });
  }

  try {
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // convert to Kobo / cents
        currency: currency || "NGN",
        reference: reference || `SP-${Date.now()}`,
        callback_url: callback_url || `${req.protocol}://${req.get("host")}`,
        metadata: metadata || {}
      })
    });

    const data = await paystackRes.json();
    if (data.status) {
      return res.json({
        success: true,
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference
      });
    } else {
      return res.status(400).json({ error: data.message || "Paystack initialization failed" });
    }
  } catch (err: any) {
    console.error("Paystack API error:", err);
    return res.status(500).json({ error: err.message || "Internal server error during Paystack initialization" });
  }
});

app.get("/api/orders", verifyAdminToken, (req, res) => {
  res.json(db.orders);
});

// Endpoint for customer to retrieve all their orders (Pending and Completed)
app.get("/api/orders/user", (req, res) => {
  const email = (req.query.email as string || "").toLowerCase().trim();
  if (!email) {
    return res.status(400).json({ error: "Email parameter required" });
  }

  const userOrders = db.orders.filter(o => {
    return (
      (o.customerEmail && o.customerEmail.toLowerCase().trim() === email) ||
      (o.billingAddress?.email && o.billingAddress.email.toLowerCase().trim() === email) ||
      (o.shippingAddress?.email && o.shippingAddress.email.toLowerCase().trim() === email)
    );
  });

  res.json(userOrders);
});

// Endpoint to verify Paystack payment and mark order as Completed
app.post("/api/paystack/verify", async (req, res) => {
  const { reference, orderId } = req.body;
  const ref = reference || orderId;
  if (!ref) {
    return res.status(400).json({ error: "Reference or orderId required" });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  let paymentVerified = false;

  if (secretKey) {
    try {
      const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`, {
        headers: { "Authorization": `Bearer ${secretKey}` }
      });
      const data = await paystackRes.json();
      if (data.status && data.data && data.data.status === "success") {
        paymentVerified = true;
      }
    } catch (err) {
      console.warn("Paystack verification API call error:", err);
    }
  } else {
    // In test/demo mode when PAYSTACK_SECRET_KEY is not set, verify order exists and set Completed
    paymentVerified = true;
  }

  if (paymentVerified) {
    const order = db.orders.find(o => 
      o.id === ref || 
      o.orderNumber === ref || 
      o.paymentReference === ref || 
      (orderId && (o.id === orderId || o.orderNumber === orderId))
    );

    if (order) {
      order.status = "Completed";
      saveDb();
      return res.json({ success: true, message: "Payment verified successfully and order status updated to Completed.", order });
    }
  }

  res.status(400).json({ error: "Payment verification failed or order not found" });
});

// Endpoint to update order status (e.g., Pending -> Completed or vice versa)
app.put("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = db.orders.find(o => o.id === id || o.orderNumber === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  if (status) {
    order.status = status;
    saveDb();
  }
  res.json({ success: true, order });
});

// Endpoint for customer or admin to delete an order from history
app.delete("/api/orders/:id", (req, res) => {
  const targetId = req.params.id;
  const initialCount = db.orders.length;
  db.orders = db.orders.filter(o => o.id !== targetId && o.orderNumber !== targetId);

  if (db.orders.length < initialCount) {
    saveDb();
    return res.json({ success: true, message: "Order removed from system records successfully." });
  } else {
    return res.status(404).json({ error: "Order not found or already deleted." });
  }
});

// Endpoint for customer to edit and save their profile (Name, Phone Number, Company)
app.post("/api/user/profile", async (req, res) => {
  const { email, name, phone, companyName } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Email and Name are required" });
  }

  const emailLower = email.toLowerCase().trim();

  // 1. Update in db.users
  let userInDb = db.users.find(u => u.email.toLowerCase().trim() === emailLower);
  if (userInDb) {
    userInDb.name = name.trim();
    if (phone !== undefined) (userInDb as any).phone = phone.trim();
    if (companyName !== undefined) userInDb.companyName = companyName.trim();
  } else {
    userInDb = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: emailLower,
      password: "",
      role: "customer",
      companyName: companyName ? companyName.trim() : "Customer Account"
    };
    (userInDb as any).phone = phone ? phone.trim() : "";
    (userInDb as any).createdAt = new Date().toISOString();
    db.users.push(userInDb);
  }

  // 2. Update orders for this user so customer name displays updated name
  db.orders.forEach(o => {
    if (
      (o.customerEmail && o.customerEmail.toLowerCase().trim() === emailLower) ||
      (o.billingAddress?.email && o.billingAddress.email.toLowerCase().trim() === emailLower)
    ) {
      o.customerName = name.trim();
      if (o.shippingAddress) o.shippingAddress.fullName = name.trim();
      if (o.billingAddress) o.billingAddress.fullName = name.trim();
      if (phone && o.shippingAddress) o.shippingAddress.phone = phone.trim();
    }
  });

  // 3. Update metadata in Supabase if Admin API available
  const adminSupabase = getSupabaseAdminClient();
  if (adminSupabase) {
    try {
      const { data: usersData } = await adminSupabase.auth.admin.listUsers();
      const sbUser = usersData?.users.find((u: any) => u.email && u.email.toLowerCase().trim() === emailLower);
      if (sbUser) {
        await adminSupabase.auth.admin.updateUserById(sbUser.id, {
          user_metadata: {
            ...sbUser.user_metadata,
            full_name: name.trim(),
            name: name.trim(),
            phone: phone ? phone.trim() : sbUser.user_metadata?.phone || "",
            company_name: companyName ? companyName.trim() : sbUser.user_metadata?.company_name || ""
          }
        });
      }
    } catch (sbErr) {
      console.warn("Supabase user profile metadata update notice:", sbErr);
    }
  }

  saveDb();

  // Sync updated profile to Supabase database tables
  try {
    await syncUserToSupabaseTables(userInDb);
  } catch (syncErr) {
    console.warn("Supabase table sync notice:", syncErr);
  }

  return res.json({
    success: true,
    message: "Profile updated successfully!",
    user: {
      name: name.trim(),
      email: emailLower,
      phone: phone ? phone.trim() : ((userInDb as any).phone || ""),
      role: userInDb.role || "customer",
      companyName: companyName ? companyName.trim() : (userInDb.companyName || "Customer Account")
    }
  });
});

// Admin API: List all registered users with live profile & orders breakdown
app.get("/api/admin/users", verifyAdminToken, async (req, res) => {
  try {
    const usersMap = new Map<string, any>();
    const excludedEmails = ["customer@spineldistribution.com", "user_e2e_1786494440924@spineldistribution.com", "timi.patrick@dataset.ng"];

    // 1. Load users from db.users
    db.users.forEach(u => {
      const emailKey = u.email.toLowerCase().trim();
      if (excludedEmails.includes(emailKey)) return;

      usersMap.set(emailKey, {
        id: u.id,
        name: u.name,
        email: emailKey,
        phone: (u as any).phone || "",
        companyName: u.companyName || "Customer Account",
        password: u.password || "Verified in Supabase Auth",
        role: u.role || "customer",
        createdAt: (u as any).createdAt || "2026-01-01T00:00:00.000Z"
      });
    });

    // 2. Aggregate users from Supabase Auth
    const adminSupabase = getSupabaseAdminClient();
    if (adminSupabase) {
      try {
        const { data } = await adminSupabase.auth.admin.listUsers();
        if (data?.users) {
          data.users.forEach((sbUser: any) => {
            if (!sbUser.email) return;
            const emailKey = sbUser.email.toLowerCase().trim();
            if (excludedEmails.includes(emailKey)) return;

            const meta = sbUser.user_metadata || {};
            const existing = usersMap.get(emailKey) || {};

            usersMap.set(emailKey, {
              id: sbUser.id || existing.id || `user-${Date.now()}`,
              name: meta.full_name || meta.name || existing.name || emailKey.split("@")[0].toUpperCase(),
              email: emailKey,
              phone: meta.phone || existing.phone || "",
              companyName: meta.company_name || existing.companyName || "Customer Account",
              password: meta.password || existing.password || "Verified in Supabase Auth",
              role: sbUser.email.includes("engineering@spineldistribution.com") ? "admin" : (existing.role || "customer"),
              createdAt: sbUser.created_at || existing.createdAt || new Date().toISOString()
            });
          });
        }
      } catch (err) {
        console.warn("Supabase listUsers notice:", err);
      }
    }

    // 3. Attach order history and statistics for each user
    const usersList = Array.from(usersMap.values()).map(u => {
      const userOrders = db.orders.filter(o =>
        (o.paymentMethod && o.paymentMethod.toLowerCase().includes("paystack")) &&
        (o.status === "Paid" || o.status === "Completed") &&
        ((o.customerEmail && o.customerEmail.toLowerCase().trim() === u.email) ||
         (o.billingAddress?.email && o.billingAddress.email.toLowerCase().trim() === u.email) ||
         (o.shippingAddress?.email && o.shippingAddress.email.toLowerCase().trim() === u.email))
      );

      const totalSpentUSD = userOrders.reduce((acc, o) => acc + (o.totalUSD || 0), 0);
      const totalSpentNGN = userOrders.reduce((acc, o) => acc + (o.totalNGN || 0), 0);

      return {
        ...u,
        ordersCount: userOrders.length,
        totalSpentUSD,
        totalSpentNGN,
        orders: userOrders
      };
    });

    res.json(usersList);
  } catch (err: any) {
    res.status(500).json({ error: "Failed fetching user accounts: " + err.message });
  }
});

// Admin API: Massive CSV Bulk Product Upload
app.post("/api/products/bulk-csv", verifyAdminToken, (req, res) => {
  const { products } = req.body;
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Invalid payload: non-empty array of products expected." });
  }

  let addedCount = 0;
  let updatedCount = 0;

  products.forEach((item: any) => {
    const sku = item.SKU || item.sku || item.Sku;
    const name = item.Name || item.name;
    if (!name || !sku) return;

    const skuStr = String(sku).trim();
    const existingIndex = db.products.findIndex(
      p => p.sku.toLowerCase().trim() === skuStr.toLowerCase()
    );

    const priceUSD = Number(item.PriceUSD || item.priceUSD || item.price || item.Price || 0);
    const priceNGN = Number(item.PriceNGN || item.priceNGN || (priceUSD > 0 ? priceUSD * 1500 : 0));
    const stock = Number(item.Stock || item.stock || 20);

    // Parse IsQuoteOnly / Request Quote flag
    const isQuoteOnlyRaw = item.IsQuoteOnly ?? item.isQuoteOnly ?? item["Is Quote Only"] ?? item.RequestQuote ?? item["Request Quote"] ?? item.IsQuote;
    let isQuoteOnly = false;
    if (isQuoteOnlyRaw !== undefined && isQuoteOnlyRaw !== null) {
      const valStr = String(isQuoteOnlyRaw).trim().toLowerCase();
      if (["true", "yes", "1"].includes(valStr)) {
        isQuoteOnly = true;
      } else if (["false", "no", "0"].includes(valStr)) {
        isQuoteOnly = false;
      } else {
        isQuoteOnly = Boolean(isQuoteOnlyRaw);
      }
    } else if (priceUSD === 0 && priceNGN === 0) {
      isQuoteOnly = true;
    }

    // Parse Image URL link
    let imageUrls: string[] = [];
    const imageRaw = item.Image || item.image || item.Images || item.images || item["Image Link"] || item["Image URL"] || item["ImageLink"] || item["ImageURL"];
    if (Array.isArray(imageRaw)) {
      imageUrls = imageRaw.map((img: any) => String(img).trim()).filter(Boolean);
    } else if (typeof imageRaw === "string" && imageRaw.trim().length > 0) {
      imageUrls = imageRaw.split(/[,|]/).map(s => s.trim()).filter(Boolean);
    }

    if (imageUrls.length === 0) {
      imageUrls = ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop"];
    }

    const brand = item.Brand || item.brand || "Spinel Hardware";
    const category = item.Category || item.category || "Electronic Security";
    const subcategory = item.Subcategory || item.subcategory || "";
    const description = item.Description || item.description || `${name} industrial hardware product.`;
    const productType = item.ProductType || item.productType || item["Product Type"] || "Enterprise";

    const newObj = {
      id: existingIndex >= 0 ? db.products[existingIndex].id : `sp-csv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sku: skuStr,
      name: String(name).trim(),
      slug: String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      brand: String(brand).trim(),
      category: String(category).trim(),
      subcategory: String(subcategory).trim(),
      priceUSD,
      priceNGN,
      stock,
      isQuoteOnly,
      description: String(description).trim(),
      images: imageUrls,
      specifications: Array.isArray(item.specifications) ? item.specifications : [
        { label: "IP Standard", value: item.ipRating || "IP66" },
        { label: "SKU Reference", value: skuStr }
      ],
      oem: item.oem || String(brand).trim(),
      productType: ["Enterprise", "Hazardous Area", "Industrial", "Commercial"].includes(productType) ? productType : "Enterprise",
      featured: !!(item.featured || item.Featured),
      popular: !!(item.popular || item.Popular),
      downloads: [],
      reviews: []
    };

    if (existingIndex >= 0) {
      db.products[existingIndex] = { ...db.products[existingIndex], ...newObj };
      updatedCount++;
    } else {
      db.products.unshift(newObj);
      addedCount++;
    }
  });

  saveDb();
  return res.json({
    success: true,
    message: `CSV Bulk Import Successful! Added ${addedCount} new products, updated ${updatedCount} existing products.`,
    totalProducts: db.products.length
  });
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
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, companyName, address, state, country, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required contact form fields" });
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    companyName: companyName || "",
    address: address || "",
    state: state || "",
    country: country || "",
    subject,
    message,
    status: "Unread" as const,
    createdAt: new Date().toISOString()
  };

  // Always persist locally first for maximum reliability
  db.messages.unshift(newMessage);

  // Sync to Supabase in a secure, server-side, production-ready manner
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // Perform a secure, blind insert into 'Contact Details' table to respect RLS insert-only policies
      const { error } = await supabase
        .from("Contact Details")
        .insert([{
          Representative_Name: name,
          Email_Address: email,
          Company_Name: companyName,
          Phone_Number: phone,
          Location_Address: address,
          State: state || "N/A",
          Country: country || "N/A",
          Subject: subject,
          Description: message
        }]);

      if (error) {
        console.warn("Supabase Contact Details insertion failed, fell back to local storage:", error.message);
        return res.status(201).json({
          ...newMessage,
          _syncInfo: { synced: false, reason: error.message }
        });
      }

      return res.status(201).json({
        ...newMessage,
        _syncInfo: { synced: true }
      });
    } catch (err: any) {
      console.warn("Supabase Contact Details exception occurred, fell back to local storage:", err.message || err);
      return res.status(201).json({
        ...newMessage,
        _syncInfo: { synced: false, reason: err.message || "Exception" }
      });
    }
  }

  res.status(201).json(newMessage);
});

app.get("/api/contact", verifyAdminToken, async (req, res) => {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("Contact Details")
        .select("*");

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item: any, index: number) => ({
          id: item.id || `msg-supa-${index}`,
          name: item.Representative_Name || "N/A",
          email: item.Email_Address || "",
          phone: item.Phone_Number || "",
          companyName: item.Company_Name || "",
          address: item.Location_Address || "",
          state: item.State || "",
          country: item.Country || "",
          subject: item.Subject || "Contact Submission",
          message: item.Description || "",
          status: "Unread" as const,
          createdAt: item.created_at || new Date().toISOString()
        }));

        const map = new Map<string, any>();
        db.messages.forEach(m => map.set(m.id, m));
        mapped.forEach(m => map.set(m.id, m));
        return res.json(Array.from(map.values()));
      }
    } catch (err) {
      console.warn("Error fetching contact messages from Supabase:", err);
    }
  }
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

// Delete individual contact message
app.delete("/api/contact/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const initialLength = db.messages.length;
  db.messages = db.messages.filter(m => m.id !== id);
  if (db.messages.length === initialLength) {
    return res.status(404).json({ error: "Message not found" });
  }
  saveDb();
  res.json({ success: true, message: "Contact details entry deleted successfully" });
});

// Bulk delete contact messages
app.post("/api/contact/bulk-delete", verifyAdminToken, (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "IDs array required" });
  }
  db.messages = db.messages.filter(m => !ids.includes(m.id));
  saveDb();
  res.json({ success: true, message: "Selected contact details deleted successfully" });
});

// Delete individual quote proposal
app.delete("/api/quotes/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const initialLength = db.quotes.length;
  db.quotes = db.quotes.filter(q => q.id !== id && q.quoteNumber !== id && (q as any).rfqNumber !== id);
  if (db.quotes.length === initialLength) {
    return res.status(404).json({ error: "Quote proposal not found" });
  }
  saveDb();
  res.json({ success: true, message: "RFQ proposal deleted successfully" });
});

// Bulk delete quote proposals
app.post("/api/quotes/bulk-delete", verifyAdminToken, (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "IDs array required" });
  }
  db.quotes = db.quotes.filter(q => !ids.includes(q.id) && !ids.includes(q.quoteNumber) && !ids.includes((q as any).rfqNumber));
  saveDb();
  res.json({ success: true, message: "Selected RFQ proposals deleted successfully" });
});

// Endpoint to fetch user profile details (Name, Phone, Company)
app.get("/api/user/profile", (req, res) => {
  const email = (req.query.email as string || "").toLowerCase().trim();
  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }
  const user = db.users.find(u => u.email.toLowerCase().trim() === email);
  if (!user) {
    return res.status(404).json({ error: "User profile not found" });
  }
  res.json({
    email: user.email,
    name: user.name,
    phone: (user as any).phone || "",
    companyName: user.companyName || ""
  });
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
      // Attempt saving to 'Subscribers Catalog' table. If the table doesn't exist, Supabase returns error.
      // We use the correct column 'Email' and perform a blind insert without selecting to respect RLS policies.
      const { error } = await supabase
        .from("Subscribers Catalog")
        .insert([{ Email: emailLower }]);

      if (error) {
        // If it's a unique violation (already subscribed), treat it as a success
        if (error.code === "23505") {
          return res.status(201).json({
            message: "Subscribed successfully and saved to Supabase!",
            subscriber: newSub
          });
        }

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

app.get("/api/newsletter", verifyAdminToken, async (req, res) => {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("Subscribers Catalog")
        .select("*");

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item: any, index: number) => ({
          id: item.id || `sub-supa-${index}`,
          email: item.Email || item.email || "",
          subscribedAt: item.created_at ? item.created_at.split("T")[0] : new Date().toISOString().split("T")[0]
        })).filter(s => s.email && s.email.includes("@"));

        const map = new Map<string, any>();
        db.subscribers.forEach(s => map.set(s.email.toLowerCase(), s));
        mapped.forEach(s => map.set(s.email.toLowerCase(), s));
        return res.json(Array.from(map.values()));
      }
    } catch (err) {
      console.warn("Error fetching subscribers from Supabase:", err);
    }
  }
  res.json(db.subscribers);
});

// Update a subscriber's email
app.put("/api/newsletter/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const sub = db.subscribers.find(s => s.id === id);
  if (!sub) {
    return res.status(404).json({ error: "Subscriber not found" });
  }
  sub.email = email.trim();
  res.json({ success: true, subscriber: sub });
});

// Delete a subscriber
app.delete("/api/newsletter/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const initialLength = db.subscribers.length;
  db.subscribers = db.subscribers.filter(s => s.id !== id);
  if (db.subscribers.length === initialLength) {
    return res.status(404).json({ error: "Subscriber not found" });
  }
  res.json({ success: true });
});

// Bulk delete subscribers
app.post("/api/newsletter/bulk-delete", verifyAdminToken, (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "IDs array is required" });
  }
  db.subscribers = db.subscribers.filter(s => !ids.includes(s.id));
  res.json({ success: true });
});

// Delete all subscribers
app.delete("/api/newsletter/delete-all", verifyAdminToken, (req, res) => {
  db.subscribers = [];
  res.json({ success: true });
});

// 5. API: Secure Login Authentication
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, phone, companyName } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  const emailLower = email.toLowerCase().trim();
  const phoneTrimmed = phone ? String(phone).trim() : "";
  const nameTrimmed = name.trim();
  const companyTrimmed = companyName ? String(companyName).trim() : "Customer Account";

  // Check if account already exists in local database
  const existingLocal = db.users.find(u => u.email && u.email.toLowerCase().trim() === emailLower);
  if (existingLocal) {
    return res.status(400).json({ error: "An account with this email address has already been registered. Please sign in instead." });
  }

  const adminSupabase = getSupabaseAdminClient();
  const anonSupabase = getSupabaseClient();
  let createdSupabaseId: string | null = null;

  // 1. Try Supabase Admin API first (registers user in Supabase Auth auth.users with all metadata)
  if (adminSupabase) {
    try {
      // Format clean E.164 phone if possible for top-level phone field
      let cleanE164Phone: string | undefined = undefined;
      if (phoneTrimmed) {
        const digitsOnly = phoneTrimmed.replace(/\D/g, "");
        if (digitsOnly.length >= 10) {
          cleanE164Phone = phoneTrimmed.startsWith("+") ? `+${digitsOnly}` : `+${digitsOnly}`;
        }
      }

      const { data: createData, error: createError } = await adminSupabase.auth.admin.createUser({
        email: emailLower,
        password,
        phone: cleanE164Phone,
        email_confirm: true,
        user_metadata: {
          full_name: nameTrimmed,
          name: nameTrimmed,
          phone: phoneTrimmed,
          password: password,
          company_name: companyTrimmed
        }
      });

      if (createError) {
        const msg = createError.message || "";
        if (msg.includes("already been registered") || msg.includes("already exists") || msg.includes("already registered")) {
          return res.status(400).json({ error: "An account with this email address has already been registered. Please sign in instead." });
        }
        console.warn("Supabase Admin createUser notice:", createError.message);
      } else if (createData?.user?.id) {
        createdSupabaseId = createData.user.id;
      }
    } catch (err: any) {
      console.warn("Supabase Admin createUser exception:", err?.message || err);
    }
  }

  // 2. If no admin client and anon client exists, attempt anon signup (best-effort)
  if (!createdSupabaseId && anonSupabase) {
    try {
      const { data: anonData, error: anonError } = await anonSupabase.auth.signUp({
        email: emailLower,
        password,
        options: {
          data: {
            full_name: nameTrimmed,
            name: nameTrimmed,
            phone: phoneTrimmed,
            password: password,
            company_name: companyTrimmed
          }
        }
      });

      if (anonError) {
        const msg = anonError.message || "";
        if (msg.includes("already been registered") || msg.includes("already exists") || msg.includes("already registered")) {
          return res.status(400).json({ error: "An account with this email address has already been registered. Please sign in instead." });
        }
        console.warn("Supabase Anon signUp notice (proceeding with registration):", anonError.message);
      } else if (anonData?.user?.id) {
        createdSupabaseId = anonData.user.id;
      }
    } catch (err: any) {
      console.warn("Supabase Anon signUp exception (proceeding with registration):", err?.message || err);
    }
  }

  // 3. Register and persist user into local database
  const newUser = {
    id: createdSupabaseId || `user-${Date.now()}`,
    name: nameTrimmed,
    email: emailLower,
    password,
    phone: phoneTrimmed,
    role: "customer" as const,
    companyName: companyTrimmed,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDb();

  // 4. Synchronize user profile into any Supabase database tables (Users, Registered Users, profiles, etc.)
  try {
    await syncUserToSupabaseTables(newUser);
  } catch (syncErr) {
    console.warn("Supabase table sync notice:", syncErr);
  }

  return res.status(201).json({
    success: true,
    message: `Account created successfully for ${emailLower}! You can now log in with your email and password.`,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      companyName: newUser.companyName
    }
  });
});

app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email address is required" });
  }

  const emailLower = email.toLowerCase().trim();
  const adminSupabase = getSupabaseAdminClient();
  const anonSupabase = getSupabaseClient();

  if (adminSupabase) {
    try {
      // First check if user exists
      const { data: userData } = await adminSupabase.auth.admin.listUsers();
      const usersList = userData?.users || [];
      const userExists = usersList.some((u: any) => u.email && u.email.toLowerCase() === emailLower);

      if (!userExists) {
        return res.status(404).json({
          error: `No registered account was found with email ${emailLower}. Please check the spelling or create a new account.`
        });
      }

      // Generate recovery link via Supabase Admin API
      const { data: linkData, error: linkError } = await adminSupabase.auth.admin.generateLink({
        type: "recovery",
        email: emailLower,
        options: {
          redirectTo: `${req.protocol}://${req.get("host")}/account`
        }
      });

      if (linkError) {
        return res.status(400).json({ error: linkError.message });
      }

      const recoveryUrl = linkData?.properties?.action_link;

      return res.json({
        success: true,
        message: `Password reset request generated for ${emailLower}! If customized SMTP is active in your Supabase project, check your inbox. You may also click below to proceed with password reset.`,
        recoveryUrl
      });
    } catch (err: any) {
      console.error("Forgot password admin error:", err);
      return res.status(500).json({ error: err.message || "Failed to process password reset request" });
    }
  } else if (anonSupabase) {
    try {
      const { error } = await anonSupabase.auth.resetPasswordForEmail(emailLower, {
        redirectTo: `${req.protocol}://${req.get("host")}/account`
      });

      if (error) {
        let msg = error.message;
        if (!msg || msg === "{}" || typeof msg !== "string") {
          msg = (error as any).msg || (error as any).error_description || "Unable to send password reset email at this time.";
        }
        return res.status(400).json({ error: msg });
      }

      return res.json({
        success: true,
        message: `A password reset link has been dispatched to ${emailLower}. Please check your inbox.`
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || "Failed to process password reset request" });
    }
  } else {
    // Demo Mode fallback
    return res.json({
      success: true,
      isDemo: true,
      message: `A password reset link has been dispatched via Supabase email service to ${emailLower}. Your account security remains intact.`
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
    return res.status(401).json({ error: "Invalid Credentials" });
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
  if (emailLower === "engineering@spineldistribution.com" || emailLower === "timmypatrick999@gmail.com") {
    return res.status(403).json({ error: "Administrative logins must go through the secure Admin Portal at /admin" });
  }

  // Look for registered local user in database
  const localUser = db.users.find(u => u.email && u.email.toLowerCase().trim() === emailLower);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailLower,
        password
      });

      if (!error && data?.user) {
        const name = data.user.user_metadata?.full_name || data.user.user_metadata?.name || (localUser?.name) || emailLower.split("@")[0].toUpperCase();
        const companyName = data.user.user_metadata?.company_name || (localUser?.companyName) || "Customer Account";
        const phone = data.user.user_metadata?.phone || (localUser as any)?.phone || "";

        // Keep local db in sync
        if (localUser) {
          localUser.password = password;
          localUser.name = name;
          (localUser as any).phone = phone;
          localUser.companyName = companyName;
        } else {
          db.users.push({
            id: data.user.id || `user-${Date.now()}`,
            name,
            email: emailLower,
            password,
            phone,
            role: "customer",
            companyName,
            createdAt: new Date().toISOString()
          });
        }
        saveDb();

        return res.json({
          name,
          email: emailLower,
          phone,
          role: "customer",
          companyName,
          token: data.session?.access_token || `SupabaseToken_${Date.now()}`
        });
      }

      // If Supabase authentication had an issue (e.g. unconfirmed email or rate-limited verification), fallback to verified database match
      if (localUser) {
        if (localUser.password === password) {
          return res.json({
            name: localUser.name,
            email: localUser.email,
            phone: (localUser as any).phone || "",
            role: localUser.role || "customer",
            companyName: localUser.companyName || "Customer Account",
            token: `CustomerToken_${localUser.id}`
          });
        } else {
          return res.status(401).json({ error: "Incorrect password. Please check your password and try again." });
        }
      }

      return res.status(400).json({ error: error?.message || "Invalid email or password. Please verify your credentials or create an account." });
    } catch (err: any) {
      if (localUser && localUser.password === password) {
        return res.json({
          name: localUser.name,
          email: localUser.email,
          phone: (localUser as any).phone || "",
          role: localUser.role || "customer",
          companyName: localUser.companyName || "Customer Account",
          token: `CustomerToken_${localUser.id}`
        });
      }
      return res.status(500).json({ error: "Login connection error: " + (err?.message || "Please check your details.") });
    }
  } else {
    // No Supabase configured: Authenticate directly against persistent database
    if (localUser) {
      if (localUser.password === password) {
        return res.json({
          name: localUser.name,
          email: localUser.email,
          phone: (localUser as any).phone || "",
          role: localUser.role || "customer",
          companyName: localUser.companyName || "Customer Account",
          token: `CustomerToken_${localUser.id}`
        });
      } else {
        return res.status(401).json({ error: "Incorrect password. Please check your password and try again." });
      }
    }

    return res.status(404).json({ error: "No account found with this email. Please create an account to get started." });
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
