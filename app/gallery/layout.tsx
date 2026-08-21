import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A feast for the eyes. Explore our culinary creations and premium packaging.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
