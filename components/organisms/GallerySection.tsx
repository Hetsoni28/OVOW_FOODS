"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

export function GallerySection() {
  const images = [
    "/placeholder-food.svg",
    "/placeholder-food.svg",
    "/placeholder-food.svg",
    "/placeholder-food.svg",
  ];

  return (
    <section className="bg-[#0B2118] py-24 text-white overflow-hidden">
      <motion.div
        className="container-x mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-tertiary text-xs uppercase tracking-[.3em] mb-4">
          Crave It
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-serif text-5xl">Visual Stories.</motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-white/60">
          Swipe to explore the art of preparation
        </motion.p>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <motion.div
        className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-hide snap-x snap-mandatory"
        initial={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative min-w-[85vw] md:min-w-[40vw] aspect-[4/3] overflow-hidden snap-center flex-shrink-0 bg-primary"
          >
            <Image
              src={img}
              alt="Gallery image"
              fill
              sizes="(max-width: 768px) 85vw, 40vw"
              loading="lazy"
              className="object-cover opacity-80"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
