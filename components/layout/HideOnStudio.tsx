"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function HideOnStudio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  return <>{children}</>;
}
