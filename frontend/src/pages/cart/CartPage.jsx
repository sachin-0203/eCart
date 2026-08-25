import React from "react";
import { useCart } from "../../Context/CartContext";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

const CartPage = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Shopping Cart
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Your Cart
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}

          <div className="rounded-xl border border-gray-200 bg-white px-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}
          </div>

          {/* Summary */}

          <div>
            <CartSummary />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;