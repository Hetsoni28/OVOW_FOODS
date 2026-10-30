import { client } from "@/sanity/lib/client";
import { APPROVED_REVIEWS_QUERY } from "@/sanity/lib/queries";
import { ReviewsClient } from "./ReviewsClient";
import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/pageSeo";

// Defaults below; editors can override them in Sanity Studio → Page SEO → "reviews"
export function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("reviews", {
    title: "Customer Reviews – Pure Veg Food in Ahmedabad",
    description: "Real reviews from OVOW FOODS customers in Ahmedabad — see what people love about our premium pure vegetarian food, or leave your own.",
    path: "/reviews",
  });
}

export const revalidate = 60; // Revalidate every 60 seconds

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export default async function ReviewsPage() {
  const reviews = await client.fetch<Review[]>(APPROVED_REVIEWS_QUERY);

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-32 pb-24 text-primary">
      <div className="container-x">
        <ReviewsClient reviews={reviews} />
      </div>
    </div>
  );
}
