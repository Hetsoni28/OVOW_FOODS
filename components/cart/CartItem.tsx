"use client";

import { IconMinus, IconPlus, IconTrash } from "@/components/atoms/Icons";
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
        {/* Variant badge */}
        {item.variant === 'swaminarayan' && (
          <div className="inline-flex items-center gap-1 bg-[#0B2118] px-2 py-0.5 mt-1">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z" fill="#C9A24A"/>
              <circle cx="12" cy="10" r="2.5" fill="#0B2118"/>
            </svg>
            <span className="text-[7px] font-black uppercase tracking-[0.18em] text-white">Swaminarayan</span>
          </div>
        )}
        {item.addons?.wantsRaita && (
          <p className="text-[10px] text-[#2E7D4F] font-bold mt-0.5">+ Free Raita</p>
        )}
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
          <IconMinus size={12} />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-primary">
          {item.quantity}
        </span>
        <button suppressHydrationWarning
          onClick={() => increment(item.slug)}
          className="w-8 h-8 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Increase quantity"
        >
          <IconPlus size={12} />
        </button>
      </div>

      {/* Remove */}
      <button suppressHydrationWarning
        onClick={() => removeItem(item.slug)}
        className="mt-1 text-primary/30 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <IconTrash size={15} />
      </button>
    </div>
  );
}
