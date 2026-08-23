"use client";

import { ChangeEvent } from "react";

interface BulkOrderSelectProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  error?: string;
}

export function BulkOrderSelect({
  label,
  value,
  onChange,
  options,
  error
}: BulkOrderSelectProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors appearance-none"
      >
        <option value="" disabled>Select {label.toLowerCase().replace(" *", "")}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
