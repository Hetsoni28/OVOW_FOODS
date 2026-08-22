"use client";

import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";
import { fadeUpSlow, staggerFast } from "@/lib/animations";
import { LazyVideo } from "@/components/atoms/LazyVideo";

export function HeroSection() {
  return (
    <section className="relative text-white text-center min-h-screen flex items-center justify-center overflow-hidden bg-primary">

      {/*
        TWO-LAYER BACKGROUND — 100% reliable on all devices:
        Layer 1 (bottom): <img> — loads instantly, shows on ALL devices guaranteed
        Layer 2 (top):    <video> — loads lazily, fades in when ready, covers the img
        This is the same pattern used by Airbnb, Stripe, and Spotify hero sections.
      */}

      {/* Layer 1: Static image — instant, works on every device */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-bg-poster.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Layer 2: Video — loads lazily, covers image when ready */}
      <LazyVideo
        src="/videos/hero-bg.mp4"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        threshold={0}
        rootMargin="0px"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      <motion.div
        className="container-x relative z-10 flex flex-col items-center pt-24 pb-32"
        variants={staggerFast}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUpSlow}
          className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-[1.1] tracking-tight max-w-5xl"
        >
          CURATING THE
          <br />
          EXTRAORDINARY
        </motion.h1>
        <motion.p
          variants={fadeUpSlow}
          className="mt-6 max-w-xl text-lg font-light opacity-80"
        >
          A sensory journey into heritage vegetarian cuisine, crafted for the conscious palate.
        </motion.p>
        <motion.div variants={fadeUpSlow} className="mt-10">
          <Button href="/menu" className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase">
            Experience the Collection
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
