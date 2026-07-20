import { CheckCircle, FileText, Download, ArrowRight } from "lucide-react";

interface ThankYouProps {
  orderDetails: any;
  currency: "USD" | "NGN";
  setCurrentView: (view: string) => void;
}

export default function ThankYou({ orderDetails, currency, setCurrentView }: ThankYouProps) {
  if (!orderDetails) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center text-xs font-semibold text-gray-400">
        Locating order logs...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-[100px] lg:px-[100px] py-16 space-y-10" id="thank-you-view">
      {/* Visual Header Success Toast */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-emerald-50 rounded-full text-emerald-500">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">Equipment Allocation Reserved</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Invoice generated. Your hardware slots are held at the regional yard.</p>
        </div>
      </div>

      {/* Invoice Breakdown Sheet */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden" id="invoice-sheet">
        <div className="p-6 sm:p-8 bg-gray-950 text-white flex justify-between items-start gap-4">
          <div className="space-y-1">
            <img
              src="https://i.ibb.co/Q3CC5Rqd/Spinel-Only-Logo.jpg"
              alt="Spinel Only Logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 object-contain rounded border border-gray-800"
            />
            <p className="font-bold text-xs tracking-wider">SPINEL DISTRIBUTION LIMITED</p>
          </div>
          <div className="text-right text-[10px] sm:text-xs text-gray-400 font-mono space-y-1">
            <p className="text-white font-bold uppercase">Commercial Invoice</p>
            <p>Invoice No: {orderDetails.invoiceNumber}</p>
            <p>Date Issued: {new Date().toISOString().split("T")[0]}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-xs text-gray-600">
          {/* Shipping vs Billing address */}
          <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <div>
              <p className="font-bold text-[10px] text-gray-400 uppercase">Billing Representative</p>
              <p className="font-bold text-gray-950 mt-1">{orderDetails.shippingDetails.name}</p>
              <p>{orderDetails.shippingDetails.email}</p>
              <p>{orderDetails.shippingDetails.phone}</p>
            </div>
            <div>
              <p className="font-bold text-[10px] text-gray-400 uppercase">Site Delivery Destination</p>
              <p className="font-bold text-gray-950 mt-1">{orderDetails.shippingDetails.address}</p>
              <p>{orderDetails.shippingDetails.state} State, {orderDetails.shippingDetails.country}</p>
            </div>
          </div>

          {/* Table of items ordered */}
          <div className="space-y-3">
            <p className="font-bold text-[10px] text-gray-400 uppercase">Allocated Hardware</p>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-bold uppercase">
                  <th className="py-2">Hardware Details</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Extended Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item: any) => (
                  <tr key={item.product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="py-3">
                      <p className="font-bold text-gray-900">{item.product.name}</p>
                      <span className="font-mono text-[9px] text-gray-400">SKU: {item.product.sku} | OEM: {item.product.brand}</span>
                    </td>
                    <td className="py-3 text-center font-bold text-gray-900">{item.quantity}</td>
                    <td className="py-3 text-right font-bold text-gray-900 font-mono">
                      {currency === "USD"
                        ? `$${(item.product.priceUSD * item.quantity).toLocaleString()}`
                        : `₦${(item.product.priceNGN * item.quantity).toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total row with stamp mock */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-100 gap-6">
            <div className="border border-emerald-300 bg-emerald-50/30 text-emerald-800 p-3 rounded-xl flex items-center space-x-2.5 max-w-sm">
              <FileText className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <p className="font-bold text-[10px]">Payment Status: Pending Verification</p>
                <p className="text-[9px] text-emerald-600 mt-0.5">Please check email for bank wire instructions or Paystack authorization references.</p>
              </div>
            </div>
            <div className="text-right min-w-48">
              <span className="font-bold text-gray-500 text-[10px] uppercase">Amount Due</span>
              <p className="text-2xl font-black text-[#FF7A20] font-mono leading-none mt-1">
                {currency === "USD" ? `$${orderDetails.total.toLocaleString()}` : `₦${orderDetails.total.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => alert(`Initiating secure local print layout or download for: invoice-${orderDetails.invoiceNumber}.pdf`)}
          className="bg-transparent border border-gray-200 hover:border-gray-900 text-gray-700 font-semibold text-xs px-6 py-3 rounded-xl transition cursor-pointer flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Invoice PDF</span>
        </button>
        <button
          onClick={() => setCurrentView("store")}
          className="bg-gray-950 hover:bg-[#FF7A20] text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer flex items-center space-x-1.5"
        >
          <span>Continue to Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
