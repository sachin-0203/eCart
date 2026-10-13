import React from "react";
import { Link } from "react-router-dom";

import {
  categories,
  collections,
  brandCollections,
  products,
} from "../../data/homeLivingData";

import ImageSlider from "../../components/ui/ImageSlider";

import CollectionCard from "../../components/ui/CollectionCard";
import CategoryCard from "../../components/ui/CategoryCard";
import BrandCard from "../../components/ui/BrandCard";
import SmallProductCard from "../../components/ui/SmallProductCard";

import bedSheetImage from "../../assets/images/products/home/cotton-bed-sheet-set.jpg";
import curtainsImg from "../../assets/images/products/home/blackout-curtain-pair.jpg";
import cookwareImage from "../../assets/images/products/home/stainless-steel-spice-jar-set.jpg";


const heroSlides = [
  {
    eyebrow: "Comfort starts at home",
    title: "Make your bedroom",
    highlight: "a softer escape.",
    description:
      "Discover soft bedsheets and beautiful bedroom essentials designed to make every night more comfortable.",
    image: bedSheetImage,
    imageAlt: "Soft bedsheets and bedroom essentials",
    action: "Shop bedsheets",
    to: "/shop/products?department=home&category=bedsheets",
  },
  {
    eyebrow: "Style meets privacy",
    title: "Dress your windows",
    highlight: "beautifully.",
    description:
      "Explore stylish curtains that bring warmth, privacy, and personality to every room.",
    image: curtainsImg,
    imageAlt: "Stylish curtains for modern homes",
    action: "Shop curtains",
    to: "/shop/products?department=home&category=curtains",
  },
  {
    eyebrow: "Everyday cooking, elevated",
    title: "Cook with ease.",
    highlight: "Serve with love.",
    description:
      "Upgrade your cooking experience with dependable cookware made for everyday meals and special moments.",
    image: cookwareImage,
    imageAlt: "Cookware for everyday kitchen essentials",
    action: "Shop cookware",
    to: "/shop/products?department=home&category=cookware",
  },
]

const HomeLiving = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ImageSlider slides={heroSlides} label="Men's featured collection" />

      <section
        id="categories"
        className="mx-auto my-10 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Categories
            </p>

            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
              Shop by home category
            </h2>
          </div>

          <p className="text-sm text-slate-600">
            Everything you need to make your home comfortable and organised.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <div key={category.title} className="w-48 flex-shrink-0">
              <CategoryCard
                image={category.image}
                title={category.title}
                subtitle={category.subtitle}
                link={category.link}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        id="collections"
        className="mx-auto my-10 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Collections
            </p>

            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
              Curated collections for every room
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.title}
              image={collection.image}
              title={collection.title}
              subtitle={collection.subtitle}
              link={collection.link}
            />
          ))}
        </div>
      </section>

      <section
        id="brands"
        className="mx-auto my-10 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Shop by brands
          </p>

          <h2 className="mt-2 text-2xl font-bold uppercase tracking-wider text-slate-900">
            Explore your favorite home brands
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Discover trusted brands across bedroom, kitchen, decor, lighting,
            cleaning and storage.
          </p>
        </div>

        <div className="space-y-12">
          {brandCollections.map((collection) => (
            <div key={collection.title}>
              {/* Category Heading */}

              <div className="mb-5">
                <h3 className="text-xl font-bold uppercase tracking-wide text-slate-900">
                  {collection.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {collection.subtitle}
                </p>
              </div>

              {/* Brand Cards */}

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {collection.brands.map((brand) => (
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="products"
        className="mx-auto my-10 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Featured products
            </p>

            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wider text-slate-900">
              Popular home essentials
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Practical and stylish products selected for everyday living.
            </p>
          </div>

          <Link
            to="/products?department=home"
            className="text-sm font-semibold text-[#ff3f6c] transition hover:underline"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <SmallProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeLiving;