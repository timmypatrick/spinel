import { INITIAL_PRODUCTS } from "../data/initialData";
import { Product } from "../types";

// Helper to get products from local storage
export function getLocalProducts(): Product[] {
  const stored = localStorage.getItem("spinel_products");
  if (!stored) {
    localStorage.setItem("spinel_products", JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length < INITIAL_PRODUCTS.length) {
      localStorage.setItem("spinel_products", JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return parsed;
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
}

// Helper to set products in local storage
export function setLocalProducts(products: Product[]) {
  localStorage.setItem("spinel_products", JSON.stringify(products));
}

// Custom fetch wrapper that intercepts API calls to enable fully functional client-side mock backend when offline/on static hosts
export async function safeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlStr = typeof input === "string" ? input : (input as any).url || "";
  const method = init?.method || "GET";

  // Only intercept relative /api/ calls
  if (!urlStr.includes("/api/")) {
    return fetch(input, init);
  }

  try {
    const response = await fetch(input, init);
    const contentType = response.headers.get("content-type") || "";
    // If the server-side handles it cleanly and returns JSON (not HTML error/router fallback), return it
    if (response.ok && contentType.includes("application/json")) {
      return response;
    }
    throw new Error(`Invalid response or static server. Status: ${response.status}`);
  } catch (error) {
    console.warn(`[API Fallback] ${method} ${urlStr} redirected to client-side simulation:`, error);

    // 1. PRODUCTS ROUTE
    if (urlStr.includes("/api/products")) {
      const products = getLocalProducts();

      // Check if URL matches a single product: /api/products/:id
      const singleProductMatch = urlStr.match(/\/api\/products\/([^\/\?]+)/);
      
      if (singleProductMatch) {
        const id = singleProductMatch[1];

        // DELETE SINGLE PRODUCT
        if (method === "DELETE") {
          const idx = products.findIndex(p => p.id === id || p.slug === id);
          if (idx !== -1) {
            const deleted = products.splice(idx, 1)[0];
            setLocalProducts(products);
            return new Response(JSON.stringify({ message: "Product deleted successfully", deleted }), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            });
          }
          return new Response(JSON.stringify({ error: "Product not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
          });
        }

        // PUT UPDATE SINGLE PRODUCT
        if (method === "PUT") {
          const payload = JSON.parse(init?.body as string || "{}");
          const idx = products.findIndex(p => p.id === id || p.slug === id);
          if (idx !== -1) {
            const updated = {
              ...products[idx],
              ...payload,
              priceUSD: payload.priceUSD !== undefined ? Number(payload.priceUSD) : products[idx].priceUSD,
              priceNGN: payload.priceNGN !== undefined ? Number(payload.priceNGN) : products[idx].priceNGN,
              stock: payload.stock !== undefined ? Number(payload.stock) : products[idx].stock,
            };
            products[idx] = updated;
            setLocalProducts(products);
            return new Response(JSON.stringify(updated), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            });
          }
          return new Response(JSON.stringify({ error: "Product not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
          });
        }

        // GET SINGLE PRODUCT
        if (method === "GET") {
          const product = products.find(p => p.id === id || p.slug === id);
          if (product) {
            return new Response(JSON.stringify(product), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            });
          }
          return new Response(JSON.stringify({ error: "Product not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
          });
        }
      }

      // POST CREATE PRODUCT
      if (method === "POST") {
        const payload = JSON.parse(init?.body as string || "{}");
        const newProd = {
          id: `prod-${Date.now()}`,
          sku: payload.sku || `SKU-${Date.now()}`,
          name: payload.name || "Unnamed Product",
          slug: (payload.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          brand: payload.brand || "Spinel Brand",
          category: payload.category || "Uncategorized",
          subcategory: payload.subcategory || "",
          priceUSD: Number(payload.priceUSD || 0),
          priceNGN: Number(payload.priceNGN || (payload.priceUSD || 0) * 1500),
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
        products.unshift(newProd);
        setLocalProducts(products);
        return new Response(JSON.stringify(newProd), {
          status: 201,
          headers: { "Content-Type": "application/json" }
        });
      }

      // GET ALL PRODUCTS (supports query params simulation)
      if (method === "GET") {
        let list = [...products];
        try {
          // Parse relative queries using a dummy origin
          const urlObj = new URL(urlStr, "http://localhost");
          const search = urlObj.searchParams.get("search");
          const category = urlObj.searchParams.get("category");
          const brand = urlObj.searchParams.get("brand");
          const productType = urlObj.searchParams.get("productType");
          const sort = urlObj.searchParams.get("sort");

          if (search) {
            const q = search.toLowerCase();
            list = list.filter(p =>
              p.name.toLowerCase().includes(q) ||
              p.sku.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q)
            );
          }
          if (category) {
            list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
          }
          if (brand) {
            list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
          }
          if (productType) {
            list = list.filter(p => p.productType.toLowerCase() === productType.toLowerCase());
          }
          if (sort) {
            if (sort === "price-asc") {
              list.sort((a, b) => a.priceUSD - b.priceUSD);
            } else if (sort === "price-desc") {
              list.sort((a, b) => b.priceUSD - a.priceUSD);
            } else if (sort === "alphabetical") {
              list.sort((a, b) => a.name.localeCompare(b.name));
            }
          }
        } catch (e) {
          console.error("Error parsing fallback search params:", e);
        }
        return new Response(JSON.stringify(list), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // 2. AUTH ADMIN LOGIN ROUTE
    if (urlStr.includes("/api/auth/admin/login")) {
      const payload = JSON.parse(init?.body as string || "{}");
      const emailLower = (payload.email || "").toLowerCase().trim();
      const password = payload.password || "";

      if (emailLower !== "engineering@spineldistribution.com" || password !== "spineldistribution@123") {
        return new Response(JSON.stringify({ error: "Invalid Credentials" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        user: {
          name: "Engr. Patrick Timi",
          email: "engineering@spineldistribution.com",
          role: "admin",
          companyName: "Spinel Distribution"
        },
        token: `AdminToken_timmypatrick999`
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. ANY OTHER ENDPOINTS FALLBACK (quotes, messages, subscriptions)
    if (method === "POST") {
      const payload = JSON.parse(init?.body as string || "{}");
      return new Response(JSON.stringify({ success: true, message: "Saved successfully", data: payload }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}
