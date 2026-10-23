import React from "react";
import { ArrowRight, BadgeCheck, Tag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const {
    subtotal,
    discount,
    total,
  } = useCart();

  return (
    <aside className="rounded-2xl border border-border-color/80 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
        Nearly yours
      </p>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-text-primary">
        Order summary
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4 text-text-secondary">
          <span>Items total</span>
          <span className="font-medium text-text-primary">₹{subtotal}</span>
        </div>

        <div className="flex justify-between gap-4 text-emerald-700">
          <span className="inline-flex items-center gap-1.5">
            <Tag size={14} />
            Savings vs. original price
          </span>
          <span className="font-medium">₹{discount}</span>
        </div>

        <div className="border-t border-border-color pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-semibold text-text-primary">Total</span>
            <span className="text-xl font-bold text-text-primary">
              ₹{total}
            </span>
          </div>
        </div>
      </div>

      <Link
        to="/coming-soon?feature=Buy%20Now"
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
      >
        Proceed to Checkout
        <ArrowRight size={16} />
      </Link>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-surface p-3 text-xs leading-5 text-text-secondary">
        <BadgeCheck size={16} className="mt-0.5 shrink-0 text-primary" />
        <p>Your order total is based on the current prices shown above.</p>
      </div>
    </aside>
  );
};

export default CartSummary;