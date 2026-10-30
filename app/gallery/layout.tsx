import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/pageSeo";

// Defaults below; editors can override them in Sanity Studio → Page SEO → "gallery"
export function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("gallery", {
    title: "Food Gallery – Our Dishes & Kitchen",
    description: "A feast for the eyes — see the dishes, kitchen craft and packaging behind OVOW FOODS, Ahmedabad’s premium pure vegetarian kitchen.",
    path: "/gallery",
  });
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
