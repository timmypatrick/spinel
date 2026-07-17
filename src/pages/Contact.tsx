import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    address: "",
    state: "",
    country: "",
    subject: "Catalog Request",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          companyName: "",
          phone: "",
          address: "",
          state: "",
          country: "",
          subject: "Catalog Request",
          message: ""
        });
      }
    } catch (err) {
      console.error("Contact form error", err);
    } finally {
      setLoading(false);
    }
  };

  const offices = [
    {
      title: "Lagos Headquarters (Zone A)",
      address: "Plot 24, Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
      phone: "+234 1 888 7746",
      email: "lagos.sales@spineldistribution.com"
    },
    {
      title: "Port Harcourt Integration Hub",
      address: "Plot 15, Trans-Amadi Industrial Layout, Port Harcourt, Rivers State",
      phone: "+234 84 456 9900",
      email: "ph.engineering@spineldistribution.com"
    }
  ];

  return (
    <div className="max-w-[1536px] mx-auto px-4 lg:px-[70px] md:px-[70px] py-12 space-y-12" id="contact-view">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">Contact our Systems Hubs</h1>
        <p className="text-gray-500 text-xs sm:text-sm max-w-sm mx-auto">Get in direct communication with regional engineers and delivery officers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left contacts details (Cols 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">Regional Distribution Hubs</h3>
            {offices.map((off, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-5 rounded-xl space-y-3 shadow-xs">
                <h4 className="font-bold text-xs text-gray-900 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#FF7A20]" />
                  <span>{off.title}</span>
                </h4>
                <div className="space-y-1.5 text-xs text-gray-500 leading-relaxed font-sans">
                  <p>{off.address}</p>
                  <p className="font-mono text-gray-700">Phone: {off.phone}</p>
                  <p className="text-[#FF7A20] font-semibold">Email: {off.email}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-xs text-gray-500 leading-relaxed">
            <h4 className="font-bold text-gray-900 mb-1 flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-[#FF7A20]" />
              <span>Tendering Office hours</span>
            </h4>
            <p>Our sales desks and dispatch yards operate Monday - Friday (08:00 - 17:00 UTC+1). Special weekend emergency logistics can be cleared via priority project contracts.</p>
          </div>
        </div>

        {/* Right Contact Form (Cols 7) */}
        <div className="lg:col-span-7" id="contact-form-container">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">Send Technical Inquiry</h3>
            
            {success ? (
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl flex items-center space-x-3 text-emerald-800 text-xs">
                <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <p className="font-bold">Message Forwarded Successfully!</p>
                  <p className="text-emerald-600 mt-0.5">A technician is analyzing your specs and will reply shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-semibold">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Patrick Olayinka"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-semibold">Representative Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="representative@domain.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-semibold">Company Name <span className="text-gray-400 text-[10px] font-normal">(Optional)</span></label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Enterprise Corp"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+234 803 123 4567"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 font-semibold">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="Plot 15, Trans-Amadi Industrial Layout"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-semibold">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      placeholder="Rivers State"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-semibold">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      placeholder="Nigeria"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 font-semibold">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none"
                  >
                    <option value="Catalog Request">Technical Datasheet Request</option>
                    <option value="OEM Partnership">OEM Partnership Opportunities</option>
                    <option value="Logistics Shipping">Bulk Order Logistics Shipping</option>
                    <option value="System Design">Custom System Design Assistance</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 font-semibold">Technical Specs Details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="Briefly detail your equipment request, site constraints, or certification queries..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#FF7A20]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF7A20] hover:bg-[#e06512] disabled:opacity-50 text-white font-bold py-2.5 px-6 rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
