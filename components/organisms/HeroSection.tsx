"use client";

import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";
import { fadeUpSlow, staggerFast } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile — skip video on small screens to prevent lag
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative text-white text-center min-h-screen flex items-center justify-center overflow-hidden">
      {/* 
        BACKGROUND LAYER:
        - The poster image loads instantly (zero lag)  
        - The video fades in on top once it's fully ready (desktop only)
      */}

      {/* Poster image — always visible, loads immediately */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Background Video — desktop only, fades in when ready */}
      {!isMobile && (
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
        />
      )}

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/55 z-[2]" />

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
