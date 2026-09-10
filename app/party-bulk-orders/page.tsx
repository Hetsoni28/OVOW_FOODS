import type { Metadata } from "next";
import { PartyBulkOrdersClient } from "./PartyBulkOrdersClient";

export const metadata: Metadata = {
  title: "Party & Bulk Orders",
  description: "Planning a party, wedding, or corporate event in Ahmedabad? OVOW FOODS delivers premium 100% vegetarian bulk catering. Enquire now!",
  openGraph: {
    title: "Party & Bulk Orders | OVOW FOODS",
    description: "Premium vegetarian catering for parties, weddings & events. Order now.",
  },
};

export default function BulkOrdersPage() {
  return <PartyBulkOrdersClient />;
}
