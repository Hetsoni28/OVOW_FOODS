"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, count } = useCart();

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-8 pb-20">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/menu"
            className="text-primary/40 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold">
              Your Order
            </h1>
            {count > 0 && (
              <p className="text-sm text-primary/50 mt-1">
                {count} item{count !== 1 ? "s" : ""} in your cart
              </p>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
            <ShoppingBag size={56} className="text-primary/10" strokeWidth={1} />
            <div>
              <p className="font-serif text-2xl text-primary/40 mb-2">
                Nothing here yet
              </p>
              <p className="text-sm text-primary/30">
                Browse the menu and add something delicious
              </p>
            </div>
            <Link
              href="/menu"
              className="bg-primary text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1A4D3A] transition-colors"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-sm p-6">
            {/* Items */}
            <div className="mb-2">
              {items.map((item) => (
                <CartItem key={item.slug} item={item} />
              ))}
            </div>

            {/* Summary + Order */}
            <CartSummary />



            {/* Continue shopping */}
            <div className="mt-4 text-center">
              <Link
                href="/menu"
                className="text-xs text-primary/40 uppercase tracking-widest hover:text-primary transition-colors"
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
