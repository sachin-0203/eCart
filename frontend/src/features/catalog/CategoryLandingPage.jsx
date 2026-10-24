import ImageSlider from "../../components/ui/ImageSlider";
import CategoryCard from "../../components/ui/CategoryCard";
import CollectionCard from "../../components/ui/CollectionCard";
import SmallProductCard from "../../components/ui/SmallProductCard";

export default function CategoryLandingPage({
  title,
  description,
  heroSlides,
  categories,
  collections,
  products,
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
