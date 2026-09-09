"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="bg-[#F9F6F0] py-24 pb-32 overflow-hidden">
      <div className="container-x max-w-5xl mx-auto">
        <motion.div 
          className="overflow-hidden shadow-2xl shadow-primary/5 border border-[#C9A24A]/20"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-[#0B2118] p-16 md:p-24 text-center text-white flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full flex flex-col items-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[#C9A24A]"></span>
                <p className="text-tertiary text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold m-0">
                  Planning Something Special?
                </p>
                <span className="w-12 h-[1px] bg-[#C9A24A]"></span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 text-white/95">
                Elevate Your Events
              </h2>
              <p className="opacity-80 mb-12 text-sm md:text-base leading-relaxed max-w-xl text-center">
                From intimate gatherings to grand celebrations, bring the OVOW
                signature experience to your table. Let us craft an unforgettable pure vegetarian menu for your guests.
              </p>
              <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row justify-center">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  suppressHydrationWarning
                  className="flex-1 border border-white/20 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/30 focus:border-tertiary focus:outline-none transition-colors text-center sm:text-left"
                />
                <Link
                  href="/party-bulk-orders"
                  className="inline-flex items-center justify-center whitespace-nowrap px-10 py-4 text-xs font-bold uppercase tracking-widest bg-[#C9A24A] text-white hover:bg-white hover:text-[#0B2118] transition-colors"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
