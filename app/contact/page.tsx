import type { Metadata } from "next";
import { ContactHeader } from "@/components/organisms/ContactHeader";
import { ContactGrid } from "@/components/organisms/ContactGrid";
import { ContactMap } from "@/components/organisms/ContactMap";
import { cmsPageMetadata } from "@/lib/pageSeo";

// Defaults below; editors can override them in Sanity Studio → Page SEO → "contact"
export function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("contact", {
    title: "Contact Us – Order on WhatsApp or Call",
    description: "Call, WhatsApp or message OVOW FOODS in Ahmedabad for orders, feedback and catering enquiries. Open daily until 4 am.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-24 pb-24">
      <div className="container-x max-w-5xl">
        <ContactHeader />
        <ContactGrid />
        <ContactMap />
      </div>
    </div>
  );
}
