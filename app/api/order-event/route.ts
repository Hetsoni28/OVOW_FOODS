import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { extractLocality } from "@/lib/locality";

// Write client — uses the existing SANITY_API_TOKEN already set in Vercel
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_TOKEN, // already configured in Vercel ✅
  useCdn: false,
});

// Matches lib/order.ts → OVOW-YYMMDD-XXXX
const ORDER_ID_RE = /^OVOW-\d{6}-[A-HJ-NP-Z2-9]{4}$/;

// Basic per-IP rate limit (in-memory, per serverless instance)
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { orderId, area, itemCount, paymentMethod } = body ?? {};
  const count = Number(itemCount);

  if (typeof orderId !== "string" || !ORDER_ID_RE.test(orderId) || !Number.isInteger(count) || count < 1 || count > 100) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    // Deterministic _id → the same order can only ever create one ticker event
    const result = await writeClient.createIfNotExists({
      _id: `orderEvent-${orderId}`,
      _type: "orderEvent",
      orderId,
      area: extractLocality(area),
      itemCount: count,
      paymentMethod: paymentMethod === "cod" ? "cod" : "upi",
      placedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, id: result._id });
  } catch (err) {
    console.error("[order-event API]", err);
    return NextResponse.json({ error: "Failed to save order event" }, { status: 500 });
  }
}
