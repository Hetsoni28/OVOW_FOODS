"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const { items, isOpen, closeCart, count } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[#F9F6F0] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-primary" strokeWidth={1.5} />
                <h2 className="font-serif text-xl text-primary font-bold">
                  Your Order
                </h2>
                {count > 0 && (
                  <span className="bg-[#C9A24A] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-primary/40 hover:text-primary transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <ShoppingBag size={48} className="text-primary/15" strokeWidth={1} />
                  <div>
                    <p className="font-serif text-xl text-primary/50 mb-1">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-primary/30">
                      Add something delicious from the menu
                    </p>
                  </div>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="bg-primary text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 hover:bg-[#1A4D3A] transition-colors"
                  >
                    Explore Menu
                  </Link>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem key={item.slug} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="px-6 pb-6 pt-2">
                <CartSummary />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
