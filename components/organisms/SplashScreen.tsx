"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { X } from "lucide-react";

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    const hasSeenSplash = sessionStorage.getItem("ovow_splash_seen");
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      progress.set(video.currentTime / video.duration);
    }
  };

  const handleSplashEnd = () => {
    animate(progress, 1, { duration: 0.3 });
    setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("ovow_splash_seen", "true");
      document.body.style.overflow = "unset";
    }, 300);
  };

  if (!isMounted) {
    return <div className="fixed inset-0 z-[9999] bg-black" />;
  }

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-black"
        >
          {/* Video — poster shows instantly, video plays on top */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={isMobile ? "/images/splash-poster-mobile.jpg" : "/images/splash-poster-desktop.jpg"}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleSplashEnd}
            className="w-full h-full object-cover"
          >
            {isMobile ? (
              <source src="/videos/logo-cinematic-mobile.mp4" type="video/mp4" />
            ) : (
              <source src="/videos/logo-cinematic.mp4" type="video/mp4" />
            )}
          </video>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            onClick={handleSplashEnd}
            className="absolute top-8 right-8 z-[10000] text-white/40 hover:text-white/90 transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold backdrop-blur-lg border border-white/5 hover:border-white/20"
          >
            Skip <X size={13} strokeWidth={2.5} />
          </motion.button>

          {/* Progress bar — gold, synced to video */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-[10000]">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500"
              style={{ width: progressWidth }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
