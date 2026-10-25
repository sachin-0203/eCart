import {
  categories,
  collections,
  brandCollections,
} from "../../data/WomensData";
import ecommerceData from "../../data/mock/allProduct";
import { filterProducts } from "../../utils/productFilters";
import CategoryLandingPage from "../catalog/CategoryLandingPage";

const womensProducts = filterProducts(ecommerceData.ecommerceProducts, {
  department: "women",
});

const heroSlides = [
  {
    eyebrow: "The new women's edit",
    title: "Style that feels",
    highlight: "like you.",
    description:
      "Discover considered everyday pieces, fresh silhouettes, and favourites for every occasion.",
    image: "/banner/women-banner-1.jpg",
    imageAlt: "Women's dress collection",
    action: "Shop women's collection",
    to: "/shop/products?department=women",
  },
  {
    eyebrow: "Made for sunny days",
    title: "A fresh look",
    highlight: "for the season.",
    description:
      "Light layers and easy outfits to bring a little sunshine to your wardrobe.",
    image: "/banner/women-banner-2.jpg",
    imageAlt: "Women's summer collection",
    action: "Shop summer styles",
    to: "/shop/products?department=women&category=dresses",
  },
  {
    eyebrow: "A moment to dress up",
    title: "Make an entrance.",
    highlight: "Stay unforgettable.",
    description:
      "Find occasion-ready looks with just the right amount of statement.",
    image: "/banner/women-banner-3.jpg",
    imageAlt: "Women's occasion wear collection",
    action: "Explore occasion wear",
    to: "/shop/products?department=women&category=dresses",
  },
];

export default function WomenHomepage() {
  return (
    <CategoryLandingPage
      title="Women"
      description="Everything you need for every part of their day."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={womensProducts}
      // brandCollections={brandCollections}
    />
  );
}
