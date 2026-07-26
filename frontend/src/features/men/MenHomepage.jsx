import { Link } from "react-router-dom";

const categories = [
  { name: "Shirts", emoji: "👔", desc: "Tailored staples" },
  { name: "T-Shirts", emoji: "👕", desc: "Everyday comfort" },
  { name: "Jeans", emoji: "👖", desc: "Clean denim picks" },
  { name: "Footwear", emoji: "👟", desc: "Modern sneakers" },
  { name: "Accessories", emoji: "🧣", desc: "Elevated details" },
  { name: "Grooming", emoji: "🪒", desc: "Fresh essentials" },
];

const brandCollections = [
  {
    title: "Shirts",
    subtitle: "Sharp tailoring for work and weekends",
    brands: ["Arrow", "Peter England", "Van Heusen", "Park Avenue"],
  },
  {
    title: "T-Shirts",
    subtitle: "Soft fits for relaxed everyday styling",
    brands: ["Levis", "H&M", "Roadster", "US Polo Assn."],
  },
  {
    title: "Jeans",
    subtitle: "Premium denim with comfort built in",
    brands: ["Wrangler", "Lee", "Pepe Jeans", "Levis"],
  },
  {
    title: "Footwear",
    subtitle: "Sporty, sleek and seasonal essentials",
    brands: ["Nike", "Adidas", "Puma", "Crocs"],
  },
  {
    title: "Accessories",
    subtitle: "Caps, belts, watches and bags that complete the look",
    brands: ["Fossil", "Ray-Ban", "Tommy Hilfiger", "Casio"],
  },
  {
    title: "Grooming",
    subtitle: "Care products for a polished routine",
    brands: ["Beardo", "The Man Company", "Gillette", "Nivea"],
  },
];

export default function MenHomepage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#0b2e59] text-white shadow-[0_20px_60px_rgba(11,46,89,0.25)]">
            <img
              src="/model_men.avif"
              alt="Stylish male model"
              className="h-80 w-full object-cover lg:h-[420px]"
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

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Categories
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Shop by essential style category
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Curated pieces for every part of your day.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  {category.emoji}
                </div>
                <span className="rounded-full bg-[#fff0f4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3f6c]">
                  Trending
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{category.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="brands" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Top brands
          </p>
          <h2 className="text-2xl font-bold text-slate-900">
            Popular labels across each category
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {brandCollections.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    {item.title}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">
                    {item.subtitle}
                  </h3>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  Top picks
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.brands.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
