import React from "react";

const ProductDetails = ({ product }) => {
  console.log("product-details", product)
  if (!product.details){
    return (
      <section className="mt-12 border-t border-gray-200 pt-10 bg-gray-400 text-center py-10">
        <h2 className="text-2xl font-bold text-white">
          No More Details Found
        </h2>
        <p className="text-sm text-white">
          Please try again later or contact the support.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-text-primary">
        Product Details
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Object.entries(product.details).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b border-gray-100 py-3"
          >
            <span className="text-sm font-medium capitalize text-text-secondary">
              {key.replace(/([A-Z])/g, " $1")}
            </span>

            <span className="text-sm font-semibold text-text-primary">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;