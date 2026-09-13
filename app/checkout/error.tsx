"use client";

import { useEffect } from "react";

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only log in development — never expose stack to users
    if (process.env.NODE_ENV === "development") {
      console.error("CHECKOUT ERROR:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        {/* Gold top bar */}
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent mx-auto mb-8" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>

        <h1 className="font-serif text-2xl text-[#0B2118] mb-2">Something went wrong</h1>
        <p className="text-sm text-[#0B2118]/50 mb-8 leading-relaxed">
          Your cart is safe. Please try again or return to the menu.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-[#0B2118] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#0B2118]/90 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/menu"
            className="border border-[#0B2118]/20 text-[#0B2118] px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#0B2118]/5 transition-colors"
          >
            Back to Menu
          </a>
        </div>
      </div>
    </div>
  );
}
