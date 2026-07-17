import { Trash, ArrowRight, ArrowLeft, Coins, ShieldCheck } from "lucide-react";
import { Product, CartItem } from "../types";

interface CartProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  currency: "USD" | "NGN";
  setCurrentView: (view: string) => void;
}

export default function Cart({ cart, setCart, currency, setCurrentView }: CartProps) {
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(cart.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const handleRemove = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // Calculations
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const subtotalNGN = cart.reduce((acc, item) => acc + item.product.priceNGN * item.quantity, 0);

  // VAT 7.5%
  const taxUSD = Math.round(subtotalUSD * 0.075);
  const taxNGN = Math.round(subtotalNGN * 0.075);

  // Free shipping over $1000 or ₦1,500,000
  const shippingUSD = subtotalUSD > 1000 || subtotalUSD === 0 ? 0 : 50;
  const shippingNGN = subtotalNGN > 1500000 || subtotalNGN === 0 ? 0 : 75000;

  const totalUSD = subtotalUSD + taxUSD + shippingUSD;
  const totalNGN = subtotalNGN + taxNGN + shippingNGN;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4" id="cart-empty-state">
        <p className="text-gray-400 text-sm font-semibold">Your quote shopping cart is currently empty.</p>
        <button
          onClick={() => setCurrentView("store")}
          className="bg-[#FF7A20] text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center space-x-1.5 mx-auto cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store Catalog</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1536px] mx-auto px-4 lg:px-[70px] md:px-[70px] py-12 space-y-8" id="cart-view">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Your Project Hardware Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left item rows (Cols 8) */}
        <div className="lg:col-span-8 space-y-4" id="cart-items-container">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white border border-gray-100 p-5 rounded-xl hover:shadow-md transition flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover bg-gray-50 rounded border border-gray-100 shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                  }}
                />
                <div className="min-w-0">
                  <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">SKU: {item.product.sku} | Brand: {item.product.brand}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 shrink-0">
                {/* Quantity input */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 hover:bg-gray-50 text-gray-600 font-bold"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-mono text-xs font-bold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 hover:bg-gray-50 text-[#FF7A20] font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotals in selected currency */}
                <span className="font-bold text-gray-900 text-sm font-mono min-w-24 text-right">
                  {currency === "USD"
                    ? `$${(item.product.priceUSD * item.quantity).toLocaleString()}`
                    : `₦${(item.product.priceNGN * item.quantity).toLocaleString()}`}
                </span>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.product.id)}
                  className="p-2 text-gray-400 hover:text-rose-600 cursor-pointer"
                  title="Remove hardware item"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Backward Navigation */}
          <button
            onClick={() => setCurrentView("store")}
            className="text-gray-500 hover:text-gray-800 text-xs font-semibold flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping and Selecting</span>
          </button>
        </div>

        {/* Right subtotal summaries (Cols 4) */}
        <div className="lg:col-span-4" id="cart-summary-box">
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-5">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-3 uppercase tracking-wider">Order Valuation</h3>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>Hardware Subtotal</span>
                <span className="font-mono text-gray-950 font-bold">
                  {currency === "USD" ? `$${subtotalUSD.toLocaleString()}` : `₦${subtotalNGN.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>Value Added Tax (VAT 7.5%)</span>
                <span className="font-mono text-gray-950 font-bold">
                  {currency === "USD" ? `$${taxUSD.toLocaleString()}` : `₦${taxNGN.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>Logistics Delivery</span>
                <span className="font-mono text-gray-950 font-bold">
                  {currency === "USD"
                    ? shippingUSD === 0 ? "FREE" : `$${shippingUSD.toLocaleString()}`
                    : shippingNGN === 0 ? "FREE" : `₦${shippingNGN.toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">Total Valuation</span>
              <span className="font-black text-lg text-[#FF7A20] font-mono">
                {currency === "USD" ? `$${totalUSD.toLocaleString()}` : `₦${totalNGN.toLocaleString()}`}
              </span>
            </div>

            <div className="space-y-3.5 pt-2">
              <button
                onClick={() => setCurrentView("checkout")}
                className="w-full bg-gray-950 hover:bg-[#FF7A20] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                id="btn-cart-checkout"
              >
                <span>Proceed to Secured Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex justify-center items-center space-x-1.5 text-[10px] text-gray-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Complies with Paystack API Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
