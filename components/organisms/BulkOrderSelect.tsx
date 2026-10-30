"use client";

import { ChangeEvent, useId } from "react";

interface BulkOrderSelectProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  error?: string;
}

export function BulkOrderSelect({ label, value, onChange, options, error }: BulkOrderSelectProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest font-bold text-primary/70 mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        aria-required={label.includes("*") || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors appearance-none"
      >
        <option value="" disabled>Select {label.toLowerCase().replace(" *", "")}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p id={errorId} role="alert" className="text-red-700 text-xs mt-1">{error}</p>}
    </div>
  );
}
