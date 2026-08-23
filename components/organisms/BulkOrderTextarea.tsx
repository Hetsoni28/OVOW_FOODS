"use client";

import { ChangeEvent } from "react";

interface BulkOrderTextareaProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export function BulkOrderTextarea({
  label,
  value,
  onChange,
  placeholder
}: BulkOrderTextareaProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">
        {label}
      </label>
      <textarea
        rows={2}
        value={value}
        onChange={onChange}
        className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}
