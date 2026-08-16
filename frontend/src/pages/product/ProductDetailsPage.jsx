import React from "react";
import { useSearchParams } from "react-router-dom";
import { Star, ShoppingCart, ShoppingBag } from "lucide-react";
import ecommerceData from "../../data/allProduct";
import ProductImageGallery from "../../components/ui/ProductImageGallery";
import ProductInfo from "../../components/ui/ProductInfo";
import ProductDetails from "../../components/ui/ProductDetails";
import ProductReviews from "../../components/ui/Reviews";
import RelatedProducts from "../../components/ui/RelatedProducts";

const ProductDetailsPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  const product = ecommerceData.ecommerceProducts.find(
    (item) => item.category === category && item.slug === slug,
  );

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

  return (
    <main className="min-h-screen bg-background px-6 py-10 lg:px-20">
      <div>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <ProductImageGallery images={product.images} title={product.title} />

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
