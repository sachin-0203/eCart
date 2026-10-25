import ImageSlider from "../../components/ui/ImageSlider";
import CategoryCard from "../../components/ui/CategoryCard";
import CollectionCard from "../../components/ui/CollectionCard";
import SmallProductCard from "../../components/ui/SmallProductCard";
import BrandCard from "../../components/ui/BrandCard";

export default function CategoryLandingPage({
  title,
  description,
  heroSlides,
  categories,
  collections,
  products,
  brandCollections = []
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ImageSlider slides={heroSlides} label={`${title} featured collection`} />

      <section className="mx-auto my-10 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
              Categories
            </p>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
              Shop {title.toLowerCase()} by category
            </h2>
          </div>
          <p className="text-sm text-slate-600">{description}</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <div key={category.title} className="w-48 flex-shrink-0">
              <CategoryCard
                image={category.image}
                title={category.title}
                link={category.link}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto my-10 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Collections
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
            Curated {title.toLowerCase()} essentials
          </h2>
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

      {brandCollections.length > 0 && <section
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
      </section>}

      <section className="mx-auto my-10 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Shop {title}
          </p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-wider text-slate-900">
            All {title.toLowerCase()} products
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Discover the latest essentials, selected for everyday use.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            No {title.toLowerCase()} products are available right now.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <SmallProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
