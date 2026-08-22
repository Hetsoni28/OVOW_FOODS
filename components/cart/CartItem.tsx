"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";

export function CartItem({ item }: { item: CartItemType }) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="flex items-start gap-4 py-5 border-b border-primary/10 last:border-0">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-base leading-snug text-primary font-semibold">
          {item.name}
        </p>
        <p className="text-xs text-primary/50 mt-0.5">{item.size}</p>
        <p className="text-sm font-semibold text-[#C9A24A] mt-1">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2 mt-1">
        <button suppressHydrationWarning
          onClick={() => decrement(item.slug)}
          className="w-8 h-8 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={12} />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-primary">
          {item.quantity}
        </span>
        <button suppressHydrationWarning
          onClick={() => increment(item.slug)}
          className="w-8 h-8 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Remove */}
      <button suppressHydrationWarning
        onClick={() => removeItem(item.slug)}
        className="mt-1 text-primary/30 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
