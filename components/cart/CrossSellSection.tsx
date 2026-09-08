"use client";

import { useMemo } from "react";
import Image from "next/image";
import { IconPlus } from "@/components/atoms/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { getSuggestions } from "@/lib/pairingRules";

export function CrossSellSection() {
  const { items, addItem } = useCart();
  
  const suggestions = useMemo(() => getSuggestions(items), [items]);

  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-primary/10 pt-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-serif text-lg text-primary whitespace-nowrap">✨ Complete Your Meal</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-[#C9A24A]/40 to-transparent" />
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {suggestions.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                item.isFree 
                  ? "border-[#2E7D4F]/30 bg-[#2E7D4F]/5" 
                  : "border-[#C9A24A]/20 bg-[#C9A24A]/5"
              }`}
            >
              {/* Image */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={item.image || "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                {item.isFree && (
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#2E7D4F] mb-0.5">
                    🎁 Free with your Biryani
                  </p>
                )}
                <h4 className="font-medium text-primary text-sm leading-tight">{item.name}</h4>
                <p className={`text-sm font-bold mt-0.5 ${item.isFree ? "text-[#2E7D4F]" : "text-[#C9A24A]"}`}>
                  {item.isFree ? "FREE" : `₹${item.price}`}
                </p>
              </div>

              {/* Add button */}
              <button suppressHydrationWarning
                onClick={() => {
                  // Build a Product-compatible object for the cart
                  addItem({
                    slug: item.id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    vegetarian: true,
                  });
                }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  item.isFree 
                    ? "bg-[#2E7D4F] text-white hover:bg-[#1a5031]" 
                    : "bg-[#C9A24A] text-white hover:bg-[#0B2118]"
                }`}
              >
                <IconPlus size={12} strokeWidth={3} />
                Add
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
