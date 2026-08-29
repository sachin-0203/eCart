import homeImg from "../assets/images/categories/homeImg.jpg";
import decorationImg from "../assets/images/categories/decorationImg.jpg";

import knifeSetImage from "../assets/images/products/home/kitchen-knife-set.jpg";
import curtainsImg from "../assets/images/products/home/blackout-curtain-pair.jpg";
import bedSheetImage from "../assets/images/products/home/cotton-bed-sheet-set.jpg";
import cookwareImage from "../assets/images/products/home/stainless-steel-cookware.jpg";
import pillowCoversImage from "../assets/images/products/home/decorative-pillow-covers.jpg";
import lightingImg from "../assets/images/products/home/lighting.jpg";
import cleaningImg from "../assets/images/products/home/spin-mop-bucket-set.jpg";
import storageImg from "../assets/images/products/home/stainless-steel-spice-jar-set.jpg";
import curtainPrivacy from "../assets/images/products/home/curtain-privacy.jpg";
import cleaningEssential from "../assets/images/products/home/cleaning-essential.jpg";
import storageBox from "../assets/images/products/home/stackable-storage-box.jpg";
import net from "../assets/images/products/home/canopy-mosquito-net.jpg";
import lamp from "../assets/images/products/home/led-table-lamp.jpg";
import spaces from "/brands/spaces.jpg"
import milton from "/brands/milton.png"
import spotzero from "/brands/spotzero.png"
import wonderchef from "/brands/wonderchef.jpg"
import homecentre from "/brands/homecentre.jpg"
import clothfusion from "/brands/clothfusion.jpg"
import philips from "/brands/philips.png"

export const categories = [
  {
    title: "Bedsheets",
    image: bedSheetImage,
    subtitle: "Soft bedroom essentials",
    link: "/shop/products?department=home&category=bedsheets",
  },
  {
    title: "Curtains",
    image: curtainsImg,
    subtitle: "Style and privacy",
    link: "/shop/products?department=home&category=curtains",
  },
  {
    title: "Cookware",
    image: cookwareImage,
    subtitle: "Everyday kitchen essentials",
    link: "/shop/products?department=home&category=cookware",
  },
  {
    title: "Kitchen",
    image: knifeSetImage,
    subtitle: "Smart cooking essentials",
    link: "/shop/products?department=home&category=kitchen",
  },
  {
    title: "Home Decor",
    image: pillowCoversImage,
    subtitle: "Beautiful finishing touches",
    link: "/shop/products?department=home&category=home-decor",
  },
  {
    title: "Lighting",
    image: lightingImg,
    subtitle: "Brighten every space",
    link: "/shop/products?department=home&category=lighting",
  },
  {
    title: "Cleaning",
    image: cleaningImg,
    subtitle: "Easy cleaning essentials",
    link: "/shop/products?department=home&category=cleaning",
  },
  {
    title: "Storage",
    image: storageImg,
    subtitle: "Organise your home",
    link: "/shop/products?department=home&category=storage",
  },
];

