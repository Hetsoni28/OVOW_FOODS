"use client";

import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";
import { fadeUpSlow, staggerFast } from "@/lib/animations";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Wait for page to be fully painted and interactive before loading video.
    // This prevents the 8MB video download from competing with page resources.
    if (!videoRef.current) return;

    const startVideo = () => {
      const video = videoRef.current;
      if (!video) return;
      // Now safe to load — page is already rendered
      video.src = "/videos/hero-bg.mp4";
      video.load();
      video.play().catch(() => {
        // Autoplay blocked (Low Power Mode / browser policy) — poster stays, no error shown
      });
    };

    // Use requestIdleCallback if available (waits for browser idle time)
    // Fallback: setTimeout 500ms ensures page paint is complete first
    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void) => void })
        .requestIdleCallback(startVideo);
    } else {
      setTimeout(startVideo, 500);
    }
  }, []);

  return (
    <section className="relative text-white text-center min-h-screen flex items-center justify-center overflow-hidden">
      {/*
        FINAL FIX — True lazy video loading:
        - poster shows the food image INSTANTLY (no green, no lag)
        - src is intentionally empty — video won't download until after page renders
        - useEffect sets the src + plays AFTER the browser is idle
        - Result: page feels instant, video appears smoothly after ~0.5s
      */}
      <video
        ref={videoRef}
        poster="/images/hero-poster.jpg"
        loop
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

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
