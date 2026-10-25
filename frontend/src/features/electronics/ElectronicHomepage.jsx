import CategoryLandingPage from "../catalog/CategoryLandingPage";
import ecommerceData from "../../data/mock/allProduct";
import wirelessHeadphonesImage from "../../assets/images/products/electronics/wireless-headphones.jpg";
import smartphoneChargerImage from "../../assets/images/products/electronics/smartphone-charger.jpg";
import smartwatchImage from "../../assets/images/products/electronics/smartwatch.jpg";
import electronicsCategoryImage from "../../assets/images/categories/electronicImg.jpg";
import { filterProducts } from "../../utils/productFilters";

const makeProductLink = (category) =>
  `/shop/products?department=electronics&category=${encodeURIComponent(category)}`;

const heroSlides = [
  {
    eyebrow: "Tech for every day",
    title: "Make your",
    highlight: "day smarter.",
    description:
      "Discover audio, mobile accessories, and wearables made to fit right into your routine.",
    image: electronicsCategoryImage,
    imageAlt: "Everyday electronics and smart devices",
    action: "Shop electronics",
    to: "/shop/products?department=electronics",
  },
  {
    eyebrow: "Sound on the go",
    title: "Find your",
    highlight: "everyday sound.",
    description:
      "Enjoy your favourite playlists with comfortable wireless audio essentials.",
    image: wirelessHeadphonesImage,
    imageAlt: "Wireless headphones",
    action: "Explore audio",
    to: makeProductLink("Audio"),
  },
];

const categories = [
  {
    title: "Audio",
    image: wirelessHeadphonesImage,
    link: makeProductLink("Audio"),
  },
  {
    title: "Mobile Accessories",
    image: smartphoneChargerImage,
    link: makeProductLink("Mobile Accessories"),
  },
  {
    title: "Wearables",
    image: smartwatchImage,
    link: makeProductLink("Wearables"),
  },
];

const collections = [
  {
    title: "Audio Essentials",
    subtitle: "Wireless sound for wherever you go",
    image: wirelessHeadphonesImage,
    link: makeProductLink("Audio"),
  },
  {
    title: "Mobile Must-Haves",
    subtitle: "Chargers and cables for daily use",
    image: smartphoneChargerImage,
    link: makeProductLink("Mobile Accessories"),
  },
  {
    title: "Smart Wearables",
    subtitle: "Stay connected throughout the day",
    image: smartwatchImage,
    link: makeProductLink("Wearables"),
  },
];

const products = filterProducts(ecommerceData.ecommerceProducts, {
  department: "electronics",
});

export default function ElectronicHomepage() {
  return (
    <CategoryLandingPage
      title="Electronics"
      description="Useful tech and everyday devices to keep you connected."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={products}
    />
  );
}
