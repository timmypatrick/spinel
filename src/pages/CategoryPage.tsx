import { useState, useEffect } from "react";
import { ShoppingCart, Info, Search, RefreshCw, Send } from "lucide-react";
import { Product } from "../types";
import { safeFetch } from "../lib/dataService";

interface CategoryPageProps {
  subcategoryName: string;
  currency: "USD" | "NGN";
  addToCart: (product: Product, quantity?: number) => void;
  setSelectedProductId: (id: string | null) => void;
  setCurrentView: (view: string) => void;
  onRequestQuote?: (product: Product) => void;
}

export default function CategoryPage({
  subcategoryName,
  currency,
  addToCart,
  setSelectedProductId,
  setCurrentView,
  onRequestQuote
}: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const matchProduct = (p: Product, subName: string) => {
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
    if (nameLower === "camera bundle") {
      if (subcatLower.includes("bundle") || prodNameLower.includes("bundle")) return true;
      if (subcatLower.includes("telephone") || subcatLower.includes("phone") || prodNameLower.includes("phone") || prodNameLower.includes("telephone")) return true;
    }
    if (nameLower === "multi-sensor camera" && (subcatLower.includes("sensor") || prodNameLower.includes("sensor"))) return true;

    if ((nameLower === "industrial switches" || nameLower === "industrial switch") && (subcatLower.includes("switch") || catLower.includes("telecom") || catLower.includes("industrial") || prodNameLower.includes("switch"))) return true;
    if (nameLower === "junction box" && (subcatLower.includes("junction") || prodNameLower.includes("junction"))) return true;
    if (nameLower === "network video recorders" && (subcatLower.includes("recorder") || prodNameLower.includes("recorder") || prodNameLower.includes("nvr"))) return true;
    if (nameLower === "electrical workstation" && (subcatLower.includes("workstation") || prodNameLower.includes("workstation"))) return true;
    if (nameLower === "ups & pdu" && (subcatLower.includes("ups") || subcatLower.includes("pdu") || prodNameLower.includes("ups") || prodNameLower.includes("pdu"))) return true;
    if (nameLower === "hybrid composite cable" && (subcatLower.includes("cable") || prodNameLower.includes("cable"))) return true;


    if (nameLower === "lithium lifepo4 batteries" && (subcatLower.includes("batter") || prodNameLower.includes("batter") || prodNameLower.includes("lifepo4"))) return true;
    if (nameLower === "smart hybrid inverters" && (subcatLower.includes("inverter") || prodNameLower.includes("inverter"))) return true;
    if (nameLower === "industrial solar panels" && (catLower === "industrial solar panels" || subcatLower === "industrial solar panels")) return true;

    if (nameLower === "it enclosures" && (subcatLower.includes("it") || subcatLower.includes("enclosure") || prodNameLower.includes("enclosure"))) return true;
    if (nameLower === "wall-mounted enclosures" && (subcatLower.includes("wall") || prodNameLower.includes("wall") || prodNameLower.includes("cabinet"))) return true;
    if (nameLower === "server racks" && (subcatLower.includes("rack") || prodNameLower.includes("rack") || prodNameLower.includes("cabinet"))) return true;


    if (
      nameLower === "paga" ||
      nameLower === "paga system" ||
      nameLower === "paga-system"
    ) {
      if (p.sku && p.sku.startsWith("PS-YA-HA-")) return true;
      if (subcatLower.includes("paga") || catLower.includes("paga") || prodNameLower.includes("paga")) return true;
      return subcatLower === "paga" || catLower === "paga" || subcatLower === "paga system";
    }

    if (nameLower === "ex-junction box" && (subcatLower.includes("junction") || catLower.includes("junction") || prodNameLower.includes("junction") || subcatLower === "ex-junction box")) return true;

    // Completely removed / disabled pages
    if (nameLower === "ex-telephone" || nameLower === "ex-telephones") return false;
    if (nameLower === "small enclosures") return false;

    return false;
  };

  useEffect(() => {
    setLoading(true);
    safeFetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Filter products matching this subcategory/category
        const matched = data.filter((p) => matchProduct(p, subcategoryName));
        setProducts(matched);
      })
      .catch((err) => console.error("Error loading category products", err))
      .finally(() => setLoading(false));
  }, [subcategoryName]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, subcategoryName]);

  const handleProductDetails = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-details");
  };

  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const itemsPerPage = 60;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getHeroBgImage = (subName: string): string => {
    const nameLower = subName.toLowerCase().trim();
    if (nameLower.includes("box camera") || nameLower === "box camera") {
      return "https://i.ibb.co/yFpPP42n/7fbcdd1e-7952-4cb1-8ae6-62ac3eda62ba.png";
    }
    if (nameLower.includes("dome camera") || nameLower === "dome camera") {
      return "https://i.ibb.co/Tq41Zq2N/f46a385f-6cb0-4ac2-896c-76c58b7e93d0.png";
    }
    if (nameLower.includes("bullet camera") || nameLower === "bullet camera") {
      return "https://i.ibb.co/RTDPffL6/c1591ea1-58b0-4618-ab36-69945c0aa45d.png";
    }
    if (nameLower.includes("ptz camera") || nameLower === "ptz camera") {
      return "https://i.ibb.co/gZP475xf/856c4c30-9c99-4355-8b41-64a8877fcb08.png";
    }
    if (nameLower.includes("panoramic")) {
      return "https://i.ibb.co/gL28n7Mt/2ff314f7-bb74-4550-9828-c29bd50f21cd.png";
    }
    if (nameLower.includes("thermal")) {
      return "https://i.ibb.co/1GdTQbcZ/55d01433-a43b-4193-80e9-283c23a67b16.png";
    }
    if (nameLower.includes("fisheye")) {
      return "https://i.ibb.co/M5GYZ9zz/5ff0ed5c-72db-482b-b79b-bb30df710f5b.png";
    }
    if (nameLower.includes("bundle")) {
      return "https://i.ibb.co/3m0dsYLS/9edf6e9c-61d1-47f4-934f-3b4f40bff114.png";
    }
    if (nameLower.includes("multi-sensor") || nameLower.includes("multisensor") || nameLower.includes("multi sensor")) {
      return "https://i.ibb.co/rK7xspsS/f7b8999e-d680-482b-8181-d597c5b1e4f8.png";
    }
    if (nameLower.includes("industrial switch") || nameLower.includes("switches")) {
      return "https://i.ibb.co/VcfCdtbm/b4b235b8-c243-4648-b78a-5a0478efbf7b.png";
    }
    if (nameLower.includes("ex-junction") || nameLower.includes("ex junction")) {
      return "https://i.ibb.co/JWJTZdSP/ecc6b079-c461-4e04-b892-d631c5738104.png";
    }
    if (nameLower.includes("junction box") || nameLower.includes("junction")) {
      return "https://i.ibb.co/r214v3JL/8135701e-7b47-405f-8b76-b9100682d08f.png";
    }
    if (nameLower.includes("network video recorder") || nameLower.includes("nvr") || nameLower.includes("video recorder")) {
      return "https://i.ibb.co/7x0XRr2W/e495f939-07ad-4c54-b6d8-030f8b402ed2.png";
    }
    if (nameLower.includes("workstation") || nameLower.includes("electrical workstation")) {
      return "https://i.ibb.co/Wv3mvcwJ/92ed04b9-7e1d-420c-b8dc-df823d1714d0.png";
    }
    if (nameLower.includes("ups") || nameLower.includes("pdu")) {
      return "https://i.ibb.co/JjHTkGsy/a3b4fd1f-6e2e-4ead-8a66-ec40b38c394d.png";
    }
    if (nameLower.includes("hybrid composite cable") || nameLower.includes("composite cable") || nameLower.includes("cable")) {
      return "https://i.ibb.co/MkBtMcPs/a005c529-3a5b-4991-87c4-745771639f77.png";
    }
    if (nameLower.includes("accessories") || nameLower.includes("accessory")) {
      return "https://i.ibb.co/hFXkmDFx/eb22a405-3095-4326-844a-8a9ee0fb6755.png";
    }
    if (nameLower.includes("solar")) {
      return "https://i.ibb.co/1tFC3Fjw/4591b573-eac4-4b2e-9a87-32d07983da97.png";
    }
    if (nameLower.includes("batter") || nameLower.includes("lifepo4") || nameLower.includes("lithium")) {
      return "https://i.ibb.co/nqLVdz8d/8f420e7d-8bb9-45bd-88c3-de7409bfe263.png";
    }
    if (nameLower.includes("inverter")) {
      return "https://i.ibb.co/21Lvqfg4/ecae048a-cb0a-42b3-bc29-b4e5661a55c7.png";
    }
    if (nameLower.includes("small enclosure")) {
      return "https://i.ibb.co/35Z0zXtb/3f7f377f-225e-44e1-a983-b270b407e463.png";
    }
    if (nameLower.includes("it enclosure")) {
      return "https://i.ibb.co/Z1gtcLZQ/8cf842a6-1807-4133-a814-ced1723ac559.png";
    }
    if (nameLower.includes("wall-mounted enclosure") || nameLower.includes("wall mounted enclosure")) {
      return "https://i.ibb.co/0RzNt8wp/722a9d7f-d3aa-449e-a0ab-12518197a1cd.png";
    }
    if (nameLower.includes("server rack") || nameLower.includes("rack")) {
      return "https://i.ibb.co/wNdKL1sS/49173788-d399-4094-8378-8a0a6d922f50.png";
    }
    if (nameLower.includes("paga")) {
      return "https://i.ibb.co/6c7k2f9G/9a8e5675-9b26-43aa-9d1d-9d3481c89053.png";
    }
    if (nameLower.includes("ex-cctv") || nameLower.includes("ex cctv")) {
      return "https://i.ibb.co/hR7zLJvd/c6e20e34-d826-4963-890f-91a0a29437da.png";
    }
    return "https://i.ibb.co/gMGdhQfd/Exploration-for-oil-and-gas-is-very-expensive-and-risky.jpg";
  };

  const getCategorySEOContent = (name: string) => {
    const nameLower = name.toLowerCase();

    if (nameLower.includes("box camera") || nameLower.includes("box-camera")) {
      return {
        heading: "Enterprise Box Cameras & High-Definition Optical Surveillance Systems",
        description: "Explore enterprise-grade Box IP Cameras engineered for long-range surveillance, extreme light sensitivity, and customized telephoto lens integration. Built for traffic monitoring, industrial perimeters, and high-security facility inspection."
      };
    }
    if (nameLower.includes("dome camera")) {
      return {
        heading: "Vandal-Proof Dome Cameras & Indoor/Outdoor IP Surveillance",
        description: "Discover IK10 vandal-resistant and IP67 weather-rated Dome Cameras featuring infrared night vision, wide-angle coverage, and AI edge analytics. Ideal for corporate buildings, transport hubs, and public safety infrastructure."
      };
    }
    if (nameLower.includes("bullet camera")) {
      return {
        heading: "Ruggedized Bullet Cameras & Long-Range Infrared Security Systems",
        description: "Deploy heavy-duty Bullet IP Cameras equipped with deep learning vehicle/person detection, long-range IR illuminators, and weather-sealed housings for perimeter security, industrial gates, and harsh outdoor environments."
      };
    }
    if (nameLower.includes("ptz camera") || nameLower.includes("speed dome")) {
      return {
        heading: "Pan-Tilt-Zoom (PTZ) Speed Dome Cameras & Active Tracking Systems",
        description: "High-speed Pan-Tilt-Zoom (PTZ) IP cameras with 30x+ optical zoom, 360-degree continuous pan, auto-tracking algorithms, and long-range laser IR. Purpose-built for critical infrastructure, airports, ports, and wide-area monitoring."
      };
    }
    if (nameLower.includes("panoramic camera")) {
      return {
        heading: "360-Degree Panoramic & Multi-Directional Security Cameras",
        description: "Achieve total situational awareness with zero blind spots using multi-sensor 180° and 360° Panoramic Cameras. Reduce total camera count while maintaining seamless high-resolution coverage across expansive industrial fields."
      };
    }
    if (nameLower.includes("thermal camera")) {
      return {
        heading: "Radiometric Thermal Imaging Cameras & Early Fire Protection Systems",
        description: "Advanced dual-spectrum thermal cameras designed for border surveillance, thermal flare stack inspection, electrical overheating detection, and early fire prevention in hazardous, zero-visibility operational zones."
      };
    }
    if (nameLower.includes("fisheye camera")) {
      return {
        heading: "Ultra-Wide Fisheye Cameras & 360° Hemispheric Overview Surveillance",
        description: "Compact single-sensor 360° Fisheye Cameras delivering high-megapixel hemispheric views with client-side and hardware dewarping. Efficient, cost-effective monitoring for control rooms, retail hubs, and server halls."
      };
    }
    if (nameLower.includes("bundle")) {
      return {
        heading: "Turnkey IP Camera Bundles & Multi-Channel Surveillance Kits",
        description: "Complete plug-and-play CCTV camera bundles paired with Network Video Recorders (NVR), High-Power PoE cabling, and pre-configured management software for rapid commercial security deployments and facility retrofits."
      };
    }
    if (nameLower.includes("multi-sensor") || nameLower.includes("multisensor")) {
      return {
        heading: "High-Density Multi-Sensor IP Cameras & Multi-Directional Coverage",
        description: "Flexible multi-sensor camera systems housing multiple adjustable lenses in a single IP node. Ideal for monitoring multi-intersection roads, expansive building corners, and critical perimeter checkpoints."
      };
    }
    if (nameLower.includes("industrial switch") || nameLower.includes("switches")) {
      return {
        heading: "Hardened Industrial Ethernet Switches & Heavy-Duty PoE Networks",
        description: "DIN-rail and rack-mounted Managed Industrial Ethernet Switches with wide temperature tolerance, redundant power inputs, ring protection protocols, and High-Power PoE+ for mission-critical industrial automation."
      };
    }
    if (nameLower.includes("ex-junction") || nameLower.includes("ex junction") || nameLower.includes("ex-junction box")) {
      return {
        heading: "ATEX & IECEx Certified Explosion-Proof Junction Boxes",
        description: "Heavy-duty GRP and 316L stainless steel Ex-d / Ex-e explosion-proof terminal boxes certified for hazardous gas and dust atmospheres. Ensuring maximum safety and compliance for industrial field wiring."
      };
    }
    if (nameLower.includes("junction box") || nameLower.includes("junction")) {
      return {
        heading: "Weatherproof Industrial Junction Boxes & Cable Termination Enclosures",
        description: "IP66/IP67 heavy-duty junction boxes and terminal enclosures for safe electrical splicing, fiber patch distribution, and outdoor CCTV mounting in rugged commercial and marine environments."
      };
    }
    if (nameLower.includes("network video recorder") || nameLower.includes("nvr") || nameLower.includes("video recorder")) {
      return {
        heading: "Enterprise Network Video Recorders (NVR) & High-Capacity Storage Vaults",
        description: "High-throughput, multi-channel NVR video management servers with RAID 0/1/5/10 hardware redundancy, AI face recognition indexing, hot-swappable hard drive bays, and multi-node central monitoring."
      };
    }
    if (nameLower.includes("workstation") || nameLower.includes("electrical workstation")) {
      return {
        heading: "Industrial Electrical Workstations & Ergonomic Control Center Desks",
        description: "Heavy-duty technical consoles and electrical testing workstations designed for SCADA operators, power dispatch centers, network operations centers (NOC), and industrial assembly lines."
      };
    }
    if (nameLower.includes("ups") || nameLower.includes("pdu")) {
      return {
        heading: "Uninterruptible Power Supplies (UPS) & Smart Rack Power Distribution (PDU)",
        description: "Double-conversion online UPS systems and rack-mountable intelligent PDUs with remote outlet metering, environmental monitoring, and surge protection for server infrastructure and telecom backbones."
      };
    }
    if (nameLower.includes("hybrid composite cable") || nameLower.includes("composite cable") || nameLower.includes("cable")) {
      return {
        heading: "Armored Hybrid Composite Cables (Fiber Optic + Power Conductors)",
        description: "Ruggedized hybrid composite cables integrating singlemode/multimode optical fiber with copper power cores. Streamline long-distance remote camera and wireless antenna installations over a single jacket."
      };
    }
    if (nameLower.includes("accessories") || nameLower.includes("accessory")) {
      return {
        heading: "ICT & Security Installation Accessories, Brackets & Cable Glands",
        description: "OEM-certified mounting brackets, corner mounts, pole clamps, explosion-proof cable glands, power adaptors, and patch cords for seamless, standardized ICT field deployments."
      };
    }
    if (nameLower.includes("solar")) {
      return {
        heading: "High-Efficiency Industrial Solar PV Modules & Off-Grid Energy Systems",
        description: "Tier-1 monocrystalline industrial solar panels designed for extreme wind loads, PID resistance, and maximum power generation in off-grid telecom towers, oilfield monitoring, and remote microgrids."
      };
    }
    if (nameLower.includes("batter") || nameLower.includes("lifepo4") || nameLower.includes("lithium")) {
      return {
        heading: "Industrial Lithium Iron Phosphate (LiFePO4) Battery Energy Storage",
        description: "High-density LiFePO4 energy storage batteries featuring built-in smart BMS, 6000+ deep charge cycles, rapid charging capabilities, and thermal stability for critical backup power and solar storage."
      };
    }
    if (nameLower.includes("inverter")) {
      return {
        heading: "Pure Sine Wave Smart Hybrid Inverters & Microgrid Power Systems",
        description: "Commercial pure sine wave hybrid inverters with MPPT solar controllers, grid-feed capabilities, generator auto-start integration, and remote cloud management for uninterrupted facility power."
      };
    }
    if (nameLower.includes("small enclosure")) {
      return {
        heading: "Compact Industrial Enclosures & NEMA/IP Protected Field Cabinets",
        description: "Durable stainless steel, polycarbonate, and sheet metal small enclosures protecting sensitive electronics, relays, and field controllers against dust, moisture, and chemical exposure."
      };
    }
    if (nameLower.includes("it enclosure")) {
      return {
        heading: "Server Room IT Enclosures & High-Density Equipment Cabinets",
        description: "Standardized 19-inch IT equipment enclosures with optimized airflow ventilation, integrated cable management, locking security doors, and high-load capacities for modern data centers."
      };
    }
    if (nameLower.includes("wall-mounted enclosure") || nameLower.includes("wall mounted enclosure")) {
      return {
        heading: "Wall-Mounted Network Enclosures & Compact Telecom Cabinets",
        description: "Space-saving wall-mounted rack enclosures for edge networking equipment, patch panels, compact switches, and local security recorders in offices, branches, and floor distribution rooms."
      };
    }
    if (nameLower.includes("server rack") || nameLower.includes("rack")) {
      return {
        heading: "Data Center Server Racks & Heavy-Duty Modular Rack Frameworks",
        description: "Professional 42U to 48U server racks built with heavy-gauge steel, high perforation airflow doors, seismic rating options, and toolless mounting rails for high-density enterprise IT hardware."
      };
    }
    if (nameLower.includes("paga")) {
      return {
        heading: "Public Address & General Alarm (PAGA) Systems for Hazardous Facilities",
        description: "Fully redundant EN 54-16 certified PAGA communication systems delivering clear voice messaging, emergency tones, and acoustic beacon integration across offshore rigs, refineries, and industrial plants."
      };
    }
    if (nameLower.includes("ex-cctv") || nameLower.includes("ex cctv")) {
      return {
        heading: "Explosion-Proof (Ex-CCTV) Hazardous Area Security Cameras",
        description: "ATEX and IECEx certified explosion-proof stainless steel camera stations designed for Zone 1, 2, 21, and 22 flammable environments in oil, gas, chemical, and offshore installations."
      };
    }

    // Default Fallback for custom or newly added categories
    return {
      heading: `${name} Hardware Systems & Enterprise ICT Infrastructure`,
      description: `Explore certified high-performance ${name} solutions engineered for demanding enterprise, telecommunications, and industrial operations. Guaranteed OEM authenticity, international standardizations, and long-term service support.`
    };
  };

  return (
    <div className="w-full" id="category-page">
      {/* Category Banner with rich background image hero section - Full Width & Full Height minus Header on Desktop */}
      {(() => {
        const heroBg = getHeroBgImage(subcategoryName);
        const seo = getCategorySEOContent(subcategoryName);
        return (
          <div
            className="relative w-full overflow-hidden border-b border-gray-800 bg-gray-950 bg-cover bg-center bg-no-repeat min-h-[360px] lg:min-h-[calc(100vh-88px)] lg:h-[calc(100vh-88px)] flex items-center justify-center px-4 md:px-[100px] lg:px-[100px] py-12"
            style={{ backgroundImage: `url('${heroBg}')` }}
          >
            {/* Gradient overlay for contrast & legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-gray-950/50 z-0"></div>

            <div className="max-w-[1536px] w-full mx-auto relative z-10 space-y-4 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight drop-shadow-md">
                {seo.heading}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl drop-shadow">
                {seo.description}
              </p>
            </div>
          </div>
        );
      })()}

      <div className="max-w-[1536px] mx-auto px-4 md:px-[100px] lg:px-[100px] py-10 space-y-8">
        {/* Local search filter pane */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 p-4 rounded-xl items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder={`Search ${subcategoryName} catalog by SKU or specifications...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF7A20] transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="text-xs text-gray-500 font-medium shrink-0">
          Showing <span className="font-bold text-gray-900">{Math.min(filteredProducts.length, itemsPerPage)}</span> of{" "}
          <span className="font-bold text-gray-900">{filteredProducts.length}</span> matching system profiles (Page {currentPage} of {totalPages})
        </div>
      </div>

      {/* Dynamic Products Grid */}
      {loading ? (
        <div className="py-24 text-center text-xs font-semibold text-gray-400 flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="w-8 h-8 animate-spin text-[#FF7A20]" />
          <span>Please wait...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 p-12 text-center rounded-2xl">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-900 uppercase">No hardware profiles located</p>
          <p className="text-xs text-gray-500 mt-1">
            Try adjusting your search query, or consult the main store page for alternative systems.
          </p>
          <button
            onClick={() => { setSearchQuery(""); }}
            className="mt-4 bg-gray-950 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#FF7A20] transition"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleProductDetails(p.id)}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] transition-all duration-300 transform flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square bg-gray-50/50 flex items-center justify-center p-2 overflow-hidden border-b border-gray-100">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.ibb.co/5WPKmPXS/Avigilon-Generic-500x500-1.png";
                      }}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {p.sku}
                      </span>
                      <span className="text-[10px] font-semibold text-[#FF7A20] bg-orange-50 px-1.5 py-0.5 rounded">
                        {p.brand}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#FF7A20] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-sans">
                      {p.description}
                    </p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50/40 flex justify-between items-center">
                  {p.priceUSD === 0 || p.isQuoteOnly || p.category === "Industrial Solar Panels" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onRequestQuote) {
                          onRequestQuote(p);
                        } else {
                          setCurrentView("request-quote");
                        }
                      }}
                      className="w-full bg-[#FF7A20] hover:bg-[#e06512] text-white font-bold text-xs py-2.5 px-3 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request For Quote</span>
                    </button>
                  ) : (
                    <>
                      <span className="font-extrabold text-[#FF7A20] text-sm sm:text-base">
                        {currency === "USD" ? `$${p.priceUSD.toLocaleString()}` : `₦${p.priceNGN.toLocaleString()}`}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p);
                        }}
                        className="bg-[#FF7A20] hover:bg-orange-600 text-white p-2 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
                        title="Add to Quote Cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
                  currentPage === 1
                    ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                }`}
              >
                Previous Page
              </button>
              <span className="text-xs font-semibold text-gray-500 font-mono">
                Page <span className="font-bold text-gray-950">{currentPage}</span> of <span className="font-bold text-gray-950">{totalPages}</span>
              </span>
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
                  currentPage === totalPages
                    ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                }`}
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
