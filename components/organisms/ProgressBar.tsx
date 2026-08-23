"use client";

import { Check } from "lucide-react";

const STEP_LABELS = ["Details", "Summary", "Pay", "Done"];

export function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-10 select-none">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 flex items-center justify-center text-xs font-bold border-2 transition-all duration-400 ${
                  done
                    ? "bg-primary border-primary text-white"
                    : active
                    ? "bg-[#C9A24A] border-[#C9A24A] text-white shadow-[0_2px_12px_rgba(201,162,74,0.35)]"
                    : "border-primary/12 text-primary/20 bg-transparent"
                }`}
              >
                {done ? <Check size={14} strokeWidth={2.5} /> : n}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest absolute mt-12 transition-colors ${
                  active || done ? "text-primary" : "text-primary/30"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`w-10 sm:w-16 h-[2px] mx-2 transition-colors duration-500 ${
                  done ? "bg-primary" : "bg-primary/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
