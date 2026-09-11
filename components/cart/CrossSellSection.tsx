"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconCheck } from "@/components/atoms/Icons";
import { useCart } from "@/context/CartContext";

interface Recommendation {
  _id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  thumbnailUrl?: string;
  availabilityStatus?: string;
  isBestSeller?: boolean;
  signature?: boolean;
}

function RecommendationRow({
  item,
  index,
}: {
  item: Recommendation;
  index: number;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      slug: item.slug,
      name: item.name,
      price: item.price,
      category: item.category,
      availabilityStatus: item.availabilityStatus as any,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      className="flex items-center gap-3 py-3 border-b border-primary/6 last:border-0"
    >
      {/* Thumbnail */}
      <Link href={`/menu/${item.slug}`} className="shrink-0">
        <div className="relative w-12 h-12 overflow-hidden bg-primary/5 rounded-sm">
          {item.thumbnailUrl ? (
            <Image
              src={item.thumbnailUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg">
              🍽️
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {item.isBestSeller && (
          <p className="text-[8px] font-black uppercase tracking-widest text-[#C9A24A] mb-0.5">
            🔥 Bestseller
          </p>
        )}
        <Link href={`/menu/${item.slug}`}>
          <h4 className="font-serif text-sm text-primary leading-tight truncate hover:text-[#C9A24A] transition-colors">
            {item.name}
          </h4>
        </Link>
        <p className="text-xs font-bold text-primary/60 mt-0.5 tabular-nums">
          ₹{item.price}
        </p>
      </div>

      {/* Add button */}
      <button
        suppressHydrationWarning
        onClick={handleAdd}
        disabled={added}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
          added
            ? "bg-[#2E7D4F] border-[#2E7D4F] text-white"
            : "border-primary/20 text-primary hover:bg-[#C9A24A] hover:border-[#C9A24A] hover:text-white"
        }`}
      >
        {added ? <IconCheck size={13} /> : <IconPlus size={13} />}
      </button>
    </motion.div>
  );
}

export function CrossSellSection() {
  const { items } = useCart();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setRecommendations([]);
      return;
    }

    const cartItemIds = items.map((i) => i._id).filter(Boolean);
    const cartCategories = [...new Set(items.map((i) => i.category).filter(Boolean))];

    setLoading(true);
    fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemIds, cartCategories }),
    })
      .then((r) => r.json())
      .then(({ recommendations }) => setRecommendations(recommendations ?? []))
      .catch(() => setRecommendations([]))
      .finally(() => setLoading(false));
  }, [items]);

  if (items.length === 0 || recommendations.length === 0) return null;

  return (
    <div className="border-t border-primary/8 pt-5 mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A24A] mb-0.5">
            Your order is almost complete 👀
          </p>
          <p className="text-xs text-primary/40 font-medium">
            You might also enjoy
          </p>
        </div>
        <Link
          href="/menu"
          className="text-[9px] font-bold uppercase tracking-widest text-primary/30 hover:text-[#C9A24A] transition-colors"
        >
          Full menu →
        </Link>
      </div>

      {/* Recommendations */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-[#C9A24A] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <AnimatePresence mode="popLayout">
          {recommendations.map((item, i) => (
            <RecommendationRow key={item._id} item={item} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
