"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InstallAppButton } from "@/components/atoms/InstallAppButton";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { IconArrowRight } from "@/components/atoms/Icons";
import { EASE } from "@/lib/animations";

// Headline lines slide up from behind a mask on first load. Uses `animate`
// (not whileInView) so it always runs, even on browsers where scroll
// observers are unreliable.
const line = {
  hidden: { y: "105%" },
  visible: (i: number) => ({ y: "0%", transition: { duration: 1.05, ease: EASE, delay: 0.15 + i * 0.12 } }),
};
const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.55 + i * 0.1 } }),
};

const FACTS = [
  { k: "Open daily", v: "11 am – 4 am" },
  { k: "Kitchen", v: "Ahmedabad" },
  { k: "100% vegetarian", v: "Swaminarayan style on request" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Gentle depth as you scroll away: video eases in, copy drifts up
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} className="grain relative min-h-[100svh] overflow-hidden bg-[#0B2118] text-white">
      {/* Media: poster image (instant) + video (after page load) */}
      <motion.div style={{ scale: mediaScale }} className="absolute inset-0 z-0 will-change-transform">
        <Image src="/images/hero-bg-poster.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />
        <LazyVideo
          src="/videos/hero-bg.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          threshold={0}
          rootMargin="0px"
          deferUntilIdle
          showSkeleton={false}
        />
      </motion.div>

      {/* Legibility: darken bottom and left, keep the food visible top-right */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B2118] via-[#0B2118]/55 to-[#0B2118]/10" />
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0B2118]/70 via-transparent to-transparent" />

      <motion.div style={{ y: copyY }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-32 md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          {/* Headline block */}
          <div className="lg:col-span-8">
            <h1 className="font-serif font-normal leading-[0.95] tracking-[-0.02em]">
              <motion.span
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fade}
                className="mb-6 flex items-center gap-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9A24A] sm:text-[11px] sm:tracking-[0.3em] md:text-xs"
              >
                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-[#C9A24A] sm:w-10" />
                Pure Vegetarian Cloud Kitchen · Ahmedabad
              </motion.span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span initial="hidden" animate="visible" custom={0} variants={line} className="block text-[13vw] sm:text-7xl md:text-[5.5rem] xl:text-[7rem]">
                  Curating the
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span initial="hidden" animate="visible" custom={1} variants={line} className="block text-[13vw] italic text-[#E9D9AE] sm:text-7xl md:text-[5.5rem] xl:text-[7rem]">
                  extraordinary.
                </motion.span>
              </span>
            </h1>

            <motion.p initial="hidden" animate="visible" custom={1} variants={fade} className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              Heritage vegetarian recipes, slow-cooked in small batches and delivered hot across Ahmedabad.
            </motion.p>

            <motion.div initial="hidden" animate="visible" custom={2} variants={fade} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/menu"
                className="group inline-flex min-h-[48px] items-center gap-3 bg-[#F4EFE3] px-7 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0B2118] transition-colors hover:bg-[#C9A24A]"
              >
                Order from the menu
                <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/party-bulk-orders" className="link-rule text-[13px] font-semibold uppercase tracking-[0.16em] text-white/90 hover:text-white">
                Party &amp; bulk orders
              </Link>
              <div className="md:hidden">
                <InstallAppButton />
              </div>
            </motion.div>
          </div>

          {/* Facts column */}
          <motion.dl
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fade}
            className="grid grid-cols-2 gap-4 border-t border-white/20 pt-5 sm:grid-cols-3 text-left lg:col-span-4 lg:grid-cols-1 lg:gap-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            {FACTS.map((f, i) => (
              <div key={f.k} className={`lg:border-b lg:border-white/15 lg:py-4 lg:last:border-0 ${i === 2 ? "hidden sm:block" : ""}`}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C9A24A] md:text-[11px]">{f.k}</dt>
                <dd className="mt-1 font-serif text-sm text-white md:text-lg">{f.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

      </motion.div>
    </section>
  );
}
