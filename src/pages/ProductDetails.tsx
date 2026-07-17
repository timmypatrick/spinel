import React, { useState, useEffect } from "react";
import { ChevronRight, ShoppingCart, Download, Star, Share2, Shield, Settings, Heart, Box, CheckCircle } from "lucide-react";
import { Product } from "../types";
import { safeFetch } from "../lib/dataService";

interface ProductDetailsProps {
  productId: string;
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  currency: "USD" | "NGN";
  addToCart: (product: Product, quantity?: number) => void;
}

export default function ProductDetails({
  productId,
  setCurrentView,
  setSelectedProductId,
  currency,
  addToCart
}: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  
  // Review inputs
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    safeFetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then((data: Product) => {
        setProduct(data);
        setActiveImage(data.images[0]);
        setReviews(data.reviews || []);

        // Load related products in the same category
        safeFetch("/api/products")
          .then(r => r.json())
          .then((all: Product[]) => {
            const rel = all.filter(p => p.category === data.category && p.id !== data.id).slice(0, 3);
            setRelated(rel);
          });
      })
      .catch(err => console.error("Error loading product detail", err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading || !product) {
    return (
      <div className="py-24 text-center text-xs font-semibold text-gray-400">
        Aligning optics and data sheets...
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentView("cart");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !comment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      userName,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0]
    };

    setReviews([newRev, ...reviews]);
    setUserName("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 lg:px-[70px] md:px-[70px] py-10 space-y-12" id="product-details-view">
      {/* Breadcrumb Row */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500 font-semibold" id="product-breadcrumbs">
        <button onClick={() => setCurrentView("home")} className="hover:text-[#FF7A20]">Portal Home</button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <button onClick={() => setCurrentView("store")} className="hover:text-[#FF7A20]">Store Catalog</button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-400 select-none">Division: {product.category}</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 truncate max-w-64 font-bold">{product.name}</span>
      </nav>

      {/* Main product display box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Image Gallery (Cols 5) */}
        <div className="lg:col-span-5 space-y-4" id="gallery-container">
          <div className="relative aspect-square border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-4">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-contain hover:scale-105 transition duration-300"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
              }}
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 border rounded-lg p-1 bg-gray-50 overflow-hidden cursor-pointer ${activeImage === img ? "border-[#FF7A20] ring-2 ring-orange-100" : "border-gray-200"}`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Details Area (Cols 7) */}
        <div className="lg:col-span-7 space-y-6" id="details-text-area">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold uppercase">
                SKU: {product.sku}
              </span>
              <span className="flex items-center space-x-1.5 text-xs text-emerald-600 font-bold">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Ex-Stock: {product.stock} Units Ready</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 text-xs font-semibold text-gray-500">
              <span>Brand: {product.brand}</span>
              <span>|</span>
              <span>Division: {product.category}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Distribution Price</span>
              <p className="text-2xl font-black text-[#FF7A20] leading-none mt-1">
                {currency === "USD" ? `$${product.priceUSD.toLocaleString()}` : `₦${product.priceNGN.toLocaleString()}`}
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Full OEM Warranty Enrolled</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{product.description}</p>

          {/* Configuration and Cart Controls */}
          <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-gray-100">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-11 bg-white">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold"
              >
                −
              </button>
              <span className="px-4 py-2 font-mono text-xs font-bold text-gray-900 select-none min-w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gray-900 text-white hover:bg-[#FF7A20] font-bold text-xs px-6 py-3 rounded-xl h-11 transition flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Quote Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-[#FF7A20] text-white hover:bg-[#e06512] font-bold text-xs px-6 py-3 rounded-xl h-11 transition cursor-pointer shadow-md"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs and Downloads Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-gray-100 pt-12">
        {/* Left specifications (Cols 7) */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">Engineering Specifications</h3>
          <table className="w-full text-xs">
            <tbody>
              {product.specifications.map((spec, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                  <td className="py-3 pr-4 font-bold text-gray-500 w-1/3">{spec.label}</td>
                  <td className="py-3 text-gray-800 font-medium">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right downloads & brochures (Cols 4) */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">OEM Downloads Desk</h3>
          <div className="space-y-2.5">
            {product.downloads.map((dl, idx) => (
              <a
                key={idx}
                href={dl.url}
                onClick={(e) => { e.preventDefault(); alert(`Initiating file transfer for document: "${dl.title}" [PDF].`); }}
                className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200/60 rounded-xl hover:border-[#FF7A20] transition group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#FF7A20]" />
                  <div>
                    <p className="font-bold text-[11px] text-gray-900">{dl.title}</p>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 font-bold">{dl.type}</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#FF7A20] font-bold">Transfer</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-100 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Review list */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">Product Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-xs font-semibold py-4">No reviews registered for this model yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-gray-50/50 border border-gray-200/40 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-gray-900">{rev.userName}</span>
                    <span className="text-[10px] font-mono text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit review */}
        <div className="lg:col-span-5 space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="font-bold text-sm text-gray-900">Write a Technical Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold">Your Name / Title</label>
              <input
                type="text"
                placeholder="Engr. John Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold">Model Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                <option value="3">⭐⭐⭐ 3 Stars</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-500 font-bold">Engineering Evaluation</label>
              <textarea
                placeholder="Describe your site installation, performance limits and build feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={3}
                className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#FF7A20]"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-900 text-white font-bold px-4 py-2 rounded-lg hover:bg-[#FF7A20] transition cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* Related Products Showcase */}
      {related.length > 0 && (
        <div className="border-t border-gray-100 pt-12 space-y-6">
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Related Systems from this Division</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-gray-50 cursor-pointer" onClick={() => setSelectedProductId(p.id)}>
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                    }}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4
                    onClick={() => setSelectedProductId(p.id)}
                    className="font-bold text-xs text-gray-900 hover:text-[#FF7A20] cursor-pointer truncate"
                  >
                    {p.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
