"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

export function ValuesSection() {
  const values = ["100% Pure Veg", "Freshly Prepared", "Premium Experience"];

  return (
    <section className="bg-primary py-24 text-white">
      <motion.div
        className="container-x grid gap-8 md:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {values.map((x, i) => (
          <motion.div key={x} variants={fadeUp} className="border-l border-tertiary/40 pl-6">
            <span className="text-4xl font-serif text-[#E4C77A]">0{i + 1}</span>
            <h3 className="mt-5 text-xl font-semibold">{x}</h3>
            <p className="mt-3 text-sm text-white/60">
              Thoughtfully designed around the way modern customers discover and
              enjoy food.
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
