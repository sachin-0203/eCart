import {
  categories,
  brandCollections,
  collections,
} from "../../data/KidsData";

import CollectionCard from "../../components/ui/CollectionCard";
import CategoryCard from "../../components/ui/CategoryCard";
import BrandCard from "../../components/ui/BrandCard";
import ImageSlider from "../../components/ui/ImageSlider";

const heroSlides = [
  {
    eyebrow: "Big fun starts here",
    title: "Little looks.",
    highlight: "Big adventures.",
    description:
      "Find playful, comfy styles for school days, weekends, and everything in between.",
    image: "/banner/kids-banner-1.jpg",
    imageAlt: "Kids fashion collection",
    action: "Shop kids' collection",
    to: "/shop/products?department=kids",
  },
  {
    eyebrow: "Ready, set, play",
    title: "Made for moving.",
    highlight: "Built for fun.",
    description:
      "Comfy everyday outfits that are ready for every game, trip, and adventure.",
    image: "/banner/kids-banner-2.jpg",
    imageAlt: "Kids outdoor adventure collection",
    action: "Shop kids' outfits",
    to: "/shop/products?department=kids&category=topwear",
  },
  {
    eyebrow: "Everyday favourites",
    title: "Their new",
    highlight: "favourite fit.",
    description:
      "Meet soft tees, easy layers, and colourful essentials made for little personalities.",
    image: "/banner/kids-banner-3.jpg",
    imageAlt: "Kids topwear collection",
    action: "Explore topwear",
    to: "/shop/products?department=kids&category=topwear",
  },
];

export default function KidsHomepage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ImageSlider slides={heroSlides} label="Kids' featured collection" />

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Categories
            </p>

            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">
              Shop by kids category
            </h2>

          </div>

          <p className="text-sm text-slate-600">
            Everything little ones need for every part of their day.
          </p>

        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

          {categories.map((category) => (
            <div
              key={category.title}
              className="flex-shrink-0 w-48"
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
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >

        <div className="mb-6 flex items-end justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Collections
            </p>

            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">
              Curated collections for every occasion
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
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >

        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Shop by brands
          </p>

          <h2 className="mt-2 text-2xl font-bold uppercase tracking-wider text-slate-900">
            Explore favorite kids brands
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Discover popular kids brands across clothing, footwear,
            toys and school essentials.
          </p>

        </div>

        <div className="space-y-12">

          {brandCollections.map((collection) => (

            <div key={collection.title}>


              <div className="mb-5">

                <h3 className="text-xl font-bold uppercase tracking-wide text-slate-900">
                  {collection.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {collection.subtitle}
                </p>

              </div>

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

    </main>
  );
}