export const brandCollections = [
  {
    title: "Bedsheets & Bedroom",
    subtitle: "Comfortable essentials for better bedrooms",
    brands: [
      {
        name: "Spaces",
        image: spaces,
        link: "/shop/products?category=Bedsheets&brand=Spaces&department=Home",
      },
      {
        name: "Cloth Fusion",
        image: clothfusion,
        link: "/shop/products?category=Bedsheets&brand=Cloth%20Fusion&department=Home",
      },
      {
        name: "Home Centre",
        image: homecentre,
        link: "/shop/products?category=Curtains&brand=Home%20Centre&department=Home",
      },
    ],
  },

  {
    title: "Kitchen & Cookware",
    subtitle: "Reliable essentials for everyday cooking",
    brands: [
      {
        name: "Wonderchef",
        image: wonderchef,
        link: "/shop/products?category=Cookware&brand=Wonderchef&department=Home",
      },
      {
        name: "Milton",
        image: milton,
        link: "/shop/products?category=Cookware&brand=Milton&department=Home",
      },
    ],
  },

  {
    title: "Home Decor",
    subtitle: "Small details that transform your space",
    brands: [
      {
        name: "Home Centre",
        image: homecentre,
        link: "/shop/products?category=Home%20Decor&brand=Home%20Centre&department=Home",
      },
    ],
  },

  {
    title: "Lighting",
    subtitle: "Modern lighting for work and relaxation",
    brands: [
      {
        name: "Philips",
        image: philips,
        link: "/shop/products?category=Lighting&brand=Philips&department=Home",
      },
    ],
  },

  {
    title: "Cleaning",
    subtitle: "Simple tools for a cleaner home",
    brands: [
      {
        name: "Spotzero",
        image: spotzero,
        link: "/shop/products?category=Cleaning&brand=Spotzero&department=Home",
      },
    ],
  },

  {
    title: "Storage",
    subtitle: "Keep every room neat and organised",
    brands: [
      {
        name: "Milton",
        image: milton,
        link: "/shop/products?category=Storage&brand=Milton&department=Home",
      },
    ],
  },
];

export const collections = [
  {
    title: "Bedroom Essentials",
    subtitle: "Soft bedsheets, pillows and sleep essentials",
    image: bedSheetImage,
    link: "/shop/products?department=home&category=bedsheets",
  },
  {
    title: "Kitchen Essentials",
    subtitle: "Cookware and tools for everyday cooking",
    image: cookwareImage,
    link: "/shop/products?department=home&category=cookware",
  },
  {
    title: "Home Decor",
    subtitle: "Refresh your rooms with stylish details",
    image: pillowCoversImage,
    link: "/shop/products?department=home&category=home-decor",
  },
  {
    title: "Curtains & Privacy",
    subtitle: "Block light and elevate your interiors",
    image: curtainPrivacy,
    link: "/shop/products?department=home&category=curtains",
  },
  {
    title: "Cleaning Essentials",
    subtitle: "Make everyday cleaning easier",
    image: cleaningEssential,
    link: "/shop/products?department=home&category=cleaning",
  },
  {
    title: "Smart Storage",
    subtitle: "Organise your home with practical solutions",
    image: storageBox,
    link: "/shop/products?department=home&category=storage",
  },
];

