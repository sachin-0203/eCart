import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock3, ArrowLeft, ShoppingBag } from "lucide-react";

const ComingSoonPage = () => {
  const location = useLocation();

  const feature = new URLSearchParams(location.search).get("feature");

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 flex items-center justify-center">
      <section className="w-full max-w-2xl text-center">
        
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Clock3 size={40} className="text-primary" />
        </div>

        {/* Content */}
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Coming Soon
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
          {feature || "This feature"}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
          We're currently working on this feature to make your shopping
          experience better. It will be available soon.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            to="/shop/products"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ComingSoonPage;