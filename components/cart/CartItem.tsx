"use client";

import { IconMinus, IconPlus, IconTrash, IconSwaminarayan } from "@/components/atoms/Icons";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { getLineKey } from "@/lib/cart";

export function CartItem({ item }: { item: CartItemType }) {
  const { increment, decrement, removeItem } = useCart();
  const lineKey = getLineKey(item);

  return (
    <div className="flex items-start gap-4 py-5 border-b border-primary/10 last:border-0">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-base leading-snug text-primary font-semibold">
          {item.name}
        </p>
        {/* Variant badge */}
        {item.variant === 'swaminarayan' && (
          <div className="inline-flex items-center gap-1.5 bg-[#0B2118] px-2 py-0.5 mt-1">
            <IconSwaminarayan size={12} />
            <span className="text-[7px] font-black uppercase tracking-[0.18em] text-white">Swaminarayan</span>
          </div>
        )}
        {item.addons?.wantsRaita && (
          <p className="text-[10px] text-[#2E7D4F] font-bold mt-0.5">+ Free Raita</p>
        )}
        {item.extras && item.extras.length > 0 && (
          <div className="mt-1 flex flex-col gap-0.5">
            {item.extras.map((extra) => (
              <p key={extra.name} className="text-[10px] text-[#86671C] font-bold">
                + {extra.name} (+₹{extra.price})
              </p>
            ))}
          </div>
        )}
        <p className="text-xs text-primary/70 mt-0.5">{item.size}</p>
        <p className="text-sm font-semibold text-[#86671C] mt-1">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2 mt-1">
        <button suppressHydrationWarning
          onClick={() => decrement(lineKey)}
          className="w-10 h-10 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label={item.quantity === 1 ? `Remove ${item.name}` : `Decrease ${item.name} quantity`}
        >
          <IconMinus size={12} />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-primary" aria-live="polite">
          <span className="sr-only">Quantity </span>{item.quantity}
        </span>
        <button suppressHydrationWarning
          onClick={() => increment(lineKey)}
          className="w-10 h-10 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label={`Increase ${item.name} quantity`}
        >
          <IconPlus size={12} />
        </button>
      </div>

      {/* Remove */}
      <button suppressHydrationWarning
        onClick={() => removeItem(lineKey)}
        className="w-10 h-10 -mt-1 -mr-2 flex items-center justify-center text-primary/70 hover:text-red-700 transition-colors"
        aria-label={`Remove ${item.name} from cart`}
      >
        <IconTrash size={15} />
      </button>
    </div>
  );
}
