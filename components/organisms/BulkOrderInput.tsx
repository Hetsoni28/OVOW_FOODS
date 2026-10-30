"use client";

import { ChangeEvent, useId } from "react";

interface BulkOrderInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel";
}

export function BulkOrderInput({ label, type = "text", value, onChange, error, min, autoComplete, inputMode }: BulkOrderInputProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const required = label.includes("*");
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest font-bold text-primary/70 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors"
      />
      {error && <p id={errorId} role="alert" className="text-red-700 text-xs mt-1">{error}</p>}
    </div>
  );
}
