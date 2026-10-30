import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component, so its metadata lives here
export const metadata: Metadata = pageMetadata({
  title: "Your Orders",
  description: "Your past OVOW FOODS orders on this device.",
  path: "/orders",
  noIndex: true,
});

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
