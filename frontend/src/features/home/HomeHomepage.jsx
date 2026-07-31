import React from "react";
import CategoryCard from "../../components/ui/CategoryCard";
import ProductCard from "../../components/ui/ProductCard";
import { homeHeroCards, homeProducts } from "./data";

const HomeHomepage = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Home & Living
          </p>
          <h1 className="mt-4 text-4xl font-bold text-text-primary sm:text-5xl">
            Household essentials for every room
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
            Discover curtains, bedsheets, kitchen items, storage solutions,
            lighting, cleaning kits and more — all styled for modern Indian
            homes.
          </p>
        </div>

        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Explore categories
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Most popular home categories
              </h2>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {homeHeroCards.map((card) => (
              <div key={card.id} className="min-w-[180px]">
                <CategoryCard
                  key={card.id}
                  title={card.title}
                  image={card.image}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeHomepage;
