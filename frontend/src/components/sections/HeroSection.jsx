import React from "react";
import { ShieldCheck, Star, Truck } from "lucide-react";
import ImageSlider from "../ui/ImageSlider";
import fashionImage from "../../assets/images/categories/footwearImg.jpg";
import styleImage from "../../assets/images/categories/homeImg.jpg";
import beautyImage from "../../assets/images/categories/beautyImg.jpg";

const slides = [
  {
    eyebrow: "New season, new style",
    title: "Find your next",
    highlight: "everyday favourite.",
    description:
      "Fresh fashion and footwear picks to make every day feel a little more you.",
    image: fashionImage,
    imageAlt: "New season footwear collection",
    action: "Shop the collection",
    to: "/shop/products",
  },
  {
    eyebrow: "Make room for better",
    title: "Little upgrades.",
    highlight: "A happier home.",
    description:
      "Discover thoughtful home essentials made for the way you live.",
    image: styleImage,
    imageAlt: "Home and living collection",
    action: "Explore home",
    to: "/shop/home-living",
  },
  {
    eyebrow: "Your feel-good edit",
    title: "A little glow,",
    highlight: "a lot of you.",
    description:
      "Find beauty favourites and everyday essentials picked just for you.",
    image: beautyImage,
    imageAlt: "Beauty collection",
    action: "Shop beauty",
    to: "/shop/beauty",
  },
];

const HeroSection = () => {
  return (
    <>
      <ImageSlider slides={slides} label="Featured collections" />
    </>
  );
};

export default HeroSection;
