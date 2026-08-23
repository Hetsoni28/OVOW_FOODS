"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/animations";

export function GalleryHeader() {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto text-center mb-16"
    >
      <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-primary/40 font-bold mb-4">
        The OVOW Experience
      </motion.p>
      <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight">
        A feast for the eyes.
      </motion.h1>
      <motion.p variants={fadeUp} className="mt-6 text-lg text-primary/70 max-w-xl mx-auto">
        Explore our culinary creations, from the rich textures of our signature dishes to our premium packaging designed to keep your food hot and fresh.
      </motion.p>
    </motion.div>
  );
}
