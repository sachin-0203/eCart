import homeDecorImage from "../assets/images/products/home/home-decor.jpg";
import lampImage from "../assets/images/products/home/led-table-lamp.jpg";
import pillowCoversImage from "../assets/images/products/home/decorative-pillow-covers.jpg";
import lightingImage from "../assets/images/products/home/lighting.jpg";

const decorationProducts = [
  {
    id: 701,
    slug: "woven-wall-decor",
    title: "Woven Wall Decor",
    department: "decoration",
    category: "Decoration",
    subCategory: "Wall Decor",
    brand: "Home Centre",
    price: 1299,
    oldPrice: 1999,
    discountPercentage: 35,
    rating: 4.6,
    reviews: 84,
    featured: true,
    image: homeDecorImage,
    images: [homeDecorImage],
    description:
      "A warm decorative accent to bring texture and personality to living spaces.",
    details: {
      material: "Natural Fibre",
      style: "Woven",
      room: "Living Room",
    },
    relatedProducts: [
      "decorative-table-lamp",
      "decorative-accent-pillow-covers",
    ],
  },
  {
    id: 702,
    slug: "decorative-table-lamp",
    title: "Decorative Table Lamp",
    department: "decoration",
    category: "Decoration",
    subCategory: "Lighting",
    brand: "Philips",
    price: 899,
    oldPrice: 1499,
    discountPercentage: 40,
    rating: 4.5,
    reviews: 112,
    featured: true,
    image: lampImage,
    images: [lampImage, lightingImage],
    description:
      "A compact ambient lamp that adds a cosy glow to bedside tables and reading corners.",
    details: {
      type: "LED Table Lamp",
      placement: "Tabletop",
      room: "Bedroom",
    },
    relatedProducts: ["woven-wall-decor", "decorative-accent-pillow-covers"],
  },
  {
    id: 703,
    slug: "decorative-accent-pillow-covers",
    title: "Decorative Pillow Covers",
    department: "decoration",
    category: "Decoration",
    subCategory: "Soft Furnishings",
    brand: "Home Centre",
    price: 799,
    oldPrice: 1299,
    discountPercentage: 38,
    rating: 4.5,
    reviews: 73,
    featured: false,
    image: pillowCoversImage,
    images: [pillowCoversImage],
    description:
      "Printed pillow covers that add colour and a comfortable finishing touch to sofas and beds.",
    details: {
      material: "Cotton Blend",
      size: "16 x 16 Inches",
      pack: "5 Covers",
    },
    relatedProducts: ["woven-wall-decor", "decorative-table-lamp"],
  },
];

export default decorationProducts;
