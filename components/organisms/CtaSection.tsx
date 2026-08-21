"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="bg-[#F9F6F0] py-24 pb-32 overflow-hidden">
      <div className="container-x">
        <motion.div 
          className="grid lg:grid-cols-2 overflow-hidden shadow-2xl shadow-primary/5"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-[#0B2118] p-12 md:p-20 text-white flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <p className="text-tertiary text-[10px] uppercase tracking-widest font-bold mb-6">
                PLANNING SOMETHING SPECIAL?
              </p>
              <h2 className="font-serif text-5xl md:text-6xl mb-6 text-white/90">
                Elevate Your Events
              </h2>
              <p className="opacity-70 mb-10 text-sm leading-relaxed max-w-md">
                From intimate gatherings to grand celebrations, bring the OVOW
                signature experience to your table.
              </p>
              <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email Address"
                  suppressHydrationWarning
                  className="flex-1 border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-tertiary focus:outline-none transition-colors"
                />
                <Button
                  href="/party-bulk-orders"
                  className="whitespace-nowrap px-8 py-3 text-xs font-bold uppercase tracking-widest"
                >
                  Inquire Now
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="relative aspect-square lg:aspect-auto min-h-[400px] overflow-hidden">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              className="w-full h-full relative"
            >
              <Image
                src="/placeholder-food.svg"
                alt="CTA image"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
