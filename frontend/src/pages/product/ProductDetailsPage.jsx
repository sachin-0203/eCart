import React from "react";
import { useSearchParams } from "react-router-dom";
import { Star, ShoppingCart, ShoppingBag } from "lucide-react";
import ProductImageGallery from "../../components/ui/ProductImageGallery";
import ecommerceData from "../../data/allProduct";

const ProductDetailsPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  const product = ecommerceData.ecommerceProducts.find(
    (item) => item.category === category && item.slug === slug,
  );

  // Product not found
  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Product Not Found
          </h1>

          <p className="mt-2 text-text-secondary">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </section>
    );
  }

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-background px-6 py-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        {/* =========================
            PRODUCT IMAGE
        ========================= */}
        <ProductImageGallery images={product.images} title={product.title} />

        {/* ========================= PRODUCT INFORMATION ========================= */}
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
              {product.rating} ({product.reviews} reviews)
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
      </div>
    </main>
  );
};

export default ProductDetailsPage;
