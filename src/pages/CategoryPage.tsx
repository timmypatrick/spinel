import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, Info, Search, RefreshCw, ShieldCheck } from "lucide-react";
import { Product } from "../types";
import { safeFetch } from "../lib/dataService";

interface CategoryPageProps {
  subcategoryName: string;
  currency: "USD" | "NGN";
  addToCart: (product: Product, quantity?: number) => void;
  setSelectedProductId: (id: string | null) => void;
  setCurrentView: (view: string) => void;
}

export default function CategoryPage({
  subcategoryName,
  currency,
  addToCart,
  setSelectedProductId,
  setCurrentView
}: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const matchProduct = (p: Product, subName: string) => {
    const nameLower = subName.toLowerCase().trim();
    const catLower = p.category ? p.category.toLowerCase() : "";
    const subcatLower = p.subcategory ? p.subcategory.toLowerCase() : "";
    const prodNameLower = p.name ? p.name.toLowerCase() : "";

    // Direct exact match
    if (catLower === nameLower || subcatLower === nameLower) return true;

    // Partial match of subcategory/category
    if (subcatLower.includes(nameLower) || nameLower.includes(subcatLower)) return true;
    if (catLower.includes(nameLower) || nameLower.includes(catLower)) return true;

    // Specific mapping helpers
    if (nameLower === "box camera" && subcatLower === "box-camera") return true; // fallback
    if (nameLower === "box camera" && subcatLower === "box camera") return true;
    if (nameLower === "dome camera" && (subcatLower.includes("dome") || prodNameLower.includes("dome"))) return true;
    if (nameLower === "bullet camera" && (subcatLower.includes("bullet") || prodNameLower.includes("bullet"))) return true;
    if (nameLower === "ptz camera" && (subcatLower.includes("ptz") || prodNameLower.includes("ptz"))) return true;
    if (nameLower === "panoramic camera" && (subcatLower.includes("panoramic") || prodNameLower.includes("panoramic"))) return true;
    if (nameLower === "thermal camera" && (subcatLower.includes("thermal") || prodNameLower.includes("thermal"))) return true;
    if (nameLower === "fisheye camera" && (subcatLower.includes("fisheye") || prodNameLower.includes("fisheye"))) return true;
    if (nameLower === "special camera" && (subcatLower.includes("special") || prodNameLower.includes("special"))) return true;
    if (nameLower === "multi-sensor camera" && (subcatLower.includes("sensor") || prodNameLower.includes("sensor"))) return true;

    if (nameLower === "industrial switches" && (subcatLower.includes("switch") || catLower.includes("telecom") || prodNameLower.includes("switch"))) return true;
    if (nameLower === "junction box" && (subcatLower.includes("junction") || prodNameLower.includes("junction"))) return true;
    if (nameLower === "network video recorders" && (subcatLower.includes("recorder") || prodNameLower.includes("recorder") || prodNameLower.includes("nvr"))) return true;
    if (nameLower === "electrical workstation" && (subcatLower.includes("workstation") || prodNameLower.includes("workstation"))) return true;
    if (nameLower === "ups & pdu" && (subcatLower.includes("ups") || subcatLower.includes("pdu") || prodNameLower.includes("ups") || prodNameLower.includes("pdu"))) return true;
    if (nameLower === "paga system" && (subcatLower.includes("paga") || prodNameLower.includes("paga"))) return true;
    if (nameLower === "hybrid composite cable" && (subcatLower.includes("cable") || prodNameLower.includes("cable"))) return true;

    if (nameLower === "industrial solar panels" && (subcatLower.includes("panel") || prodNameLower.includes("panel"))) return true;
    if (nameLower === "lithium lifepo4 batteries" && (subcatLower.includes("batter") || prodNameLower.includes("batter") || prodNameLower.includes("lifepo4"))) return true;
    if (nameLower === "smart hybrid inverters" && (subcatLower.includes("inverter") || prodNameLower.includes("inverter"))) return true;

    if (nameLower === "small enclosures" && (subcatLower.includes("small") || subcatLower.includes("enclosure") || prodNameLower.includes("enclosure") || prodNameLower.includes("box"))) return true;
    if (nameLower === "it enclosures" && (subcatLower.includes("it") || subcatLower.includes("enclosure") || prodNameLower.includes("enclosure"))) return true;
    if (nameLower === "wall-mounted enclosures" && (subcatLower.includes("wall") || prodNameLower.includes("wall") || prodNameLower.includes("cabinet"))) return true;
    if (nameLower === "server racks" && (subcatLower.includes("rack") || prodNameLower.includes("rack") || prodNameLower.includes("cabinet"))) return true;

    if (nameLower === "ex-telephone" && (subcatLower.includes("telephone") || subcatLower.includes("phone") || prodNameLower.includes("phone") || prodNameLower.includes("telephone"))) return true;
    if (nameLower === "ex-sounder" && (subcatLower.includes("sounder") || prodNameLower.includes("sounder") || prodNameLower.includes("horn"))) return true;
    if (nameLower === "ex-cctv camera" && (subcatLower.includes("camera") || prodNameLower.includes("camera"))) return true;
    if (nameLower === "ex-junction box" && (subcatLower.includes("junction") || prodNameLower.includes("junction"))) return true;

    return false;
  };

  useEffect(() => {
    setLoading(true);
    safeFetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Filter products matching this subcategory/category
        const matched = data.filter((p) => matchProduct(p, subcategoryName));
        setProducts(matched);
      })
      .catch((err) => console.error("Error loading category products", err))
      .finally(() => setLoading(false));
  }, [subcategoryName]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, subcategoryName]);

  const handleProductDetails = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const itemsPerPage = 60;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-[1536px] mx-auto px-4 lg:px-[52px] py-10 space-y-8" id="category-page">
      {/* Back button & SEO title section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={() => setCurrentView("store")}
          className="flex items-center space-x-2 text-[#FF7A20] font-bold text-xs hover:underline cursor-pointer bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hardware Store</span>
        </button>

        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 text-[11px] font-semibold text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A20]" />
          <span>Authorized Distribution Page - Spinel Distribution Ltd</span>
        </div>
      </div>

      {/* Category Banner with rich, search-engine indexing copy */}
      <div className="bg-gradient-to-br from-gray-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-gray-800">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="text-[10px] sm:text-xs text-[#FF7A20] uppercase font-mono tracking-widest bg-orange-950/40 border border-orange-800/40 px-2.5 py-1 rounded-md inline-block font-extrabold">
            Industrial Systems Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-none">
            {subcategoryName} Page
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
            Welcome to the official, dedicated distribution showcase for certified high-performance{" "}
            <span className="font-semibold text-white">{subcategoryName}</span> hardware systems. 
            All models are fully compliant with stringent IECEx, ATEX, and global industrial reliability standardizations. 
            Engineered specifically to endure salt-mist corrosion, extreme pressure, and tropical climates.
          </p>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-5 hidden lg:block bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop')` }}></div>
      </div>

      {/* Local search filter pane */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 p-4 rounded-xl items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder={`Search ${subcategoryName} catalog by SKU or specifications...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF7A20] transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="text-xs text-gray-500 font-medium shrink-0">
          Showing <span className="font-bold text-gray-900">{Math.min(filteredProducts.length, itemsPerPage)}</span> of{" "}
          <span className="font-bold text-gray-900">{filteredProducts.length}</span> matching system profiles (Page {currentPage} of {totalPages})
        </div>
      </div>

      {/* Dynamic Products Grid */}
      {loading ? (
        <div className="py-24 text-center text-xs font-semibold text-gray-400 flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="w-8 h-8 animate-spin text-[#FF7A20]" />
          <span>Synchronizing telemetry with central distribution ledger...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 p-12 text-center rounded-2xl">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-900 uppercase">No hardware profiles located</p>
          <p className="text-xs text-gray-500 mt-1">
            Try adjusting your search query, or consult the main store page for alternative systems.
          </p>
          <button
            onClick={() => { setSearchQuery(""); }}
            className="mt-4 bg-gray-950 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#FF7A20] transition"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleProductDetails(p.id)}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] transition-all duration-300 transform flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square bg-gray-50/50 flex items-center justify-center p-2 overflow-hidden border-b border-gray-100">
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
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {p.sku}
                      </span>
                      <span className="text-[10px] font-semibold text-[#FF7A20] bg-orange-50 px-1.5 py-0.5 rounded">
                        {p.brand}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#FF7A20] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-sans">
                      {p.description}
                    </p>
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
                    className="bg-[#FF7A20] hover:bg-orange-600 text-white p-2 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center"
                    title="Add to Quote Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
                  currentPage === 1
                    ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                }`}
              >
                Previous Page
              </button>
              <span className="text-xs font-semibold text-gray-500 font-mono">
                Page <span className="font-bold text-gray-950">{currentPage}</span> of <span className="font-bold text-gray-950">{totalPages}</span>
              </span>
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
                  currentPage === totalPages
                    ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                }`}
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
