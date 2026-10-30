import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ovow_admin";
const SESSION_HOURS = 12;

// Failed-attempt lockout, per IP. In-memory, so it resets on cold start and is
// per serverless instance — enough to make brute-forcing a 4-digit PIN slow.
const MAX_FAILURES = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; until: number }>();

function getPin(): string | null {
  const pin = process.env.ADMIN_PIN?.trim();
  return pin ? pin : null;
}

function sign(value: string): string {
  // Secret changes whenever the PIN changes, which invalidates old sessions.
  const secret = `${getPin()}:${process.env.SANITY_API_TOKEN ?? ""}`;
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isAdminConfigured(): boolean {
  return getPin() !== null;
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  return `${expires}.${sign(String(expires))}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return safeEqual(sig, sign(expires));
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(ADMIN_COOKIE)?.value);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  };
}

export type PinResult = { ok: true } | { ok: false; reason: "invalid" | "locked" | "not_configured" };

export function checkPin(pin: string, ip: string): PinResult {
  const correct = getPin();
  if (!correct) return { ok: false, reason: "not_configured" };

  const now = Date.now();
  const entry = failures.get(ip);
  if (entry && entry.until > now) return { ok: false, reason: "locked" };

  if (safeEqual(pin, correct)) {
    failures.delete(ip);
    return { ok: true };
  }

  const count = (entry && entry.until > now ? entry.count : 0) + 1;
  failures.set(ip, { count, until: count >= MAX_FAILURES ? now + LOCKOUT_MS : 0 });
  return { ok: false, reason: count >= MAX_FAILURES ? "locked" : "invalid" };
}
