"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { pageAnim } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  // This component remounts on EVERY navigation.
  // Scrolling to top here is the most reliable fix for pages opening mid-scroll.
  useEffect(() => {
    // Instant scroll via native API — works even if Lenis isn't ready yet
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Also reset document.documentElement and body scroll (fixes edge cases)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
