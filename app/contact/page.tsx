import type { Metadata } from "next";
import { ContactHeader } from "@/components/organisms/ContactHeader";
import { ContactGrid } from "@/components/organisms/ContactGrid";
import { ContactMap } from "@/components/organisms/ContactMap";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with OVOW FOODS. Call, WhatsApp, or visit us in Ahmedabad. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-12 pb-24">
      <div className="container-x max-w-5xl">
        <ContactHeader />
        <ContactGrid />
        <ContactMap />
      </div>
    </main>
  );
}
