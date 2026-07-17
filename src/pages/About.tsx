import { useState } from "react";
import { Award, ShieldCheck, Heart, BookOpen, Clock, Globe, HelpCircle, FileText, Check } from "lucide-react";

export default function About() {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);

  const team = [
    {
      name: "Engr. OJO ADEDAYO",
      role: "General Manager",
      bio: "20+ years of industrial ICT deployments",
      image: "https://i.ibb.co/PZ0H5VSt/boss-2.jpg"
    },
    {
      name: "Engr. Dotun JOB",
      role: "Head of Engineering Operations",
      bio: "Specializes in high-capacity surveillance setups",
      image: "https://i.ibb.co/JFHffg6y/Mr-Dotun.jpg"
    }
  ];

  const coreValues = [
    {
      title: "Explosion-Proof Safety Standards",
      desc: "Our hardware complies strictly with global ATEX / IECEx directives. We prioritize structural survival in volatile refinery zones.",
      icon: ShieldCheck
    },
    {
      title: "OEM Supply Integrity",
      desc: "Zero gray-market policy. Every battery, switch and camera is sourced direct from certified production lines with active warrantee keys.",
      icon: Award
    },
    {
      title: "Logistics Excellence",
      desc: "Direct ex-stock delivery from regional hubs in Lagos and PH to reduce lead delays and secure bid compliance milestones.",
      icon: Globe
    }
  ];

  const caseStudies = [
    {
      title: "Zone 1 Surveillance Matrix at Escravos Refinery Terminal",
      summary: "Deployed 48 explosion-proof AISI 316L stainless dome optical scanners with intelligent perimeter intrusion analytics on an active offshore terminal.",
      challenge: "High saline mist causing accelerated housing corrosion and constant threat of gaseous combustible mixtures.",
      solution: "Implemented HexaShield AISI 316L explosion-proof cameras paired with pressurized fiber routing cages and deep analytics on an air-conditioned seismic server rack.",
      result: "99.98% object classification accuracy; zero structural corrosion reported after 36 months of continuous active operation.",
      tags: ["ATEX CCTV", "Oil & Gas"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Hybrid Solar Microgrids for Sahel Telecom Towers",
      summary: "Engineered and deployed modular dual-MPPT hybrid energy systems to power 110 off-grid cellular base transceiver stations.",
      challenge: "Constant grid brownouts and high diesel generator operating expenditures under extreme 45°C Sahel temperatures.",
      solution: "Supplied Vantage Power smart hybrid inverters paired with multi-layer high-capacity stackable LiFePO4 battery vaults.",
      result: "Reduced diesel consumption by 78%; guaranteed 100% continuous cellular base station uptime; minimized site maintenance schedules.",
      tags: ["Renewable Energy", "Telecom Nodes"],
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="max-w-[1536px] mx-auto px-4 lg:px-[52px] py-12 space-y-16" id="about-view">
      {/* Company Mission/Vision Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[#FF7A20] font-bold text-xs uppercase tracking-widest font-mono">Company History & Mandate</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight uppercase">
            Surviving physical & regulatory extremes.
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
            Spinel Distribution was established to bridge the gap between premium international ICT hardware manufacturers and high-tier engineering projects across Africa and the Gulf of Guinea. As certified partners of market-leading OEMs, we supply fully warrantied systems suitable for maritime rigs, refinery complexes, and high-security municipal sites.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
            Our company is not merely a supplier; we are an engineering-led team that conducts site studies, design checks, and regulatory assessments to ensure that when hardware leaves our warehouses, it thrives in active environments.
          </p>
        </div>
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="border border-gray-100 p-2.5 rounded-2xl bg-gray-50/50">
            <img
              src="https://i.ibb.co/SwCdYPGr/spinel-team-1.png"
              alt="Systems Testing Bench"
              className="rounded-xl object-cover w-full h-[280px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase">Our Corporate Values</h2>
          <p className="text-gray-500 text-xs mt-1.5">The principles guiding Spinel's engineering distributions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl space-y-4 shadow-xs">
                <div className="bg-orange-50 text-[#FF7A20] w-12 h-12 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-900">{val.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies / Engineering Projects */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase">Engineering Case Studies</h2>
          <p className="text-gray-500 text-xs mt-1.5">Examine the operational metrics of our active deployment projects.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCase(cs)}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer group"
            >
              <div className="relative h-48 bg-gray-50">
                <img src={cs.image} alt={cs.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {cs.tags.map(t => (
                    <span key={t} className="bg-gray-950/90 text-white font-semibold font-mono text-[8px] tracking-wide px-2 py-0.5 rounded-sm uppercase">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#FF7A20] transition">{cs.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-sans">{cs.summary}</p>
                <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#FF7A20] pt-2">
                  <span>View Case Metrics</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase">Board of Systems Architects</h2>
          <p className="text-gray-500 text-xs mt-1.5">The technical expertise directing Spinel's project bids.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((t, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs flex flex-col sm:flex-row gap-6">
              <img src={t.image} alt={t.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover bg-gray-50 shrink-0" referrerPolicy="no-referrer" />
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900">{t.name}</h3>
                <p className="text-[#FF7A20] font-semibold text-[10px] uppercase font-mono">{t.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expanded Case Study Overlay Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-500 font-bold"
            >
              ×
            </button>
            <div className="space-y-6 text-xs sm:text-sm">
              <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-48 object-cover rounded-xl bg-gray-50" referrerPolicy="no-referrer" />
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  {selectedCase.tags.map((t: string) => (
                    <span key={t} className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-mono text-[9px] uppercase font-bold">{t}</span>
                  ))}
                </div>
                <h3 className="font-black text-base text-gray-900 leading-snug">{selectedCase.title}</h3>
                <p className="text-gray-500 italic leading-relaxed">{selectedCase.summary}</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A20]" />
                    <span>The Physical Challenge</span>
                  </h4>
                  <p className="text-gray-600 leading-relaxed font-sans pl-2.5">{selectedCase.challenge}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A20]" />
                    <span>The Technical Solution</span>
                  </h4>
                  <p className="text-gray-600 leading-relaxed font-sans pl-2.5">{selectedCase.solution}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A20]" />
                    <span>The Final Outcome</span>
                  </h4>
                  <p className="text-gray-600 leading-relaxed font-sans pl-2.5">{selectedCase.result}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="bg-gray-950 text-white font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-[#FF7A20] transition cursor-pointer"
                >
                  Close Case Metrics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
