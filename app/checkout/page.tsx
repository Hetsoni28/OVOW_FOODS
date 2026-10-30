import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = pageMetadata({
  title: "Checkout",
  description: "Complete your OVOW FOODS order.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
