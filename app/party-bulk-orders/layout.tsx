import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party & Bulk Orders",
  description: "Planning something special? Enquire about party and bulk orders for premium vegetarian catering.",
};

export default function BulkOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
