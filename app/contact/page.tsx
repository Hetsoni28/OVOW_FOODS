"use client";

import { ContactHeader } from "@/components/organisms/ContactHeader";
import { ContactGrid } from "@/components/organisms/ContactGrid";
import { ContactMap } from "@/components/organisms/ContactMap";

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
