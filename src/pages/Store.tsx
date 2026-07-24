import { useState, useEffect } from "react";
import { Grid, List, SlidersHorizontal, Search, RefreshCw, ShoppingCart, Plus, Check, Trash, Send } from "lucide-react";
import { Product, Category } from "../types";
import { safeFetch } from "../lib/dataService";

const STORE_DIVISIONS = [
  {
    category: "CCTV Surveillance",
    subcategories: [
      "Box Camera",
      "Dome Camera",
      "Bullet Camera",
      "PTZ Camera",
      "Panoramic Camera",
      "Thermal Camera",
      "Fisheye Camera",
      "Camera Bundle",
      "Multi-Sensor Camera"
    ]
  },
  {
    category: "Electrical Systems",
    subcategories: [
      "Industrial Switches",
      "Junction Box",
      "Network Video Recorders",
      "Electrical Workstation",
      "UPS & PDU",
      "Hybrid Composite Cable",
      "Accessories"
    ]
  },
  {
    category: "Renewable Energy",
    subcategories: [
      "Industrial Solar Panels",
      "Lithium LiFePO4 Batteries",
      "Smart Hybrid Inverters"
    ]
  },
  {
    category: "Rack & Enclosures",
    subcategories: [
      "Small Enclosures",
      "IT Enclosures",
      "Wall-Mounted Enclosures",
      "Server Racks"
    ]
  },
  {
    category: "Ex-Proof Equipments",
    subcategories: [
      "PAGA System",
      "Ex-CCTV Camera",
      "EX-Junction Box"
    ]
  }
];

