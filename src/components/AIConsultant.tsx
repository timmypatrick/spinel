import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Check, ShoppingBag, ArrowRight } from "lucide-react";
import { Product, CartItem } from "../types";
import { safeFetch } from "../lib/dataService";

interface AIConsultantProps {
  isOpen: boolean;
  onClose: () => void;
  currency: "USD" | "NGN";
  addToCart: (product: Product) => void;
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  recommendedProducts?: Product[];
}

export default function AIConsultant({
  isOpen,
  onClose,
  currency,
  addToCart,
  setCurrentView,
  setSelectedProductId
}: AIConsultantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Welcome to Spinel's Smart Engineering Portal. I am your Gemini-powered systems architect. Tell me about your ICT site environment, power grid challenges, or security specifications, and I will recommend certified hardware specs."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userText = inputValue;
    setInputValue("");
    
    // Append user message
    const userMsgId = `msg-${Date.now()}`;
    setMessages(prev => [...prev, { id: userMsgId, sender: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await safeFetch("/api/ai-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText })
      });

      if (!res.ok) {
        throw new Error("Failed to get advice");
      }

      const data = await res.json();
      
      // Fetch actual recommended products from catalog
      let matchedProducts: Product[] = [];
      if (data.recommendedIds && Array.isArray(data.recommendedIds)) {
        const prodRes = await safeFetch("/api/products");
        if (prodRes.ok) {
          const allProducts: Product[] = await prodRes.json();
          matchedProducts = allProducts.filter(p => data.recommendedIds.includes(p.id));
        }
      }

      const aiMsgId = `ai-${Date.now()}`;
      setMessages(prev => [
        ...prev,
        {
          id: aiMsgId,
          sender: "ai",
          text: data.advice,
          recommendedProducts: matchedProducts
        }
      ]);

    } catch (err: any) {
      console.error("AI matching failed", err);
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "ai",
          text: "I apologize, our engineering mainframe is experiencing heavy workloads. Our standard technical support lines are active for critical deployments."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProductId(product.id);
    setCurrentView("product-details");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end" id="ai-consultant-overlay">
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl relative animate-slide-in" id="ai-consultant-sidebar">
        {/* Sidebar Header */}
        <div className="p-4 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800" id="ai-consultant-header">
          <div className="flex items-center space-x-2.5">
            <div className="bg-[#FF7A20] p-1.5 rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">AI Systems Consultant</h3>
              <p className="text-[10px] text-[#FF7A20] font-mono leading-none mt-0.5">Gemini-3.5-Flash Active</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" id="chat-messages-container">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
              <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 mb-1 px-1">
                {m.sender === "ai" ? (
                  <>
                    <Bot className="w-3 h-3 text-[#FF7A20]" />
                    <span>Spinel Architect</span>
                  </>
                ) : (
                  <>
                    <User className="w-3 h-3 text-gray-500" />
                    <span>Customer Representative</span>
                  </>
                )}
              </div>
              <div className={`p-3.5 rounded-2xl text-xs max-w-[90%] leading-relaxed shadow-xs ${
                m.sender === "user"
                  ? "bg-gray-900 text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none font-sans"
              }`}>
                {/* Parse simple markdown lines */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {m.text}
                </div>

                {/* Inline Recommended Product Cards */}
                {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                  <div className="mt-4 border-t border-gray-100 pt-3 space-y-2.5" id="ai-recommendation-cards">
                    <p className="font-bold text-[10px] uppercase tracking-wider text-[#FF7A20] mb-2">Matched Hardware Catalog Spec</p>
                    {m.recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-gray-50 p-2.5 rounded-xl border border-gray-200/60 hover:border-orange-200 transition flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0 flex-1 cursor-pointer" onClick={() => handleProductClick(p)}>
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded bg-white border border-gray-100"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                            }}
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-[11px] text-gray-900 truncate">{p.name}</p>
                            <span className="font-mono text-[9px] bg-gray-200 text-gray-600 px-1 py-0.5 rounded mr-1.5">{p.sku}</span>
                            <span className="text-gray-900 font-bold text-[10px]">
                              {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-1.5 ml-2">
                          <button
                            onClick={() => addToCart(p)}
                            className="bg-[#FF7A20] text-white p-1.5 rounded-lg hover:bg-[#e06512] transition cursor-pointer"
                            title="Add to Quote Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start">
              <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 mb-1 px-1">
                <Bot className="w-3 h-3 text-[#FF7A20] animate-spin" />
                <span>Generating Proposal...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2" id="chat-input-form">
          <input
            type="text"
            placeholder="e.g., I need Zone 1 Ex cameras with POE+ switches..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition-all"
            id="chat-input-box"
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-[#FF7A20] hover:bg-[#e06512] disabled:opacity-40 text-white p-2.5 rounded-xl transition duration-150 cursor-pointer shadow-md"
            id="btn-chat-send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
