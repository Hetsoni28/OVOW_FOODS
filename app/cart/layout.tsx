import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component, so its metadata lives here
export const metadata: Metadata = pageMetadata({
  title: "Your Cart",
  description: "Review the dishes in your OVOW FOODS cart.",
  path: "/cart",
  noIndex: true,
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