const matchProduct = (p: Product, subName: string) => {
  if (!subName) return true;
  const nameLower = subName.toLowerCase().trim();
  const catLower = p.category ? p.category.toLowerCase() : "";
  const subcatLower = p.subcategory ? p.subcategory.toLowerCase() : "";
  const prodNameLower = p.name ? p.name.toLowerCase() : "";

  if (p.sku && p.sku.startsWith("PS-YA-HA-")) {
    return (
      nameLower === "paga system" ||
      nameLower === "paga" ||
      nameLower === "paga-system" ||
      nameLower === "ex-proof equipments" ||
      nameLower === "ex-proof equipment"
    );
  }

  if (p.sku && p.sku.startsWith("EC-YA-HA-")) {
    return (
      nameLower.includes("ex-cctv") ||
      nameLower === "ex-cctv camera" ||
      nameLower === "ex-cctv-camera" ||
      nameLower === "ex-proof equipments" ||
      nameLower === "ex-proof equipment"
    );
  }

  if (
    nameLower.includes("ex-cctv") ||
    nameLower === "ex-cctv camera" ||
    nameLower === "ex-cctv-camera"
  ) {
    if (p.sku && p.sku.startsWith("EC-YA-HA-")) return true;
    if (subcatLower.includes("ex-cctv") || catLower.includes("ex-cctv")) return true;
    return subcatLower === "ex-cctv camera" || catLower === "ex-cctv camera";
  }

  if (
    nameLower === "industrial solar panels" ||
    nameLower === "industrial solar panel" ||
    nameLower === "industrial-solar-panels" ||
    nameLower === "solar panels"
  ) {
    if (p.sku && p.sku.startsWith("SP-YA-HA-")) return true;
    if (subcatLower.includes("industrial solar") || subcatLower.includes("solar panel") || catLower.includes("industrial solar")) return true;
    if (prodNameLower.includes("canadian solar") || prodNameLower.includes("solar panel")) return true;
    return subcatLower === "industrial solar panels" || catLower === "industrial solar panels";
  }

  if (
    nameLower.includes("lithium") ||
    nameLower.includes("lifepo4") ||
    nameLower === "lithium lifepo4 batteries" ||
    nameLower === "lithium-lifepo4-batteries"
  ) {
    if (p.sku && p.sku.startsWith("LB-YA-HA-")) return true;
    if (subcatLower.includes("lithium") || subcatLower.includes("lifepo4")) return true;
    if (prodNameLower.includes("lifepo4") || prodNameLower.includes("lithium")) return true;
    return subcatLower === "lithium lifepo4 batteries" || catLower === "lithium lifepo4 batteries";
  }

  if (
    nameLower.includes("hybrid inverter") ||
    nameLower.includes("smart hybrid") ||
    nameLower === "smart hybrid inverters" ||
    nameLower === "smart-hybrid-inverters" ||
    (nameLower === "inverters" && p.sku && p.sku.startsWith("SI-YA-HA-"))
  ) {
    if (p.sku && p.sku.startsWith("SI-YA-HA-")) return true;
    if (subcatLower.includes("hybrid inverter") || subcatLower.includes("smart hybrid")) return true;
    if (prodNameLower.includes("inverter") || prodNameLower.includes("hybrid")) return true;
    return subcatLower === "smart hybrid inverters" || catLower === "smart hybrid inverters";
  }

  if (
    nameLower.includes("it enclosure") ||
    nameLower.includes("it-enclosure") ||
    nameLower === "it enclosures" ||
    nameLower === "it-enclosures"
  ) {
    if (p.sku && p.sku.startsWith("IE-YA-HA-")) return true;
    if (subcatLower.includes("it enclosure") || subcatLower === "it enclosures") return true;
    return subcatLower === "it enclosures" || catLower === "it enclosures";
  }

  if (
    nameLower.includes("wall-mounted enclosure") ||
    nameLower.includes("wall mounted enclosure") ||
    nameLower === "wall-mounted enclosures" ||
    nameLower === "wall mounted enclosures" ||
    nameLower === "wall-mounted-enclosures"
  ) {
    if (p.sku && p.sku.startsWith("WE-YA-HA-")) return true;
    if (subcatLower.includes("wall-mounted enclosure") || subcatLower.includes("wall mounted enclosure")) return true;
    return subcatLower === "wall-mounted enclosures" || catLower === "wall-mounted enclosures";
  }

  if (
    nameLower.includes("server rack") ||
    nameLower.includes("server-rack") ||
    nameLower === "server racks" ||
    nameLower === "server-racks"
  ) {
    if (p.sku && p.sku.startsWith("SR-YA-HA-")) return true;
    if (subcatLower.includes("server rack") || subcatLower === "server racks") return true;
    return subcatLower === "server racks" || catLower === "server racks";
  }

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
  if (nameLower === "multi-sensor camera" && (subcatLower.includes("sensor") || prodNameLower.includes("sensor"))) return true;

  if (nameLower === "industrial switches" && (subcatLower.includes("switch") || catLower.includes("telecom") || prodNameLower.includes("switch"))) return true;
  if (nameLower === "junction box" && (subcatLower.includes("junction") || prodNameLower.includes("junction"))) return true;
  if (nameLower === "network video recorders" && (subcatLower.includes("recorder") || prodNameLower.includes("recorder") || prodNameLower.includes("nvr"))) return true;
  if (nameLower === "electrical workstation" && (subcatLower.includes("workstation") || prodNameLower.includes("workstation"))) return true;
  if (nameLower === "ups & pdu" && (subcatLower.includes("ups") || subcatLower.includes("pdu") || prodNameLower.includes("ups") || prodNameLower.includes("pdu"))) return true;
  if (nameLower === "hybrid composite cable" && (subcatLower.includes("cable") || prodNameLower.includes("cable"))) return true;

  if (nameLower === "camera bundle") {
    if (subcatLower.includes("bundle") || prodNameLower.includes("bundle")) return true;
    if (subcatLower.includes("telephone") || subcatLower.includes("phone") || prodNameLower.includes("phone") || prodNameLower.includes("telephone")) return true;
  }

  if (nameLower === "lithium lifepo4 batteries" && (subcatLower.includes("batter") || subcatLower.includes("batter") || prodNameLower.includes("lifepo4"))) return true;
  if (nameLower === "smart hybrid inverters" && (subcatLower.includes("inverter") || prodNameLower.includes("inverter"))) return true;
  if (nameLower === "industrial solar panels" && (catLower === "industrial solar panels" || subcatLower === "industrial solar panels")) return true;

  if (nameLower === "it enclosures" && (subcatLower.includes("it") || subcatLower.includes("enclosure") || prodNameLower.includes("enclosure"))) return true;
  if (nameLower === "wall-mounted enclosures" && (subcatLower.includes("wall") || subcatLower.includes("wall") || prodNameLower.includes("cabinet"))) return true;
  if (nameLower === "server racks" && (subcatLower.includes("rack") || subcatLower.includes("rack") || prodNameLower.includes("cabinet"))) return true;

  if (
    nameLower === "paga" ||
    nameLower === "paga system"
  ) {
    if (p.sku && p.sku.startsWith("PS-YA-HA-")) return true;
    if (subcatLower.includes("paga") || catLower.includes("paga") || prodNameLower.includes("paga")) return true;
    return subcatLower === "paga" || catLower === "paga" || subcatLower === "paga system";
  }

  // Completely removed / disabled pages
  if (nameLower === "ex-telephone" || nameLower === "ex-telephones") return false;
  if (nameLower === "small enclosures") return false;
  if (nameLower === "ex-junction box") return false;

  return false;
};

