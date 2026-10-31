import React from "react";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProductImage } from "../../features/admin/api/productApi";

export default function MainProductCard({ product }) {
  const { addToCart } = useCart();

  const discount =
    product.discountPercentage ??
    (product.oldPrice && product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0);
  const reviewCount =
    product.reviewsCount ??
    (Array.isArray(product.reviews) ? product.reviews.length : product.reviews);
  const badge =
    product.badge ??
    (product.bestseller
      ? "Best seller"
      : product.rating >= 4.8
        ? "Customer choice"
        : discount >= 40
          ? "High value"
          : product.featured
            ? "Featured"
            : null);
  const productUrl = `/shop/products-details?category=${encodeURIComponent(
    product.category,
  )}&slug=${encodeURIComponent(product.slug)}`;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-border-color/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={productUrl}
        className="relative block aspect-[4/5] overflow-hidden bg-surface"
      >
        <img
          src={getProductImage(product)}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

        {badge && (
          <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-sm sm:left-4 sm:top-4">
            {badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-secondary px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm sm:right-4 sm:top-4">
            {discount}% OFF
          </span>
        )}

        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:right-4">
          <ArrowUpRight size={17} />
        </span>
      </Link>

      <div className="space-y-2.5 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-secondary sm:text-[10px]">
            {product.category}
          </span>

          {product.rating != null && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-text-primary">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          )}
        </div>

        <div className="min-h-10">
          <Link to={productUrl} className="block">
            <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-secondary sm:text-lg">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex min-h-8 items-center justify-between gap-1 border-t border-border-color/70 pt-1">
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-sm font-bold text-text-primary sm:text-base">
              ₹{product.price}
            </span>

            {product.oldPrice > product.price && (
              <span className="text-[10px] text-text-secondary line-through sm:text-xs">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          {reviewCount != null && (
            <span className="shrink-0 text-[9px] text-text-secondary sm:text-[10px]">
              ({reviewCount})
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-2.5 text-[11px] font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-xs"
        >
          <ShoppingBag size={14} />
          Add to bag
        </button>
      </div>
    </article>
  );
}