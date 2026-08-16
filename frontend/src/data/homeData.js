// ============================================================
// HOME & LIVING PRODUCT DATA
// ============================================================

export const homeItems = [
  {
    id: 1001,
    slug: "cotton-bedsheet-set",

    // Basic Information
    title: "Cotton Bedsheet Set",
    brand: "Spaces",
    category: "Bedsheets",
    subCategory: "Double Bedsheets",

    // Pricing
    price: 1299,
    oldPrice: 1999,
    discountPercentage: 35,

    // Rating
    rating: 4.8,
    reviewsCount: 128,

    // Images
    images: [
      "/assets/images/categories/bedsheets.jpg",
    ],

    // Description
    shortDescription:
      "Soft breathable cotton bedsheet set in multiple sizes and colours.",

    description:
      "Soft and breathable cotton bedsheet set designed for everyday comfort. The durable fabric and attractive design make it suitable for modern bedrooms.",

    // Product Details
    details: [
      "100% cotton fabric",
      "Soft and breathable",
      "Machine washable",
      "Available in multiple colours",
      "Suitable for double beds",
    ],

    // Variants
    variants: {
      color: ["Blue", "Grey", "Green"],
      size: ["Single", "Double"],
    },

    // Stock
    inStock: true,
    stock: 42,

    // Reviews
    reviews: [
      {
        id: 1,
        user: "Rahul Sharma",
        rating: 5,
        title: "Excellent quality",
        comment: "The fabric is soft and the print looks beautiful.",
        date: "2026-07-20",
      },
      {
        id: 2,
        user: "Priya Singh",
        rating: 4,
        title: "Good bedsheet",
        comment: "Good quality and comfortable for everyday use.",
        date: "2026-07-15",
      },
    ],

    featured: true,
    bestseller: true,
  },

  // ============================================================
  // 1002 - COMFORTER
  // ============================================================

  {
    id: 1002,
    slug: "quilting-comforter",

    title: "Warm Comforter / Quilt",
    brand: "SleepyCat",
    category: "Comforters",
    subCategory: "Winter Bedding",

    price: 2499,
    oldPrice: 3599,
    discountPercentage: 31,

    rating: 4.7,
    reviewsCount: 96,

    images: [
      "/assets/images/categories/comforters.jpg",
    ],

    shortDescription:
      "Warm and lightweight comforter for winters and monsoon weather.",

    description:
      "A soft and warm comforter designed to provide comfortable sleep during colder weather. Lightweight construction makes it easy to use and maintain.",

    details: [
      "Soft filling",
      "Lightweight construction",
      "Warm and comfortable",
      "Easy to maintain",
      "Suitable for winter use",
    ],

    variants: {
      color: ["Grey", "Blue"],
      size: ["Single", "Double", "King"],
    },

    inStock: true,
    stock: 28,

    reviews: [
      {
        id: 1,
        user: "Amit",
        rating: 5,
        title: "Very warm",
        comment: "Comfortable and warm without feeling too heavy.",
        date: "2026-07-18",
      },
    ],

    featured: true,
    bestseller: false,
  },

  // ============================================================
  // 1003 - COOKWARE
  // ============================================================

  {
    id: 1003,
    slug: "stainless-cookware-set",

    title: "Stainless Steel Cookware Set",
    brand: "Prestige",
    category: "Cookware",
    subCategory: "Cookware Sets",

    price: 3499,
    oldPrice: 4999,
    discountPercentage: 30,

    rating: 4.6,
    reviewsCount: 214,

    images: [
      "/assets/images/categories/cookware.jpg",
    ],

    shortDescription:
      "Durable 5-piece stainless steel cookware set for daily cooking.",

    description:
      "Durable stainless steel cookware set designed for everyday Indian cooking. The set combines practical design with long-lasting construction.",

    details: [
      "Stainless steel construction",
      "5-piece cookware set",
      "Durable and long lasting",
      "Easy to clean",
      "Suitable for daily cooking",
    ],

    variants: {
      color: ["Silver"],
      size: ["5 Piece"],
    },

    inStock: true,
    stock: 18,

    reviews: [
      {
        id: 1,
        user: "Vikas",
        rating: 5,
        title: "Good quality cookware",
        comment: "Strong material and good finish.",
        date: "2026-07-12",
      },
      {
        id: 2,
        user: "Neha",
        rating: 4,
        title: "Worth the price",
        comment: "Good cookware set for everyday use.",
        date: "2026-07-10",
      },
    ],

    featured: true,
    bestseller: true,
  },

  // ============================================================
  // 1004 - CONTAINERS
  // ============================================================

  {
    id: 1004,
    slug: "kitchen-containers-set",

    title: "Airtight Containers Set",
    brand: "Milton",
    category: "Containers",
    subCategory: "Kitchen Storage",

    price: 799,
    oldPrice: 1199,
    discountPercentage: 33,

    rating: 4.5,
    reviewsCount: 142,

    images: [
      "/assets/images/categories/containers.jpg",
    ],

    shortDescription:
      "Stackable airtight containers for pantry and grain storage.",

    description:
      "A practical set of airtight storage containers designed to keep kitchen essentials fresh and organised.",

    details: [
      "Airtight lids",
      "Stackable design",
      "Food-safe material",
      "Easy to clean",
      "Suitable for pantry storage",
    ],

    variants: {
      color: ["Transparent"],
      size: ["Small", "Medium", "Large"],
    },

    inStock: true,
    stock: 35,

    reviews: [
      {
        id: 1,
        user: "Ritu",
        rating: 5,
        title: "Very useful",
        comment: "Good quality containers and the lids fit properly.",
        date: "2026-07-08",
      },
    ],

    featured: false,
    bestseller: true,
  },

  // ============================================================
  // 1005 - KNIFE SET
  // ============================================================

  {
    id: 1005,
    slug: "kitchen-knife-set",

    title: "Kitchen Knife & Cutting Board Set",
    brand: "Wonderchef",
    category: "Cookware",
    subCategory: "Kitchen Tools",

    price: 899,
    oldPrice: 1299,
    discountPercentage: 31,

    rating: 4.5,
    reviewsCount: 87,

    images: [
      "/assets/images/categories/knife-set.jpg",
    ],

    shortDescription:
      "Essential kitchen knife set with wooden cutting board.",

    description:
      "A practical kitchen preparation set containing essential knives and a cutting board for everyday cooking needs.",

    details: [
      "Sharp stainless steel blades",
      "Wooden cutting board",
      "Ergonomic handles",
      "Easy to clean",
      "Suitable for daily kitchen use",
    ],

    variants: {
      color: ["Black"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 22,

    reviews: [
      {
        id: 1,
        user: "Sanjay",
        rating: 4,
        title: "Useful kitchen set",
        comment: "Good set for basic kitchen preparation.",
        date: "2026-07-05",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1006 - MOSQUITO NET
  // ============================================================

  {
    id: 1006,
    slug: "mosquito-net-double",

    title: "Canopy Mosquito Net (Double)",
    brand: "Sleepwell",
    category: "Mosquito Nets",
    subCategory: "Double Bed Mosquito Nets",

    price: 349,
    oldPrice: 599,
    discountPercentage: 41,

    rating: 4.3,
    reviewsCount: 156,

    images: [
      "/assets/images/categories/mosquito-nets.jpg",
    ],

    shortDescription:
      "Lightweight canopy mosquito net for comfortable nights.",

    description:
      "Lightweight mosquito net designed for double beds. Provides effective protection from mosquitoes while allowing proper airflow.",

    details: [
      "Lightweight mesh",
      "Easy installation",
      "Breathable design",
      "Suitable for double beds",
      "Easy to fold and store",
    ],

    variants: {
      color: ["White", "Blue"],
      size: ["Double"],
    },

    inStock: true,
    stock: 45,

    reviews: [
      {
        id: 1,
        user: "Manish",
        rating: 4,
        title: "Good value",
        comment: "Easy to install and works well.",
        date: "2026-07-02",
      },
    ],

    featured: true,
    bestseller: false,
  },

  // ============================================================
  // 1007 - FLOOR RUG
  // ============================================================

  {
    id: 1007,
    slug: "floor-rug-cotton",

    title: "Cotton Floor Rug / Carpet",
    brand: "Spaces",
    category: "Mats & Rugs",
    subCategory: "Floor Rugs",

    price: 1199,
    oldPrice: 1799,
    discountPercentage: 33,

    rating: 4.4,
    reviewsCount: 73,

    images: [
      "/assets/images/categories/rugs.jpg",
    ],

    shortDescription:
      "Soft cotton floor rug for living rooms and bedrooms.",

    description:
      "A comfortable cotton floor rug designed to add warmth and style to living rooms, bedrooms and other spaces.",

    details: [
      "Cotton fabric",
      "Soft texture",
      "Durable construction",
      "Easy to clean",
      "Suitable for living rooms and bedrooms",
    ],

    variants: {
      color: ["Beige", "Grey", "Brown"],
      size: ["Small", "Medium", "Large"],
    },

    inStock: true,
    stock: 19,

    reviews: [
      {
        id: 1,
        user: "Pooja",
        rating: 4,
        title: "Looks nice",
        comment: "Good rug for the living room.",
        date: "2026-06-28",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1008 - MIRROR
  // ============================================================

  {
    id: 1008,
    slug: "rustic-wall-mirror",

    title: "Rustic Wall Mirror",
    brand: "Home Centre",
    category: "Mirrors",
    subCategory: "Wall Mirrors",

    price: 699,
    oldPrice: 999,
    discountPercentage: 30,

    rating: 4.4,
    reviewsCount: 68,

    images: [
      "/assets/images/categories/mirrors.jpg",
    ],

    shortDescription:
      "Decorative wall mirror with a rustic wooden frame.",

    description:
      "A stylish decorative wall mirror featuring a rustic frame that complements modern and traditional interiors.",

    details: [
      "Decorative design",
      "Wooden-style frame",
      "Clear reflection",
      "Wall mountable",
      "Suitable for bedroom and living room",
    ],

    variants: {
      color: ["Brown"],
      size: ["Medium"],
    },

    inStock: true,
    stock: 15,

    reviews: [
      {
        id: 1,
        user: "Ankit",
        rating: 4,
        title: "Good decor piece",
        comment: "Looks elegant on the wall.",
        date: "2026-06-25",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1009 - TABLE LAMP
  // ============================================================

  {
    id: 1009,
    slug: "led-table-lamp",

    title: "LED Table Lamp",
    brand: "Philips",
    category: "Lighting",
    subCategory: "Table Lamps",

    price: 499,
    oldPrice: 799,
    discountPercentage: 38,

    rating: 4.4,
    reviewsCount: 112,

    images: [
      "/assets/images/categories/lighting.jpg",
    ],

    shortDescription:
      "Energy-efficient LED lamp for bedside and study tables.",

    description:
      "Compact LED table lamp providing comfortable illumination for study tables, workspaces and bedside areas.",

    details: [
      "Energy efficient LED",
      "Compact design",
      "Low power consumption",
      "Suitable for study tables",
      "Easy to operate",
    ],

    variants: {
      color: ["White", "Black"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 31,

    reviews: [
      {
        id: 1,
        user: "Karan",
        rating: 5,
        title: "Perfect study lamp",
        comment: "Good brightness and compact size.",
        date: "2026-06-22",
      },
    ],

    featured: false,
    bestseller: true,
  },

  // ============================================================
  // 1010 - BATH TOWEL
  // ============================================================

  {
    id: 1010,
    slug: "bath-towel-set",

    title: "Bath Towel Set (2 pcs)",
    brand: "Spaces",
    category: "Bath Linen",
    subCategory: "Bath Towels",

    price: 699,
    oldPrice: 999,
    discountPercentage: 30,

    rating: 4.5,
    reviewsCount: 91,

    images: [
      "/assets/images/categories/bath-linen.jpg",
    ],

    shortDescription:
      "Soft and absorbent bath towels for everyday use.",

    description:
      "Soft cotton bath towels designed for comfortable everyday use with excellent absorbency and a smooth texture.",

    details: [
      "Soft cotton fabric",
      "Highly absorbent",
      "Quick drying",
      "Machine washable",
      "Set of 2 towels",
    ],

    variants: {
      color: ["White", "Blue", "Grey"],
      size: ["Bath Towel"],
    },

    inStock: true,
    stock: 26,

    reviews: [
      {
        id: 1,
        user: "Deepak",
        rating: 5,
        title: "Soft towels",
        comment: "Very soft and absorbs water well.",
        date: "2026-06-20",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1011 - SPIN MOP
  // ============================================================

  {
    id: 1011,
    slug: "plastic-mop-bucket",

    title: "Spin Mop & Bucket Set",
    brand: "Spotzero",
    category: "Cleaning",
    subCategory: "Mops",

    price: 899,
    oldPrice: 1299,
    discountPercentage: 30,

    rating: 4.2,
    reviewsCount: 189,

    images: [
      "/assets/images/categories/cleaning.jpg",
    ],

    shortDescription:
      "Easy-clean spin mop and bucket set for quick floor cleaning.",

    description:
      "Practical spin mop system designed for convenient floor cleaning with minimal effort.",

    details: [
      "360-degree rotating mop",
      "Durable bucket",
      "Easy wringing system",
      "Microfiber mop head",
      "Suitable for multiple floor types",
    ],

    variants: {
      color: ["Blue", "Red"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 34,

    reviews: [
      {
        id: 1,
        user: "Sunita",
        rating: 4,
        title: "Easy to use",
        comment: "Makes daily floor cleaning easier.",
        date: "2026-06-18",
      },
    ],

    featured: false,
    bestseller: true,
  },

  // ============================================================
  // 1012 - DINNER SET
  // ============================================================

  {
    id: 1012,
    slug: "steel-dinner-set",

    title: "Stainless Steel Dinner Plate Set",
    brand: "Milton",
    category: "Dining",
    subCategory: "Dinner Sets",

    price: 599,
    oldPrice: 899,
    discountPercentage: 33,

    rating: 4.5,
    reviewsCount: 84,

    images: [
      "/assets/images/categories/dining.jpg",
    ],

    shortDescription:
      "Durable stainless steel dinner set for everyday family meals.",

    description:
      "Reliable stainless steel dinnerware designed for everyday family dining and long-term use.",

    details: [
      "Food-grade stainless steel",
      "Durable construction",
      "Rust resistant",
      "Easy to clean",
      "Suitable for everyday use",
    ],

    variants: {
      color: ["Silver"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 40,

    reviews: [
      {
        id: 1,
        user: "Rakesh",
        rating: 5,
        title: "Good quality",
        comment: "Strong steel and good finish.",
        date: "2026-06-15",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1013 - GARDENING TOOLS
  // ============================================================

  {
    id: 1013,
    slug: "garden-tools-set",

    title: "Basic Gardening Tools Set",
    brand: "Kraft Seeds",
    category: "Gardening",
    subCategory: "Gardening Tools",

    price: 499,
    oldPrice: 799,
    discountPercentage: 37,

    rating: 4.3,
    reviewsCount: 67,

    images: [
      "/assets/images/categories/gardening.jpg",
    ],

    shortDescription:
      "Basic gardening tool set for balcony and home gardens.",

    description:
      "Compact gardening tool set containing essential tools for maintaining plants at home.",

    details: [
      "Durable hand tools",
      "Comfortable grip",
      "Suitable for balcony gardens",
      "Lightweight",
      "Easy to store",
    ],

    variants: {
      color: ["Green"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 20,

    reviews: [
      {
        id: 1,
        user: "Arun",
        rating: 4,
        title: "Useful tools",
        comment: "Good basic tools for balcony gardening.",
        date: "2026-06-12",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1014 - UTILITY SHELF
  // ============================================================

  {
    id: 1014,
    slug: "storage-shelf-utility",

    title: "Steel Utility Shelf",
    brand: "Nilkamal",
    category: "Utilities",
    subCategory: "Storage Shelves",

    price: 2199,
    oldPrice: 2999,
    discountPercentage: 26,

    rating: 4.4,
    reviewsCount: 58,

    images: [
      "/assets/images/categories/utilities.jpg",
    ],

    shortDescription:
      "Space-saving steel shelf for kitchen and utility areas.",

    description:
      "A sturdy utility shelf designed to maximise storage space in kitchens, bathrooms and utility areas.",

    details: [
      "Steel construction",
      "Space-saving design",
      "Multiple shelves",
      "Easy to clean",
      "Suitable for kitchen and utility areas",
    ],

    variants: {
      color: ["White", "Black"],
      size: ["Medium"],
    },

    inStock: true,
    stock: 12,

    reviews: [
      {
        id: 1,
        user: "Mohit",
        rating: 4,
        title: "Strong shelf",
        comment: "Good for organising kitchen items.",
        date: "2026-06-10",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1015 - SOFA
  // ============================================================

  {
    id: 1015,
    slug: "sofa-2-seater",

    title: "2-Seater Sofa",
    brand: "Wakefit",
    category: "Sofas",
    subCategory: "2 Seater Sofas",

    price: 8999,
    oldPrice: 12999,
    discountPercentage: 31,

    rating: 4.6,
    reviewsCount: 74,

    images: [
      "/assets/images/categories/sofa.jpg",
    ],

    shortDescription:
      "Comfortable two-seater sofa with removable covers.",

    description:
      "A compact and comfortable two-seater sofa designed for modern living rooms and apartments.",

    details: [
      "Comfortable cushioning",
      "Durable frame",
      "Removable covers",
      "Compact two-seater design",
      "Suitable for living rooms",
    ],

    variants: {
      color: ["Grey", "Beige", "Blue"],
      size: ["2 Seater"],
    },

    inStock: true,
    stock: 7,

    reviews: [
      {
        id: 1,
        user: "Aman",
        rating: 5,
        title: "Comfortable sofa",
        comment: "Looks premium and is comfortable to sit on.",
        date: "2026-06-08",
      },
    ],

    featured: true,
    bestseller: true,
  },

  // ============================================================
  // 1016 - CUSHION PACK
  // ============================================================

  {
    id: 1016,
    slug: "decorative-cushion-pack",

    title: "Decorative Cushion Pack (4)",
    brand: "Home Centre",
    category: "Furnishing",
    subCategory: "Cushions",

    price: 799,
    oldPrice: 1199,
    discountPercentage: 33,

    rating: 4.4,
    reviewsCount: 65,

    images: [
      "/assets/images/categories/furnishing.jpg",
    ],

    shortDescription:
      "Decorative cushion set for living room and bedroom interiors.",

    description:
      "A stylish set of decorative cushions designed to refresh and brighten living room and bedroom spaces.",

    details: [
      "Soft filling",
      "Decorative covers",
      "Comfortable",
      "Easy to maintain",
      "Set of 4 cushions",
    ],

    variants: {
      color: ["Beige", "Grey", "Blue"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 24,

    reviews: [
      {
        id: 1,
        user: "Shweta",
        rating: 4,
        title: "Beautiful cushions",
        comment: "Nice colours and comfortable filling.",
        date: "2026-06-05",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1017 - WALL ART
  // ============================================================

  {
    id: 1017,
    slug: "wall-art-print",

    title: "Framed Wall Art",
    brand: "The Artment",
    category: "Decor",
    subCategory: "Wall Decor",

    price: 999,
    oldPrice: 1499,
    discountPercentage: 33,

    rating: 4.3,
    reviewsCount: 51,

    images: [
      "/assets/images/categories/decor.jpg",
    ],

    shortDescription:
      "Framed decorative wall art for modern interiors.",

    description:
      "Affordable framed wall art designed to add personality and style to living rooms, bedrooms and workspaces.",

    details: [
      "High-quality print",
      "Decorative frame",
      "Ready to hang",
      "Lightweight",
      "Suitable for modern interiors",
    ],

    variants: {
      color: ["Multicolor"],
      size: ["Medium"],
    },

    inStock: true,
    stock: 16,

    reviews: [
      {
        id: 1,
        user: "Nisha",
        rating: 4,
        title: "Looks beautiful",
        comment: "Good addition to the living room.",
        date: "2026-06-02",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1018 - ELECTRIC DRILL
  // ============================================================

  {
    id: 1018,
    slug: "electric-drill-basic",

    title: "Basic Electric Drill",
    brand: "Bosch",
    category: "Hardware",
    subCategory: "Power Tools",

    price: 2199,
    oldPrice: 3299,
    discountPercentage: 33,

    rating: 4.5,
    reviewsCount: 119,

    images: [
      "/assets/images/categories/hardware.jpg",
    ],

    shortDescription:
      "Compact electric drill for household repairs and DIY work.",

    description:
      "A handy electric drill designed for basic household repairs, furniture assembly and DIY projects.",

    details: [
      "Compact design",
      "Powerful motor",
      "Easy grip handle",
      "Suitable for household repairs",
      "Ideal for DIY projects",
    ],

    variants: {
      color: ["Blue"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 14,

    reviews: [
      {
        id: 1,
        user: "Raj",
        rating: 5,
        title: "Good drill",
        comment: "Works well for basic home repairs.",
        date: "2026-05-30",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1019 - WATER CONTAINER
  // ============================================================

  {
    id: 1019,
    slug: "plastic-water-storage-tank",

    title: "Plastic Water Container (10L)",
    brand: "Milton",
    category: "Containers",
    subCategory: "Water Containers",

    price: 349,
    oldPrice: 499,
    discountPercentage: 30,

    rating: 4.3,
    reviewsCount: 76,

    images: [
      "/assets/images/categories/containers-2.jpg",
    ],

    shortDescription:
      "Portable 10L water container for kitchen and outdoor use.",

    description:
      "A lightweight and durable water container suitable for everyday household and outdoor use.",

    details: [
      "10 litre capacity",
      "Food-grade plastic",
      "Lightweight",
      "Easy to carry",
      "Leak-resistant design",
    ],

    variants: {
      color: ["Blue", "White"],
      size: ["10L"],
    },

    inStock: true,
    stock: 38,

    reviews: [
      {
        id: 1,
        user: "Vivek",
        rating: 4,
        title: "Useful container",
        comment: "Good quality and easy to carry.",
        date: "2026-05-28",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1020 - BATHROOM FAUCET
  // ============================================================

  {
    id: 1020,
    slug: "bathroom-faucet",

    title: "Bathroom Tap / Faucet",
    brand: "Jaquar",
    category: "Bathroom",
    subCategory: "Bathroom Taps",

    price: 799,
    oldPrice: 1199,
    discountPercentage: 33,

    rating: 4.5,
    reviewsCount: 83,

    images: [
      "/assets/images/categories/bathroom.jpg",
    ],

    shortDescription:
      "Durable bathroom faucet with smooth water flow.",

    description:
      "A practical bathroom faucet with durable construction and smooth water flow for everyday household use.",

    details: [
      "Durable construction",
      "Smooth water flow",
      "Easy installation",
      "Corrosion resistant finish",
      "Suitable for bathrooms",
    ],

    variants: {
      color: ["Chrome"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 17,

    reviews: [
      {
        id: 1,
        user: "Suresh",
        rating: 5,
        title: "Good quality tap",
        comment: "Good finish and smooth water flow.",
        date: "2026-05-25",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1021 - CLEANING BUCKET
  // ============================================================

  {
    id: 1021,
    slug: "plastic-bucket-mop",

    title: "Cleaning Bucket (With Lid)",
    brand: "Cello",
    category: "Cleaning",
    subCategory: "Cleaning Buckets",

    price: 249,
    oldPrice: 399,
    discountPercentage: 37,

    rating: 4.2,
    reviewsCount: 54,

    images: [
      "/assets/images/categories/cleaning-2.jpg",
    ],

    shortDescription:
      "Multi-purpose plastic bucket for cleaning and storage.",

    description:
      "A durable multi-purpose bucket suitable for cleaning, household storage and everyday utility tasks.",

    details: [
      "Durable plastic",
      "Lightweight",
      "Includes lid",
      "Easy to clean",
      "Multi-purpose use",
    ],

    variants: {
      color: ["Blue", "Green"],
      size: ["10L"],
    },

    inStock: true,
    stock: 43,

    reviews: [
      {
        id: 1,
        user: "Meena",
        rating: 4,
        title: "Good bucket",
        comment: "Useful for regular household cleaning.",
        date: "2026-05-22",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1022 - OTTOMAN
  // ============================================================

  {
    id: 1022,
    slug: "decorative-ottoman",

    title: "Textured Ottoman",
    brand: "Home Centre",
    category: "Furniture",
    subCategory: "Ottomans & Poufs",

    price: 1799,
    oldPrice: 2599,
    discountPercentage: 30,

    rating: 4.6,
    reviewsCount: 62,

    images: [
      "/assets/images/categories/ottoman.jpg",
    ],

    shortDescription:
      "Compact textured ottoman for living rooms and bedrooms.",

    description:
      "A stylish textured ottoman that can be used as extra seating, a footrest or a decorative accent.",

    details: [
      "Textured upholstery",
      "Comfortable cushioning",
      "Compact design",
      "Multi-purpose use",
      "Suitable for living rooms",
    ],

    variants: {
      color: ["Beige", "Grey"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 9,

    reviews: [
      {
        id: 1,
        user: "Kunal",
        rating: 5,
        title: "Looks premium",
        comment: "Great design and comfortable to use.",
        date: "2026-05-20",
      },
    ],

    featured: true,
    bestseller: true,
  },

  // ============================================================
  // 1023 - STORAGE BOX
  // ============================================================

  {
    id: 1023,
    slug: "stackable-storage-box",

    title: "Stackable Storage Box",
    brand: "Nilkamal",
    category: "Utilities",
    subCategory: "Storage Boxes",

    price: 499,
    oldPrice: 799,
    discountPercentage: 37,

    rating: 4.2,
    reviewsCount: 64,

    images: [
      "/assets/images/categories/storage.jpg",
    ],

    shortDescription:
      "Durable stackable storage box for clothing and household items.",

    description:
      "A practical stackable storage solution designed to organise clothing, linens, toys and other household items.",

    details: [
      "Durable plastic",
      "Stackable design",
      "Space saving",
      "Easy to clean",
      "Suitable for seasonal storage",
    ],

    variants: {
      color: ["Transparent"],
      size: ["Medium", "Large"],
    },

    inStock: true,
    stock: 29,

    reviews: [
      {
        id: 1,
        user: "Pankaj",
        rating: 4,
        title: "Useful storage",
        comment: "Good for organising clothes and household items.",
        date: "2026-05-18",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1024 - SPICE JARS
  // ============================================================

  {
    id: 1024,
    slug: "glass-jar-set",

    title: "Glass Spice Jars (Set of 6)",
    brand: "Borosil",
    category: "Cookware",
    subCategory: "Spice Storage",

    price: 399,
    oldPrice: 599,
    discountPercentage: 33,

    rating: 4.5,
    reviewsCount: 91,

    images: [
      "/assets/images/categories/spice-jars.jpg",
    ],

    shortDescription:
      "Clear glass spice jars for organised kitchen storage.",

    description:
      "A set of clear glass spice jars designed to keep everyday spices organised and easily accessible.",

    details: [
      "Clear glass jars",
      "Set of 6",
      "Easy to clean",
      "Transparent design",
      "Suitable for everyday spices",
    ],

    variants: {
      color: ["Transparent"],
      size: ["6 Piece"],
    },

    inStock: true,
    stock: 36,

    reviews: [
      {
        id: 1,
        user: "Kavita",
        rating: 5,
        title: "Very useful",
        comment: "Makes my kitchen look organised.",
        date: "2026-05-15",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1025 - PUJA THALI
  // ============================================================

  {
    id: 1025,
    slug: "puja-plate-set",

    title: "Puja Thali & Accessories",
    brand: "Pure Home + Living",
    category: "Decor",
    subCategory: "Puja Essentials",

    price: 599,
    oldPrice: 899,
    discountPercentage: 33,

    rating: 4.4,
    reviewsCount: 48,

    images: [
      "/assets/images/categories/puja.jpg",
    ],

    shortDescription:
      "Traditional puja thali set with essential accessories.",

    description:
      "A traditional decorative puja thali set designed for daily prayers, festivals and special occasions.",

    details: [
      "Traditional design",
      "Durable finish",
      "Easy to clean",
      "Suitable for daily rituals",
      "Includes essential accessories",
    ],

    variants: {
      color: ["Gold"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 21,

    reviews: [
      {
        id: 1,
        user: "Anjali",
        rating: 5,
        title: "Beautiful set",
        comment: "Looks traditional and well finished.",
        date: "2026-05-12",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1026 - CUTLERY
  // ============================================================

  {
    id: 1026,
    slug: "dining-cutlery-set",

    title: "Stainless Steel Cutlery Set",
    brand: "Amazon Basics",
    category: "Dining",
    subCategory: "Cutlery",

    price: 799,
    oldPrice: 1199,
    discountPercentage: 33,

    rating: 4.5,
    reviewsCount: 109,

    images: [
      "/assets/images/categories/cutlery.jpg",
    ],

    shortDescription:
      "Complete stainless steel cutlery set for family dining.",

    description:
      "A durable stainless steel cutlery set designed for everyday family dining and special occasions.",

    details: [
      "Stainless steel",
      "Durable construction",
      "Rust resistant",
      "Easy to clean",
      "Suitable for everyday dining",
    ],

    variants: {
      color: ["Silver"],
      size: ["Standard"],
    },

    inStock: true,
    stock: 27,

    reviews: [
      {
        id: 1,
        user: "Rohit",
        rating: 5,
        title: "Good finish",
        comment: "Good quality cutlery for the price.",
        date: "2026-05-10",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1027 - WATERING CAN
  // ============================================================

  {
    id: 1027,
    slug: "outdoor-watering-can",

    title: "Watering Can for Plants",
    brand: "TrustBasket",
    category: "Gardening",
    subCategory: "Watering Cans",

    price: 299,
    oldPrice: 449,
    discountPercentage: 33,

    rating: 4.3,
    reviewsCount: 61,

    images: [
      "/assets/images/categories/watering-can.jpg",
    ],

    shortDescription:
      "Lightweight watering can for balcony and home gardens.",

    description:
      "A lightweight watering can designed for easy and controlled watering of indoor and outdoor plants.",

    details: [
      "Lightweight design",
      "Comfortable handle",
      "Easy pouring",
      "Durable plastic",
      "Suitable for home gardens",
    ],

    variants: {
      color: ["Green", "Blue"],
      size: ["5L"],
    },

    inStock: true,
    stock: 32,

    reviews: [
      {
        id: 1,
        user: "Sahil",
        rating: 4,
        title: "Easy to use",
        comment: "Lightweight and easy to carry.",
        date: "2026-05-08",
      },
    ],

    featured: false,
    bestseller: false,
  },

  // ============================================================
  // 1028 - DECORATIVE LANTERN
  // ============================================================

  {
    id: 1028,
    slug: "decorative-lantern",

    title: "Hanging Decorative Lantern",
    brand: "Home Centre",
    category: "Lighting",
    subCategory: "Decorative Lighting",

    price: 699,
    oldPrice: 999,
    discountPercentage: 30,

    rating: 4.4,
    reviewsCount: 57,

    images: [
      "/assets/images/categories/lantern.jpg",
    ],

    shortDescription:
      "Decorative hanging lantern for living spaces and balconies.",

    description:
      "A stylish decorative lantern designed to create warm ambient lighting in living rooms, balconies and verandas.",

    details: [
      "Decorative design",
      "Warm ambient lighting",
      "Hanging installation",
      "Lightweight",
      "Suitable for indoor and outdoor spaces",
    ],

    variants: {
      color: ["Black", "Gold"],
      size: ["Medium"],
    },

    inStock: true,
    stock: 13,

    reviews: [
      {
        id: 1,
        user: "Varun",
        rating: 4,
        title: "Nice decor",
        comment: "Looks great in the balcony.",
        date: "2026-05-05",
      },
    ],

    featured: false,
    bestseller: false,
  },
];


// ============================================================
// HOME TABS
// ============================================================

export const homeTabs = [
  "Monsoon",
  "Cookware",
  "Hardware",
  "Bathroom",
  "Comforters",
  "Containers",
  "Mats & Rugs",
  "Furniture",
  "Decor",
  "Lighting",
  "Bedsheets",
  "Furnishing",
  "Mosquito Nets",
  "Mirrors",
  "Bath Linen",
  "Gardening",
  "Utilities",
  "Sofas",
  "Cleaning",
  "Dining",
];


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  homeTabs,
  homeItems,
};