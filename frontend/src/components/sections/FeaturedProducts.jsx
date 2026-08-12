import React from "react";
import { featuredProducts } from "../../data/productsData";
import MainProductCard from "../ui/MainProductCard";

const FeaturedProducts = () => {
  return (
    <section className="bg-background px-6 py-16 lg:px-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-text-primary">
          Featured Products
        </h2>
        <p className="mt-4 text-text-secondary">
          Discover our handpicked collection of premium products
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <MainProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
