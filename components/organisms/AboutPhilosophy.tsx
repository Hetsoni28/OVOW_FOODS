"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutPhilosophy() {
  return (
    <section className="container-x mb-24 md:mb-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] bg-primary/5 rounded-none shadow-2xl overflow-hidden"
        >
          <Image 
            src="/placeholder-food.svg" 
            alt="OVOW Food Preparation"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-multiply" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8">Our Philosophy</h2>
          <div className="space-y-6 text-lg md:text-xl text-primary/70 leading-relaxed font-serif">
            <p>
              OVOW FOODS offers delicious homemade-style food, premium bento boxes, desserts, and takeaway meals right in the heart of Ahmedabad. 
            </p>
            <p>
              We focus on fresh ingredients, rich taste, hygienic preparation, and quality packaging. Every dish is crafted with an uncompromising dedication to authenticity, ensuring that you don't just eat a meal—you savor a legacy.
            </p>
            <p className="font-medium text-primary">
              Enjoy tasty food made with love, exclusively for delivery and takeaway.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
