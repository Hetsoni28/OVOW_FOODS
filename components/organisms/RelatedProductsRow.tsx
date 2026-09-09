"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconPlus, IconCheck, IconStar, IconFlame, IconArrowRight } from "@/components/atoms/Icons";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function RelatedCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isSoldOut = product.available === false;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: EASE }}
      className="group relative flex-shrink-0 w-64 md:w-auto bg-white border border-primary/8 hover:border-[#C9A24A]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 overflow-hidden rounded-sm"
    >
      {/* Colored accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A24A] to-[#1D5A40] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

      <Link href={`/menu/${product.slug}`} className="block">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {!isSoldOut && ((product as any).signature || product.isSignature) && (
            <span className="bg-[#C9A24A] text-white px-2.5 py-1 text-[8px] uppercase tracking-widest font-bold flex items-center gap-1 shadow-md">
              <IconStar size={8} fill="white" /> Signature
            </span>
          )}
          {!isSoldOut && ((product as any).isBestSeller || product.isBestseller) && (
            <span className="bg-[#0B2118] text-white px-2.5 py-1 text-[8px] uppercase tracking-widest font-bold flex items-center gap-1 shadow-md">
              <IconFlame size={8} className="text-[#C9A24A]" /> Bestseller
            </span>
          )}
          {isSoldOut && (
            <span className="bg-black/80 text-white px-2.5 py-1 text-[8px] uppercase tracking-widest font-bold shadow-md">
              Sold Out
            </span>
          )}
        </div>

        {/* Category */}
        <div className="px-5 pt-5 pb-1">
          <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#C9A24A]">
            {typeof product.category === "string" ? product.category : product.category?.name || "Dish"}
          </p>
        </div>

        {/* Name & Price */}
        <div className="px-5 pb-5">
          <h3 className="font-serif text-lg text-primary leading-snug mb-3 group-hover:text-[#C9A24A] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-serif text-xl text-[#0B2118] tabular-nums">₹{product.price}</p>
            <button
              onClick={handleAdd}
              disabled={isSoldOut}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSoldOut
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-[#1D5A40] text-white scale-110"
                  : "bg-[#C9A24A]/10 border border-[#C9A24A]/30 text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white"
              }`}
            >
              {added ? <IconCheck size={16} /> : <IconPlus size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function RelatedProductsRow({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-24 md:mt-32">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24A] mb-2">
            Curated for You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary">
            You Might Also Like
          </h2>
        </div>
        <Link
          href="/menu"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary/50 hover:text-[#C9A24A] transition-colors"
        >
          View All <IconArrowRight size={14} />
        </Link>
      </div>

      {/* Cards — horizontal scroll on mobile, grid on desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
        {products.map((p, i) => (
          <RelatedCard key={p.slug} product={p} index={i} />
        ))}
      </div>

      {/* Mobile "View All" */}
      <div className="mt-6 text-center md:hidden">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 hover:text-[#C9A24A] transition-colors"
        >
          Explore Full Menu <IconArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
