"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenSplash = sessionStorage.getItem("ovow_splash_seen");
    
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      // Disable scroll while splash is showing
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleSplashEnd = () => {
    setShowSplash(false);
    sessionStorage.setItem("ovow_splash_seen", "true");
    document.body.style.overflow = "unset";
  };

  // Do not render anything on the server to prevent hydration mismatch with the video element,
  // but we use a solid black overlay during the initial split-second to prevent the home page from flashing
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0A0A0A]" />
    );
  }

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center"
        >
          {/* Skip Button */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            onClick={handleSplashEnd}
            className="absolute top-8 right-8 z-[10000] text-white/40 hover:text-white transition-colors flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold backdrop-blur-md"
          >
            Skip <X size={14} />
          </motion.button>

          {/* Cinematic Logo Video */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <video
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleSplashEnd}
              className="w-full h-full object-cover"
            >
              {/* Desktop Video (Hidden on screens smaller than 768px) */}
              <source src="/videos/logo-cinematic.mp4" type="video/mp4" media="(min-width: 768px)" />
              
              {/* Mobile Video (Shown on screens smaller than 768px) */}
              <source src="/videos/logo-cinematic-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
              
              {/* Fallback */}
              <source src="/videos/logo-cinematic.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
