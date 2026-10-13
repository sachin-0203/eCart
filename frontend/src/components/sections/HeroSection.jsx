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

const highlights = [
  { icon: Truck, title: "Fast delivery", text: "Across India in 24-48 hrs" },
  {
    icon: ShieldCheck,
    title: "Verified quality",
    text: "Trusted brands and products",
  },
  { icon: Star, title: "Top rated", text: "Loved by 10k+ shoppers" },
];

const HeroSection = () => {
  return (
    <>
      <ImageSlider slides={slides} label="Featured collections" />

      <div className="mx-auto grid max-w-7xl gap-4 bg-white px-6 pb-10 md:grid-cols-3 lg:px-10">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="flex items-center gap-3 rounded-xl border border-border-color bg-white p-4 shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <highlight.icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-text-primary">
                {highlight.title}
              </p>
              <p className="text-sm text-text-secondary">{highlight.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroSection;
