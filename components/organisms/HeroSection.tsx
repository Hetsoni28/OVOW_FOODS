"use client";

import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";
import { fadeUpSlow, staggerFast } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative bg-primary text-white text-center min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        src="/videos/hero-bg.mp4#t=0.001"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-neutral/70 z-0"></div>

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
          A sensory journey into heritage vegetarian cuisine, crafted for the
          conscious palate.
        </motion.p>

        <motion.div variants={fadeUpSlow} className="mt-10">
          <Button
            href="/menu"
            className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase"
          >
            Experience the Collection
          </Button>
        </motion.div>

      </motion.div>
    </section>
  );
}
