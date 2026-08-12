export default function MainProductCard({ product }) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />
        {/* keep discount badge if you want */}
        <div className="absolute right-3 top-3 rounded-full bg-primary/80 px-2 text-[10px] font-semibold text-white">
          {product.discountPercentage}% OFF
        </div>
      </div>

      <div className="p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
          {product.category}
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-text-primary line-clamp-1">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-bold text-primary">Rs.{product.price}</p>
          <p className="text-sm text-text-secondary line-through">
            Rs. {product.oldPrice}
          </p>
        </div>

        <button className="mt-4 text-primary transition hover:text-primary-hover">
          Add to Cart →
        </button>
      </div>
    </div>
  );
}