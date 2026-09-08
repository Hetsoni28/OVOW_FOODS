"use client";

import Link from "next/link";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { IconArrowRight } from "@/components/atoms/Icons";
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
              Explore Gallery <IconArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {/* Left Block - Dark Theme */}
          <motion.div variants={fadeUp} className="flex flex-col h-full">
            <div className="bg-[#0B2118] text-[#F9F6F0] p-12 md:p-20 flex-1 flex flex-col justify-center border border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-colors duration-500">
              <span className="text-[#C9A24A] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#C9A24A]"></span>
                Our Philosophy
              </span>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
                The Art of <br/><span className="text-[#C9A24A] italic">Tempering</span>
              </h3>
              <p className="opacity-80 text-sm md:text-base leading-relaxed max-w-md">
                We believe that true flavor lies in the precise moment a spice releases its essential oils. Our slow-cooking techniques and authentic recipes honor the ancient traditions of pure vegetarian gastronomy.
              </p>
            </div>
          </motion.div>

          {/* Right Block - Light Theme */}
          <motion.div variants={fadeUp} className="flex flex-col h-full">
            <div className="bg-white p-12 md:p-20 flex-1 flex flex-col justify-center border border-primary/5 hover:border-primary/20 transition-colors duration-500">
              <span className="text-primary/40 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary/20"></span>
                The Process
              </span>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-6">
                The Spice Room
              </h3>
              <p className="text-primary/70 text-sm md:text-base leading-relaxed mb-12 max-w-md">
                Our masalas are ground fresh daily. It is a meticulous process we have perfected over years to ensure the most authentic, rich flavor profile in every bite, entirely free from artificial preservatives.
              </p>
              
              <div className="flex items-center gap-6 pt-8 border-t border-primary/10 mt-auto">
                <div className="w-14 h-14 rounded-full border border-[#C9A24A] flex flex-col items-center justify-center text-[#C9A24A] shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5">100%</span>
                  <span className="text-[8px] uppercase tracking-widest leading-none">Pure</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary font-bold text-xs md:text-sm tracking-widest uppercase">Vegetarian Excellence</span>
                  <span className="text-primary/50 text-xs italic">Crafted for the conscious palate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
