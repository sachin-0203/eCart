import ecommerceData from "../../data/allProduct";
import decorationProducts from "../../data/decorationData";
import antiAgingSerumImage from "../../assets/images/products/beauty/anti-aging-serum.jpg";
import hairCareImage from "../../assets/images/products/beauty/hair-shampoo-conditioner.jpg";
import lipstickImage from "../../assets/images/products/beauty/lipstick-collection.jpg";
import wirelessHeadphonesImage from "../../assets/images/products/electronics/wireless-headphones.jpg";
import smartphoneChargerImage from "../../assets/images/products/electronics/smartphone-charger.jpg";
import smartwatchImage from "../../assets/images/products/electronics/smartwatch.jpg";
import pillowCoversImage from "../../assets/images/products/home/decorative-pillow-covers.jpg";
import homeDecorImage from "../../assets/images/products/home/home-decor.jpg";
import lampImage from "../../assets/images/products/home/led-table-lamp.jpg";
import beautyCategoryImage from "../../assets/images/categories/beautyImg.jpg";
import electronicsCategoryImage from "../../assets/images/categories/electronicImg.jpg";
import decorationCategoryImage from "../../assets/images/categories/decorationImg.jpg";
import { filterProducts } from "../../utils/productFilters";

const products = ecommerceData.ecommerceProducts;

const makeProductLink = (department, category) =>
  `/shop/products?department=${department}&category=${encodeURIComponent(category)}`;

export const beautyLandingData = {
  title: "Beauty",
  description: "Everyday care and beauty essentials, curated for your routine.",
  heroSlides: [
    {
      eyebrow: "Your everyday glow",
      title: "A little care,",
      highlight: "a lot of confidence.",
      description:
        "Discover skincare, makeup, and haircare favourites for your daily routine.",
      image: beautyCategoryImage,
      imageAlt: "Beauty and skincare essentials",
      action: "Shop beauty",
      to: "/shop/products?department=beauty",
    },
    {
      eyebrow: "Care that feels good",
      title: "Find your",
      highlight: "new favourites.",
      description:
        "Explore thoughtful essentials to help you feel fresh, confident, and ready for the day.",
      image: antiAgingSerumImage,
      imageAlt: "Skincare serum and beauty products",
      action: "Explore skincare",
      to: makeProductLink("beauty", "Skincare"),
    },
  ],
  categories: [
    {
      title: "Skincare",
      image: antiAgingSerumImage,
      link: makeProductLink("beauty", "Skincare"),
    },
    {
      title: "Makeup",
      image: lipstickImage,
      link: makeProductLink("beauty", "Makeup"),
    },
    {
      title: "Haircare",
      image: hairCareImage,
      link: makeProductLink("beauty", "Haircare"),
    },
  ],
  collections: [
    {
      title: "Skincare Favourites",
      subtitle: "Hydration and daily care",
      image: antiAgingSerumImage,
      link: makeProductLink("beauty", "Skincare"),
    },
    {
      title: "Makeup Essentials",
      subtitle: "Easy colour for every day",
      image: lipstickImage,
      link: makeProductLink("beauty", "Makeup"),
    },
    {
      title: "Haircare Routine",
      subtitle: "Nourish from root to tip",
      image: hairCareImage,
      link: makeProductLink("beauty", "Haircare"),
    },
  ],
  products: filterProducts(products, { department: "beauty" }),
};

export const electronicsLandingData = {
  title: "Electronics",
  description: "Useful tech and everyday devices to keep you connected.",
  heroSlides: [
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
      to: makeProductLink("electronics", "Audio"),
    },
  ],
  categories: [
    {
      title: "Audio",
      image: wirelessHeadphonesImage,
      link: makeProductLink("electronics", "Audio"),
    },
    {
      title: "Mobile Accessories",
      image: smartphoneChargerImage,
      link: makeProductLink("electronics", "Mobile Accessories"),
    },
    {
      title: "Wearables",
      image: smartwatchImage,
      link: makeProductLink("electronics", "Wearables"),
    },
  ],
  collections: [
    {
      title: "Audio Essentials",
      subtitle: "Wireless sound for wherever you go",
      image: wirelessHeadphonesImage,
      link: makeProductLink("electronics", "Audio"),
    },
    {
      title: "Mobile Must-Haves",
      subtitle: "Chargers and cables for daily use",
      image: smartphoneChargerImage,
      link: makeProductLink("electronics", "Mobile Accessories"),
    },
    {
      title: "Smart Wearables",
      subtitle: "Stay connected throughout the day",
      image: smartwatchImage,
      link: makeProductLink("electronics", "Wearables"),
    },
  ],
  products: filterProducts(products, { department: "electronics" }),
};

export const decorationLandingData = {
  title: "Decoration",
  description: "Finishing touches and thoughtful accents to make a space yours.",
  heroSlides: [
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
  ],
  categories: [
    {
      title: "Wall Decor",
      image: homeDecorImage,
      link: makeProductLink("decoration", "Wall Decor"),
    },
    {
      title: "Lighting",
      image: lampImage,
      link: makeProductLink("decoration", "Lighting"),
    },
    {
      title: "Soft Furnishings",
      image: pillowCoversImage,
      link: makeProductLink("decoration", "Soft Furnishings"),
    },
  ],
  collections: [
    {
      title: "Wall & Table Accents",
      subtitle: "Bring character to empty spaces",
      image: homeDecorImage,
      link: makeProductLink("decoration", "Wall Decor"),
    },
    {
      title: "Warm Lighting",
      subtitle: "Set a softer mood at home",
      image: lampImage,
      link: makeProductLink("decoration", "Lighting"),
    },
    {
      title: "Cushions & Covers",
      subtitle: "Add colour and comfort",
      image: pillowCoversImage,
      link: makeProductLink("decoration", "Soft Furnishings"),
    },
  ],
  products: decorationProducts,
};
