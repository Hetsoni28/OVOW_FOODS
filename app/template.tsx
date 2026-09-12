"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { pageAnim } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  // This component remounts on EVERY route navigation.
  // Using both Lenis API + direct DOM to guarantee scroll reset.
  useEffect(() => {
    // 1. Direct DOM reset — always works, bypasses any interception
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Tell Lenis directly to go to top
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    }

    // 3. Double-tap after a frame in case Lenis re-initialises
    const raf = requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (lenis) lenis.scrollTo(0, { immediate: true });
    });

    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
