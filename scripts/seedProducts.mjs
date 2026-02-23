/**
 * seedProducts.mjs
 * Run with: node scripts/seedProducts.mjs
 *
 * Each component filters on SPECIFIC category & section strings:
 *
 *  FeaturedProducts / TopCategories : category === "Featured Products"
 *  LatestProducts                   : category === "Leatest Products"
 *                                     section  === "New Arrival" | "Best Seller" | "Featured" | "Special Offer"
 *  TrendingProducts (cantilever row): category === "Trending Products", section === "cantilever"
 *  TrendingProducts (executive col) : category === "Trending Products", section === "executive"
 *  DiscountItems                    : category === "Discount Item"
 *                                     section  === "Wood Chair" | "Plastic Chair" | "Sofa Collection"
 *  UniqueFurniture                  : id       === "09346776"  (special hero product)
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// ── resolve .env.local ──────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

if (!existsSync(envPath)) {
    console.error("❌  .env.local not found at project root.");
    process.exit(1);
}

const envContent = readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
    envContent
        .split("\n")
        .filter((l) => l.trim() && !l.startsWith("#"))
        .map((l) => {
            const [key, ...rest] = l.split("=");
            return [key.trim(), rest.join("=").trim()];
        })
);

const firebaseConfig = {
    apiKey: env.VITE_API_KEY,
    authDomain: env.VITE_AUTH_DOMAIN,
    databaseURL: env.VITE_DATABASE_URL,
    projectId: env.VITE_PROJECT_ID,
    storageBucket: env.VITE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
    appId: env.VITE_APP_ID,
    measurementId: env.VITE_MEASUREMENT_ID,
};

if (!firebaseConfig.databaseURL) {
    console.error("❌  VITE_DATABASE_URL is missing in .env.local");
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ── Product catalogue ───────────────────────────────────────────────────────
const products = [

    // ════════════════════════════════════════════════════════════════════════
    //  FEATURED PRODUCTS  (FeaturedProducts.tsx & TopCategories.tsx)
    //  filter: product.category === "Featured Products"
    // ════════════════════════════════════════════════════════════════════════
    {
        id: "fp-001",
        title: "Luxury Velvet Armchair",
        category: "Featured Products",
        price: "449.99",
        discount: "10",
        colors: [
            { name: "Royal Blue", code: "#4169E1" },
            { name: "Dusty Rose", code: "#C9A0A0" },
            { name: "Forest Green", code: "#2D6A4F" },
        ],
        imagesByColor: {
            "Royal Blue": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
            "Dusty Rose": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
            "Forest Green": ["https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=800", "https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        ],
        specifications: [
            "Upholstery: Premium velvet",
            "Frame: Solid beech wood",
            "Dimensions: 85cm W × 80cm D × 95cm H",
            "Max load: 150 kg",
            "Assembly: Required",
            "Colour-fast: Yes",
        ],
        comments: [],
    },
    {
        id: "fp-002",
        title: "Scandinavian Lounge Chair",
        category: "Featured Products",
        price: "379.00",
        colors: [
            { name: "Charcoal", code: "#36454F" },
            { name: "Ivory", code: "#FFFFF0" },
        ],
        imagesByColor: {
            Charcoal: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400"],
            Ivory: ["https://images.unsplash.com/photo-1616627988141-7d28e5a671ce?w=800", "https://images.unsplash.com/photo-1616627988141-7d28e5a671ce?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
            "https://images.unsplash.com/photo-1616627988141-7d28e5a671ce?w=800",
        ],
        specifications: [
            "Style: Mid-century modern",
            "Material: Solid oak + wool blend",
            "Dimensions: 78cm W × 82cm D × 90cm H",
            "Cushion: Removable & washable",
            "Weight: 18 kg",
            "Origin: Nordic design",
        ],
        comments: [],
    },
    {
        id: "fp-003",
        title: "Marble Top Coffee Table",
        category: "Featured Products",
        price: "529.00",
        discount: "15",
        colors: [
            { name: "White Marble", code: "#F5F5F5" },
            { name: "Black Marble", code: "#1C1C1C" },
        ],
        imagesByColor: {
            "White Marble": ["https://images.unsplash.com/photo-1549497538-303791108f95?w=800", "https://images.unsplash.com/photo-1549497538-303791108f95?w=400"],
            "Black Marble": ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800", "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1549497538-303791108f95?w=800",
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
        ],
        specifications: [
            "Top: Genuine marble with honed finish",
            "Base: Brushed brass-plated steel",
            "Dimensions: 110cm L × 60cm W × 45cm H",
            "Weight: 28 kg",
            "Assembly: No tools needed",
            "Marble variation: Natural, unique per piece",
        ],
        comments: [],
    },
    {
        id: "fp-004",
        title: "Modular Bookshelf Unit",
        category: "Featured Products",
        price: "299.00",
        colors: [
            { name: "Walnut", code: "#5C3A1E" },
            { name: "Natural Oak", code: "#C8A96E" },
            { name: "Matte White", code: "#FAFAFA" },
        ],
        imagesByColor: {
            Walnut: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800", "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400"],
            "Natural Oak": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
            "Matte White": ["https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=800", "https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800",
        ],
        specifications: [
            "Material: FSC-certified engineered wood",
            "Units: 4 stackable modules",
            "Dimensions per unit: 40cm W × 30cm D × 80cm H",
            "Max load per shelf: 25 kg",
            "Wall fixings: Included",
            "Assembly: Required",
        ],
        comments: [],
    },

    // ════════════════════════════════════════════════════════════════════════
    //  LATEST PRODUCTS  (LatestProducts.tsx)
    //  filter: category === "Leatest Products" && section === <tab>
    //  tabs: "New Arrival" | "Best Seller" | "Featured" | "Special Offer"
    // ════════════════════════════════════════════════════════════════════════
    {
        id: "lp-001",
        title: "Ergonomic Mesh Office Chair",
        category: "Leatest Products",
        section: "New Arrival",
        price: "349.99",
        discount: "12",
        colors: [
            { name: "Midnight Black", code: "#1C1C1C" },
            { name: "Steel Grey", code: "#71797E" },
        ],
        imagesByColor: {
            "Midnight Black": ["https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=800", "https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=400"],
            "Steel Grey": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=800"],
        specifications: [
            "Back: Breathable mesh with lumbar support",
            "Seat: High-density foam, height adjustable",
            "Armrests: 4D adjustable",
            "Recline: 135° tilt lock",
            "Base: Aluminium 5-star with PU casters",
            "Max load: 135 kg",
        ],
        comments: [],
    },
    {
        id: "lp-002",
        title: "Floating Walnut TV Unit",
        category: "Leatest Products",
        section: "New Arrival",
        price: "419.00",
        colors: [
            { name: "Walnut", code: "#5C3A1E" },
        ],
        imagesByColor: {
            Walnut: ["https://images.unsplash.com/photo-1615873968403-89e068629265?w=800", "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1615873968403-89e068629265?w=800"],
        specifications: [
            "Material: Solid walnut veneer",
            "Width: 180 cm",
            "TV size support: Up to 75\"",
            "Doors: Soft-close push-to-open",
            "Cable management: Built-in",
            "Installation: Wall-mounted",
        ],
        comments: [],
    },
    {
        id: "lp-003",
        title: "Velvet Upholstered Bed Frame",
        category: "Leatest Products",
        section: "Best Seller",
        price: "689.00",
        discount: "8",
        colors: [
            { name: "Forest Green", code: "#2D6A4F" },
            { name: "Navy Blue", code: "#000080" },
            { name: "Blush Pink", code: "#FFB6C1" },
        ],
        imagesByColor: {
            "Forest Green": ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400"],
            "Navy Blue": ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800", "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400"],
            "Blush Pink": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
            "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        ],
        specifications: [
            "Headboard: Channel-tufted velvet",
            "Size: King (180 × 200 cm)",
            "Frame: Solid pine slat base",
            "Height: 120cm headboard",
            "Mattress: Not included",
            "Assembly: Required",
        ],
        comments: [],
    },
    {
        id: "lp-004",
        title: "Glass-Door Display Cabinet",
        category: "Leatest Products",
        section: "Best Seller",
        price: "599.00",
        colors: [
            { name: "Antique White", code: "#FAEBD7" },
            { name: "Graphite Grey", code: "#4B4B4B" },
        ],
        imagesByColor: {
            "Antique White": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
            "Graphite Grey": ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800", "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800"],
        specifications: [
            "Glass: Tempered with satin chrome hinges",
            "Interior lighting: LED strip (dimmable)",
            "Shelves: 4 adjustable glass shelves",
            "Dimensions: 100cm W × 42cm D × 190cm H",
            "Weight capacity: 15 kg per shelf",
            "Assembly: Required",
        ],
        comments: [],
    },
    {
        id: "lp-005",
        title: "Rattan Hanging Chair",
        category: "Leatest Products",
        section: "Featured",
        price: "259.00",
        colors: [
            { name: "Natural Rattan", code: "#C8956C" },
        ],
        imagesByColor: {
            "Natural Rattan": ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800", "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800"],
        specifications: [
            "Material: Handwoven natural rattan",
            "Diameter: 100 cm",
            "Max load: 120 kg",
            "Ceiling hook: Grade-8 steel (included)",
            "Cushion: Outdoor-grade, washable",
            "Use: Indoor / sheltered outdoor",
        ],
        comments: [],
    },
    {
        id: "lp-006",
        title: "Industrial Pipe Shelving Unit",
        category: "Leatest Products",
        section: "Special Offer",
        price: "189.00",
        discount: "20",
        colors: [
            { name: "Rustic Black", code: "#2C2C2C" },
        ],
        imagesByColor: {
            "Rustic Black": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
        specifications: [
            "Pipes: Powder-coated iron",
            "Shelves: 3 × reclaimed pine boards",
            "Dimensions: 120cm W × 30cm D × 130cm H",
            "Wall fixings: All hardware included",
            "Max load: 20 kg per shelf",
            "Style: Industrial / loft",
        ],
        comments: [],
    },

    // ════════════════════════════════════════════════════════════════════════
    //  TRENDING PRODUCTS – Cantilever row  (4 cards)
    //  filter: category === "Trending Products" && section === "cantilever"
    // ════════════════════════════════════════════════════════════════════════
    {
        id: "tp-c01",
        title: "Cantilever Dining Chair",
        category: "Trending Products",
        section: "cantilever",
        price: "139.00",
        colors: [
            { name: "Chrome Red", code: "#CC2200" },
            { name: "Chrome Black", code: "#1C1C1C" },
        ],
        imagesByColor: {
            "Chrome Red": ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800", "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"],
            "Chrome Black": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800"],
        specifications: [
            "Frame: Tubular chrome-plated steel",
            "Seat & back: Moulded PU foam",
            "Style: Bauhaus cantilever",
            "Max load: 110 kg",
            "Weight: 6 kg",
            "Use: Dining / office",
        ],
        comments: [],
    },
    {
        id: "tp-c02",
        title: "Wicker Open-Back Chair",
        category: "Trending Products",
        section: "cantilever",
        price: "119.00",
        colors: [
            { name: "Natural", code: "#C8956C" },
            { name: "Whitewash", code: "#F5F0EB" },
        ],
        imagesByColor: {
            Natural: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800", "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400"],
            Whitewash: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800"],
        specifications: [
            "Material: Hand-woven wicker on steel frame",
            "Seat cushion: Cotton, removable",
            "Dimensions: 60cm W × 55cm D × 88cm H",
            "Weight: 4.5 kg",
            "Indoor use only",
            "Easy clean: Damp cloth",
        ],
        comments: [],
    },
    {
        id: "tp-c03",
        title: "Minimalist Plywood Side Chair",
        category: "Trending Products",
        section: "cantilever",
        price: "99.00",
        discount: "5",
        colors: [
            { name: "Natural Birch", code: "#E8C99A" },
        ],
        imagesByColor: {
            "Natural Birch": ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"],
        specifications: [
            "Material: Moulded birch plywood",
            "Legs: Solid beech, natural finish",
            "Seat height: 46 cm",
            "Stackable: Yes (up to 6)",
            "Max load: 100 kg",
            "Certifications: FSC certified",
        ],
        comments: [],
    },
    {
        id: "tp-c04",
        title: "Velvet Accent Chair",
        category: "Trending Products",
        section: "cantilever",
        price: "229.00",
        colors: [
            { name: "Sage Green", code: "#77A77D" },
            { name: "Mustard", code: "#FFDB58" },
            { name: "Blush", code: "#FFB6C1" },
        ],
        imagesByColor: {
            "Sage Green": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
            Mustard: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
            Blush: ["https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=800", "https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"],
        specifications: [
            "Upholstery: Micro-velvet",
            "Frame: Solid rubberwood",
            "Legs: Tapered solid brass",
            "Dimensions: 74cm W × 76cm D × 84cm H",
            "Max load: 120 kg",
            "Style: Contemporary",
        ],
        comments: [],
    },

    // ════════════════════════════════════════════════════════════════════════
    //  TRENDING PRODUCTS – Executive column  (2 cards)
    //  filter: category === "Trending Products" && section === "executive"
    // ════════════════════════════════════════════════════════════════════════
    {
        id: "tp-e01",
        title: "Executive High-Back Chair",
        category: "Trending Products",
        section: "executive",
        price: "499.00",
        discount: "18",
        colors: [
            { name: "Black Leather", code: "#1C1C1C" },
            { name: "Brown Leather", code: "#7B3F00" },
        ],
        imagesByColor: {
            "Black Leather": ["https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=800", "https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=400"],
            "Brown Leather": ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800", "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=800"],
        specifications: [
            "Upholstery: Bonded leather",
            "High-back with headrest support",
            "Recline: 90°–135° with tilt lock",
            "Armrests: Padded flip-up",
            "Base: Chrome 5-star with PU casters",
            "Max load: 150 kg",
        ],
        comments: [],
    },
    {
        id: "tp-e02",
        title: "Mid-Back Task Chair",
        category: "Trending Products",
        section: "executive",
        price: "319.00",
        colors: [
            { name: "Slate Grey", code: "#708090" },
            { name: "Navy Blue", code: "#000080" },
        ],
        imagesByColor: {
            "Slate Grey": ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800", "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400"],
            "Navy Blue": ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800", "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400"],
        },
        images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800"],
        specifications: [
            "Back: Mesh with tension adjustment",
            "Seat depth: Adjustable",
            "Armrests: Height & width adjustable",
            "Recline: Synchro tilt mechanism",
            "Max load: 120 kg",
            "BIFMA certified",
        ],
        comments: [],
    },

    // ════════════════════════════════════════════════════════════════════════
    //  DISCOUNT ITEMS  (DiscountItems.tsx)
    //  filter: category === "Discount Item"
    //  sections: "Wood Chair" | "Plastic Chair" | "Sofa Collection"
    // ════════════════════════════════════════════════════════════════════════
    {
        id: "di-001",
        title: "Windsor Solid Oak Dining Chair",
        category: "Discount Item",
        section: "Wood Chair",
        price: "189.00",
        discount: "20",
        colors: [
            { name: "Natural Oak", code: "#C8A96E" },
            { name: "Ebony", code: "#3D1C02" },
        ],
        imagesByColor: {
            "Natural Oak": ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800", "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"],
            Ebony: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600",
        ],
        specifications: [
            "Material: Solid FSC-certified oak",
            "Finish: Hand-rubbed natural oil",
            "Seat height: 45 cm",
            "Max load: 130 kg",
            "Joinery: Traditional mortise & tenon",
            "Made in: Portugal",
        ],
        comments: [],
    },
    {
        id: "di-002",
        title: "Transparent Ghost Plastic Chair",
        category: "Discount Item",
        section: "Plastic Chair",
        price: "89.00",
        discount: "25",
        colors: [
            { name: "Crystal Clear", code: "#E8F4F8" },
            { name: "Smoke", code: "#666666" },
        ],
        imagesByColor: {
            "Crystal Clear": ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800", "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400"],
            Smoke: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
        ],
        specifications: [
            "Material: Injection-moulded polycarbonate",
            "UV stable: Yes",
            "Stackable: Up to 8 chairs",
            "Max load: 150 kg",
            "Indoor & outdoor use",
            "Easy clean: Wipe down",
        ],
        comments: [],
    },
    {
        id: "di-003",
        title: "3-Seater Chesterfield Sofa",
        category: "Discount Item",
        section: "Sofa Collection",
        price: "1149.00",
        discount: "30",
        colors: [
            { name: "Cognac Leather", code: "#9A4722" },
            { name: "Oxford Green", code: "#1A4731" },
        ],
        imagesByColor: {
            "Cognac Leather": ["https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=800", "https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=400"],
            "Oxford Green": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        },
        images: [
            "https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=800",
            "https://images.unsplash.com/photo-1493663284031-b7e3aaa4bfc0?w=600",
        ],
        specifications: [
            "Upholstery: Top-grain aniline leather",
            "Button-tufted back & rolled arms",
            "Frame: Kiln-dried hardwood",
            "Dimensions: 210cm L × 90cm D × 80cm H",
            "Seats: 3 persons",
            "Feet: Turned dark walnut",
        ],
        comments: [],
    },

    // ════════════════════════════════════════════════════════════════════════
    //  UNIQUE FURNITURE  (UniqueFurniture.tsx)
    //  Hardcoded: id === "09346776"   — must have colors + imagesByColor
    // ════════════════════════════════════════════════════════════════════════
    {
        id: "09346776",
        title: "Artisan Carved Accent Chair",
        category: "Unique Furniture",
        section: "hero",
        price: "749.00",
        discount: "10",
        colors: [
            { name: "Sangria Velvet", code: "#92000A" },
            { name: "Teal Velvet", code: "#008080" },
        ],
        imagesByColor: {
            "Sangria Velvet": [
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
            ],
            "Teal Velvet": [
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
            ],
        },
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
        ],
        specifications: [
            "Hand-carved mahogany frame with gold leaf detailing",
            "Plush velvet upholstery with diamond-tufted back",
            "Dimensions: 72cm W × 78cm D × 98cm H",
            "Max load: 120 kg",
            "Handmade — slight variations are part of its charm",
            "Limited edition — only 50 pieces worldwide",
        ],
        comments: [],
    },
];

// ── Upload to Firebase Realtime Database ────────────────────────────────────
async function seed() {
    console.log(`\n🚀  Seeding ${products.length} products to Firebase Realtime DB...\n`);

    for (const product of products) {
        const productRef = ref(db, `product/${product.id}`);
        await set(productRef, product);
        console.log(`  ✅  [${product.id}]  "${product.title}"  (${product.category} / ${product.section ?? "—"})`);
    }

    console.log(`\n🎉  Done! All ${products.length} products written to path: product/\n`);
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌  Seed failed:", err);
    process.exit(1);
});
