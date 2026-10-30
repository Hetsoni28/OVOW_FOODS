"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const PRINCIPLES = [
  { n: "i.", title: "Only vegetarian", body: "No meat, no egg — ever. One kitchen, one promise." },
  { n: "ii.", title: "Ground every morning", body: "Our masalas are roasted and ground fresh daily, never from a packet." },
  { n: "iii.", title: "Your way", body: "Any dish can be made Swaminarayan style — without onion or garlic." },
];

export function QuoteSection() {
  return (
    <section className="bg-[#F4EFE3] py-24 text-primary md:py-36">
      <motion.div
        className="container-x grid gap-12 lg:grid-cols-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <SectionLabel index="01" as="h2">Our belief</SectionLabel>
        </motion.div>

        <div className="lg:col-span-9">
          <motion.blockquote variants={fadeUp} className="relative">
            <span aria-hidden="true" className="absolute -left-2 -top-10 font-serif text-[7rem] leading-none text-[#C9A24A]/35 md:-left-14 md:-top-12 md:text-[9rem]">
              &ldquo;
            </span>
            <p className="relative font-serif text-[1.85rem] leading-[1.25] tracking-[-0.01em] text-[#0B2118] md:text-5xl md:leading-[1.15]">
              True luxury lies in <em className="text-[#86671C]">purity</em>. Every dish honours the old ways of the
              vegetarian kitchen — patient, generous, and made by hand.
            </p>
            <footer className="mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary/70">
              <span aria-hidden="true" className="h-px w-8 bg-primary/30" />
              The chef&apos;s note
            </footer>
          </motion.blockquote>

          <motion.ul variants={fadeUp} className="mt-16 grid border-t border-primary/15 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-b border-primary/15 py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <span className="font-serif text-sm italic text-[#86671C]">{p.n}</span>
                <h3 className="mt-2 font-serif text-xl text-[#0B2118]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary/70">{p.body}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
