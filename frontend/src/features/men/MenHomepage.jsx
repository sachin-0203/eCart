import { categories, collections } from "../../data/MensData";
import CollectionCard from "../../components/ui/CollectionCard";
import CategoryCard from "../../components/ui/CategoryCard";
import ImageSlider from "../../components/ui/ImageSlider";
import SmallProductCard from "../../components/ui/SmallProductCard";
import ecommerceData from "../../data/allProduct";
import { filterProducts } from "../../utils/productFilters";

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
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ImageSlider slides={heroSlides} label="Men's featured collection" />

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
        id="mens-products"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
      >
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Shop men
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
            All men&apos;s products
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Explore the complete collection of men&apos;s styles.
          </p>
        </div>

        {mensProducts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            No men&apos;s products are available right now.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {mensProducts.map((product) => (
              <SmallProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* <section
        id="brands"
        className=" mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 my-10"
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
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </main>
  );
}
