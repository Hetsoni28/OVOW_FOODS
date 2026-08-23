"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

export function ContactHeader() {
  const text = "Talk to OVOW.";
  const letters = Array.from(text);

  const letterAnim: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="text-center mb-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C9A24A]/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
      
      <motion.p 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-[10px] md:text-xs uppercase tracking-[.4em] text-[#C9A24A] font-bold mb-6"
      >
        Get in touch
      </motion.p>
      
      <motion.h1 
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-tight overflow-hidden pb-4"
      >
        {letters.map((letter, i) => (
          <motion.span 
            key={i} 
            variants={letterAnim}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
      
      <motion.p 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.4 }}
        className="mt-4 text-primary/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
      >
        Whether you have a question about our menu, need help with a bulk order, or just want to say hi, our kitchen is always open for you.
      </motion.p>
    </div>
  );
}
