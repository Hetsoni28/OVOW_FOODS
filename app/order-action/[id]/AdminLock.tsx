"use client";

import { useState } from "react";
import { IconAlertCircle } from "@/components/atoms/Icons";

export function AdminLock({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  // In a real app, this would be an env variable. 
  // For this serverless setup, we hardcode a PIN that the merchant knows.
  const ADMIN_PIN = "7566"; 

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#0B2118]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#0B2118]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 font-serif">Admin Access Required</h2>
        <p className="text-sm text-gray-500">Please enter your merchant PIN to manage this order.</p>
      </div>

      <form onSubmit={handleUnlock} className="space-y-4">
        <div>
          <input
            type="password"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            placeholder="Enter 4-digit PIN"
            maxLength={4}
            className={`w-full text-center tracking-[0.5em] text-2xl font-mono p-4 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              error ? "border-red-500 focus:ring-red-200 bg-red-50" : "border-gray-200 focus:border-[#C9A24A] focus:ring-[#C9A24A]/20 bg-gray-50"
            }`}
          />
          {error && (
            <p className="text-red-500 text-xs text-center mt-2 font-bold flex items-center justify-center gap-1">
              <IconAlertCircle size={12} /> Incorrect PIN
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#0B2118] hover:bg-[#153a2b] text-[#C9A24A] p-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors"
        >
          Unlock Portal
        </button>
      </form>
    </div>
  );
}
