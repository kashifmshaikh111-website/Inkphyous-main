// ---------- PRODUCT IMAGES (Main) ----------
import Product1v1 from '../assets/JR1_Black.png';
import Product2v1 from '../assets/JE1_Green.png';
import Product3v1 from '../assets/JB1_White.png';
import Product4v1 from '../assets/JH1_White.png';
import Product5v1 from '../assets/RT1_White.png';

// ---------- VARIANT IMAGES (New) ----------
import JR1_Black from '../assets/JR1_Black.png';
import JR1_Pink from '../assets/JR1_Pink.png';
import JR1_Grey from '../assets/JR1_Grey.png';

import JE1_Green from '../assets/JE1_Green.png';
import JE1_White from '../assets/JE1_White.png';
import JE1_Blue from '../assets/JE1_Blue.png';

import JB1_White from '../assets/JB1_White.png';
import JB1_Black from '../assets/JB1_Black.png';

import JH1_White from '../assets/JH1_White.png';
import JH1_Black from '../assets/JH1_Black.png';

import RT1_White from '../assets/RT1_White.png';
import RT1_Black from '../assets/RT1_Black.png';

// 🛑 Hardcoded Size Chart Structure
const universalSizeChart = {
  title: 'Jersey "Reptile"',
  header: ['Size', 'S', 'M', 'L', 'XL'],
  measurements: {
    Chest: ['19.5"', '20.5"', '21.5"', '22.5"'],
    Sholder: ['18"', '19"', '20"', '21"'],
    Length: ['28"', '29"', '30"', '31"'],
  },
};

// 🛑 Hardcoded Shipping Policy
const universalShippingPolicy = [
  "Standard processing time for orders is up to 24 hours, with delivery typically completed within 3–5 business days after dispatch.",
  "Read our full Shipping Policy for more details",
];

