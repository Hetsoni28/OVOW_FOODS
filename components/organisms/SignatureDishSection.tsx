"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/animations";
import { Button } from "@/components/atoms/Button";

export function SignatureDishSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
    <section className="bg-primary text-white py-12 md:py-16 overflow-hidden">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Video Side — two-layer: poster image + lazy video */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square bg-white/5 overflow-hidden shadow-2xl"
          >
            {/* Layer 1: Static poster — shows in <100ms, ALWAYS visible instantly */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dum-biryani-poster.jpg"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Layer 2: Shimmer on top of image while video downloads */}
            {!videoLoaded && (
              <div className="absolute inset-0 z-[1] overflow-hidden">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>
            )}

            {/* Layer 3: Video — fades in smoothly when ready, covers image */}
            <video
              src="/videos/dum-biryani.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              onLoadedData={() => setVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-700 pointer-events-none ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Invisible touch-blocker: prevents Android from stealing taps */}
            <div
              className="absolute inset-0 z-[2]"
              onClick={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
            />

            {/* Badge */}
            <div className="absolute top-6 left-6 bg-tertiary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg z-10">
              Signature Dish
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start"
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-tertiary font-bold mb-4">
              The Crown Jewel
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight mb-8">
              Dum Matka<br/>Biryani.
            </motion.h2>
            
            <motion.div variants={fadeUp} className="space-y-6 text-white/80 text-lg max-w-lg mb-10">
              <p>
                Experience the pinnacle of Awadhi cuisine. Our signature Dum Matka Biryani is slow-cooked to perfection in traditional earthen clay pots (matkas), sealing in the rich, complex flavors of our secret hand-ground spice blend.
              </p>
              <p>
                Layered with fragrant long-grain basmati rice, saffron-infused milk, and tender marinated vegetables, each matka is sealed with dough (dum) to lock in the steam. The result is an aromatic masterpiece that promises an unforgettable culinary journey.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button 
                href="/menu/dum-matka-biryani" 
                className="px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase shadow-xl hover:-translate-y-1 transition-all"
              >
                Order Now
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
