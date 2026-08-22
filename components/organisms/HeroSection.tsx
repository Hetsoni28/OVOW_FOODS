"use client";

import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";
import { fadeUpSlow, staggerFast } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Load the video only after the page is fully interactive
    // This prevents the video from competing with critical page resources
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {
          // Autoplay blocked (e.g. Low Power Mode) — poster image stays visible, no error
        });
      }
    }, 300); // 300ms delay lets the page paint first

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative text-white text-center min-h-screen flex items-center justify-center overflow-hidden">
      {/*
        STRATEGY:
        1. Poster image renders instantly on ALL devices — zero green flash
        2. Video loads 300ms after paint on ALL devices (mobile + desktop)
        3. Video fades in smoothly over the poster when ready
        4. If video is blocked (Low Power Mode, bad connection) → poster stays, no crash
      */}

      {/* Poster image — instant, zero wait */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        fetchPriority="high"
      />

      {/* Background Video — ALL devices, lazy-loaded after paint */}
      <video
        ref={videoRef}
        src="/videos/hero-bg.mp4"
        loop
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        onCanPlay={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: videoReady ? 1 : 0 }}
      />

      {/* Dark Overlay for Text Readability */}
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
