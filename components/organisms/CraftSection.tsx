"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

export function CraftSection() {
  return (
    <section className="bg-[#F9F6F0] py-24 text-primary overflow-hidden">
      <div className="container-x">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <div>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl mb-4">
              Behind the Craft
            </motion.h2>
            <motion.p variants={fadeUp} className="opacity-80">
              Witness the artistry of pure vegetarian gastronomy.
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/gallery"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mt-6 md:mt-0 hover:opacity-70 transition-opacity"
            >
              Explore Gallery <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="relative w-full aspect-square md:aspect-[4/5] bg-primary/5 overflow-hidden">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full h-full relative">
                <Image src="/placeholder-food.svg" alt="Craft image 1" fill className="object-cover" />
              </motion.div>
            </div>
            <p className="text-sm font-medium">Tempering Spices</p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 h-[400px] md:flex-1 md:h-auto">
              <div className="relative bg-primary/5 overflow-hidden">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full h-full relative">
                  <Image src="/placeholder-food.svg" alt="Craft image 2" fill className="object-cover" />
                </motion.div>
              </div>
              <div className="relative bg-primary/5 overflow-hidden">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full h-full relative">
                  <Image src="/placeholder-food.svg" alt="Craft image 3" fill className="object-cover" />
                </motion.div>
              </div>
            </div>
            <div className="bg-primary text-white p-12 h-[300px] md:h-auto flex flex-col justify-center">
              <h3 className="font-serif text-3xl mb-4 text-tertiary">The Spice Room</h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Our masalas are ground fresh daily, a process we have perfected
                over years to ensure the most authentic, rich flavor profile in
                every bite.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
