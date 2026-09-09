import { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@/components/atoms/Icons";

export const metadata: Metadata = {
  title: "Privacy Policy | OVOW FOODS",
  description: "Privacy Policy for OVOW FOODS",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <div className="prose prose-lg prose-primary max-w-none text-primary/80">
          <p className="mb-8">
            At OVOW FOODS, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use and protect your information when you use our website, application or direct ordering services.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">1. Information We Collect</h2>
          <p className="mb-4">When you place an order or contact us, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Name</li>
            <li>Mobile/WhatsApp number</li>
            <li>Email address</li>
            <li>Delivery address</li>
            <li>Order details</li>
            <li>Payment-related information</li>
            <li>Any other information required to process your order</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">2. How We Use Your Information</h2>
          <p className="mb-4">Your information may be used to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Process and confirm your orders</li>
            <li>Prepare and deliver your food</li>
            <li>Contact you regarding your order</li>
            <li>Manage Pre-Orders and Catering/Bulk Orders</li>
            <li>Process payments</li>
            <li>Provide customer support</li>
            <li>Improve our food, services and customer experience</li>
            <li>Communicate important service-related updates</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">3. Payment Information</h2>
          <p className="mb-4">
            Online payments may be processed through authorized third-party payment gateways.
          </p>
          <p className="mb-8">
            OVOW FOODS does not intend to store sensitive payment information such as your card PIN, UPI PIN or banking passwords.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">4. Protection of Your Information</h2>
          <p className="mb-4">
            We take reasonable technical and organizational measures to protect your personal information from unauthorized access, misuse or disclosure.
          </p>
          <p className="mb-8">
            However, no internet-based system can be guaranteed to be completely secure.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">5. Sharing of Information</h2>
          <p className="mb-4">
            OVOW FOODS does not sell your personal information.
          </p>
          <p className="mb-8">
            Information may be shared with authorized service providers, payment processors or delivery partners only when reasonably necessary to complete your order, provide our services or comply with applicable legal requirements.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">6. Cookies</h2>
          <p className="mb-8">
            Our website may use cookies or similar technologies to improve website functionality, user experience and performance.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">7. Third-Party Links</h2>
          <p className="mb-4">
            Our website may contain links to third-party services such as Instagram, Facebook, Google Maps or payment providers.
          </p>
          <p className="mb-8">
            These third-party websites have their own privacy policies, and OVOW FOODS is not responsible for their privacy practices.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">8. Changes to This Privacy Policy</h2>
          <p className="mb-8">
            We may update this Privacy Policy from time to time. Any changes will be published on this page.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-12 mb-6">9. Contact Us</h2>
          <div className="bg-white p-6 md:p-8 shadow-sm border border-primary/10">
            <p className="font-bold text-primary mb-2">OVOW FOODS</p>
            <p className="mb-2">📱 WhatsApp: <a href="https://wa.me/917567566214" className="text-[#C9A24A] hover:underline">756 756 6214</a></p>
            <p>📍 Ahmedabad, Gujarat, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
