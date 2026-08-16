import React from "react";
import { ShoppingBag, ShoppingCart, Star } from "lucide-react";

const ProductInfo = ({ product }) => {
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const reviewCount = product.reviewsCount ?? product.reviews?.length ?? 0;

  return (
    <div className="flex flex-col justify-center">
      {/* Category */}
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {product.category}
      </p>

      {/* Title */}
      <h1 className="mt-3 text-3xl font-bold text-text-primary lg:text-4xl">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={18}
              className={
                index < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <span className="text-sm text-text-secondary">
          {product.rating} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-center gap-4">
        <span className="text-3xl font-bold text-primary">
          ₹{product.price}
        </span>

        {product.oldPrice && (
          <span className="text-lg text-text-secondary line-through">
            ₹{product.oldPrice}
          </span>
        )}

        {discountPercentage > 0 && (
          <span className="text-sm font-semibold text-green-600">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-6 leading-7 text-text-secondary">
        {product.description}
      </p>

      {/* Divider */}
      <div className="my-8 border-t border-gray-200" />

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          className="
                flex flex-1 items-center justify-center gap-2
                rounded-lg bg-primary px-6 py-4
                font-semibold text-white
                transition hover:bg-primary-hover
                active:scale-95
              "
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <button
          className="
                flex flex-1 items-center justify-center gap-2
                rounded-lg border border-primary
                px-6 py-4
                font-semibold text-primary
                transition hover:bg-primary hover:text-white
                active:scale-95
              "
        >
          <ShoppingBag size={20} />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
