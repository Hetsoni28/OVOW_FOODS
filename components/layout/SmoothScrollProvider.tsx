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
    if (lenis) {
      // Stop any ongoing scroll animation and jump to top instantly
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback for SSR or if Lenis not ready yet
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
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
