"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconShoppingBag } from "@/components/atoms/Icons";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function OrderEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      className="bg-white border border-primary/10 p-12 md:p-20 text-center shadow-xl shadow-primary/5 rounded-sm"
    >
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="w-24 h-24 bg-gradient-to-tr from-[#C9A24A]/20 to-[#C9A24A]/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#C9A24A]/20"
      >
        <IconShoppingBag size={36} className="text-[#C9A24A]" />
      </motion.div>
      <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">No culinary history yet</h2>
      <p className="text-sm md:text-base text-primary/60 mb-10 max-w-sm mx-auto leading-relaxed">
        Your order history is waiting to be written. Discover our pure vegetarian specialties and start your journey.
      </p>
      <Link
        href="/menu"
        className="inline-flex items-center justify-center gap-2 bg-[#C9A24A] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-colors shadow-lg shadow-[#C9A24A]/20"
      >
        Explore Our Menu
      </Link>
    </motion.div>
  );
}
