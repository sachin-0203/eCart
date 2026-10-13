import {
  categories,
  brandCollections,
  collections
} from "../../data/WomensData";
import CollectionCard from "../../components/ui/CollectionCard";
import CategoryCard from "../../components/ui/CategoryCard";
import BrandCard from "../../components/ui/BrandCard";
import ImageSlider from "../../components/ui/ImageSlider";

const heroSlides = [
  {
    eyebrow: "The new women's edit",
    title: "Style that feels",
    highlight: "like you.",
    description:
      "Discover considered everyday pieces, fresh silhouettes, and favourites for every occasion.",
    image: "/banner/women-banner-1.jpg",
    imageAlt: "Women's dress collection",
    action: "Shop women's collection",
    to: "/shop/products?department=women",
  },
  {
    eyebrow: "Made for sunny days",
    title: "A fresh look",
    highlight: "for the season.",
    description:
      "Light layers and easy outfits to bring a little sunshine to your wardrobe.",
    image: "/banner/women-banner-2.jpg",
    imageAlt: "Women's summer collection",
    action: "Shop summer styles",
    to: "/shop/products?department=women&category=dresses",
  },
  {
    eyebrow: "A moment to dress up",
    title: "Make an entrance.",
    highlight: "Stay unforgettable.",
    description:
      "Find occasion-ready looks with just the right amount of statement.",
    image: "/banner/women-banner-3.jpg",
    imageAlt: "Women's occasion wear collection",
    action: "Explore occasion wear",
    to: "/shop/products?department=women&category=dresses",
  },
];

export default function WomenHomepage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ImageSlider slides={heroSlides} label="Women's featured collection" />

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

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <div key={category.title} className="flex-shrink-0 w-48">
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
        id="brands"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Shop by brands
          </p>

          <h2 className="mt-2 text-2xl font-bold uppercase tracking-wider text-slate-900">
            Explore your favorite brands
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Discover popular brands across every men's fashion category.
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
    </main>
  );
}
