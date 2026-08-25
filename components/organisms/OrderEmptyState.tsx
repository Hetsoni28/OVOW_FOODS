"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function OrderEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      className="bg-white border border-primary/10 p-12 text-center"
    >
      <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <ShoppingBag size={24} className="text-[#C9A24A]" />
      </div>
      <h2 className="font-serif text-2xl text-primary font-bold mb-2">No past orders yet</h2>
      <p className="text-sm text-primary/60 mb-6">Looks like you haven't placed any orders from this device.</p>
      <Link
        href="/menu"
        className="inline-flex items-center justify-center gap-2 bg-[#C9A24A] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-colors"
      >
        Explore Menu
      </Link>
    </motion.div>
  );
}
