import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../data/categoriesData";

const CategorySection = () => {
  return (
    <section className="overflow-hidden bg-surface px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-7 bg-secondary" />
              Find your kind of good
            </p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              A little something
              <span className="font-serif font-normal italic text-secondary">
                {" "}
                for everyone.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-text-secondary sm:text-right">
            From everyday essentials to the unexpected finds you’ll love,
            explore all our collections.
          </p>
        </div>

        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-3 lg:auto-rows-[215px] lg:grid-cols-4">
          {categoriesData.map((category, index) => {
            const isFeatured = index === 0;

            return (
              <Link
                key={category.id}
                to={category.link}
                className={`group relative isolate overflow-hidden rounded-2xl bg-primary ${
                  isFeatured ? "col-span-2 sm:row-span-2" : ""
                }`}
              >
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-black/5 transition-colors duration-300 group-hover:from-black/80" />

                <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-primary sm:right-5 sm:top-5">
                  <ArrowUpRight size={17} />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                  {isFeatured && (
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:mb-3">
                      <ArrowDownRight size={12} />
                      The style edit
                    </span>
                  )}
                  <h3
                    className={`font-semibold text-white ${
                      isFeatured
                        ? "text-2xl sm:text-3xl lg:text-4xl"
                        : "text-base sm:text-lg"
                    }`}
                  >
                    {category.title}
                  </h3>
                  {isFeatured && (
                    <p className="mt-2 hidden max-w-xs text-sm leading-6 text-white/80 sm:block">
                      Pieces that feel like you, for wherever the day takes you.
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
