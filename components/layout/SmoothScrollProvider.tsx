"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Resets Lenis scroll to the very top on every route change.
 * Must be rendered INSIDE <ReactLenis> so useLenis() works.
 */
function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Force native scroll instantly
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (lenis) {
      // 2. Stop ongoing Lenis momentum, force to top, and restart
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    }

    // 3. Safety fallback after React completes rendering the new route
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
