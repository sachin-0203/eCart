import { useEffect, useState } from "react";

import CategoryLandingPage from "../catalog/CategoryLandingPage";

import { categories, collections, brandCollections } from "../../data/MensData";
import ecommerceData from "../../data/mock/allProduct";
import { filterProducts } from "../../utils/productFilters";
import { getMenProducts } from "./api/menApi";

const mensProducts = filterProducts(ecommerceData.ecommerceProducts, {
  department: "men",
});

const heroSlides = [
  {
    eyebrow: "The modern men's edit",
    title: "Make every day",
    highlight: "your own.",
    description:
      "Discover sharp layers, everyday staples, and timeless pieces for wherever the day takes you.",
    image: "/banner/men-banner-1.jpg",
    imageAlt: "Men's contemporary clothing collection",
    action: "Shop men's collection",
    to: "/shop/products?department=men",
  },
  {
    eyebrow: "Easy everyday style",
    title: "Good shoes.",
    highlight: "Great first step.",
    description:
      "Find comfortable footwear made to keep up with your everyday plans.",
    image: "/banner/men-banner-2.jpg",
    imageAlt: "Men's footwear collection",
    action: "Shop men's footwear",
    to: "/shop/products?department=men&category=footwear",
  },
  {
    eyebrow: "Weekend uniform",
    title: "Relaxed fits,",
    highlight: "ready to go.",
    description:
      "Refresh your rotation with easy-to-wear shirts and effortless layers.",
    image: "/banner/men-banner-2.jpg",
    imageAlt: "Men's casual shirts collection",
    action: "Shop men's shirts",
    to: "/shop/products?department=men&category=shirts",
  },
];

export default function MenHomepage() {
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMenProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMenProducts({
          signal: controller.signal,
        });

        console.log("response data==========", response);
        

        setMenProducts(response);
      } catch (err) {
        if (
          err.code === "ERR_CANCELED" ||
          err.name === "CanceledError"
        ) {
          return;
        }

        setError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to fetch men's products."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMenProduct();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p className="p-6">Loading men's products...</p>;
  }

  if (error) {
    return (
      <div className="p-6" role="alert">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 rounded bg-black px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <CategoryLandingPage
      title="Men"
      description="Explore everyday essentials, timeless styles, and the latest trends for men."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={menProducts}
    />
  );
}
