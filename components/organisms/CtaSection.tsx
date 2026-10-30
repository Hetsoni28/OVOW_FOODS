"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { IconArrowRight } from "@/components/atoms/Icons";
import { COMPANY_CONFIG } from "@/lib/config";
import { fadeUp, stagger } from "@/lib/animations";

const OCCASIONS = [
  "Family functions & parties",
  "Birthdays & anniversaries",
  "Corporate & office lunches",
  "Small & large gatherings",
];

const WHATSAPP_EVENT_URL = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(
  "Hello OVOW FOODS! I'd like to plan food for an event."
)}`;

export function CtaSection() {
  return (
    <section className="grain overflow-hidden bg-[#0B2118] py-24 text-white md:py-32">
      <motion.div
        className="container-x relative z-[2] grid gap-14 lg:grid-cols-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="lg:col-span-7">
          <SectionLabel index="06" tone="dark">Parties &amp; events</SectionLabel>
          <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.02em] md:text-7xl xl:text-8xl">
            Feeding a <em className="text-[#E9D9AE]">crowd?</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">
            From a family dinner for twenty to a wedding for hundreds — we&apos;ll plan a pure vegetarian menu around
            your guests and deliver it hot.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/party-bulk-orders"
              className="group inline-flex min-h-[48px] items-center gap-3 bg-[#C9A24A] px-7 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0B2118] transition-colors hover:bg-[#F4EFE3]"
            >
              Plan your event
              <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={WHATSAPP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule text-[13px] font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white"
            >
              Or chat on WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-5 lg:pl-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">We cater for</p>
          <ul className="mt-4 border-t border-white/15">
            {OCCASIONS.map((o, i) => (
              <li key={o} className="flex items-baseline gap-4 border-b border-white/15 py-4 font-serif text-xl text-white/90 md:text-2xl">
                <span className="w-6 text-sm italic text-[#C9A24A]">{String(i + 1).padStart(2, "0")}</span>
                {o}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
