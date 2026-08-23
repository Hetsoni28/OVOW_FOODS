"use client";

import { motion } from "framer-motion";
import {  childAnim  } from "@/lib/animations";

export const inputCls = (err?: string) =>
  `w-full border-b-2 px-0 py-2.5 text-sm text-primary placeholder:text-primary/25 bg-transparent focus:outline-none transition-colors ${
    err ? "border-red-300 focus:border-red-500" : "border-primary/15 focus:border-[#C9A24A]"
  }`;

export function Field({
  id, label, required, error, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={childAnim} className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-primary/45"
      >
        {label}
        {required && <span className="text-[#C9A24A] font-black">·</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[11px] flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
          {error}
        </p>
      )}
    </motion.div>
  );
}
