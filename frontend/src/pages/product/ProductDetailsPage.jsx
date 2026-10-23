import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ecommerceData from "../../data/allProduct";
import ProductImageGallery from "../../components/ui/ProductImageGallery";
import ProductInfo from "../../components/ui/ProductInfo";
import ProductDetails from "../../components/ui/ProductDetails";
import ProductReviews from "../../components/ui/Reviews";
import RelatedProducts from "../../components/ui/RelatedProducts";
import { getProductBySlug } from "../../features/admin/api/products";

const ProductDetailsPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  const catalogProduct = ecommerceData.ecommerceProducts.find(
    (item) => item.category === category && item.slug === slug,
  );
  const [apiProduct, setApiProduct] = useState(null);
  const [isLoadingApiProduct, setIsLoadingApiProduct] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    if (!slug || catalogProduct) {
      setApiProduct(null);
      setApiError("");
      setIsLoadingApiProduct(false);
      return undefined;
    }

    setApiProduct(null);
    setApiError("");
    setIsLoadingApiProduct(true);

    getProductBySlug(slug)
      .then((product) => {
        if (isCurrent) setApiProduct(product);
      })
      .catch((error) => {
        if (isCurrent) setApiError(error.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoadingApiProduct(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [slug, catalogProduct]);

  const product = catalogProduct ?? (apiProduct
    ? {
        ...apiProduct,
        oldPrice: apiProduct.old_price,
        discountPercentage: Number(apiProduct.discount_percentage),
        reviewsCount: apiProduct.review_count,
        productType: apiProduct.product_type,
        description: apiProduct.description || apiProduct.short_description,
        images: [],
        reviews: [],
        details: {},
      }
    : null);

  const relatedProducts = product?.relatedProducts?.length
    ? ecommerceData.ecommerceProducts.filter((item) =>
        product.relatedProducts.includes(item.slug),
      )
    : ecommerceData.ecommerceProducts
        .filter((item) => item.category === category && item.slug !== slug)
        .slice(0, 4);

  // Product not found
  if (!product) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            {isLoadingApiProduct
              ? "Loading product..."
              : apiError
                ? "Could not load product"
                : "Product Not Found"}
          </h1>

          <p className="mt-2 text-text-secondary">
            {apiError ||
              (isLoadingApiProduct
                ? "Please wait while we load the product details."
                : "The product you're looking for doesn't exist.")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 lg:px-20">
      <div>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <ProductImageGallery
            images={product.images ?? (product.image ? [product.image] : [])}
            title={product.title}
          />

          <ProductInfo product={product} />

          <ProductDetails product={product} />

          <ProductReviews product={product} />
        </div>
        <RelatedProducts category={product.category} relatedProducts={relatedProducts} />
      </div>
    </main>
  );
};

export default ProductDetailsPage;