const products = [
  {
    id: 1,
    name: "Jersey Reptile",
    brand: "Inkphyous",
    image: Product1v1,
    category: "Jerseys",
    tags: ["unisex", "sports", "streetwear", "oversized"],
    priceINR: 2499,
    discountPriceINR: 1999,
    inStock: true,
    quantity: 45,
    sku: "JSY-2025-RPT",

    summary: "Oversized unisex jersey with 00 Reptile prints and signature embroidery.",

    description:
      "The Jersey “Reptile” is crafted from 100% dry-fit polyester jersey, offering a smooth, structured hand feel. Designed in an oversized unisex silhouette with a ribbed neckline, it features Reptile “(Concept name)” graphics on the front and back, complemented by logo embroidery on sleeves and Concept embroidery at the front and “Feed Your Soul” embroidery at the back. 00 embroidered patches on both sleeves, Inkphyous screenprint at the back, and signature Inkphyous rubberized labels & side tag complete the elevated design.",

    details: {
      fabric: "100% Polyester - Dry Fit",
      washCare: "Machine wash cold, air dry",
      fit: "Oversized Fit",
      features:
        "Screenprinted back, Graphics and embroidery front/back, Patches on sleeves, Ribbed neckline",
    },

    sizeOptions: ["S", "M", "L", "XL"],
    color: "Black",
    availableColors: ["Black", "Pink", "Grey"],
    hasVariants: true,

    variants: [
      {
        id: "JSY-2025-RPT-BLK-M",
        name: "Jersey Lizard",
        color: "Black",
        size: "M",
        priceINR: 1999,
        inStock: true,
        image: JR1_Black
      },
      {
        id: "JSY-2025-RPT-PNK-L",
        name: "Jersey Snake",
        color: "Pink",
        size: "L",
        priceINR: 1999,
        inStock: true,
        image: JR1_Pink
      },
      {
        id: "JSY-2025-RPT-GRY-XL",
        name: "Jersey Frog",
        color: "Grey",
        size: "XL",
        priceINR: 1999,
        inStock: true,
        image: JR1_Grey
      },
    ],

    rating: 4.5,
    reviews: 88,
    createdAt: "2025-06-01",
    shippingPolicy: universalShippingPolicy,
    sizeChart: universalSizeChart,
  },

  {
    id: 2,
    name: "Jersey Elements",
    brand: "Inkphyous",
    image: Product2v1,
    category: "Jerseys",
    priceINR: 2399,
    discountPriceINR: 1899,
    inStock: true,
    quantity: 40,
    sku: "JSY-2025-ELE-PRT",

    summary: "Oversized unisex jersey with 00 Element prints and signature embroidery.",

    description:
      "The Jersey “Elements” is crafted from 100% dry-fit polyester jersey, offering a smooth, refined hand feel. Designed in an oversized unisex silhouette with a ribbed neckline, it features Elements “(Concept name)” graphics and “Inkphyous” screenprint on the front and back, complemented by lining screenprint on both sleeves and logo embroidery at back & Concept embroidery at the front. 00 embroidered patches on both shoulders, along with Inkphyous rubberized labels & side tag, complete the elevated, statement-making design.",

    details: {
      fabric: "100% Polyester - Dry Fit",
      washCare: "Machine wash cold, air dry",
      fit: "Oversized Fit",
      features: "Screenprinted front/back/sleeves, Lining design on sleeves, Logo embroidery, Patches on shoulders",
    },

    sizeOptions: ["S", "M", "L", "XL"],
    color: "Green",
    availableColors: ["Green", "White", "Blue"],
    hasVariants: true,

    variants: [
      {
        id: "JSY-2025-ELE-GRN-M",
        name: "Jersey Plant",
        color: "Green",
        size: "M",
        priceINR: 1899,
        inStock: true,
        image: JE1_Green
      },
      {
        id: "JSY-2025-ELE-WHT-L",
        name: "Jersey Fire",
        color: "White",
        size: "L",
        priceINR: 1899,
        inStock: true,
        image: JE1_White
      },
      {
        id: "JSY-2025-ELE-BLU-XL",
        name: "Jersey Wave",
        color: "Blue",
        size: "XL",
        priceINR: 1899,
        inStock: false,
        image: JE1_Blue
      },
    ],

    rating: 4.4,
    reviews: 76,
    createdAt: "2025-06-02",
    shippingPolicy: universalShippingPolicy,
    sizeChart: universalSizeChart,
  },

  {
    id: 3,
    name: "Jersey Box Fitted",
    brand: "Inkphyous",
    image: Product3v1,
    category: "Jerseys",
    priceINR: 2299,
    discountPriceINR: 1799,
    inStock: true,
    quantity: 35,
    sku: "JSY-2025-BOX",

    summary: "Boxy unisex mesh jersey with 00 & Inkphyous sublimation prints.",
description:"The Jersey “Boxy Fit Athletic Mesh” is crafted from 100% polyester mesh, offering a lightweight, breathable hand feel with a structured drape. Designed in a boxy oversized unisex silhouette with a ribbed neckline, it features 00 & “Inkphyous” sublimation prints on the back, completed with Inkphyous rubberized labels & side tag for elevated detailing.",
    details: {
      fabric: "100% Polyester - Mesh",
      washCare: "Machine wash cold, air dry",
      fit: "Boxy Oversized Fit",
      features: "Sublimation front/back, Ribbed neckline, Short sleeves",
    },

    sizeOptions: ["S", "M", "L", "XL"],
    color: "White",
    availableColors: ["White", "Black"],
    hasVariants: true,

    variants: [
      {
        id: "JSY-2025-BOX-WHT-M",
        name: "Jersey Boxy Mesh White",
        color: "White",
        size: "M",
        priceINR: 1799,
        inStock: true,
        image: JB1_White
      },
      {
        id: "JSY-2025-BOX-BLK-L",
        name: "Jersey Boxy Mesh Black",
        color: "Black",
        size: "L",
        priceINR: 1799,
        inStock: true,
        image: JB1_Black
      },
    ],

    rating: 4.6,
    reviews: 70,
    createdAt: "2025-06-03",
    shippingPolicy: universalShippingPolicy,
    sizeChart: universalSizeChart,
  },

  {
    id: 4,
    name: "Polyester Jhorts",
    brand: "Inkphyous",
    image: Product4v1,
    category: "Jhorts",
    priceINR: 1899,
    discountPriceINR: 1499,
    inStock: true,
    quantity: 50,
    sku: "JRT-2025-DIA",

    summary: "Oversized unisex jorts with front screenprints and woven waist belt.",
description:"The Jorts “Relax Fit” are crafted from 100% polyester with a smooth, structured hand feel. Designed in an oversized unisex silhouette with a woven elastic waist belt and long drawstring, they feature “Inkphyous” & Border screenprints at the front, hit below the knee, and are finished with Inkphyous rubberized labels & side tag for elevated detailing.",
    details: {
      fabric: "100% Polyester - Diagonal Weave",
      washCare: "Machine wash cold, tumble dry low",
      fit: "Oversized Fit",
      features: "Below knee length, Screenprint front, HD print border, Elastic waist belt",
    },

    sizeOptions: ["S", "M", "L", "XL"],
    color: "White",
    availableColors: ["White", "Black"],
    hasVariants: true,

    variants: [
      {
        id: "JRT-2025-DIA-WHT-M",
        name: " Jhorts White ",
        color: "White",
        size: "M",
        priceINR: 1499,
        inStock: true,
        image: JH1_White
      },
      {
        id: "JRT-2025-DIA-BLK-L",
        name: " Jhorts Black ",
        color: "Black",
        size: "L",
        priceINR: 1499,
        inStock: true,
        image: JH1_Black
      },
    ],

    rating: 4.3,
    reviews: 65,
    createdAt: "2025-06-04",
    shippingPolicy: universalShippingPolicy,
    sizeChart: universalSizeChart,
  },

  {
    id: 5,
    name: "Relax Trackpants",
    brand: "Inkphyous",
    image: Product5v1,
    category: "Pants",
    priceINR: 2199,
    discountPriceINR: 1799,
    inStock: true,
    quantity: 60,
    sku: "TRK-2025-RLX",

    summary: "Oversized unisex trackpants with front screenprints and woven waist belt.",
description:"The Trackpants “Relax Fit” are crafted from 100% net and silky-soft polyester, offering a lightweight, smooth hand feel. Designed in an oversized unisex silhouette with a woven elastic waist belt and long drawstring, they feature “Inkphyous” & Border screenprints at the front, a full-length cut, and are completed with Inkphyous rubberized labels & side tag for elevated detailing.",
    details: {
      fabric: "100% Polyester - Net/Silky Soft",
      washCare: "Machine wash cold, air dry",
      fit: "Oversized Fit",
      features: "Full length, Screenprint front, Elastic waist belt",
    },

    sizeOptions: ["S", "M", "L", "XL"],
    color: "White",
    availableColors: ["White", "Black"],
    hasVariants: true,

    variants: [
      {
        id: "TRK-2025-RLX-WHT-M",
        name: "Relax Tracks White ",
        color: "White",
        size: "M",
        priceINR: 1799,
        inStock: true,
        image: RT1_White
      },
      {
        id: "TRK-2025-RLX-BLK-L",
        name: "Relax Tracks Black",
        color: "Black",
        size: "L",
        priceINR: 1799,
        inStock: true,
        image: RT1_Black
      },
    ],

    rating: 4.5,
    reviews: 110,
    createdAt: "2025-06-05",
    shippingPolicy: universalShippingPolicy,
    sizeChart: universalSizeChart,
  },
];

export default products;
