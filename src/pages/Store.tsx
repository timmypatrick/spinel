import { useState, useEffect } from "react";
import { Grid, List, SlidersHorizontal, Search, RefreshCw, ShoppingCart, Plus, Check, Trash } from "lucide-react";
import { Product, Category } from "../types";
import { safeFetch } from "../lib/dataService";

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
  setSearchQuery
}: StoreProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Fetch product list dynamically with filter queries
  useEffect(() => {
    setLoading(true);
    let url = `/api/products?sort=${sortBy}`;
    if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
    if (selectedBrand) url += `&brand=${encodeURIComponent(selectedBrand)}`;
    if (selectedType) url += `&productType=${encodeURIComponent(selectedType)}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    safeFetch(url)
      .then(res => res.json())
      .then((data: Product[]) => {
        // Client side filter for price
        const filtered = data.filter(p => p.priceUSD <= maxPrice);
        setProducts(filtered);
      })
      .catch(err => console.error("Error fetching products", err))
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedBrand, selectedType, maxPrice, sortBy, searchQuery]);

  // Fetch Category lists
  useEffect(() => {
    safeFetch("/api/products")
      .then(res => res.json())
      .then((data: Product[]) => {
        // Derive unique categories from product catalog
        const uniqueCats = Array.from(new Set(data.map(p => p.category)));
        const derived: Category[] = uniqueCats.map((cat, idx) => ({
          id: `cat-${idx}`,
          name: cat,
          slug: cat.toLowerCase().replace(/\s+/g, "-"),
          iconName: "Shield",
          subcategories: []
        }));
        setCategories(derived);
      })
      .catch(err => console.error("Error listing categories", err));
  }, []);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedType("");
    setMaxPrice(15000);
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

  const uniqueBrands = ["HexaShield", "Vantage Power Systems", "CommsTect", "DuraRack"];
  const uniqueTypes = ["Enterprise", "Hazardous Area", "Industrial", "Commercial"];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 flex flex-col lg:flex-row gap-10" id="store-view">
      {/* 1. Left Sidebar Filter Pane */}
      <aside className="w-full lg:w-64 shrink-0 space-y-8" id="store-sidebar">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2 text-gray-900 font-bold text-sm">
            <SlidersHorizontal className="w-4 h-4 text-[#FF7A20]" />
            <span>Specifications Filter</span>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-[10px] text-gray-400 hover:text-[#FF7A20] font-bold uppercase transition"
            id="btn-reset-filters"
          >
            Clear All
          </button>
        </div>

        {/* Categories Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Business Division</h4>
          <div className="flex flex-col space-y-1.5 text-xs text-gray-600">
            <button
              onClick={() => setSelectedCategory("")}
              className={`text-left py-1 px-2 rounded-lg transition ${!selectedCategory ? "bg-orange-50 text-[#FF7A20] font-bold" : "hover:bg-gray-50"}`}
            >
              All Divisions
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`text-left py-1 px-2 rounded-lg transition ${selectedCategory === cat.name ? "bg-orange-50 text-[#FF7A20] font-bold" : "hover:bg-gray-50"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Type (Harzardous, industrial etc) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Safety Specification</h4>
          <div className="flex flex-col space-y-1.5 text-xs text-gray-600">
            <button
              onClick={() => setSelectedType("")}
              className={`text-left py-1 px-2 rounded-lg transition ${!selectedType ? "bg-orange-50 text-[#FF7A20] font-bold" : "hover:bg-gray-50"}`}
            >
              All Standards
            </button>
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`text-left py-1 px-2 rounded-lg transition ${selectedType === type ? "bg-orange-50 text-[#FF7A20] font-bold" : "hover:bg-gray-50"}`}
              >
                {type} Rating
              </button>
            ))}
          </div>
        </div>

        {/* Brand / OEM Line */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">OEM Partner Lines</h4>
          <div className="flex flex-col space-y-1.5 text-xs text-gray-600">
            <button
              onClick={() => setSelectedBrand("")}
              className={`text-left py-1 px-2 rounded-lg transition ${!selectedBrand ? "bg-orange-50 text-[#FF7A20] font-bold" : "hover:bg-gray-50"}`}
            >
              All Partner Brands
            </button>
            {uniqueBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`text-left py-1 px-2 rounded-lg transition ${selectedBrand === brand ? "bg-orange-50 text-[#FF7A20] font-bold" : "hover:bg-gray-50"}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Price Ranger */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Budget limit (USD)</h4>
          <div className="space-y-2">
            <input
              type="range"
              min="100"
              max="15000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#FF7A20]"
            />
            <div className="flex justify-between text-[11px] font-mono text-gray-500 font-bold">
              <span>$100</span>
              <span className="text-[#FF7A20]">${maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Right Products Panel */}
      <main className="flex-1 space-y-6" id="store-main">
        {/* Sorting and Filter Headers */}
        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="text-xs font-semibold text-gray-600">
            {searchQuery ? (
              <span>
                Search results for <span className="text-[#FF7A20] font-bold">"{searchQuery}"</span>: <span className="text-gray-900 font-bold">{products.length}</span> matches found
              </span>
            ) : (
              <span>
                Showing <span className="text-gray-900 font-bold">{products.length}</span> high-performance systems matches
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-rose-500 hover:text-rose-700 hover:underline font-bold mr-2 cursor-pointer"
              >
                Clear Search
              </button>
            )}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded px-2 py-1 font-semibold text-gray-800 focus:outline-none"
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
                className={`p-1 rounded cursor-pointer ${viewMode === "grid" ? "bg-orange-50 text-[#FF7A20]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded cursor-pointer ${viewMode === "list" ? "bg-orange-50 text-[#FF7A20]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 flex flex-col justify-center items-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#FF7A20] animate-spin" />
            <p className="text-xs text-gray-400 font-semibold">Tuning equipment matches...</p>
          </div>
        ) : products.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="products-catalog-grid">
            {products.map((p) => {
              const inCompare = compareList.some(comp => comp.id === p.id);
              return (
                <div
                  key={p.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-gray-50 cursor-pointer" onClick={() => handleProductDetails(p.id)}>
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute top-2.5 left-2.5 bg-gray-950/80 backdrop-blur-xs text-white font-semibold text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-sm">
                      {p.productType}
                    </span>
                    {p.stock <= 10 && (
                      <span className="absolute bottom-2.5 right-2.5 bg-rose-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded animate-pulse">
                        Low Stock: {p.stock}
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span>SKU: {p.sku}</span>
                      <span>{p.brand}</span>
                    </div>
                    <h3
                      onClick={() => handleProductDetails(p.id)}
                      className="font-bold text-xs sm:text-sm text-gray-900 hover:text-[#FF7A20] transition cursor-pointer line-clamp-1"
                    >
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{p.description}</p>
                    
                    {/* Compare Specification Checklist */}
                    <label className="flex items-center space-x-2 text-[10px] text-gray-500 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={inCompare}
                        onChange={() => handleToggleCompare(p)}
                        className="rounded border-gray-300 text-[#FF7A20] focus:ring-[#FF7A20] cursor-pointer"
                      />
                      <span className={inCompare ? "text-[#FF7A20] font-bold" : ""}>Compare Specifications</span>
                    </label>
                  </div>
                  <div className="p-4 border-t border-gray-50 bg-gray-50/40 flex items-center justify-between">
                    <span className="font-black text-[#FF7A20] text-xs sm:text-sm">
                      {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                    </span>
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-gray-900 hover:bg-[#FF7A20] text-white p-2 rounded-lg transition cursor-pointer"
                      title="Add to Quote Cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List Layout View */
          <div className="space-y-4" id="products-catalog-list">
            {products.map((p) => {
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
                    className="w-full md:w-48 h-40 object-cover cursor-pointer bg-gray-50 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                        <span>SKU: {p.sku} | Brand: {p.brand}</span>
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{p.productType}</span>
                      </div>
                      <h3
                        onClick={() => handleProductDetails(p.id)}
                        className="font-bold text-sm text-gray-900 hover:text-[#FF7A20] cursor-pointer truncate"
                      >
                        {p.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{p.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-50 pt-3 mt-3">
                      <span className="font-black text-[#FF7A20] text-sm sm:text-base">
                        {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                      </span>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-1.5 text-[10px] text-gray-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={inCompare}
                            onChange={() => handleToggleCompare(p)}
                            className="rounded border-gray-300 text-[#FF7A20] focus:ring-[#FF7A20] cursor-pointer"
                          />
                          <span className={inCompare ? "text-[#FF7A20] font-bold" : ""}>Compare Specs</span>
                        </label>
                        <button
                          onClick={() => addToCart(p)}
                          className="bg-gray-950 text-white hover:bg-[#FF7A20] px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Quote Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Compare Specification Comparison Overlay Drawer */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#FF7A20] shadow-2xl z-40 p-4 transition duration-300" id="compare-tray">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-gray-900">Comparing Products ({compareList.length}/3)</span>
              <div className="flex space-x-3">
                {compareList.map((p) => (
                  <div key={p.id} className="bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200 flex items-center space-x-2 text-[10px] max-w-[200px] truncate">
                    <span className="truncate text-gray-800 font-semibold">{p.name}</span>
                    <button onClick={() => handleToggleCompare(p)} className="text-rose-600 hover:text-rose-800">×</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setCompareList([])}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-3 py-1.5"
              >
                Clear
              </button>
              <button
                onClick={() => setIsCompareOpen(true)}
                className="bg-[#FF7A20] text-white text-xs font-bold px-4 py-2 rounded-lg"
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
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500"
            >
              ×
            </button>
            <h3 className="font-bold text-base text-gray-900 border-b border-gray-100 pb-3 mb-6">Technical Specifications Matrix</h3>
            <div className="grid grid-cols-4 gap-4 text-xs">
              <div className="font-bold text-gray-400 uppercase tracking-wider">Specifications</div>
              {compareList.map(p => (
                <div key={p.id} className="font-bold text-gray-900 truncate">{p.name}</div>
              ))}

              <div className="font-bold text-gray-500">Price</div>
              {compareList.map(p => (
                <div key={p.id} className="text-[#FF7A20] font-black">
                  {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                </div>
              ))}

              <div className="font-bold text-gray-500">SKU Number</div>
              {compareList.map(p => (
                <div key={p.id} className="font-mono bg-gray-100 px-1 py-0.5 rounded w-max">{p.sku}</div>
              ))}

              <div className="font-bold text-gray-500">OEM Supplier</div>
              {compareList.map(p => (
                <div key={p.id}>{p.brand}</div>
              ))}

              <div className="font-bold text-gray-500">Standards Rating</div>
              {compareList.map(p => (
                <div key={p.id}>{p.productType} Standard</div>
              ))}

              <div className="font-bold text-gray-500">Stock Availability</div>
              {compareList.map(p => (
                <div key={p.id}>{p.stock} units ex-stock</div>
              ))}

              <div className="font-bold text-gray-500">Key Features</div>
              {compareList.map(p => (
                <div key={p.id} className="text-gray-600 text-[10px] leading-relaxed">{p.description.substring(0, 100)}...</div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsCompareOpen(false)}
                className="bg-gray-900 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-[#FF7A20] transition cursor-pointer"
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
