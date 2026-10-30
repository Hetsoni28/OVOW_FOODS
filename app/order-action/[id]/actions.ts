"use server";

import { cookies, headers } from "next/headers";
import { ADMIN_COOKIE, checkPin, createSessionToken, sessionCookieOptions, type PinResult } from "@/lib/adminAuth";

export async function verifyAdminPin(pin: string): Promise<PinResult> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";

  const result = checkPin(String(pin ?? ""), ip);
  if (result.ok) {
    const store = await cookies();
    store.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions());
  }
  return result;
}
