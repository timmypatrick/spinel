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
    subject: "General Inquiry",
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
          subject: "",
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
      title: "Dubai Office – Middle East Operations",
      address: "Office No. 1806, 18th Floor Aurora Tower, Dubai Media Dubai UEA.",
      phone: "+234 816 963 2070",
      email: "engineering@spineldistribution.com"
    },
    {
      title: "Lagos Headquarters – Nigeria Operations",
      address: "Plot 8, The Providence Str, Lekki Phase 1, Lagos, Nigeria.",
      phone: "+234 706 890 7595",
      email: "sales@spineldistribution.com"
    }
  ];

  return (
    <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-12 space-y-12" id="contact-view">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">Contact Spinel Distribution</h1>
        <p className="text-gray-500 text-xs sm:text-sm max-w-sm mx-auto">ICT sales and  support desk.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left contacts details (Cols 5) */}
        <div className="lg:col-span-5 space-y-6 text-sm">
          <div className="space-y-4">
            <h3 className="font-bold text-base text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">Spinel Distribution Office Locations</h3>
            {offices.map((off, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-5 rounded-xl space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-gray-900 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#FF7A20]" />
                  <span>{off.title}</span>
                </h4>
                <div className="space-y-1.5 text-sm text-gray-500 leading-relaxed font-sans">
                  <p>{off.address}</p>
                  <p className="font-mono text-gray-700">Phone: {off.phone}</p>
                  <p className="text-[#FF7A20] font-semibold">Email: {off.email}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-sm text-gray-500 leading-relaxed">
            <h4 className="font-bold text-gray-900 mb-1 flex items-center space-x-1.5">
              <HelpCircle className="w-5 h-5 text-[#FF7A20]" />
              <span>Business Hours & Customer Support</span>
            </h4>
            <p>Our sales, customer support, and engineering teams are available Monday to Friday, 8:00 AM – 5:00 PM (WAT) to provide quotations, technical assistance, product information, and project support.</p>
          </div>
        </div>

        {/* Right Contact Form (Cols 7) */}
        <div className="lg:col-span-7" id="contact-form-container">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl space-y-6 text-sm">
            <h3 className="font-bold text-base text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">Send Technical Inquiry</h3>
            
            {success ? (
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl flex items-center space-x-3 text-emerald-800 text-sm">
                <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <p className="font-bold text-base">Message Sent Successfully!</p>
                  <p className="text-emerald-600 mt-0.5">Thank you for contacting Spinel Distribution. Our sales or technical team will respond as soon as possible.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Representative Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Timmy Patrick"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Representative Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="sales@spineldistribution.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Company Name <span className="text-gray-400 text-[10px] font-normal lowercase">(Optional)</span></label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Spinel Distribution Ltd"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+234 801 234 5678"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="Plot 8, The Providence Str, Lekki Phase 1"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      placeholder="Lagos State"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      placeholder="Nigeria"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">Select a Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Sales Inquiry">Sales Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">How Can We Assist You?</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="Tell us about your product inquiry, project requirements, or technical support needs. Our sales and engineering team will respond with the best solution for your business."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#FF7A20]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF7A20] hover:bg-[#e06512] disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl text-sm transition flex items-center space-x-1.5 cursor-pointer shadow-md"
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
