"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import {  pageAnim, childAnim  } from "@/lib/animations";

export function CheckoutEmptyState() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-24 pb-32 flex items-center justify-center">
      <motion.div variants={pageAnim} initial="hidden" animate="visible" className="text-center max-w-md mx-auto px-6">
        <motion.div variants={childAnim} className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-8 shadow-xl border border-primary/10">
          <ShoppingBag size={40} className="text-primary/20" />
        </motion.div>
        <motion.h1 variants={childAnim} className="font-serif text-4xl text-primary mb-4">Your cart is empty</motion.h1>
        <motion.p variants={childAnim} className="text-primary/60 mb-10 text-lg">Add some delicious items to your cart before checking out.</motion.p>
        <motion.div variants={childAnim}>
          <Link href="/menu" className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1A4D3A] transition-all hover:-translate-y-1 hover:shadow-xl group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Menu
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
