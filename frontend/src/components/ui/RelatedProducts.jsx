import React from "react";
import SmallProductCard from "./SmallProductCard";

const RelatedProducts = ({ category, relatedProducts }) => {
  const items = Array.isArray(relatedProducts) ? relatedProducts : [];

  if (!items.length) {
    return (
      <section className="mt-12 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-text-primary">
          No related products found
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Please try again later or contact the support.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-text-primary">
        Related Products
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        More products from {category}
      </p>

      <div className="mt-6 grid gap-4   sm:grid-cols-3 lg:grid-cols-5">
        {items.map((relatedProduct) => (
          <SmallProductCard key={relatedProduct.slug} product={relatedProduct} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;