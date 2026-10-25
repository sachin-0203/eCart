import CategoryLandingPage from "../catalog/CategoryLandingPage";
import { brandCollections, categories, collections } from "../../data/KidsData";
import ecommerceData from "../../data/allProduct";
import { filterProducts } from "../../utils/productFilters";

const kidsProducts = filterProducts(ecommerceData.ecommerceProducts, {
  department: "kids",
});

const heroSlides = [
  {
    eyebrow: "Big fun starts here",
    title: "Little looks.",
    highlight: "Big adventures.",
    description:
      "Find playful, comfy styles for school days, weekends, and everything in between.",
    image: "/banner/kids-banner-1.jpg",
    imageAlt: "Kids fashion collection",
    action: "Shop kids' collection",
    to: "/shop/products?department=kids",
  },
  {
    eyebrow: "Ready, set, play",
    title: "Made for moving.",
    highlight: "Built for fun.",
    description:
      "Comfy everyday outfits that are ready for every game, trip, and adventure.",
    image: "/banner/kids-banner-2.jpg",
    imageAlt: "Kids outdoor adventure collection",
    action: "Shop kids' outfits",
    to: "/shop/products?department=kids&category=topwear",
  },
  {
    eyebrow: "Everyday favourites",
    title: "Their new",
    highlight: "favourite fit.",
    description:
      "Meet soft tees, easy layers, and colourful essentials made for little personalities.",
    image: "/banner/kids-banner-3.jpg",
    imageAlt: "Kids topwear collection",
    action: "Explore topwear",
    to: "/shop/products?department=kids&category=topwear",
  },
];

export default function KidsHomepage() {
  return (
    <CategoryLandingPage
      title="Kids"
      description="Everything little ones need for every part of their day."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={kidsProducts}
      // brandCollections={brandCollections}
    />
  );
}
