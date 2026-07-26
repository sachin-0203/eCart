import React from "react";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {

  return (
    <div className="group overflow-hidden rounded-3xl border border-border-color bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden">

        {/* DISCOUNT BADGE */}
        <div className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white shadow-md">
          {product.discountPercentage}% OFF
        </div>

        {/* PRODUCT IMAGE */}
        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* QUICK VIEW OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition duration-300 group-hover:opacity-100">

          <button className="rounded-xl bg-white px-5 py-2 font-semibold text-text-primary shadow-lg transition hover:scale-105">
            Quick View
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* CATEGORY */}
        <p className="text-sm font-medium uppercase tracking-wide text-text-secondary">
          {product.category}
        </p>

        {/* TITLE */}
        <h3 className="mt-2 line-clamp-1 text-xl font-semibold text-text-primary">
          {product.title}
        </h3>

        {/* RATING */}
        <div className="mt-3 flex items-center gap-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm text-text-secondary">
            {product.rating}
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-bold text-primary">
            ₹{product.price}
          </span>

          <span className="text-sm text-text-secondary line-through">
            ₹{product.oldPrice}
          </span>
        </div>

        {/* BUTTON */}
        <button className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-hover hover:shadow-lg">

          Add To Cart
        </button>
      </div>
    </div>
  );
}