import React from "react";
import HeroSection from "../components/sections/HeroSection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import CategorySection from "../components/sections/CategorySection";
import NewArrivalsSection from "../components/sections/NewArrivalsSection";
import SportsShoeSection from "../components/sections/SportsShoeSection";
import TrendingShoes from "../components/sections/TrendingShoes";
import WhyChooseUs from "../components/sections/WhyChooseUs";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <WhyChooseUs />
    </>
  );
};

export default Home;
