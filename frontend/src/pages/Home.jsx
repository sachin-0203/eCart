import React from "react";
import HeroSection from "../components/sections/HeroSection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import CategorySection from "../components/sections/CategorySection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
    </>
  );
};

export default Home;
