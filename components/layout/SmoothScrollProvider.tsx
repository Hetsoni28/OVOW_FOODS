"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Resets scroll to top on every route change.
 * Uses native browser scroll — no third-party library interception.
 * CSS `scroll-behavior: smooth` in globals.css handles smooth scrolling.
 */
function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Instant jump to top — 100% reliable, no library interception
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollReset />
      {children}
    </>
  );
}
