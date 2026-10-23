import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center overflow-hidden bg-surface px-5 py-16">
      <section className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border-color/80 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
        <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-secondary/10" />
        <span className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-primary/5" />

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface text-primary">
          <ShoppingBag size={34} strokeWidth={1.5} />
          <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full border-4 border-white bg-secondary" />
        </div>

        <p className="relative mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
          A little room for something lovely
        </p>
        <h1 className="relative mt-2 font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Your bag is waiting
        </h1>
        <p className="relative mx-auto mt-3 max-w-sm text-sm leading-6 text-text-secondary">
          You haven’t found your next favourite just yet. Take a look around
          and see what catches your eye.
        </p>

        <Link
          to="/shop/products"
          className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          Find something lovely
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
};

export default EmptyCart;