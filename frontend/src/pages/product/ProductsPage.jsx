import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SmallProductCard from "../../components/ui/SmallProductCard";
import { getProducts } from "../../features/admin/api/productApi";

import {
  filterProducts,
  formatLabel,
  getDepartmentCategories,
  normalizeText,
} from "../../utils/productFilters";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedDepartment = searchParams.get("department");
  const selectedCategory = searchParams.get("category");
  const selectedBrand = searchParams.get("brand");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();

        // Supports an Axios response or a direct array response.
        const productData = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : response?.data?.results;

        if (!Array.isArray(productData)) {
          throw new Error("Invalid product response from the server.");
        }

        setProducts(productData);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on URL search parameters
  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        department: selectedDepartment,
        category: selectedCategory,
        brand: selectedBrand,
      }),
    [products, selectedDepartment, selectedCategory, selectedBrand],
  );

  // Get categories available for the selected department
  const categoryOptions = useMemo(() => {
    const categories = getDepartmentCategories(
      products,
      selectedDepartment,
    );

    return ["All Products", ...categories];
  }, [products, selectedDepartment]);

  // Generate the page title
  const pageTitle = useMemo(() => {
    if (selectedBrand && selectedCategory) {
      return `${formatLabel(selectedBrand)} ${formatLabel(selectedCategory)}`;
    }

    if (selectedBrand) {
      return formatLabel(selectedBrand);
    }

    if (selectedCategory) {
      return formatLabel(selectedCategory);
    }

    if (selectedDepartment) {
      return `${formatLabel(selectedDepartment)} Collection`;
    }

    return "All Products";
  }, [selectedDepartment, selectedCategory, selectedBrand]);

  // Update category in the URL
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);

    if (category === "All Products") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    setSearchParams(params);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        {/* Page heading and filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Shop
            </p>

            <h1 className="mt-3 text-3xl font-bold capitalize text-slate-900 md:text-4xl">
              {pageTitle}
            </h1>

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedDepartment && (
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                  {formatLabel(selectedDepartment)}
                </span>
              )}

              {selectedCategory && (
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                  {formatLabel(selectedCategory)}
                </span>
              )}

              {selectedBrand && (
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                  {formatLabel(selectedBrand)}
                </span>
              )}
            </div>
          </div>

          {!loading && !error && categoryOptions.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((category) => {
                const isActive =
                  (!selectedCategory && category === "All Products") ||
                  (Boolean(selectedCategory) &&
                    normalizeText(selectedCategory) ===
                      normalizeText(category));

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={[
                      "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition",
                      isActive
                        ? "border-primary bg-primary text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary",
                    ].join(" ")}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product count */}
        {!loading && !error && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Loading products...
          </div>
        ) : error ? (
          /* Error state */
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-primary px-5 py-2 font-semibold text-white transition hover:opacity-90"
            >
              Retry
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No products found
            </h2>

            <p className="mt-2 text-slate-600">
              Try another category, brand, or explore the full collection.
            </p>
          </div>
        ) : (
          /* Product grid */
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {filteredProducts.map((product) => (
              <SmallProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;