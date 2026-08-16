/**
 * Utility functions for inferring Product metadata (Brand, ProductType, PriceNGN)
 * during CSV/Excel bulk product uploads when only basic columns are provided.
 */

export const KNOWN_BRANDS = [
  "Hikvision",
  "Dahua",
  "FHF",
  "Eaton",
  "Honeywell",
  "Axis",
  "Bosch",
  "Cisco",
  "Pelco",
  "FLIR",
  "Bartec",
  "Stahl",
  "R. Stahl",
  "Cooper",
  "Sonitrol",
  "Raytec",
  "Spectrex",
  "Medc",
  "Gitiesse",
  "Armasuite",
  "Tyco",
  "Siemens",
  "Schneider Electric",
  "Schneider",
  "Panduit",
  "Uniden",
  "Icom",
  "Motorola",
  "Kenwood",
  "Ubiquiti",
  "MikroTik",
  "APC",
  "Legrand",
  "Avigilon",
  "Hanwha",
  "Uniview",
  "Grandstream",
  "Yealink",
  "Fanvil",
  "ZKTeco",
  "Suprema",
  "Anviz",
  "HID",
  "Rosslare",
  "CDVI",
  "Paxton",
  "Comelit",
  "Aiphone",
  "Fermax",
  "Bticino",
  "Kantech",
  "DSC",
  "Paradox",
  "Ajax",
  "Pyronix",
  "Texecom",
  "Optex",
  "Vanderbilt",
  "Finder",
  "Socomec",
  "ABB",
  "Phoenix Contact",
  "Wago",
  "Weidmuller",
  "SpinelShield",
  "Spinel Hardware",
  "Spinel"
];

/**
 * Automatically infers the Brand from product Name, Description, SKU, Category, or Subcategory.
 */
export function inferBrand(
  name?: string,
  description?: string,
  sku?: string,
  category?: string,
  subcategory?: string
): string {
  const combinedText = `${name || ""} ${description || ""} ${sku || ""} ${category || ""} ${subcategory || ""}`.trim();
  if (!combinedText) return "Spinel Hardware";

  // 1. Check direct matches against known brand list
  for (const brand of KNOWN_BRANDS) {
    const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(combinedText)) {
      if (brand === "Spinel" || brand === "SpinelShield") {
        return "Spinel Hardware";
      }
      return brand;
    }
  }

  // 2. Check if product name starts with a distinctive manufacturer word (e.g. "FHF-200", "CISCO-3850")
  if (name) {
    const firstWord = name.trim().split(/[\s-_]+/)[0];
    if (firstWord && firstWord.length >= 3 && firstWord.length <= 15 && /^[A-Z0-9]+$/i.test(firstWord)) {
      // If all uppercase or capitalized acronym
      if (firstWord === firstWord.toUpperCase() && !["THE", "ALL", "NEW", "PRO", "MAX", "HOT"].includes(firstWord)) {
        return firstWord;
      }
    }
  }

  // 3. Fallback default
  return "Spinel Hardware";
}

/**
 * Automatically infers the ProductType category:
 * ("Hazardous Area" | "Industrial" | "Commercial" | "Enterprise")
 */
export function inferProductType(
  category?: string,
  subcategory?: string,
  name?: string,
  description?: string,
  sku?: string
): "Enterprise" | "Hazardous Area" | "Industrial" | "Commercial" {
  const text = `${category || ""} ${subcategory || ""} ${name || ""} ${description || ""} ${sku || ""}`.toLowerCase();

  // 1. Hazardous Area Check
  const hazardousKeywords = [
    "hazardous",
    "atex",
    "ex-",
    "ex proof",
    "ex-proof",
    "explosion",
    "explosion-proof",
    "explosionproof",
    "flameproof",
    "flame-proof",
    "intrinsically safe",
    "zone 1",
    "zone 2",
    "zone 21",
    "zone 22",
    "class 1 div 1",
    "class 1 div 2",
    "iecex",
    "iec-ex",
    "paga",
    "ex-cctv"
  ];
  for (const kw of hazardousKeywords) {
    if (text.includes(kw)) {
      return "Hazardous Area";
    }
  }

  // 2. Industrial Check
  const industrialKeywords = [
    "industrial",
    "factory",
    "plant",
    "substation",
    "marine",
    "offshore",
    "oil & gas",
    "oil and gas",
    "refinery",
    "mining",
    "heavy duty",
    "armored",
    "armoured",
    "scada",
    "plc",
    "ip66",
    "ip67",
    "ip68",
    "rugged",
    "hardened",
    "outdoor rated"
  ];
  for (const kw of industrialKeywords) {
    if (text.includes(kw)) {
      return "Industrial";
    }
  }

  // 3. Commercial Check
  const commercialKeywords = [
    "commercial",
    "retail",
    "residential",
    "home",
    "office",
    "small business",
    "smb",
    "desktop",
    "soho",
    "indoor"
  ];
  for (const kw of commercialKeywords) {
    if (text.includes(kw)) {
      return "Commercial";
    }
  }

  // 4. Default to Enterprise
  return "Enterprise";
}

/**
 * Automatically converts USD price to NGN using the platform standard rate (₦1,500 / $1).
 */
export function convertUsdToNgn(priceUSD: number | string, customRate: number = 1500): number {
  const parsed = Number(priceUSD) || 0;
  if (parsed <= 0) return 0;
  return Math.round(parsed * customRate);
}

/**
 * Parses IsQuoteOnly flag from various truthy/falsy formats or missing values.
 */
export function parseIsQuoteOnly(
  isQuoteRaw: any,
  priceUSD: number,
  priceNGN?: number
): boolean {
  if (isQuoteRaw !== undefined && isQuoteRaw !== null && isQuoteRaw !== "") {
    const valStr = String(isQuoteRaw).trim().toLowerCase();
    if (["true", "yes", "1", "quote", "y"].includes(valStr)) {
      return true;
    }
    if (["false", "no", "0", "priced", "n"].includes(valStr)) {
      return false;
    }
    return Boolean(isQuoteRaw);
  }
  // If price is 0, default to quote-only
  if (Number(priceUSD) === 0 && (!priceNGN || Number(priceNGN) === 0)) {
    return true;
  }
  return false;
}
