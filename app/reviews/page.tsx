import { client } from "@/sanity/lib/client";
import { APPROVED_REVIEWS_QUERY } from "@/sanity/lib/queries";
import { ReviewsClient } from "./ReviewsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Real reviews from OVOW FOODS customers. See what people love about our premium vegetarian food in Ahmedabad.",
};

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
    <main className="min-h-screen bg-[#F9F6F0] pt-32 pb-24 text-primary">
      <div className="container-x">
        <ReviewsClient reviews={reviews} />
      </div>
    </main>
  );
}
