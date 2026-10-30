"use client";

import Link from "next/link";
import { IconShoppingBag, IconArrowLeft, IconArrowRight } from "@/components/atoms/Icons";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { getLineKey } from "@/lib/cart";
import { CartSummary } from "@/components/cart/CartSummary";
import { CrossSellSection } from "@/components/cart/CrossSellSection";

export default function CartPage() {
  const { items, count } = useCart();

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/menu"
            aria-label="Back to menu"
            className="w-11 h-11 -ml-3 flex items-center justify-center text-primary/70 hover:text-primary transition-colors"
          >
            <IconArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold">
              Your Order
            </h1>
            {count > 0 && (
              <p className="text-sm text-primary/70 mt-1">
                {count} item{count !== 1 ? "s" : ""} in your cart
              </p>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
            <IconShoppingBag size={56} className="text-primary/10" strokeWidth={1} />
            <div>
              <p className="font-serif text-2xl text-primary/70 mb-2">
                Nothing here yet
              </p>
              <p className="text-sm text-primary/70">
                Browse the menu and add something delicious
              </p>
            </div>
            <Link
              href="/menu"
              className="bg-[#C9A24A] text-[#0B2118] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#0B2118] hover:text-white transition-colors"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-sm p-6">
            {/* Items */}
            <div className="mb-2">
              {items.map((item) => (
                <CartItem key={getLineKey(item)} item={item} />
              ))}
            </div>

            {/* Summary + Order */}
            <CrossSellSection />
            <CartSummary />

            {/* Continue shopping */}
            <div className="mt-4 text-center">
              <Link
                href="/menu"
                className="text-xs text-primary/70 uppercase tracking-widest hover:text-primary transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