export const products = [
  // =====================================================
  // 1. COTTON BEDSHEET
  // =====================================================
  {
    id: 1,
    slug: "cotton-bedsheet-set",
    title: "Cotton Bed Sheet Set",

    department: "home",
    brand: "Spaces",
    category: "Bedsheets",
    subCategory: "Bedsheets",

    price: 1499,
    oldPrice: 2499,
    discountPercentage: 40,

    rating: 4.8,
    reviewsCount: 128,

    featured: true,

    image: bedSheetImage,
    images: [bedSheetImage],

    description:
      "Soft and breathable cotton bed sheet set designed to add comfort and style to your bedroom. The printed fabric is lightweight, durable and suitable for everyday use.",

    details: {
      material: "100% Cotton",
      pattern: "Printed",
      color: "Blue",
      size: "Double",
      threadCount: "144 TC",
      bedsheetType: "Flat",
      pillowCoverCount: "2",
      washCare: "Machine Wash",
      countryOfOrigin: "India",
    },

    highlights: [
      "100% cotton fabric",
      "Soft and breathable",
      "Double bed size",
      "Includes 2 pillow covers",
      "Machine washable",
      "Fade-resistant colours",
    ],

    variants: {
      color: ["Blue", "Grey", "Green"],
      size: ["Single", "Double"],
    },

    reviews: [
      {
        id: 1,
        user: "Rahul",
        rating: 5,
        title: "Excellent quality",
        comment:
          "The fabric is soft and the colour looks exactly like the pictures.",
        date: "2026-07-12",
        verified: true,
      },
      {
        id: 2,
        user: "Priya",
        rating: 4,
        title: "Good bedsheet",
        comment: "Nice quality and comfortable fabric. Worth the price.",
        date: "2026-07-05",
        verified: true,
      },
    ],

    relatedProducts: [
      "decorative-pillow-covers",
      "blackout-curtain-pair",
      "led-table-lamp",
    ],
  },

  // =====================================================
  // 2. BLACKOUT CURTAINS
  // =====================================================
  {
    id: 2,
    slug: "blackout-curtain-pair",
    title: "Blackout Curtain Pair",

    department: "home",
    brand: "Home Centre",
    category: "Curtains",
    subCategory: "Curtains",

    price: 1799,
    oldPrice: 2799,
    discountPercentage: 36,

    rating: 4.7,
    reviewsCount: 96,

    featured: true,

    image: curtainsImg,
    images: [curtainsImg,curtainPrivacy],

    description:
      "Premium blackout curtains designed to block excessive sunlight while providing privacy. Perfect for bedrooms and living rooms.",

    details: {
      material: "Polyester",
      pattern: "Solid",
      color: "Charcoal Grey",
      curtainType: "Blackout",
      size: "7 Feet",
      packOf: "2 Curtains",
      mountingType: "Rod Pocket",
      opacity: "Blackout",
      washCare: "Machine Wash",
      countryOfOrigin: "India",
    },

    highlights: [
      "High-quality blackout fabric",
      "Blocks sunlight",
      "Provides privacy",
      "Easy to install",
      "Machine washable",
      "Suitable for bedroom and living room",
    ],

    variants: {
      color: ["Charcoal Grey", "Beige", "Navy Blue"],
      size: ["5 Feet", "7 Feet", "9 Feet"],
    },

    reviews: [
      {
        id: 1,
        user: "Amit",
        rating: 5,
        title: "Great curtains",
        comment: "They block sunlight really well and look premium.",
        date: "2026-07-18",
        verified: true,
      },
      {
        id: 2,
        user: "Neha",
        rating: 4,
        title: "Good quality",
        comment: "Good material and the curtains are easy to install.",
        date: "2026-07-09",
        verified: true,
      },
    ],

    relatedProducts: [
      "cotton-bedsheet-set",
      "decorative-pillow-covers",
      "led-table-lamp",
    ],
  },

  // =====================================================
  // 3. COOKWARE SET
  // =====================================================
  {
    id: 3,
    slug: "stainless-steel-cookware-set",
    title: "Stainless Steel Cookware Set",

    department: "home",
    brand: "Wonderchef",
    category: "Cookware",
    subCategory: "Cookware",

    price: 3499,
    oldPrice: 4999,
    discountPercentage: 30,

    rating: 4.6,
    reviewsCount: 214,

    featured: true,

    image: cookwareImage,
    images: [cookwareImage],

    description:
      "Durable stainless steel cookware set designed for everyday Indian cooking. The set offers excellent durability, easy cleaning and long-lasting performance.",

    details: {
      material: "Stainless Steel",
      numberOfPieces: "5",
      color: "Silver",
      cookwareType: "Cookware Set",
      inductionCompatible: "Yes",
      dishwasherSafe: "Yes",
      coating: "Uncoated",
      handleMaterial: "Stainless Steel",
      lidIncluded: "Yes",
      countryOfOrigin: "India",
    },

    highlights: [
      "Food-grade stainless steel",
      "Induction compatible",
      "Dishwasher safe",
      "Durable construction",
      "Easy to clean",
      "Suitable for everyday cooking",
    ],

    variants: {
      size: ["3 Piece", "5 Piece", "7 Piece"],
      color: ["Silver"],
    },

    reviews: [
      {
        id: 1,
        user: "Sandeep",
        rating: 5,
        title: "Excellent cookware",
        comment: "Very good quality steel and the utensils feel sturdy.",
        date: "2026-07-15",
        verified: true,
      },
      {
        id: 2,
        user: "Pooja",
        rating: 4,
        title: "Good set",
        comment: "Useful set for daily cooking. Quality is good.",
        date: "2026-07-02",
        verified: true,
      },
    ],

    relatedProducts: [
      "kitchen-knife-cutting-board-set",
      "stainless-steel-spice-jar-set",
      "stackable-storage-box",
    ],
  },

  // =====================================================
  // 4. KITCHEN KNIFE SET
  // =====================================================
  {
    id: 4,
    slug: "kitchen-knife-cutting-board-set",
    title: "Kitchen Knife & Cutting Board Set",

    department: "home",
    brand: "Wonderchef",
    category: "Cookware",
    subCategory: "Cookware",

    price: 899,
    oldPrice: 1299,
    discountPercentage: 31,

    rating: 4.5,
    reviewsCount: 87,

    featured: true,

    image: knifeSetImage,
    images: [knifeSetImage],

    description:
      "Essential kitchen knife set with a durable cutting board. Designed for chopping, slicing and everyday food preparation.",

    details: {
      material: "Stainless Steel",
      numberOfPieces: "6",
      knifeMaterial: "Stainless Steel",
      handleMaterial: "ABS Plastic",
      boardMaterial: "Wood",
      color: "Black",
      dishwasherSafe: "Yes",
      suitableFor: "Vegetables, Fruits & Meat",
      countryOfOrigin: "India",
    },

    highlights: [
      "Sharp stainless steel blades",
      "Durable cutting board",
      "Comfortable handles",
      "Suitable for daily kitchen use",
      "Easy to clean",
      "Multiple knife sizes",
    ],

    variants: {
      color: ["Black", "Grey"],
      pieces: ["4 Piece", "6 Piece", "8 Piece"],
    },

    reviews: [
      {
        id: 1,
        user: "Vikas",
        rating: 5,
        title: "Very useful set",
        comment: "The knives are sharp and the cutting board is sturdy.",
        date: "2026-07-20",
        verified: true,
      },
    ],

    relatedProducts: [
      "stainless-steel-cookware-set",
      "stainless-steel-spice-jar-set",
      "stackable-storage-box",
    ],
  },

  // =====================================================
  // 5. DECORATIVE PILLOW COVERS
  // =====================================================
  {
    id: 5,
    slug: "decorative-pillow-covers",
    title: "Decorative Pillow Covers",

    department: "home",
    brand: "Home Centre",
    category: "Home Decor",
    subCategory: "Storage",

    price: 799,
    oldPrice: 1299,
    discountPercentage: 38,

    rating: 4.4,
    reviewsCount: 73,

    featured: false,

    image: pillowCoversImage,
    images: [pillowCoversImage],

    description:
      "Set of stylish decorative pillow covers designed to refresh your living room or bedroom. Made with soft and durable fabric.",

    details: {
      material: "Cotton Blend",
      pattern: "Printed",
      color: "Multicolor",
      shape: "Square",
      size: "16 x 16 Inches",
      packOf: "5",
      closureType: "Zip",
      washCare: "Machine Wash",
      countryOfOrigin: "India",
    },

    highlights: [
      "Soft cotton blend fabric",
      "Stylish printed design",
      "Hidden zip closure",
      "Easy to wash",
      "Suitable for sofa and bed",
      "Pack of 5 covers",
    ],

    variants: {
      color: ["Multicolor", "Blue", "Beige"],
      size: ["16 x 16 Inches", "18 x 18 Inches"],
    },

    reviews: [
      {
        id: 1,
        user: "Anjali",
        rating: 4,
        title: "Beautiful design",
        comment: "The prints look beautiful and give the room a fresh look.",
        date: "2026-07-08",
        verified: true,
      },
    ],

    relatedProducts: [
      "cotton-bedsheet-set",
      "blackout-curtain-pair",
      "led-table-lamp",
    ],
  },

  // =====================================================
  // 6. MOSQUITO NET
  // =====================================================
  {
    id: 6,
    slug: "canopy-mosquito-net",
    title: "Canopy Mosquito Net",

    department: "home",
    brand: "Cloth Fusion",
    category: "Bedsheets",
    subCategory: "Bedsheets",

    price: 349,
    oldPrice: 599,
    discountPercentage: 42,

    rating: 4.3,
    reviewsCount: 156,

    featured: false,

    image: net,
    images: [net],

    description:
      "Lightweight canopy mosquito net designed to provide comfortable and peaceful sleep while protecting against mosquitoes.",

    details: {
      material: "Polyester Mesh",
      color: "White",
      size: "Double Bed",
      netType: "Canopy",
      installation: "Easy Hanging",
      openingType: "Zip",
      washable: "Yes",
      suitableFor: "Double Bed",
      countryOfOrigin: "India",
    },

    highlights: [
      "Fine mosquito mesh",
      "Lightweight construction",
      "Easy to install",
      "Zip opening",
      "Washable fabric",
      "Suitable for double beds",
    ],

    variants: {
      color: ["White", "Blue", "Pink"],
      size: ["Single Bed", "Double Bed"],
    },

    reviews: [
      {
        id: 1,
        user: "Rohit",
        rating: 4,
        title: "Good for the price",
        comment: "Easy to install and works well against mosquitoes.",
        date: "2026-07-11",
        verified: true,
      },
    ],

    relatedProducts: [
      "cotton-bedsheet-set",
      "blackout-curtain-pair",
      "decorative-pillow-covers",
    ],
  },

  // =====================================================
  // 7. LED TABLE LAMP
  // =====================================================
  {
    id: 7,
    slug: "led-table-lamp",
    title: "LED Table Lamp",

    department: "home",
    brand: "Philips",
    category: "Lighting",
    subCategory: "Lighting",

    price: 499,
    oldPrice: 799,
    discountPercentage: 38,

    rating: 4.4,
    reviewsCount: 112,

    featured: false,

    image: lamp,
    images: [lamp,lightingImg],

    description:
      "Energy-efficient LED table lamp suitable for bedside tables, study desks and workspaces. Provides comfortable illumination for everyday use.",

    details: {
      material: "ABS Plastic",
      lightType: "LED",
      power: "7W",
      color: "White",
      lightColor: "Warm White",
      voltage: "220-240V",
      switchType: "Push Button",
      usage: "Study & Bedroom",
      warranty: "1 Year",
      countryOfOrigin: "India",
    },

    highlights: [
      "Energy-efficient LED",
      "Warm white illumination",
      "Compact design",
      "Low power consumption",
      "Suitable for study tables",
      "1-year warranty",
    ],

    variants: {
      color: ["White", "Black"],
      lightColor: ["Warm White", "Cool White"],
    },

    reviews: [
      {
        id: 1,
        user: "Arjun",
        rating: 5,
        title: "Perfect study lamp",
        comment:
          "The light is comfortable for studying and the size is perfect.",
        date: "2026-07-17",
        verified: true,
      },
    ],

    relatedProducts: [
      "blackout-curtain-pair",
      "decorative-pillow-covers",
      "stackable-storage-box",
    ],
  },

  // =====================================================
  // 8. SPIN MOP
  // =====================================================
  {
    id: 8,
    slug: "spin-mop-bucket-set",
    title: "Spin Mop & Bucket Set",

    department: "home",
    brand: "Spotzero",
    category: "Cleaning",
    subCategory: "Storage",

    price: 899,
    oldPrice: 1299,
    discountPercentage: 31,

    rating: 4.2,
    reviewsCount: 189,

    featured: false,

    image: cleaningImg,
    images: [cleaningImg,cleaningEssential],

    description:
      "Easy-clean spin mop and bucket set designed for quick and efficient floor cleaning. The rotating mechanism helps remove excess water easily.",

    details: {
      material: "Plastic & Microfiber",
      mopType: "Spin Mop",
      bucketCapacity: "7 Litres",
      handleMaterial: "Stainless Steel",
      mopHeadMaterial: "Microfiber",
      spinMechanism: "360 Degree",
      handleLength: "Adjustable",
      suitableFor: "All Floor Types",
      countryOfOrigin: "India",
    },

    highlights: [
      "360-degree cleaning",
      "Microfiber mop head",
      "Adjustable handle",
      "Easy spin mechanism",
      "Suitable for multiple floor types",
      "Reusable mop head",
    ],

    variants: {
      color: ["Blue", "Green", "Red"],
      capacity: ["5 Litres", "7 Litres", "10 Litres"],
    },

    reviews: [
      {
        id: 1,
        user: "Meena",
        rating: 4,
        title: "Makes cleaning easy",
        comment:
          "The spin mechanism works well and makes floor cleaning easier.",
        date: "2026-07-06",
        verified: true,
      },
    ],

    relatedProducts: [
      "stackable-storage-box",
      "stainless-steel-cookware-set",
      "kitchen-knife-cutting-board-set",
    ],
  },

  // =====================================================
  // 9. STORAGE BOX
  // =====================================================
  {
    id: 9,
    slug: "stackable-storage-box",
    title: "Stackable Storage Box",

    department: "home",
    brand: "Milton",
    category: "Storage",
    subCategory: "Storage",

    price: 499,
    oldPrice: 799,
    discountPercentage: 38,

    rating: 4.1,
    reviewsCount: 64,

    featured: false,

    image: storageBox,
    images: [storageBox],

    description:
      "Durable stackable storage boxes designed to keep clothes, toys, accessories and household items organised.",

    details: {
      material: "Plastic",
      color: "Transparent",
      capacity: "15 Litres",
      shape: "Rectangular",
      lidIncluded: "Yes",
      stackable: "Yes",
      closureType: "Snap Lock",
      suitableFor: "Home Storage",
      packOf: "1",
      countryOfOrigin: "India",
    },

    highlights: [
      "Durable plastic construction",
      "Transparent design",
      "Stackable structure",
      "Snap-lock lid",
      "Space-saving",
      "Easy to clean",
    ],

    variants: {
      color: ["Transparent", "Grey"],
      capacity: ["10 Litres", "15 Litres", "25 Litres"],
    },

    reviews: [
      {
        id: 1,
        user: "Karan",
        rating: 4,
        title: "Useful storage box",
        comment:
          "Good quality and the transparent design makes things easy to find.",
        date: "2026-07-04",
        verified: true,
      },
    ],

    relatedProducts: [
      "spin-mop-bucket-set",
      "stainless-steel-spice-jar-set",
      "decorative-pillow-covers",
    ],
  },

  // =====================================================
  // 10. SPICE JAR SET
  // =====================================================
  {
    id: 10,
    slug: "stainless-steel-spice-jar-set",
    title: "Stainless Steel Spice Jar Set",

    department: "home",
    brand: "Milton",
    category: "Cookware",
    subCategory: "Cookware",

    price: 399,
    oldPrice: 599,
    discountPercentage: 33,

    rating: 4.3,
    reviewsCount: 91,

    featured: false,

    image: storageImg,
    images: [storageImg],

    description:
      "Stainless steel spice jar set designed to keep everyday spices organised and easily accessible in your kitchen.",

    details: {
      material: "Stainless Steel",
      color: "Silver",
      numberOfContainers: "6",
      containerCapacity: "250 ml",
      lidMaterial: "Stainless Steel",
      airtight: "Yes",
      rustResistant: "Yes",
      dishwasherSafe: "Yes",
      suitableFor: "Spices & Dry Ingredients",
      countryOfOrigin: "India",
    },

    highlights: [
      "Food-grade stainless steel",
      "Rust resistant",
      "Airtight lids",
      "Easy to clean",
      "Compact design",
      "Suitable for everyday spices",
    ],

    variants: {
      color: ["Silver"],
      numberOfContainers: ["4", "6", "9"],
    },

    reviews: [
      {
        id: 1,
        user: "Shweta",
        rating: 5,
        title: "Very useful",
        comment: "The jars look neat and keep my kitchen organised.",
        date: "2026-07-14",
        verified: true,
      },
    ],

    relatedProducts: [
      "stainless-steel-cookware-set",
      "kitchen-knife-cutting-board-set",
      "stackable-storage-box",
    ],
  },
];
