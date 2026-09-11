"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces the page to scroll to the very top (0, 0) on every route change.
 * Place this anywhere inside a layout or page to ensure the viewport
 * always starts at the top when navigating to a new product detail page.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Instant scroll — no smooth behavior so the user doesn't see an ugly jump
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
