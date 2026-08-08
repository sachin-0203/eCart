import React from "react";
import { Heart, Star } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-border-color w-60 bg-white hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-50 w-70 object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute right-2 top-2 z-10 rounded-full bg-primary/80 px-2 text-[10px] font-semibold text-white  shadow-md">
          {product.discountPercentage}% OFF
        </div>

        <div className=" absolute left-3 bottom-2 flex items-center gap-1 bg-white/70 px-2 text-black font-semibold text-xs ">
          <span className="text-sm text-black ">{product.rating}</span>
          <div className="text-green-600">

            <Star size={12} className="fill-current" />
          </div>
          |
          <span className="text-black" >{product.reviews}</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-20  inset-0 flex items-end justify-center p-2 opacity-0  transition duration-300 group-hover:opacity-100">
          <div className="w-full border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button className="flex items-center justify-center gap-2 border border-border-color bg-white px-3 py-2 text-[10px] font-semibold text-text-primary  transition hover:bg-slate-100 rounded-sm cursor-pointer">
                <Heart size={12} />
                Wishlist
              </button>
              <button className="rounded-sm bg-primary px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-primary-hover cursor-pointer ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 pb-2 pt-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            {product.category}
          </p>
          <h3 className="text-base font-semibold text-text-primary line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-3 mt-2 ">
              <p className="font-bold text-primary text-sm">Rs.{product.price}</p>
              <p className="text-[11px] text-text-secondary line-through">
                Rs. {product.oldPrice}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
