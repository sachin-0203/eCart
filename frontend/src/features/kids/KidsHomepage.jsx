import { Link } from "react-router-dom";
import {
  categories,
  brandCollections,
  collections,
  topwear,
  bottomwear,
  ethnicWear,
  footwear,
  toys,
  schoolEssentials,
} from "./data";
import CollectionCard from "../../components/ui/CollectionCard";
import CategoryCard from "../../components/ui/CategoryCard";
import BrandCard from "../../components/ui/BrandCard";

export default function KidsHomepage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#0b2e59] text-white shadow-[0_20px_60px_rgba(11,46,89,0.25)]">
            <img
              src="/model_kids.avif"
              alt="Stylish male model"
              className="h-70 w-full object-fit lg:h-100"
            />
            <div className="space-y-4 p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                New season essentials
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                Upgrade your wardrobe with confident everyday style.
              </h1>
              <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
                Discover premium shirts, relaxed tees, denim classics, footwear,
                accessories and grooming picks in one place.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/products"
                  className="rounded-full bg-white px-5 py-2.5 font-semibold text-[#0b2e59] transition hover:-translate-y-0.5"
                >
                  Shop collection
                </Link>
                <a
                  href="#brands"
                  className="rounded-full border border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore brands
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
                Flat 20% off on premium essentials
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Grab your favorite picks from the latest men’s edit before it
                sells out.
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-[#ff3f6c] to-[#f59e0b] p-6 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/80">
                Top picks
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                Fresh arrivals from top labels
              </h2>
              <p className="mt-3 text-sm text-white/90">
                From street-ready sneakers to polished shirts, find the pieces
                that match your mood.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10 "
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Categories
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider ">
              Shop by essential style category
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Curated pieces for every part of your day.
          </p>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              image={category.image}
              title={category.title}
              subtitle={category.subtitle}
              link={category.link}
            />
          ))}
        </div>
      </section>

      <section
        id="brand"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Brand
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider ">
              top product from top brands
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {brandCollections.map((brand) => (
            <BrandCard key={brand.title} brand={brand} />
          ))}
        </div>
      </section>

      <section
        id="collections"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Collections
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider ">
              Curated collections for every mood
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {collections.map((c) => (
            <CollectionCard
              key={c.title}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              link={c.link}
            />
          ))}
        </div>
      </section>

      <section
        id="topwear"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              topwear
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest ">
              Trendy in shirt / t-shirt
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {topwear.map((c) => (
            <CollectionCard
              key={c.title}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              link={c.link}
            />
          ))}
        </div>
      </section>

      <section
        id="bottomwear"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              bottomwear
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest ">
              Trendy in Jeans, Trouser and Pants
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {bottomwear.map((c) => (
            <CollectionCard
              key={c.title}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              link={c.link}
            />
          ))}
        </div>
      </section>
      <section
        id="ethnicwear"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              ethnicwear
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest ">
              Trendy in festival and traditional events
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {ethnicWear.map((c) => (
            <CollectionCard
              key={c.title}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              link={c.link}
            />
          ))}
        </div>
      </section>

      <section
        id="footwear"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              footwear
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest ">
              Trendy in shoes , sandals, boots
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {footwear.map((c) => (
            <CollectionCard
              key={c.title}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              link={c.link}
            />
          ))}
        </div>
      </section>

      <section
        id="toys"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              toys
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest ">
              Cool and Modern toys
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {toys.map((c) => (
            <CollectionCard
              key={c.title}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              link={c.link}
            />
          ))}
        </div>
      </section>

      <section
        id="schoolessentials"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              School Essentials
            </p>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest ">
              School products
            </h2>
          </div>
        </div>

        <div className="grid gap-6  sm:grid-cols-3 lg:grid-cols-6">
          {schoolEssentials.map((c) => (
            <CollectionCard
              key={c.title}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              link={c.link}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
