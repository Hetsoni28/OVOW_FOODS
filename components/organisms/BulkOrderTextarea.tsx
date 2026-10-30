"use client";

import { ChangeEvent, useId } from "react";

interface BulkOrderTextareaProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export function BulkOrderTextarea({ label, value, onChange, placeholder }: BulkOrderTextareaProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest font-bold text-primary/70 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows={2}
        value={value}
        onChange={onChange}
        className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}
