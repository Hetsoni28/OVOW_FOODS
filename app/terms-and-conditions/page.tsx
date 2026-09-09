import { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@/components/atoms/Icons";

export const metadata: Metadata = {
  title: "Terms & Conditions | OVOW FOODS",
  description: "Terms and Conditions for OVOW FOODS",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#F9F6F0]">
      <div className="container-x max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary/60 hover:text-[#C9A24A] transition-colors mb-8 text-sm uppercase tracking-widest font-bold"
        >
          <IconArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-12">
          Terms & Conditions
        </h1>
        <div className="prose prose-lg prose-primary max-w-none text-primary/80">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary/60">
            Last Updated: [Date]
          </p>
          <p className="mb-8">
            By accessing or using the OVOW FOODS website, application or direct ordering service, you agree to the following Terms & Conditions.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">1. Orders</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>All orders are subject to product availability and confirmation.</li>
            <li>Once an order is confirmed, ingredients and preparation may be arranged specifically for that order.</li>
            <li>Pre-Booking may be required for selected special dishes, large orders and planned meals.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">2. Fresh Preparation & Pre-Orders</h2>
          <p className="mb-4">
            At OVOW FOODS, selected dishes are freshly prepared after receiving the order.
          </p>
          <p className="mb-4">
            For special dishes, planned meals, Catering and Bulk Orders, customers are encouraged to Pre-Book in advance so that we can properly plan preparation and maintain our quality standards.
          </p>
          <p className="mb-8 font-serif italic text-xl text-primary">
            Book Today. Taste Tomorrow.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">3. Catering & Bulk Orders</h2>
          <p className="mb-4">OVOW FOODS accepts Pure Vegetarian Catering and Bulk Food Orders for:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Parties & Family Functions</li>
            <li>Birthdays & Anniversaries</li>
            <li>Corporate & Office Lunches</li>
            <li>Small & Large Gatherings</li>
            <li>Special Events</li>
            <li>Bulk Food Requirements</li>
          </ul>
          <p className="mb-4">
            For Catering and Bulk Orders, menu, quantity, date, time and delivery location must be confirmed in advance.
          </p>
          <p className="mb-8">
            An advance payment or booking amount may be required for selected Catering/Bulk Orders.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">4. Pricing</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Prices displayed on our website may change from time to time.</li>
            <li>The applicable price at the time of order confirmation will be considered valid.</li>
            <li>Delivery charges or other applicable charges may be additional where applicable.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">5. Payments</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Payments can be made through the payment methods available on our website/application.</li>
            <li>An order may be considered confirmed only after successful payment or confirmation, as applicable.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">6. Cancellation & Refunds</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Once food preparation has started, an order may not be eligible for cancellation or refund.</li>
            <li>Special, Pre-Order, Catering and Bulk Orders may have specific cancellation and refund conditions.</li>
            <li>Customers are requested to contact OVOW FOODS as early as possible for any cancellation request.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">7. Delivery</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Customers must provide accurate name, mobile number and delivery address.</li>
            <li>Incorrect or incomplete information may result in delivery delays.</li>
            <li>Delivery times may vary due to traffic, weather, location or other circumstances beyond our reasonable control.</li>
            <li>Customers are requested to remain available at the provided delivery location.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">8. Food Quality & Complaints</h2>
          <p className="mb-4">
            We take food quality, hygiene and preparation standards seriously.
          </p>
          <p className="mb-8">
            If you experience any significant issue with your order, please contact us as soon as possible after delivery and provide the relevant order details and photographs, where applicable.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">9. Allergies & Dietary Requirements</h2>
          <p className="mb-4">
            Customers must inform OVOW FOODS about any food allergies or specific dietary requirements before placing an order.
          </p>
          <p className="mb-8">
            Although we take reasonable precautions, cross-contact with other ingredients may occur in a shared kitchen environment.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">10. Website Usage</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Website content, menu items, photographs, prices and other information may be updated or changed from time to time.</li>
            <li>Users must not use our website for unlawful, fraudulent or unauthorized purposes.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">11. Intellectual Property</h2>
          <p className="mb-4">
            The OVOW FOODS name, logo, photographs, graphics, text, designs and other original content are the property of OVOW FOODS or its respective owners.
          </p>
          <p className="mb-8">
            They may not be copied, reproduced, modified or commercially used without prior authorization.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">12. Changes to These Terms</h2>
          <p className="mb-4">
            OVOW FOODS reserves the right to modify these Terms & Conditions when necessary.
          </p>
          <p className="mb-8">
            Updated terms will be published on the website and will become effective upon publication.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">13. Contact Us</h2>
          <div className="bg-white p-6 md:p-8 shadow-sm border border-primary/10 mb-12">
            <p className="font-bold text-primary mb-2">OVOW FOODS</p>
            <p className="mb-2">📱 WhatsApp: <a href="https://wa.me/917567566214" className="text-[#C9A24A] hover:underline">756 756 6214</a></p>
            <p>📍 Ahmedabad, Gujarat, India</p>
          </div>
          
          <div className="text-center py-12 border-t border-primary/10">
            <p className="font-serif text-2xl text-primary mb-2">CURATING THE EXTRAORDINARY</p>
            <p className="text-primary/60 tracking-widest uppercase text-sm font-bold">Taste the WOW. Experience OVOW.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
