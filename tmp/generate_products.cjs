const fs = require('fs');
const path = require('path');

const chunkFiles = [
  './tmp/p1.csv',
  './tmp/p2.csv',
  './tmp/p3.csv',
  './tmp/p4.csv',
  './tmp/p5.csv',
  './tmp/p6.csv'
];

let allProducts = [];

for (const file of chunkFiles) {
  if (!fs.existsSync(file)) {
    console.error(`File ${file} does not exist!`);
    process.exit(1);
  }
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Split safely on comma
    const fields = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim());

    if (fields.length < 7) {
      console.warn(`Line skip due to fields count ${fields.length}: ${line}`);
      continue;
    }

    const sku = fields[0];
    const name = fields[1];
    const category = fields[2];
    const description = fields[3];
    const priceUSD = parseFloat(fields[4]) || 0;
    const stock = parseInt(fields[5]) || 0;
    const image = fields[6];

    // Derive elegant brands
    let brand = "Accessories";
    const nameLower = name.toLowerCase();
    const skuUpper = sku.toUpperCase();

    if (nameLower.includes("mercury") || skuUpper.includes("AC-MER-")) {
      brand = "Mercury";
    } else if (nameLower.includes("schlage") || nameLower.includes("allegion") || skuUpper.includes("AC-SCH-") || skuUpper.includes("AC-ALL-")) {
      brand = "Schlage";
    } else if (nameLower.includes("farpointe") || skuUpper.includes("AC-FP-")) {
      brand = "Farpointe";
    } else if (nameLower.includes("hid") || skuUpper.includes("AC-HID-")) {
      brand = "HID";
    } else if (nameLower.includes("stid") || skuUpper.includes("AC-STID-")) {
      brand = "STid";
    } else if (nameLower.includes("lifesafety") || skuUpper.includes("AC-LSP-")) {
      brand = "LifeSafety Power";
    } else if (nameLower.includes("altronix") || skuUpper.includes("AC-ALX-")) {
      brand = "Altronix";
    } else if (skuUpper.startsWith("UA-")) {
      brand = "UA7";
    } else if (skuUpper.startsWith("HD-")) {
      brand = "HD Security";
    } else if (nameLower.includes("salto") || skuUpper.includes("AC-SALTO-")) {
      brand = "SALTO";
    } else if (nameLower.includes("rolec")) {
      brand = "Rolec";
    }

    allProducts.push({
      sku,
      name,
      brand,
      priceUSD,
      stock,
      image,
      description
    });
  }
}

console.log(`Parsed total of ${allProducts.length} products successfully.`);

// Let's generate the contents for src/data/productsData.ts
const tsLines = [];
tsLines.push(`import { Product } from "../types";`);
tsLines.push(``);
tsLines.push(`const RAW_ACCESSORIES_DATA: [string, string, string, number, number, string, string][] = [`);

for (const p of allProducts) {
  const safeSku = JSON.stringify(p.sku);
  const safeName = JSON.stringify(p.name);
  const safeBrand = JSON.stringify(p.brand);
  const safePrice = p.priceUSD;
  const safeStock = p.stock;
  const safeImage = JSON.stringify(p.image);
  const safeDesc = JSON.stringify(p.description);

  tsLines.push(`  [${safeSku}, ${safeName}, ${safeBrand}, ${safePrice}, ${safeStock}, ${safeImage}, ${safeDesc}],`);
}

tsLines.push(`];`);
tsLines.push(``);
tsLines.push(`export const ACCESSORIES_PRODUCTS: Product[] = RAW_ACCESSORIES_DATA.map((row, index) => {`);
tsLines.push(`  const [sku, name, brand, priceUSD, stock, image, description] = row;`);
tsLines.push(`  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");`);
tsLines.push(`  return {`);
tsLines.push(`    id: \`sp-prod-\${index + 1}\`,`);
tsLines.push(`    sku,`);
tsLines.push(`    name,`);
tsLines.push(`    slug,`);
tsLines.push(`    brand,`);
tsLines.push(`    category: "Electrical Systems",`);
tsLines.push(`    subcategory: "Accessories",`);
tsLines.push(`    priceUSD,`);
tsLines.push(`    priceNGN: priceUSD * 1500,`);
tsLines.push(`    description,`);
tsLines.push(`    images: [image],`);
tsLines.push(`    specifications: [`);
tsLines.push(`      { label: "SKU", value: sku },`);
tsLines.push(`      { label: "Brand", value: brand },`);
tsLines.push(`      { label: "Category", value: "Accessories" }`);
tsLines.push(`    ],`);
tsLines.push(`    stock,`);
tsLines.push(`    oem: brand,`);
tsLines.push(`    productType: "Enterprise",`);
tsLines.push(`    featured: index < 6,`);
tsLines.push(`    popular: index % 4 === 0,`);
tsLines.push(`    downloads: [`);
tsLines.push(`      { title: \`\${name} Technical Datasheet\`, type: "Data Sheet", url: "#" }`);
tsLines.push(`    ],`);
tsLines.push(`    reviews: []`);
tsLines.push(`  };`);
tsLines.push(`});`);
tsLines.push(``);

fs.writeFileSync('./src/data/productsData.ts', tsLines.join('\n'), 'utf8');
console.log('Successfully generated ./src/data/productsData.ts');
