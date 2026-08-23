"use client";

import { motion } from "framer-motion";
import {  container, item  } from "@/lib/animations";

export function AboutHero() {
  return (
    <section className="container-x mb-20 md:mb-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl"
      >
        <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A24A] mb-4">
          The Brand
        </motion.p>
        <motion.h1 variants={item} className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-[1.1]">
          More than food. <br />
          <span className="text-primary/60 italic">An experience.</span>
        </motion.h1>
        <motion.div variants={item} className="w-24 h-1.5 bg-[#C9A24A] mt-10 rounded-none" />
      </motion.div>
    </section>
  );
}
