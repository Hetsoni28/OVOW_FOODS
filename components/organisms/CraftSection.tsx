"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight } from "@/components/atoms/Icons";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

export function CraftSection() {
  return (
    <section className="overflow-hidden bg-[#F4EFE3] py-24 text-primary md:py-32">
      <div className="container-x">
        <motion.div
          className="flex flex-col gap-6 border-b border-primary/15 pb-10 md:flex-row md:items-end md:justify-between md:pb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="05">Behind the craft</SectionLabel>
            <h2 className="mt-6 font-serif text-5xl leading-[1] tracking-[-0.02em] text-[#0B2118] md:text-7xl">
              Small things, <em className="text-[#86671C]">done right</em>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link href="/gallery" className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0B2118]">
              <span className="link-rule">Explore the gallery</span>
              <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* I — Philosophy */}
          <motion.article variants={fadeUp} className="border-b border-primary/15 py-12 md:border-b-0 md:border-r md:py-16 md:pr-14">
            <span className="font-serif text-7xl italic leading-none text-[#86671C]/80 md:text-8xl">I</span>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">Our philosophy</p>
            <h3 className="mt-3 font-serif text-3xl text-[#0B2118] md:text-4xl">
              The art of <em className="text-[#86671C]">tempering</em>
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-primary/80 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-[#0B2118]">
              Flavour lives in the moment a spice meets hot ghee and releases its oils. We cook by that moment — slow
              tadkas, patient gravies, and recipes that honour the old vegetarian kitchens.
            </p>
          </motion.article>

          {/* II — Process */}
          <motion.article variants={fadeUp} className="py-12 md:py-16 md:pl-14">
            <span className="font-serif text-7xl italic leading-none text-[#86671C]/80 md:text-8xl">II</span>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">The process</p>
            <h3 className="mt-3 font-serif text-3xl text-[#0B2118] md:text-4xl">The spice room</h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-primary/80">
              Our masalas are roasted and ground fresh every day — a routine we&apos;ve refined over the years for a
              deeper, cleaner flavour, with no artificial preservatives.
            </p>

            <div className="mt-10 flex items-center gap-5 border-t border-primary/15 pt-6">
              <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border border-[#86671C] text-[#86671C]">
                <span className="font-serif text-lg leading-none">100%</span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]">Veg</span>
              </span>
              <p className="text-sm leading-snug text-primary/80">
                <span className="block font-semibold text-[#0B2118]">A pure vegetarian kitchen</span>
                Crafted for the conscious palate.
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
