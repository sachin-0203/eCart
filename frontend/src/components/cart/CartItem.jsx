import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const productUrl = `/shop/products-details?category=${encodeURIComponent(
    item.category,
  )}&slug=${encodeURIComponent(item.slug)}`;

  return (
    <article className="flex gap-4 border-b border-border-color/70 py-5 last:border-b-0 sm:gap-5 sm:py-6">
      <Link
        to={productUrl}
        className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-surface sm:h-32 sm:w-28"
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">
            {item.category}
          </p>
          <Link to={productUrl}>
            <h2 className="mt-1 line-clamp-2 font-serif text-base font-semibold leading-snug text-text-primary transition-colors hover:text-secondary sm:text-lg">
              {item.title}
            </h2>
          </Link>
          {item.brand && (
            <p className="mt-1 text-xs text-text-secondary">{item.brand}</p>
          )}
          <p className="mt-2 text-sm font-semibold text-text-primary">
            ₹{item.price}
            {item.oldPrice > item.price && (
              <span className="ml-2 text-xs font-normal text-text-secondary line-through">
                ₹{item.oldPrice}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="inline-flex items-center rounded-full border border-border-color bg-white">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-l-full text-text-primary transition hover:bg-surface"
              aria-label={`Decrease quantity of ${item.title}`}
            >
              <Minus size={14} />
            </button>
            <span
              className="min-w-8 text-center text-xs font-semibold text-text-primary"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-r-full text-text-primary transition hover:bg-surface"
              aria-label={`Increase quantity of ${item.title}`}
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="min-w-16 text-right text-sm font-bold text-text-primary">
            ₹{item.price * item.quantity}
          </p>

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-red-50 hover:text-red-600"
            aria-label={`Remove ${item.title} from cart`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
