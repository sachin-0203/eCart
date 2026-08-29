import React from "react";
import { Link } from "react-router-dom";

import {
  categories,
  collections,
  brandCollections,
  products,
} from "../../data/homeLivingData";

import CollectionCard from "../../components/ui/CollectionCard";
import CategoryCard from "../../components/ui/CategoryCard";
import BrandCard from "../../components/ui/BrandCard";
import SmallProductCard from "../../components/ui/SmallProductCard";

const HomeLiving = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">


      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          <div className="overflow-hidden rounded-[2rem] bg-[#0b2e59] text-white shadow-[0_20px_60px_rgba(11,46,89,0.25)]">

            <img
              src="/home-living.jpg"
              alt="Modern home and living essentials"
              className="h-80 w-full object-cover lg:h-[420px]"
            />

            <div className="space-y-4 p-8 lg:p-10">

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                Home & Living
              </p>

              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                Make every corner of your home feel better.
              </h1>

              <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
                Discover bedsheets, curtains, cookware, decor, lighting,
                cleaning essentials and smart storage solutions for modern
                Indian homes.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">

                <Link
                  to="/products?department=home"
                  className="rounded-full bg-white px-5 py-2.5 font-semibold text-[#0b2e59] transition hover:-translate-y-0.5"
                >
                  Shop collection
                </Link>

                <a
                  href="#categories"
                  className="rounded-full border border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Categories
                </a>

              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#ff3f6c]">
                Limited offer
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Refresh your home for less
              </h2>

              <p className="mt-3 text-sm text-slate-600">
                Upgrade everyday essentials with comfortable, practical and
                stylish home products.
              </p>

            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-[#ff3f6c] to-[#f59e0b] p-6 text-white shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/80">
                Top picks
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Essentials for every room
              </h2>

              <p className="mt-3 text-sm text-white/90">
                From bedroom comfort to kitchen organisation, discover
                products designed for everyday living.
              </p>

            </div>

          </div>
        </div>
      </section>

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

            <div
              key={category.title}
              className="w-48 flex-shrink-0"
            >

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
            Discover trusted brands across bedroom, kitchen, decor,
            lighting, cleaning and storage.
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

                  <BrandCard
                    key={brand.name}
                    brand={brand}
                  />

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

            <SmallProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </section>

    </main>
  );
};

export default HomeLiving;