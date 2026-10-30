import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { RECOMMENDATIONS_QUERY } from "@/sanity/lib/queries";

const toStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, 50) : [];

export async function POST(req: NextRequest) {
  let cartItemIds: string[];
  let cartCategories: string[];
  try {
    const body = await req.json();
    cartItemIds = toStringArray(body?.cartItemIds);
    cartCategories = toStringArray(body?.cartCategories);
  } catch {
    return NextResponse.json({ recommendations: [] }, { status: 400 });
  }

  try {

    // Fetch products that are:
    // - NOT sold out
    // - NOT already in the cart (by _id)
    // - Preferably from a DIFFERENT category than what's in cart (cross-sell)
    const allRecs = await client.fetch(
      RECOMMENDATIONS_QUERY,
      { excludeIds: cartItemIds },
      { next: { revalidate: 60 } }
    );

    // Score: prioritise items from categories NOT already in cart
    const scored = allRecs.map((p: any) => ({
      ...p,
      score:
        (cartCategories.includes(p.category) ? 0 : 2) + // cross-category bonus
        (p.isBestSeller ? 1 : 0) +
        (p.signature ? 1 : 0),
    }));

    const sorted = scored
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3); // Max 3 recommendations

    return NextResponse.json({ recommendations: sorted });
  } catch (err) {
    console.error("[/api/recommendations]", err);
    return NextResponse.json({ recommendations: [] }, { status: 500 });
  }
}
