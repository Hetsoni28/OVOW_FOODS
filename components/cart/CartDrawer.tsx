"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconShoppingBag } from "@/components/atoms/Icons";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItem } from "./CartItem";
import { getLineKey } from "@/lib/cart";
import { CartSummary } from "./CartSummary";
import { useDialog } from "@/hooks/useDialog";

export function CartDrawer() {
  const { items, isOpen, closeCart, count } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Focus management, focus trap and Escape-to-close
  const dialogRef = useDialog<HTMLElement>(isOpen, closeCart);

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
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[#F9F6F0] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <IconShoppingBag size={18} className="text-primary" strokeWidth={1.5} />
                <h2 id="cart-drawer-title" className="font-serif text-xl text-primary font-bold">
                  Your Order
                </h2>
                {count > 0 && (
                  <span className="bg-[#C9A24A] text-[#0B2118] text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                    {count}<span className="sr-only"> {count === 1 ? "item" : "items"}</span>
                  </span>
                )}
              </div>
              <button suppressHydrationWarning
                onClick={closeCart}
                className="w-11 h-11 -mr-3 flex items-center justify-center text-primary/70 hover:text-primary transition-colors"
                aria-label="Close cart"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <IconShoppingBag size={48} className="text-primary/15" strokeWidth={1} />
                  <div>
                    <p className="font-serif text-xl text-primary/70 mb-1">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-primary/70">
                      Add something delicious from the menu
                    </p>
                  </div>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="bg-[#C9A24A] text-[#0B2118] text-xs uppercase tracking-widest font-semibold px-8 py-4 hover:bg-[#0B2118] hover:text-white transition-colors"
                  >
                    Explore Menu
                  </Link>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem key={getLineKey(item)} item={item} />
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
