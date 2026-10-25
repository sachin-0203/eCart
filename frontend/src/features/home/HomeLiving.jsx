import {
  categories,
  collections,
  brandCollections,
  products,
} from "../../data/homeLivingData";
import CategoryLandingPage from "../catalog/CategoryLandingPage";

import bedSheetImage from "../../assets/images/products/home/cotton-bed-sheet-set.jpg";
import curtainsImg from "../../assets/images/products/home/blackout-curtain-pair.jpg";
import cookwareImage from "../../assets/images/products/home/stainless-steel-spice-jar-set.jpg";

const heroSlides = [
  {
    eyebrow: "Comfort starts at home",
    title: "Make your bedroom",
    highlight: "a softer escape.",
    description:
      "Discover soft bedsheets and beautiful bedroom essentials designed to make every night more comfortable.",
    image: bedSheetImage,
    imageAlt: "Soft bedsheets and bedroom essentials",
    action: "Shop bedsheets",
    to: "/shop/products?department=home&category=bedsheets",
  },
  {
    eyebrow: "Style meets privacy",
    title: "Dress your windows",
    highlight: "beautifully.",
    description:
      "Explore stylish curtains that bring warmth, privacy, and personality to every room.",
    image: curtainsImg,
    imageAlt: "Stylish curtains for modern homes",
    action: "Shop curtains",
    to: "/shop/products?department=home&category=curtains",
  },
  {
    eyebrow: "Everyday cooking, elevated",
    title: "Cook with ease.",
    highlight: "Serve with love.",
    description:
      "Upgrade your cooking experience with dependable cookware made for everyday meals and special moments.",
    image: cookwareImage,
    imageAlt: "Cookware for everyday kitchen essentials",
    action: "Shop cookware",
    to: "/shop/products?department=home&category=cookware",
  },
];

const HomeLiving = () => {
  return (
    <CategoryLandingPage
      title="Home"
      description="Everything you need for every part of your home."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={products}
      brandCollections={brandCollections}
    />
  );
};

export default HomeLiving;
