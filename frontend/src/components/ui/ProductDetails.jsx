import React from "react";

const ProductDetails = ({ product }) => {
  const details = product.details ?? {};
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const productTypeLabels = {
    men: "Men",
    women: "Women",
    children: "Children",
    unisex: "Unisex",
  };

  if (
    !Object.keys(details).length &&
    !product.productType &&
    sizes.length === 0
  ) {
    return (
      <section className="mt-12 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-text-primary">
          Product Details
        </h2>
        <p className="mt-4 text-sm text-text-secondary">
          No additional details are available for this product.
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
        {product.productType && (
          <div className="flex items-center justify-between border-b border-gray-100 py-3">
            <span className="text-sm font-medium text-text-secondary">
              Product type
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {productTypeLabels[product.productType] ?? product.productType}
            </span>
          </div>
        )}

        {Object.entries(details).map(([key, value]) => (
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

        {sizes.length > 0 && (
          <div className="border-b border-gray-100 py-3 sm:col-span-2">
            <p className="text-sm font-medium text-text-secondary">
              Available sizes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-border-color bg-white px-3 py-1.5 text-xs font-semibold text-text-primary"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;