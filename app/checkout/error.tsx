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
    // Log the error to the console
    console.error("CHECKOUT ERROR:", error);
  }, [error]);

  return (
    <div className="p-8 mt-24 bg-red-50 border border-red-200">
      <h2 className="text-xl font-bold text-red-800">Checkout Crash!</h2>
      <p className="text-red-600 mt-2">{error.message}</p>
      <pre className="mt-4 p-4 bg-red-100 text-xs overflow-auto">
        {error.stack}
      </pre>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white font-bold"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
