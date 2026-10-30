"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-level error UI — shown when a page fails to render (e.g. Sanity is down)
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div role="alert" className="min-h-[70vh] bg-[#F9F6F0] pt-32 pb-24 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A6A1F] mb-3">Something went wrong</p>
        <h1 className="font-serif text-4xl text-primary mb-4">We dropped the plate</h1>
        <p className="text-primary/70 mb-10">
          This page couldn&apos;t load right now. Please try again — your cart is safe.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="bg-primary text-white px-8 py-4 min-h-[44px] text-xs font-bold uppercase tracking-widest hover:bg-[#1A4D3A] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-primary/30 text-primary px-8 py-4 min-h-[44px] text-xs font-bold uppercase tracking-widest hover:border-primary transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
