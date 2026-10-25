import CategoryLandingPage from "../catalog/CategoryLandingPage";

import { categories, collections, brandCollections } from "../../data/MensData";
import ecommerceData from "../../data/allProduct";
import { filterProducts } from "../../utils/productFilters";


const mensProducts = filterProducts(ecommerceData.ecommerceProducts, {
  department: "men",
});

const heroSlides = [
  {
    eyebrow: "The modern men's edit",
    title: "Make every day",
    highlight: "your own.",
    description:
      "Discover sharp layers, everyday staples, and timeless pieces for wherever the day takes you.",
    image: "/banner/men-banner-1.jpg",
    imageAlt: "Men's contemporary clothing collection",
    action: "Shop men's collection",
    to: "/shop/products?department=men",
  },
  {
    eyebrow: "Easy everyday style",
    title: "Good shoes.",
    highlight: "Great first step.",
    description:
      "Find comfortable footwear made to keep up with your everyday plans.",
    image: "/banner/men-banner-2.jpg",
    imageAlt: "Men's footwear collection",
    action: "Shop men's footwear",
    to: "/shop/products?department=men&category=footwear",
  },
  {
    eyebrow: "Weekend uniform",
    title: "Relaxed fits,",
    highlight: "ready to go.",
    description:
      "Refresh your rotation with easy-to-wear shirts and effortless layers.",
    image: "/banner/men-banner-2.jpg",
    imageAlt: "Men's casual shirts collection",
    action: "Shop men's shirts",
    to: "/shop/products?department=men&category=shirts",
  },
];

export default function MenHomepage() {
  return (
    <CategoryLandingPage
      title="Mens"
      description="Everything little ones need for every part of their day."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={mensProducts}
      // brandCollections={brandCollections}
    />
  );
}