interface StoreProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  currency: "USD" | "NGN";
  addToCart: (product: Product) => void;
  compareList: Product[];
  setCompareList: (list: Product[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRequestQuote?: (product: Product) => void;
}

export default function Store({
  currentView,
  setCurrentView,
  setSelectedProductId,
  currency,
  addToCart,
  compareList,
  setCompareList,
  searchQuery,
  setSearchQuery,
  onRequestQuote
}: StoreProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubcategory, sortBy, searchQuery]);

  // Fetch product list dynamically with filter queries
  useEffect(() => {
    setLoading(true);
    let url = `/api/products?sort=${sortBy}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    safeFetch(url)
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(err => console.error("Error fetching products", err))
      .finally(() => setLoading(false));
  }, [sortBy, searchQuery]);

  const handleResetFilters = () => {
    setSelectedSubcategory("");
    setSortBy("popular");
  };

  const handleToggleCompare = (product: Product) => {
    if (compareList.some(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 enterprise products at once.");
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  const handleProductDetails = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  const filteredProducts = products.filter(p => matchProduct(p, selectedSubcategory));
  const itemsPerPage = 60;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-12 flex flex-col lg:flex-row gap-10" id="store-view">
      {/* 1. Left Sidebar Filter Pane */}
      <aside className="w-full lg:w-72 shrink-0 space-y-6" id="store-sidebar">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2 text-gray-900 font-bold text-base">
            <SlidersHorizontal className="w-5 h-5 text-[#FF7A20]" />
            <span>Specifications Filter</span>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-xs text-gray-400 hover:text-[#FF7A20] font-bold uppercase transition"
            id="btn-reset-filters"
          >
            Clear All
          </button>
        </div>

        {/* Divisions & Categories Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>Filter By Division</span>
          </h4>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => setSelectedSubcategory("")}
              className={`text-left py-2.5 px-4 rounded-lg text-base font-bold transition flex items-center justify-between ${!selectedSubcategory ? "bg-[#FF7A20] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
            >
              <span>All Products & Divisions</span>
            </button>
            
            {STORE_DIVISIONS.map((div) => {
              const isCatSelected = selectedSubcategory === div.category;
              return (
                <div key={div.category} className="space-y-2">
                  <button
                    onClick={() => setSelectedSubcategory(div.category)}
                    className={`w-full text-left py-2 px-3 rounded-lg text-base font-extrabold transition flex items-center justify-between ${isCatSelected ? "bg-orange-50 text-[#FF7A20]" : "text-gray-950 hover:bg-gray-50"}`}
                  >
                    <span>{div.category}</span>
                  </button>
                  <div className="pl-4 py-1 space-y-1.5 border-l-2 border-gray-100">
                    {div.subcategories.map((sub) => {
                      const isSubSelected = selectedSubcategory === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => setSelectedSubcategory(sub)}
                          className={`w-full text-left py-1.5 px-3 rounded text-sm font-semibold transition ${isSubSelected ? "text-[#FF7A20] bg-orange-50/50 font-bold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>


      {/* 2. Right Products Panel */}
      <main className="flex-1 space-y-6" id="store-main">
        {/* Sorting and Filter Headers */}
        <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="text-sm font-semibold text-gray-700">
            {searchQuery ? (
              <span>
                Search results for <span className="text-[#FF7A20] font-bold">"{searchQuery}"</span>: <span className="text-gray-900 font-bold">{filteredProducts.length}</span> matches found
              </span>
            ) : (
              <span>
                Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> high-performance systems matches
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-rose-500 hover:text-rose-700 hover:underline font-bold mr-2 cursor-pointer"
              >
                Clear Search
              </button>
            )}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded px-2 py-1.5 font-semibold text-gray-800 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
            <div className="flex items-center bg-white border border-gray-200 rounded p-1 space-x-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded cursor-pointer ${viewMode === "grid" ? "bg-orange-50 text-[#FF7A20]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded cursor-pointer ${viewMode === "list" ? "bg-orange-50 text-[#FF7A20]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 flex flex-col justify-center items-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#FF7A20] animate-spin" />
            <p className="text-xs text-gray-400 font-semibold">Loading...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          searchQuery ? (
            <div className="py-24 text-center space-y-6 max-w-md mx-auto" id="no-search-results">
              <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-400">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-gray-900 uppercase">No results could be found for "{searchQuery}"</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We encourage you to check the store for other high-quality enterprise hardware products and specs you will like.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleResetFilters();
                }}
                className="inline-block bg-[#FF7A20] hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl transition duration-150 cursor-pointer shadow-md mx-auto"
                id="btn-back-to-store"
              >
                Browse Store Products
              </button>
            </div>
          ) : (
            <div className="py-24 text-center space-y-4">
              <p className="text-gray-400 text-sm font-semibold">No ICT hardware matches selected parameters.</p>
              <button
                onClick={handleResetFilters}
                className="bg-[#FF7A20] text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )
        ) : viewMode === "grid" ? (
          /* Grid Layout View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="products-catalog-grid">
            {paginatedProducts.map((p) => {
              const inCompare = compareList.some(comp => comp.id === p.id);
              return (
                <div
                  key={p.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-gray-50 cursor-pointer" onClick={() => handleProductDetails(p.id)}>
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                      }}
                    />
                    {p.stock <= 10 && (
                      <span className="absolute bottom-2.5 right-2.5 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded animate-pulse">
                        Low Stock: {p.stock}
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                      <span>SKU: {p.sku}</span>
                      <span>{p.brand}</span>
                    </div>
                    <h3
                      onClick={() => handleProductDetails(p.id)}
                      className="font-bold text-sm sm:text-base text-gray-900 hover:text-[#FF7A20] transition cursor-pointer line-clamp-1"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">{p.description}</p>
                    
                    {/* Compare Specification Checklist */}
                    <label className="flex items-center space-x-2 text-xs text-gray-500 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={inCompare}
                        onChange={() => handleToggleCompare(p)}
                        className="w-4 h-4 rounded border-gray-300 text-[#FF7A20] focus:ring-[#FF7A20] cursor-pointer"
                      />
                      <span className={inCompare ? "text-[#FF7A20] font-bold" : ""}>Compare Specifications</span>
                    </label>
                  </div>
                  <div className="p-4 border-t border-gray-50 bg-gray-50/40 flex items-center justify-between">
                    {p.priceUSD === 0 || p.isQuoteOnly || p.category === "Industrial Solar Panels" ? (
                      <button
                        onClick={() => {
                          if (onRequestQuote) {
                            onRequestQuote(p);
                          } else {
                            setCurrentView("request-quote");
                          }
                        }}
                        className="w-full bg-[#FF7A20] hover:bg-[#e06512] text-white font-bold text-xs py-2.5 px-3 rounded-lg transition flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request For Quote</span>
                      </button>
                    ) : (
                      <>
                        <span className="font-black text-[#FF7A20] text-sm sm:text-base">
                          {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                        </span>
                        <button
                          onClick={() => addToCart(p)}
                          className="bg-gray-900 hover:bg-[#FF7A20] text-white p-2.5 rounded-lg transition cursor-pointer"
                          title="Add to Quote Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List Layout View */
          <div className="space-y-4" id="products-catalog-list">
            {paginatedProducts.map((p) => {
              const inCompare = compareList.some(comp => comp.id === p.id);
              return (
                <div
                  key={p.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition duration-200 flex flex-col md:flex-row"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    onClick={() => handleProductDetails(p.id)}
                    className="w-full md:w-52 h-44 object-cover cursor-pointer bg-gray-50 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                    }}
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                        <span>SKU: {p.sku} | Brand: {p.brand}</span>
                      </div>
                      <h3
                        onClick={() => handleProductDetails(p.id)}
                        className="font-bold text-base sm:text-lg text-gray-900 hover:text-[#FF7A20] cursor-pointer truncate"
                      >
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{p.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-50 pt-3 mt-3">
                      {p.priceUSD === 0 || p.isQuoteOnly || p.category === "Industrial Solar Panels" ? (
                        <div className="flex items-center justify-between w-full">
                          <label className="flex items-center space-x-1.5 text-xs text-gray-500 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={inCompare}
                              onChange={() => handleToggleCompare(p)}
                              className="w-4 h-4 rounded border-gray-300 text-[#FF7A20] focus:ring-[#FF7A20] cursor-pointer"
                            />
                            <span className={inCompare ? "text-[#FF7A20] font-bold" : ""}>Compare Specs</span>
                          </label>
                          <button
                            onClick={() => {
                              if (onRequestQuote) {
                                onRequestQuote(p);
                              } else {
                                setCurrentView("request-quote");
                              }
                            }}
                            className="bg-[#FF7A20] text-white hover:bg-[#e06512] px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 cursor-pointer shadow-sm"
                          >
                            <Send className="w-4 h-4" />
                            <span>Request For Quote</span>
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="font-black text-[#FF7A20] text-base sm:text-lg">
                            {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                          </span>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-1.5 text-xs text-gray-500 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={inCompare}
                                onChange={() => handleToggleCompare(p)}
                                className="w-4 h-4 rounded border-gray-300 text-[#FF7A20] focus:ring-[#FF7A20] cursor-pointer"
                              />
                              <span className={inCompare ? "text-[#FF7A20] font-bold" : ""}>Compare Specs</span>
                            </label>
                            <button
                              onClick={() => addToCart(p)}
                              className="bg-gray-950 text-white hover:bg-[#FF7A20] px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-1.5 cursor-pointer"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Add to Quote Cart</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className={`px-5 py-2.5 text-sm font-bold rounded-lg border transition ${
                currentPage === 1
                  ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
              }`}
            >
              Previous Page
            </button>
            <span className="text-sm font-semibold text-gray-500 font-mono">
              Page <span className="font-bold text-gray-950">{currentPage}</span> of <span className="font-bold text-gray-950">{totalPages}</span>
            </span>
            <button
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className={`px-5 py-2.5 text-sm font-bold rounded-lg border transition ${
                currentPage === totalPages
                  ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
              }`}
            >
              Next Page
            </button>
          </div>
        )}
      </main>

      {/* Compare Specification Comparison Overlay Drawer */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#FF7A20] shadow-2xl z-40 p-4 transition duration-300" id="compare-tray">
          <div className="max-w-[1536px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-[100px] lg:px-[100px]">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-gray-900">Comparing Products ({compareList.length}/3)</span>
              <div className="flex space-x-3">
                {compareList.map((p) => (
                  <div key={p.id} className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 flex items-center space-x-2 text-xs max-w-[220px] truncate">
                    <span className="truncate text-gray-800 font-semibold">{p.name}</span>
                    <button onClick={() => handleToggleCompare(p)} className="text-rose-600 hover:text-rose-800 font-bold text-sm">×</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setCompareList([])}
                className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-3 py-1.5"
              >
                Clear
              </button>
              <button
                onClick={() => setIsCompareOpen(true)}
                className="bg-[#FF7A20] text-white text-sm font-bold px-5 py-2.5 rounded-lg"
              >
                Compare Specs Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Compare Modal Matrix */}
      {isCompareOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsCompareOpen(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500 text-lg font-bold"
            >
              ×
            </button>
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mb-6">Technical Specifications Matrix</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-gray-400 uppercase tracking-wider text-xs">Specifications</div>
              {compareList.map(p => (
                <div key={p.id} className="font-bold text-gray-900 truncate text-sm">{p.name}</div>
              ))}

              <div className="font-bold text-gray-500">Price</div>
              {compareList.map(p => (
                <div key={p.id} className="text-[#FF7A20] font-black text-sm">
                  {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                </div>
              ))}

              <div className="font-bold text-gray-500">SKU Number</div>
              {compareList.map(p => (
                <div key={p.id} className="font-mono bg-gray-100 px-1 py-0.5 rounded w-max text-xs">{p.sku}</div>
              ))}

              <div className="font-bold text-gray-500">OEM Supplier</div>
              {compareList.map(p => (
                <div key={p.id}>{p.brand}</div>
              ))}

              <div className="font-bold text-gray-500">Stock Availability</div>
              {compareList.map(p => (
                <div key={p.id}>{p.stock} units ex-stock</div>
              ))}

              <div className="font-bold text-gray-500">Key Features</div>
              {compareList.map(p => (
                <div key={p.id} className="text-gray-600 text-xs leading-relaxed">{p.description.substring(0, 100)}...</div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsCompareOpen(false)}
                className="bg-gray-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#FF7A20] transition cursor-pointer"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
