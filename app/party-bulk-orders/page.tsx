import type { Metadata } from "next";
import { PartyBulkOrdersClient } from "./PartyBulkOrdersClient";
import { cmsPageMetadata } from "@/lib/pageSeo";

// Defaults below; editors can override them in Sanity Studio → Page SEO → "party-bulk-orders"
export function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("party-bulk-orders", {
    title: "Party & Bulk Veg Catering in Ahmedabad",
    description: "Planning a party, wedding or corporate event in Ahmedabad? OVOW FOODS caters premium 100% vegetarian food for groups of any size. Enquire now.",
    path: "/party-bulk-orders",
  });
}

export default function BulkOrdersPage() {
  return <PartyBulkOrdersClient />;
}
