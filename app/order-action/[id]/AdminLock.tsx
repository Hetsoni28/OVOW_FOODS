"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { IconLoader } from "@/components/atoms/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { verifyAdminPin } from "./actions";

export function AdminLock({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => { inputs.current[0]?.focus(); }, []);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...pin];
    next[idx] = val;
    setPin(next);
    setError(false);

    if (val && idx < 3) {
      inputs.current[idx + 1]?.focus();
    }

    // Auto-submit when all 4 filled
    if (val && idx === 3) {
      const fullPin = [...next.slice(0, 3), val].join("");
      if (fullPin.length === 4) submitPin(fullPin);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const submitPin = (fullPin?: string) => {
    const p = fullPin ?? pin.join("");
    if (p.length < 4) return;
    startTransition(async () => {
      const isValid = await verifyAdminPin(p);
      if (isValid) {
        setIsUnlocked(true);
        setError(false);
      } else {
        setError(true);
        setShake(true);
        setPin(["", "", "", ""]);
        setTimeout(() => {
          setShake(false);
          inputs.current[0]?.focus();
        }, 600);
      }
    });
  };

  if (isUnlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0B2118] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A24A]/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent mb-8" />

        {/* Brand */}
        <div className="text-center mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A24A] mb-3">OVOW FOODS</p>
          <h1 className="font-serif text-3xl text-white mb-2">Admin Portal</h1>
          <p className="text-white/30 text-xs tracking-wider">Enter your 4-digit merchant PIN</p>
        </div>

        {/* Lock icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={error ? { scale: [1, 1.1, 1] } : {}}
            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
              error ? "border-red-500/60 bg-red-500/10" : "border-[#C9A24A]/30 bg-[#C9A24A]/5"
            }`}
          >
            <svg className={`w-7 h-7 transition-colors ${error ? "text-red-400" : "text-[#C9A24A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>
        </div>

        {/* PIN dots */}
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-4 mb-8"
        >
          {pin.map((digit, idx) => (
            <div key={idx} className="relative">
              <input
                ref={(el) => { inputs.current[idx] = el; }}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="sr-only"
              />
              <button
                onClick={() => inputs.current[idx]?.focus()}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all duration-200 ${
                  digit
                    ? error
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : "border-[#C9A24A] bg-[#C9A24A]/10 text-[#C9A24A]"
                    : "border-white/10 bg-white/5 text-transparent"
                }`}
              >
                {digit ? "●" : ""}
              </button>
              {/* Active indicator */}
              {!digit && document.activeElement === inputs.current[idx] && (
                <motion.div
                  layoutId="pin-cursor"
                  className="absolute inset-0 rounded-xl border-2 border-[#C9A24A] pointer-events-none"
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-xs text-red-400 font-bold mb-6 tracking-wider"
            >
              ✕ &nbsp; Incorrect PIN — Access Denied
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <button
          onClick={() => submitPin()}
          disabled={isPending || pin.join("").length < 4}
          className="w-full bg-[#C9A24A] hover:bg-[#b8913f] disabled:opacity-30 disabled:cursor-not-allowed text-[#0B2118] py-4 font-black uppercase tracking-[0.2em] text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <IconLoader size={16} />
              Verifying...
            </>
          ) : (
            "Unlock Portal"
          )}
        </button>

        {/* Numpad for mobile */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((key, i) => (
            <button
              key={i}
              onClick={() => {
                if (key === "⌫") {
                  // Backspace
                  const lastFilled = [...pin].reverse().findIndex(d => d !== "");
                  if (lastFilled === -1) return;
                  const idx = 3 - lastFilled;
                  const next = [...pin];
                  next[idx] = "";
                  setPin(next);
                  inputs.current[idx]?.focus();
                } else if (key !== "") {
                  const emptyIdx = pin.findIndex(d => d === "");
                  if (emptyIdx === -1) return;
                  handleChange(String(key), emptyIdx);
                  inputs.current[emptyIdx]?.focus();
                }
              }}
              disabled={key === ""}
              className={`h-12 rounded-lg text-lg font-bold transition-all ${
                key === ""
                  ? "invisible"
                  : key === "⌫"
                  ? "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white active:scale-95"
                  : "bg-white/5 text-white hover:bg-[#C9A24A]/20 hover:text-[#C9A24A] active:scale-95 border border-white/10"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-white/15 mt-8 tracking-widest uppercase">
          Protected — OVOW Merchant System
        </p>
      </motion.div>
    </div>
  );
}
