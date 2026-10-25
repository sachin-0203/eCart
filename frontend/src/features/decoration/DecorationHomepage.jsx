import CategoryLandingPage from "../catalog/CategoryLandingPage";
import decorationProducts from "../../data/decorationData";
import homeDecorImage from "../../assets/images/products/home/home-decor.jpg";
import lampImage from "../../assets/images/products/home/led-table-lamp.jpg";
import pillowCoversImage from "../../assets/images/products/home/decorative-pillow-covers.jpg";
import decorationCategoryImage from "../../assets/images/categories/decorationImg.jpg";

const makeProductLink = (category) =>
  `/shop/products?department=decoration&category=${encodeURIComponent(category)}`;

const heroSlides = [
  {
    eyebrow: "Make room for your style",
    title: "Bring your",
    highlight: "space to life.",
    description:
      "Refresh your home with decorative accents, soft furnishings, and warm ambient lighting.",
    image: decorationCategoryImage,
    imageAlt: "Home decoration and interior accents",
    action: "Shop decoration",
    to: "/shop/products?department=decoration",
  },
  {
    eyebrow: "Details make a difference",
    title: "Small touches.",
    highlight: "A fresh feeling.",
    description:
      "Explore easy ways to add warmth, colour, and personality to your favourite rooms.",
    image: homeDecorImage,
    imageAlt: "Decorative accents for the home",
    action: "Explore home accents",
    to: "/shop/products?department=decoration",
  },
];

const categories = [
  {
    title: "Wall Decor",
    image: homeDecorImage,
    link: makeProductLink("Wall Decor"),
  },
  {
    title: "Lighting",
    image: lampImage,
    link: makeProductLink("Lighting"),
  },
  {
    title: "Soft Furnishings",
    image: pillowCoversImage,
    link: makeProductLink("Soft Furnishings"),
  },
];

const collections = [
  {
    title: "Wall & Table Accents",
    subtitle: "Bring character to empty spaces",
    image: homeDecorImage,
    link: makeProductLink("Wall Decor"),
  },
  {
    title: "Warm Lighting",
    subtitle: "Set a softer mood at home",
    image: lampImage,
    link: makeProductLink("Lighting"),
  },
  {
    title: "Cushions & Covers",
    subtitle: "Add colour and comfort",
    image: pillowCoversImage,
    link: makeProductLink("Soft Furnishings"),
  },
];

export default function DecorationHomepage() {
  return (
    <CategoryLandingPage
      title="Decoration"
      description="Finishing touches and thoughtful accents to make a space yours."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={decorationProducts}
    />
  );
}
