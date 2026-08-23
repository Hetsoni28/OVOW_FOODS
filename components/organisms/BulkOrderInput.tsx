"use client";

import { ChangeEvent } from "react";

interface BulkOrderInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: string;
}

export function BulkOrderInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  min
}: BulkOrderInputProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
