import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const {
    subtotal,
    discount,
    total,
  } = useCart();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-bold">
        Price Details
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total-discount}</span>
          </div>
        </div>
      </div>

      <Link
        to="/coming-soon?feature=Buy%20Now"
        className="mt-6 block rounded-lg bg-primary px-6 py-4 text-center font-semibold text-white"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;