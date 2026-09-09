import { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconCheck } from "@/components/atoms/Icons";
import { Reveal } from "@/components/atoms/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions | OVOW FOODS",
  description: "Terms and Conditions for OVOW FOODS",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Premium Header Section */}
      <div className="bg-[#0B2118] text-white pt-32 pb-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A24A]/10 to-transparent"></div>
        
        <div className="container-x relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-[#F9F6F0]/70 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
              By accessing or using the OVOW FOODS website, application or direct ordering service, you agree to these terms.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-x max-w-4xl mx-auto -mt-24 relative z-20 pb-32">
        <Reveal delay={0.2} className="bg-white p-8 md:p-16 shadow-2xl shadow-primary/5 border border-primary/10 rounded-sm">
          <div className="prose prose-lg prose-primary max-w-none text-primary/80">
            <p className="text-sm font-bold uppercase tracking-widest text-[#C9A24A] text-center mb-12">
              Last Updated: [Date]
            </p>

            <Section title="1. Orders">
              <ul className="grid grid-cols-1 gap-4 list-none pl-0 mb-0">
                <ListItem>All orders are subject to product availability and confirmation.</ListItem>
                <ListItem>Once an order is confirmed, ingredients and preparation may be arranged specifically for that order.</ListItem>
                <ListItem>Pre-Booking may be required for selected special dishes, large orders and planned meals.</ListItem>
              </ul>
            </Section>

            <Section title="2. Fresh Preparation & Pre-Orders">
              <p className="mb-4">
                At OVOW FOODS, selected dishes are freshly prepared after receiving the order.
              </p>
              <p className="mb-8">
                For special dishes, planned meals, Catering and Bulk Orders, customers are encouraged to Pre-Book in advance so that we can properly plan preparation and maintain our quality standards.
              </p>
              <div className="bg-primary/5 border-l-2 border-[#C9A24A] p-6 text-center">
                <p className="font-serif italic text-2xl text-primary m-0">
                  Book Today. Taste Tomorrow.
                </p>
              </div>
            </Section>

            <Section title="3. Catering & Bulk Orders">
              <p className="mb-6">OVOW FOODS accepts Pure Vegetarian Catering and Bulk Food Orders for:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0 mb-8">
                <ListItem>Parties & Family Functions</ListItem>
                <ListItem>Birthdays & Anniversaries</ListItem>
                <ListItem>Corporate & Office Lunches</ListItem>
                <ListItem>Small & Large Gatherings</ListItem>
                <ListItem>Special Events</ListItem>
                <ListItem>Bulk Food Requirements</ListItem>
              </ul>
              <p className="mb-4">
                For Catering and Bulk Orders, menu, quantity, date, time and delivery location must be confirmed in advance.
              </p>
              <p>
                An advance payment or booking amount may be required for selected Catering/Bulk Orders.
              </p>
            </Section>

            <Section title="4. Pricing & Payments">
              <ul className="grid grid-cols-1 gap-4 list-none pl-0 mb-0">
                <ListItem>Prices displayed on our website may change from time to time. The applicable price at the time of order confirmation will be considered valid.</ListItem>
                <ListItem>Delivery charges or other applicable charges may be additional where applicable.</ListItem>
                <ListItem>Payments can be made through the payment methods available on our website/application.</ListItem>
                <ListItem>An order may be considered confirmed only after successful payment or confirmation, as applicable.</ListItem>
              </ul>
            </Section>

            <Section title="5. Cancellation & Refunds">
              <ul className="grid grid-cols-1 gap-4 list-none pl-0 mb-0">
                <ListItem>Once food preparation has started, an order may not be eligible for cancellation or refund.</ListItem>
                <ListItem>Special, Pre-Order, Catering and Bulk Orders may have specific cancellation and refund conditions.</ListItem>
                <ListItem>Customers are requested to contact OVOW FOODS as early as possible for any cancellation request.</ListItem>
              </ul>
            </Section>

            <Section title="6. Delivery">
              <ul className="grid grid-cols-1 gap-4 list-none pl-0 mb-0">
                <ListItem>Customers must provide accurate name, mobile number and delivery address. Incorrect or incomplete information may result in delivery delays.</ListItem>
                <ListItem>Delivery times may vary due to traffic, weather, location or other circumstances beyond our reasonable control.</ListItem>
                <ListItem>Customers are requested to remain available at the provided delivery location.</ListItem>
              </ul>
            </Section>

            <Section title="7. Food Quality & Complaints">
              <p className="mb-4">
                We take food quality, hygiene and preparation standards seriously.
              </p>
              <p>
                If you experience any significant issue with your order, please contact us as soon as possible after delivery and provide the relevant order details and photographs, where applicable.
              </p>
            </Section>

            <Section title="8. Allergies & Dietary Requirements">
              <p className="mb-4">
                Customers must inform OVOW FOODS about any food allergies or specific dietary requirements before placing an order.
              </p>
              <p className="text-primary/60 italic">
                Although we take reasonable precautions, cross-contact with other ingredients may occur in a shared kitchen environment.
              </p>
            </Section>

            <Section title="9. Website Usage & Intellectual Property">
              <ul className="grid grid-cols-1 gap-4 list-none pl-0 mb-6">
                <ListItem>Website content, menu items, photographs, prices and other information may be updated or changed from time to time.</ListItem>
                <ListItem>Users must not use our website for unlawful, fraudulent or unauthorized purposes.</ListItem>
              </ul>
              <p className="mb-4">
                The OVOW FOODS name, logo, photographs, graphics, text, designs and other original content are the property of OVOW FOODS or its respective owners.
              </p>
              <p>
                They may not be copied, reproduced, modified or commercially used without prior authorization.
              </p>
            </Section>

            <Section title="10. Changes to These Terms">
              <p>
                OVOW FOODS reserves the right to modify these Terms & Conditions when necessary. Updated terms will be published on the website and will become effective upon publication.
              </p>
            </Section>

            <Section title="11. Contact Us" last>
              <div className="bg-[#0B2118] text-white p-8 md:p-10 shadow-xl border border-[#C9A24A]/20 mt-4 mb-12 rounded-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="font-serif text-2xl mb-2 text-[#C9A24A]">OVOW FOODS</p>
                  <p className="text-white/70">Ahmedabad, Gujarat, India</p>
                </div>
                <a href="https://wa.me/917567566214" className="inline-flex items-center gap-2 bg-[#C9A24A] text-[#0B2118] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                  Contact via WhatsApp
                </a>
              </div>
              
              <div className="text-center py-12 border-t border-primary/10">
                <p className="font-serif text-2xl text-primary mb-2">CURATING THE EXTRAORDINARY</p>
                <p className="text-[#C9A24A] tracking-widest uppercase text-sm font-bold">Taste the WOW. Experience OVOW.</p>
              </div>
            </Section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Section({ title, children, last = false }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`pt-10 ${!last ? 'border-b border-primary/10 pb-10' : ''}`}>
      <h2 className="text-2xl md:text-3xl font-serif text-primary mb-6">{title}</h2>
      {children}
    </div>
  );
}

function ListItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={`flex items-start gap-3 ${className}`}>
      <span className="flex-shrink-0 mt-1 w-5 h-5 bg-[#C9A24A]/10 rounded-full flex items-center justify-center text-[#C9A24A]">
        <IconCheck size={12} />
      </span>
      <span className="text-primary/80">{children}</span>
    </li>
  );
}
