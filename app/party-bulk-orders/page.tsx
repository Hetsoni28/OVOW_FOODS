"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/animations";
import { BulkOrderForm } from "@/components/organisms/BulkOrderForm";

export default function BulkOrdersPage() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          
          {/* Left Side: Visuals & Copy */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-primary/40 font-bold mb-4">
              Planning something special?
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl text-primary leading-tight mb-6">
              Party & Bulk Orders.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-primary/70 leading-relaxed mb-10 max-w-md">
              From intimate gatherings to grand celebrations, OVOW brings a premium, 100% pure vegetarian culinary experience right to your venue. Fill out the details below to start designing your bespoke menu.
            </motion.p>

            <motion.div variants={fadeUp} className="relative aspect-video lg:aspect-square overflow-hidden bg-primary/5 hidden lg:block">
              <Image
                src="/placeholder-food.svg"
                alt="OVOW Catering Experience"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Side: Form Component */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 md:p-12 shadow-sm border border-primary/5"
          >
            <BulkOrderForm />
          </motion.div>

        </div>
      </div>
    </main>
  );
}
