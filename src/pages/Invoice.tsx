import React, { useState } from "react";
import { CheckCircle, FileText, Download, ArrowRight, Loader2, Package } from "lucide-react";
import { ACCESSORIES_PRODUCTS, getOrderProductImage } from "../data/productsData";

interface InvoiceProps {
  orderDetails: any;
  currency: "USD" | "NGN";
  setCurrentView: (view: string) => void;
}

export default function Invoice({ orderDetails, currency, setCurrentView }: InvoiceProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Keep invoice cached in localStorage so user can always return to it
  React.useEffect(() => {
    if (orderDetails) {
      try {
        localStorage.setItem("spinel_last_order", JSON.stringify(orderDetails));
        // Update URL path without full reload
        if (window.location.pathname !== "/invoice") {
          window.history.pushState(null, "", "/invoice");
        }
      } catch (e) {
        // ignore
      }
    }
  }, [orderDetails]);

  if (!orderDetails) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-6">
        <div className="inline-flex p-4 bg-gray-100 rounded-full text-gray-400">
          <Package className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">No Active Invoice Found</h2>
          <p className="text-xs text-gray-500">You do not have a recent checkout session active. Please place an order from our store.</p>
        </div>
        <button
          type="button"
          onClick={() => setCurrentView("store")}
          className="bg-gray-900 hover:bg-black text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center space-x-2"
        >
          <span>Place Order</span>
          <ArrowRight className="w-4 h-4 text-[#FF7A20]" />
        </button>
      </div>
    );
  }

  const forceUnlockDOM = () => {
    setIsDownloading(false);
    
    // Unlock inline properties on body, html, and root
    const rootEl = document.getElementById("root");
    ["overflow", "pointer-events", "position", "touch-action", "user-select", "z-index"].forEach((prop) => {
      document.body.style.removeProperty(prop);
      document.documentElement.style.removeProperty(prop);
      if (rootEl) rootEl.style.removeProperty(prop);
    });

    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
    document.documentElement.style.pointerEvents = "auto";

    // Strip out any overlay elements injected by html2pdf / html2canvas / jsPDF
    const selectors = [
      ".html2pdf__container",
      ".html2canvas-container",
      "body > canvas",
      "iframe[id*='html2canvas']"
    ];
    selectors.forEach((sel) => {
      try {
        const nodes = document.querySelectorAll(sel);
        nodes.forEach((node) => node.remove());
      } catch (e) {
        // ignore
      }
    });
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById("invoice-sheet");
      if (!element) {
        alert("Invoice content element not found.");
        return;
      }

      // Dynamic import of html2pdf.js to ensure browser runtime safety
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = (html2pdfModule as any).default || html2pdfModule;

      const fileName = `Invoice-${orderDetails.invoiceNumber || orderDetails.orderNumber || Date.now()}.pdf`;

      const opt = {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };

      await (html2pdf as any)().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF download error:", err);
      // Fallback: Open print dialog
      window.print();
    } finally {
      forceUnlockDOM();
      setTimeout(forceUnlockDOM, 50);
      setTimeout(forceUnlockDOM, 300);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }
  };

  const invoiceNum = orderDetails.invoiceNumber || orderDetails.orderNumber || `INV-${Date.now()}`;

  // Parse Date and Time cleanly
  let dateIssued = "";
  let timeIssued = "";

  if (orderDetails.date) {
    const rawDate = String(orderDetails.date).trim();
    if (rawDate.includes(" ") && (rawDate.includes(":") || rawDate.includes("AM") || rawDate.includes("PM"))) {
      const parts = rawDate.split(" ");
      dateIssued = parts[0];
      timeIssued = parts.slice(1).join(" ");
    } else if (rawDate.includes("T")) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        dateIssued = d.toISOString().split("T")[0];
        timeIssued = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
      } else {
        dateIssued = rawDate.split("T")[0];
      }
    } else {
      dateIssued = rawDate;
      timeIssued = orderDetails.time || "";
    }
  } else if (orderDetails.createdAt) {
    const d = new Date(orderDetails.createdAt);
    if (!isNaN(d.getTime())) {
      dateIssued = d.toISOString().split("T")[0];
      timeIssued = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    }
  }

  if (!dateIssued) {
    dateIssued = new Date().toISOString().split("T")[0];
  }
  if (!timeIssued) {
    timeIssued = orderDetails.time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  }

  // Calculate total invoice amounts for USD and NGN dynamically
  let totalUSD = 0;
  let totalNGN = 0;

  if (orderDetails.items && Array.isArray(orderDetails.items) && orderDetails.items.length > 0) {
    orderDetails.items.forEach((item: any) => {
      const prod = item.product || item;
      const qty = Number(item.quantity) || 1;
      const pUSD = Number(prod.priceUSD) || (prod.priceNGN ? Number(prod.priceNGN) / 1500 : (Number(prod.price) || 0));
      const pNGN = Number(prod.priceNGN) || (prod.priceUSD ? Number(prod.priceUSD) * 1500 : (Number(prod.price) ? (Number(prod.price) > 100000 ? Number(prod.price) : Number(prod.price) * 1500) : 0));
      
      totalUSD += pUSD * qty;
      totalNGN += pNGN * qty;
    });
  }

  // Fallbacks if items were empty or totals 0
  if (totalUSD === 0 && orderDetails.totalUSD) {
    totalUSD = Number(orderDetails.totalUSD);
  }
  if (totalNGN === 0 && orderDetails.totalNGN) {
    totalNGN = Number(orderDetails.totalNGN);
  }

  if (totalUSD === 0 && totalNGN > 0) {
    totalUSD = totalNGN / 1500;
  }
  if (totalNGN === 0 && totalUSD > 0) {
    totalNGN = totalUSD * 1500;
  }

  if (totalUSD === 0 && totalNGN === 0 && orderDetails.total) {
    const rawT = Number(orderDetails.total);
    if (orderDetails.currency === "NGN" || rawT > 100000) {
      totalNGN = rawT;
      totalUSD = rawT / 1500;
    } else {
      totalUSD = rawT;
      totalNGN = rawT * 1500;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-10" id="invoice-view">
      <style>{`
        body, #root, #invoice-view {
          pointer-events: auto !important;
        }
        @media print {
          header, footer, nav, #invoice-header-toast, #invoice-control-buttons {
            display: none !important;
          }
          body {
            background: white !important;
          }
          #invoice-view {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          #invoice-sheet {
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
          }
          @page {
            margin: 0.3in;
            size: portrait;
          }
        }
      `}</style>

      {/* Visual Header Success Toast (Web UI only) */}
      <div className="text-center space-y-3" id="invoice-header-toast">
        <div className="inline-flex p-2.5 bg-emerald-50 rounded-full text-emerald-500">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase">Product Allocation Reserved</h1>
          <p className="text-gray-600 text-xs sm:text-sm font-medium">Official Commercial Invoice generated for order #{invoiceNum}.</p>
        </div>
      </div>

      {/* Invoice Breakdown Sheet - 1 Page Document */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden" id="invoice-sheet">
        {/* Header Band */}
        <div className="p-5 sm:p-6 bg-gray-950 text-white flex justify-between items-start gap-4">
          <div className="space-y-1">
            <img
              src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
              alt="Spinel Logo"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="w-10 h-10 object-contain rounded border border-gray-800"
            />
            <p className="font-extrabold text-xs sm:text-sm tracking-wider mt-1">SPINEL DISTRIBUTION LIMITED</p>
            <p className="text-[11px] sm:text-xs text-gray-400 font-sans">Plot 8, The Providence Str, Lekki Phase 1, Lagos, Nigeria</p>
          </div>
          <div className="text-right text-xs text-gray-300 font-mono space-y-0.5">
            <p className="text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider">Commercial Invoice</p>
            <p>Invoice No: <span className="text-white font-bold">{invoiceNum}</span></p>
            <p>Date Issued: <span className="text-white font-bold">{dateIssued}</span></p>
            <p>Time Issued: <span className="text-white font-bold">{timeIssued}</span></p>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm text-gray-700">
          {/* Shipping vs Billing address */}
          <div className="grid grid-cols-2 gap-5 border-b border-gray-200 pb-4">
            <div>
              <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider">Billing Representative</p>
              <p className="font-bold text-gray-950 text-sm mt-0.5">{orderDetails.shippingDetails?.name || orderDetails.customerName || "N/A"}</p>
              <p className="text-gray-600 text-xs">{orderDetails.shippingDetails?.email || orderDetails.customerEmail || "N/A"}</p>
              <p className="text-gray-600 text-xs">{orderDetails.shippingDetails?.phone || orderDetails.customerPhone || "N/A"}</p>
            </div>
            <div>
              <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider">Site Delivery Destination</p>
              <p className="font-bold text-gray-950 text-sm mt-0.5">{orderDetails.shippingDetails?.address || "N/A"}</p>
              <p className="text-gray-600 text-xs">
                {orderDetails.shippingDetails?.state ? `${orderDetails.shippingDetails.state}, ` : ""}
                {orderDetails.shippingDetails?.country || "Nigeria"}
              </p>
            </div>
          </div>

          {/* Purchased Hardware Equipment Showcase & Table */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider">Allocated Product</p>
              <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider font-mono">
                {orderDetails.items?.length || 0} Item{(orderDetails.items?.length || 0) > 1 ? "s" : ""}
              </p>
            </div>

            <div className="space-y-4 divide-y divide-gray-100">
              {orderDetails.items && orderDetails.items.map((item: any, idx: number) => {
                const prod = item.product || item;
                const qty = Number(item.quantity) || 1;
                const priceUSD = Number(prod.priceUSD) || (prod.priceNGN ? Number(prod.priceNGN) / 1500 : (Number(prod.price) || 0));
                const priceNGN = Number(prod.priceNGN) || (prod.priceUSD ? Number(prod.priceUSD) * 1500 : (Number(prod.price) ? (Number(prod.price) > 100000 ? Number(prod.price) : Number(prod.price) * 1500) : 0));
                
                const lineTotalUSD = priceUSD * qty;
                const lineTotalNGN = priceNGN * qty;

                // Extract high-resolution image URL
                const imgUrl = getOrderProductImage(item);

                return (
                  <div key={prod.id || idx} className="pt-3 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Product Image Box */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center overflow-hidden shadow-xs">
                      <img
                        src={imgUrl}
                        alt={prod.name || prod.productName || "Hardware Equipment"}
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                        }}
                      />
                    </div>

                    {/* Hardware Information */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-bold text-gray-950 text-xs sm:text-sm leading-snug">
                        {prod.name || prod.productName || "Industrial Hardware Product"}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-600 font-mono">
                        <span>SKU: <strong className="text-gray-900">{prod.sku || "SP-HARDWARE"}</strong></span>
                        <span>•</span>
                        <span>Brand: <strong className="text-gray-900">{prod.brand || prod.oem || "Spinel"}</strong></span>
                        {prod.category && (
                          <>
                            <span>•</span>
                            <span>Category: <strong className="text-gray-900">{prod.category}</strong></span>
                          </>
                        )}
                      </div>

                      {prod.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                      )}
                    </div>

                    {/* Quantity & Extended Line Total */}
                    <div className="text-left sm:text-right shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 flex sm:flex-col justify-between items-center sm:items-end">
                      <div>
                        <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-wider">Quantity</span>
                        <span className="font-bold text-gray-950 text-xs sm:text-sm font-mono">{qty}</span>
                      </div>
                      <div className="sm:mt-1">
                        <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-wider">Line Total</span>
                        <span className="font-extrabold text-gray-950 text-xs sm:text-sm font-mono">
                          {currency === "USD"
                            ? `$${lineTotalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : `₦${Math.round(lineTotalNGN).toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total row with status & summary */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-gray-200 gap-4">
            {orderDetails.status === "Completed" || orderDetails.status === "Paid" || orderDetails.paymentStatus === "Paid" ? (
              <div className="border border-emerald-300 bg-emerald-50/80 text-emerald-950 p-3.5 rounded-xl flex items-center space-x-3 max-w-md">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-emerald-900">
                    Payment Status: <span className="text-emerald-700 font-extrabold uppercase">Paid / Completed</span>
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed font-medium">
                    Payment confirmed and acknowledged successfully. Your order is being processed for fulfillment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-amber-300 bg-amber-50/70 text-amber-950 p-3.5 rounded-xl flex items-center space-x-3 max-w-md">
                <FileText className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-amber-900">
                    Payment Status: <span className="text-amber-800 font-extrabold uppercase">{orderDetails.status || "Pending"}</span>
                  </p>
                  <p className="text-[11px] text-amber-900 mt-0.5 leading-relaxed font-medium">
                    Ensure to complete your pending transaction, while we acknowledge your payment.
                  </p>
                </div>
              </div>
            )}
            <div className="text-right min-w-40">
              <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">Total Invoice Amount</span>
              <p className="text-xl sm:text-2xl font-black text-[#FF7A20] font-mono leading-none mt-0.5">
                {currency === "USD"
                  ? `$${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : `₦${Math.round(totalNGN).toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Success Notice */}
      {downloadSuccess && (
        <div className="max-w-xl mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 text-xs font-semibold animate-fade-in shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Invoice PDF downloaded successfully! You can keep this page open or browse more items.</span>
        </div>
      )}

      {/* Control Buttons (Web UI only) */}
      <div className="flex flex-wrap justify-center items-center gap-3 relative z-10" id="invoice-control-buttons">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="bg-gray-900 hover:bg-black text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer flex items-center space-x-2 shadow-md disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Generating Invoice PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#FF7A20]" />
              <span>Download Invoice PDF</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setCurrentView("store")}
          className="bg-[#FF7A20] hover:bg-[#e06816] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer flex items-center space-x-2 shadow-xs"
        >
          <Package className="w-4 h-4" />
          <span>Browse More Hardware</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

