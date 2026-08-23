import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your OVOW FOODS order — premium 100% vegetarian food.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
