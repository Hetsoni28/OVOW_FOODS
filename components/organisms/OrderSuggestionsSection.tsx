"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconPlus, IconCheck, IconArrowRight, IconSparkles } from "@/components/atoms/Icons";
import { useCart } from "@/context/CartContext";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import type { CartItem } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface SuggestedItem extends CartItem {
  orderCount: number;
}

function getSuggestedItems(orders: ReturnType<typeof useOrderHistory>["orders"]): SuggestedItem[] {
  // Tally how many times each item has been ordered by slug
  const tally: Record<string, { item: CartItem; count: number }> = {};

  for (const order of orders) {
    for (const item of order.items) {
      const key = item.slug + (item.size ?? "");
      if (tally[key]) {
        tally[key].count += item.quantity;
      } else {
        tally[key] = { item, count: item.quantity };
      }
    }
  }

  // Sort by frequency, take top 4
  return Object.values(tally)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
    .map(({ item, count }) => ({ ...item, orderCount: count }));
}

function SuggestionCard({ item, index }: { item: SuggestedItem; index: number }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(item);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 1200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.07, ease: EASE }}
      className="group relative bg-white border border-primary/8 hover:border-[#C9A24A]/40 hover:shadow-lg transition-all duration-300 rounded-sm p-5 flex items-center justify-between gap-4"
    >
      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C9A24A]/60 to-transparent rounded-l-sm opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A24A] mb-1">
          Ordered {item.orderCount}×
        </p>
        <h3 className="font-serif text-base md:text-lg text-primary leading-snug truncate">
          {item.name}
        </h3>
        {item.size && (
          <p className="text-xs text-primary/50 uppercase tracking-widest mt-0.5">{item.size}</p>
        )}
        <p className="font-medium text-primary/70 mt-1.5 text-sm tabular-nums">₹{item.price}</p>
      </div>

      <button
        onClick={handleAdd}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
          added
            ? "bg-[#1D5A40] text-white"
            : "bg-[#C9A24A] text-white hover:bg-[#0B2118]"
        }`}
      >
        {added ? (
          <>
            <IconCheck size={14} /> Added!
          </>
        ) : (
          <>
            <IconPlus size={14} /> Add Again
          </>
        )}
      </button>
    </motion.div>
  );
}

export function OrderSuggestionsSection() {
  const { orders, mounted } = useOrderHistory();

  if (!mounted || orders.length === 0) return null;

  const suggestions = getSuggestedItems(orders);
  if (suggestions.length === 0) return null;

  return (
    <section className="mt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Section Header */}
        <div className="bg-[#0B2118] px-6 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 rounded-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C9A24A]/20 border border-[#C9A24A]/30 rounded-full flex items-center justify-center flex-shrink-0">
              <IconSparkles size={18} className="text-[#C9A24A]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24A] mb-1">
                Based on Your Orders
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-white">Order Again?</h2>
            </div>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-[#C9A24A] transition-colors"
          >
            Browse Full Menu <IconArrowRight size={14} />
          </Link>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestions.map((item, i) => (
            <SuggestionCard key={item.slug + (item.size ?? "") + i} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
