import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../Context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 border-b border-gray-200 py-6">
      {/* Product Image */}

      <img
        src={item.image}
        alt={item.title}
        className="h-28 w-24 rounded-lg object-cover"
      />

      {/* Product Info */}

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            {item.category}
          </p>

          <h3 className="mt-1 font-semibold">{item.title}</h3>

          {item.brand && (
            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Quantity */}

          <div className="flex items-center rounded-lg border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2"
            >
              <Minus size={16} />
            </button>

            <span className="px-3 text-sm font-semibold">{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Price */}

          <p className="font-bold">₹{item.price * item.quantity}</p>

          {/* Remove */}

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
