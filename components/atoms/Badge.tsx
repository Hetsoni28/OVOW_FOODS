import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <p className={`text-xs uppercase tracking-[.3em] ${className}`}>
      {children}
    </p>
  );
}
