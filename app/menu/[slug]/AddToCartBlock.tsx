"use client";

import { useState } from "react";
import { Plus, Minus, Check, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export function AddToCartBlock({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  return (
    <div className="mt-12 pt-8 border-t border-primary/10">
      <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-5">
        
        {/* Quantity Selector - Pill Design */}
        <div className="flex items-center gap-6 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-primary/10 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleDecrease}
            className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:hover:bg-primary/5"
            disabled={quantity <= 1}
          >
            <Minus size={18} strokeWidth={2.5} />
          </motion.button>
          
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={quantity}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute font-serif text-2xl font-bold text-primary"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrease}
            className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Plus size={18} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Add Button - Premium Pill */}
        <motion.button
          whileHover={!added ? { scale: 1.02, y: -2 } : {}}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          disabled={added}
          suppressHydrationWarning
          className={`relative overflow-hidden flex-1 w-full flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 shadow-xl ${
            added
              ? "bg-[#25D366] shadow-[#25D366]/30 text-white"
              : "bg-primary shadow-primary/20 text-white"
          }`}
        >
          {/* Shine effect on hover */}
          {!added && (
            <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
          )}

          <div className="flex items-center gap-3">
            <AnimatePresence mode="popLayout">
              {added ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Check size={20} strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  key="bag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <ShoppingBag size={20} className="text-white/80" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              {added ? "Added to Cart" : "Add to Order"}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {!added && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="w-px h-6 bg-white/20" />
                <span className="font-serif text-xl font-bold tracking-wider">
                  ₹{(product.price * quantity).toLocaleString("en-IN")}
                </span>
                <ArrowRight size={16} className="text-white/50" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
