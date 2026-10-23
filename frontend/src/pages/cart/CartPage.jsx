import React from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

const CartPage = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <main className="min-h-screen bg-surface px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-7 bg-secondary" />
              Your good finds
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Shopping
              <span className="font-serif font-normal italic text-secondary">
                {" "}
                bag.
              </span>
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"} picked out just
              for you
            </p>
          </div>

          <Link
            to="/shop/products"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-color bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary"
          >
            <ArrowLeft size={15} />
            Keep exploring
          </Link>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="overflow-hidden rounded-2xl border border-border-color/80 bg-white px-4 shadow-sm sm:px-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <CartSummary />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-text-secondary">
          <ShoppingBag size={14} />
          <span>Your picks are saved in your bag while you browse.</span>
        </div>
      </section>
    </main>
  );
};

export default CartPage;