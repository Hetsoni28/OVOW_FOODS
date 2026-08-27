"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

/* ─── Letter-by-letter reveal ─── */
function SplitText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.05,
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [phase, setPhase] = useState<"brand" | "video">("brand");
  const [logoVisible, setLogoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Fires before paint — zero flash for returning users
  useLayoutEffect(() => {
    const seen = sessionStorage.getItem("ovow_splash_seen");
    if (seen) {
      const cover = document.getElementById("splash-cover");
      if (cover) cover.style.display = "none";
      setShowSplash(false);
      return;
    }
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);

    // Skip all timers for returning users — splash was already seen
    const seen = sessionStorage.getItem("ovow_splash_seen");
    if (seen) return;

    const t1 = setTimeout(() => setLogoVisible(true), 150);
    const t2 = setTimeout(() => {
      setPhase("video");
      videoRef.current?.play();
    }, 2800);
    // Safety net: on very slow networks, force end splash after 5s
    const t3 = setTimeout(() => handleSplashEnd(), 5000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) progress.set(v.currentTime / v.duration);
  };

  const handleSplashEnd = () => {
    animate(progress, 1, { duration: 0.3 });
    setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("ovow_splash_seen", "true");
      const cover = document.getElementById("splash-cover");
      if (cover) cover.style.display = "none";
      // Remove overflow lock cleanly so Lenis scroll is not disrupted
      document.body.style.overflow = "";
    }, 300);
  };

  if (!isMounted) {
    // Show logo immediately before JS hydrates — eliminates the green blank flash
    return (
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ backgroundColor: "#0d2d20" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/ovow-foods-logo.png"
          alt="OVOW FOODS"
          width={160}
          height={160}
          style={{ borderRadius: "50%", objectFit: "contain" }}
        />
      </div>
    );
  }

  // Logo size: smaller on mobile to fit all screens including iPhone SE
  const logoSize = isMobile ? 150 : 190;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          // Safari-safe exit: opacity only, no filter/scale
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ willChange: "opacity" }}
        >
          {/* ══ PHASE 1: BRAND SCREEN ══ */}
          <AnimatePresence>
            {phase === "brand" && (
              <motion.div
                key="brand"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ backgroundColor: "#0d2d20", gap: isMobile ? "16px" : "24px" }}
              >
                {/* Radial glow — GPU-accelerated via transform only */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: logoVisible ? 0.3 : 0, scale: logoVisible ? 1.2 : 0.6 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: isMobile ? "280px" : "420px",
                    height: isMobile ? "280px" : "420px",
                    background: "radial-gradient(circle, #c9a24a 0%, transparent 70%)",
                    willChange: "transform, opacity",
                  }}
                />

                {/* Expanding ring — uses transform only (no opacity array) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={logoVisible
                    ? { opacity: [0, 0.2, 0], scale: [0.85, 1.7, 1.9] }
                    : { opacity: 0, scale: 0.85 }
                  }
                  transition={{
                    duration: 2.2,
                    ease: "easeOut",
                    delay: 0.4,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    times: [0, 0.4, 1],
                  }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: isMobile ? "170px" : "220px",
                    height: isMobile ? "170px" : "220px",
                    border: "1px solid rgba(201,162,74,0.4)",
                    willChange: "transform, opacity",
                  }}
                />

                {/* Logo — NO filter animation (causes iOS conflict), use opacity+scale only */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{
                    opacity: logoVisible ? 1 : 0,
                    scale: logoVisible ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="relative z-10"
                  style={{
                    willChange: "transform, opacity",
                    // Safe box-shadow glow instead of filter (works on all browsers)
                    borderRadius: "50%",
                    boxShadow: logoVisible
                      ? "0 0 40px 8px rgba(201,162,74,0.35), 0 0 80px 20px rgba(201,162,74,0.15)"
                      : "none",
                  }}
                >
                  <Image
                    src="/logo/ovow-foods-logo.png"
                    alt="OVOW FOODS"
                    width={logoSize}
                    height={logoSize}
                    priority
                    className="object-contain rounded-full"
                  />
                </motion.div>

                {/* Gold divider line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: logoVisible ? 1 : 0,
                    opacity: logoVisible ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
                  className="relative z-10 h-px origin-center"
                  style={{
                    width: isMobile ? "100px" : "128px",
                    background: "linear-gradient(to right, transparent, #c9a24a, transparent)",
                    willChange: "transform, opacity",
                  }}
                />

                {/* Brand text */}
                {logoVisible && (
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <SplitText
                      text="OVOW FOODS"
                      delay={0.75}
                      className={`font-bold tracking-[0.45em] text-amber-400 ${
                        isMobile ? "text-[11px]" : "text-[13px]"
                      }`}
                    />
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.55, duration: 0.7, ease: "easeOut" }}
                      className={`tracking-[0.28em] text-white/35 uppercase font-light ${
                        isMobile ? "text-[7px]" : "text-[9px]"
                      }`}
                    >
                      Taste the WOW. Experience OVOW.
                    </motion.p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══ PHASE 2: VIDEO ══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "video" ? 1 : 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ willChange: "opacity" }}
          >
            <video
              ref={videoRef}
              autoPlay={false}
              muted
              playsInline
              preload="auto"
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
          </motion.div>

          {/* ══ SKIP BUTTON ══ */}
          <AnimatePresence>
            {phase === "video" && (
              <motion.button
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.7 }}
                onClick={handleSplashEnd}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-[10000] text-white/40 hover:text-white/90 transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold backdrop-blur-lg border border-white/5 hover:border-white/20"
              >
                Skip <X size={12} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* ══ PROGRESS BAR ══ */}
          <AnimatePresence>
            {phase === "video" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] z-[10000]"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    width: progressWidth,
                    background: "linear-gradient(to right, #92400e, #c9a24a, #fde68a, #c9a24a)",
                    willChange: "width",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
