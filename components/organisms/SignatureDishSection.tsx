"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { IconArrowRight } from "@/components/atoms/Icons";
import { fadeUp, stagger } from "@/lib/animations";

const STEPS = [
  { n: "01", title: "Layered", body: "Long-grain basmati, saffron milk and vegetables marinated in our hand-ground spice blend." },
  { n: "02", title: "Sealed", body: "Each earthen matka is closed with a ring of dough so not a breath of steam escapes." },
  { n: "03", title: "Slow-cooked on dum", body: "Low heat, no shortcuts — rice, spices and vegetables finish cooking together in their own steam." },
];

export function SignatureDishSection() {
  return (
    <section className="grain overflow-hidden bg-[#123B2A] py-24 text-white md:py-32">
      <div className="container-x relative z-[2] grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Media — tall editorial frame with a caption */}
        <motion.figure
          className="lg:col-span-6"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
            <Image
              src="/images/dum-biryani-poster.jpg"
              alt="Dum Matka Biryani slow-cooked in a sealed clay pot – OVOW FOODS signature pure veg biryani, Ahmedabad"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <LazyVideo
              src="/videos/dum-biryani.mp4"
              poster="/images/dum-biryani-poster.jpg"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            {/* Touch-blocker: stops Android opening the native player */}
            <div className="absolute inset-0" onClick={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} />
            <span className="absolute left-0 top-6 bg-[#C9A24A] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0B2118]">
              Signature
            </span>
          </div>
          <figcaption className="mt-4 flex items-baseline gap-3 text-sm text-white/70">
            <span className="font-serif italic text-[#C9A24A]">Fig. 1</span>
            Each matka is sealed with dough before the slow dum.
          </figcaption>
        </motion.figure>

        {/* Story */}
        <motion.div
          className="flex flex-col justify-center lg:col-span-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="03" tone="dark">The signature</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.02em] md:text-7xl">
            Dum Matka <br />
            <em className="text-[#E9D9AE]">Biryani</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">
            The dish our kitchen is known for — Awadhi in spirit, cooked the way it was meant to be: in clay, on low fire, with patience.
          </motion.p>

          <motion.ol variants={fadeUp} className="mt-10 border-t border-white/15">
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/15 py-5">
                <span className="font-serif text-lg italic text-[#C9A24A]">{s.n}</span>
                <div>
                  <h3 className="font-serif text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{s.body}</p>
                </div>
              </li>
            ))}
          </motion.ol>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/menu/dum-matka-biryani"
              className="group inline-flex min-h-[48px] items-center gap-3 bg-[#C9A24A] px-7 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0B2118] transition-colors hover:bg-[#F4EFE3]"
            >
              Order the biryani
              <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/menu" className="link-rule text-[13px] font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white">
              Browse all dishes
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
