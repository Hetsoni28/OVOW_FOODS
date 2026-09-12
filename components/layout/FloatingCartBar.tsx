"use client";

import { useCart } from "@/context/CartContext";
import { IconShoppingBag, IconChevronRight } from "@/components/atoms/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function FloatingCartBar() {
  const { count, total, openCart } = useCart();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide on checkout/cart pages or if cart is empty
  if (!mounted || count === 0 || pathname === "/checkout" || pathname === "/cart") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        // Positioned above the MobileBottomBar (which is roughly 64px tall on mobile)
        className="fixed bottom-[72px] md:bottom-8 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center"
      >
        <button
          onClick={openCart}
          className="pointer-events-auto w-full max-w-md bg-[#0B2118] text-white shadow-2xl shadow-[#0B2118]/20 rounded-2xl p-4 flex items-center justify-between overflow-hidden relative group border border-[#C9A24A]/20"
        >
          {/* Subtle gold shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A24A]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">
              {count} {count === 1 ? "Item" : "Items"}
            </span>
            <span className="text-sm font-bold text-[#C9A24A] flex items-center gap-1.5">
              <span>₹{total.toLocaleString("en-IN")}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] font-bold">
              View Cart
            </span>
            <div className="bg-[#C9A24A] text-[#0B2118] w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#C9A24A]/20">
              <IconChevronRight size={16} strokeWidth={3} />
            </div>
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
