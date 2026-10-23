import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredProducts } from "../../data/productsData";
import MainProductCard from "../ui/MainProductCard";

const FeaturedProducts = () => {
  return (
    <section className="overflow-hidden bg-background px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-7 bg-secondary" />
              The good stuff
            </p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Finds worth
              <span className="font-serif font-normal italic text-secondary">
                {" "}
                finding.
              </span>
            </h2>
          </div>

          <div className="flex items-end justify-between gap-4 sm:justify-end">
            <p className="max-w-sm text-sm leading-6 text-text-secondary sm:text-right">
              Thoughtful picks, standout quality, and little things that make
              everyday life better.
            </p>
            <Link
              to="/shop/products"
              className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-primary transition hover:text-secondary sm:inline-flex"
            >
              View all
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <MainProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl sm:hidden">
        <Link
          to="/shop/products"
          className="flex items-center justify-center gap-2 rounded-full border border-border-color px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary"
        >
          Explore all products
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
