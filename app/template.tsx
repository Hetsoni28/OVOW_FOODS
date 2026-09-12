"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { pageAnim } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  // Remounts on EVERY navigation — guaranteed scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
