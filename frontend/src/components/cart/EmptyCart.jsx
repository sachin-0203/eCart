import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <ShoppingCart
        size={60}
        className="text-gray-400"
      />

      <h1 className="mt-6 text-2xl font-bold">
        Your cart is empty
      </h1>

      <p className="mt-2 text-gray-500">
        Looks like you haven't added anything yet.
      </p>

      <Link
        to="/shop/products"
        className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;