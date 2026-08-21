import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read what our customers have to say about the OVOW Foods premium vegetarian experience.",
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
