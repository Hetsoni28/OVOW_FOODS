import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Write client — uses the existing SANITY_API_TOKEN already set in Vercel
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_TOKEN, // already configured in Vercel ✅
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, area, itemCount, paymentMethod } = body;

    if (!orderId || !itemCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Extract just the locality from the address (first word/comma-segment)
    const cleanArea = area
      ? area.split(",")[0].split(" ").slice(0, 2).join(" ").trim()
      : "Ahmedabad";

    const doc = {
      _type: "orderEvent",
      orderId,
      area: cleanArea,
      itemCount: Number(itemCount),
      paymentMethod: paymentMethod || "upi",
      placedAt: new Date().toISOString(),
    };

    const result = await writeClient.create(doc);
    return NextResponse.json({ success: true, id: result._id });
  } catch (err) {
    console.error("[order-event API]", err);
    return NextResponse.json({ error: "Failed to save order event" }, { status: 500 });
  }
}
