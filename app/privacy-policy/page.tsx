import { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@/components/atoms/Icons";

export const metadata: Metadata = {
  title: "Privacy Policy | OVOW FOODS",
  description: "Privacy Policy for OVOW FOODS",
};

"use client";

import Link from "next/link";
import { IconArrowLeft, IconCheck } from "@/components/atoms/Icons";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Premium Header Section */}
      <div className="bg-[#0B2118] text-white pt-32 pb-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A24A]/10 to-transparent"></div>
        
        <div className="container-x relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#C9A24A]/70 hover:text-[#C9A24A] transition-colors mb-8 text-xs uppercase tracking-widest font-bold bg-[#C9A24A]/10 px-4 py-2 rounded-full border border-[#C9A24A]/20"
            >
              <IconArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-[#F9F6F0]/70 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
              At OVOW FOODS, we respect your privacy and are committed to protecting your personal information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-x max-w-4xl mx-auto -mt-24 relative z-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="bg-white p-8 md:p-16 shadow-2xl shadow-primary/5 border border-primary/10 rounded-sm"
        >
          <div className="prose prose-lg prose-primary max-w-none text-primary/80">
            <p className="text-xl md:text-2xl font-serif text-primary mb-12 leading-relaxed text-center">
              This Privacy Policy explains how we collect, use and protect your information when you use our website, application or direct ordering services.
            </p>

            <Section title="1. Information We Collect">
              <p className="mb-6">When you place an order or contact us, we may collect:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0 mb-0">
                <ListItem>Name</ListItem>
                <ListItem>Mobile/WhatsApp number</ListItem>
                <ListItem>Email address</ListItem>
                <ListItem>Delivery address</ListItem>
                <ListItem>Order details</ListItem>
                <ListItem>Payment-related information</ListItem>
                <ListItem className="sm:col-span-2">Any other information required to process your order</ListItem>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p className="mb-6">Your information may be used to:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0 mb-0">
                <ListItem>Process and confirm your orders</ListItem>
                <ListItem>Prepare and deliver your food</ListItem>
                <ListItem>Contact you regarding your order</ListItem>
                <ListItem>Manage Pre-Orders and Bulk Orders</ListItem>
                <ListItem>Process payments</ListItem>
                <ListItem>Provide customer support</ListItem>
                <ListItem>Improve our food and services</ListItem>
                <ListItem>Communicate updates</ListItem>
              </ul>
            </Section>

            <Section title="3. Payment Information">
              <p className="mb-4">
                Online payments may be processed through authorized third-party payment gateways.
              </p>
              <div className="bg-primary/5 border-l-2 border-[#C9A24A] p-4 text-sm text-primary/90">
                OVOW FOODS does not intend to store sensitive payment information such as your card PIN, UPI PIN or banking passwords.
              </div>
            </Section>

            <Section title="4. Protection of Your Information">
              <p className="mb-4">
                We take reasonable technical and organizational measures to protect your personal information from unauthorized access, misuse or disclosure.
              </p>
              <p className="text-primary/60 italic">
                However, no internet-based system can be guaranteed to be completely secure.
              </p>
            </Section>

            <Section title="5. Sharing of Information">
              <p className="font-bold text-primary mb-2">
                OVOW FOODS does not sell your personal information.
              </p>
              <p>
                Information may be shared with authorized service providers, payment processors or delivery partners only when reasonably necessary to complete your order, provide our services or comply with applicable legal requirements.
              </p>
            </Section>

            <Section title="6. Cookies & Third-Party Links">
              <p className="mb-4">
                Our website may use cookies or similar technologies to improve website functionality, user experience and performance.
              </p>
              <p>
                Our website may contain links to third-party services such as Instagram, Facebook, Google Maps or payment providers. These third-party websites have their own privacy policies, and OVOW FOODS is not responsible for their privacy practices.
              </p>
            </Section>

            <Section title="7. Contact Us" last>
              <div className="bg-[#0B2118] text-white p-8 md:p-10 shadow-xl border border-[#C9A24A]/20 mt-4 rounded-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="font-serif text-2xl mb-2 text-[#C9A24A]">OVOW FOODS</p>
                  <p className="text-white/70">Ahmedabad, Gujarat, India</p>
                </div>
                <a href="https://wa.me/917567566214" className="inline-flex items-center gap-2 bg-[#C9A24A] text-[#0B2118] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                  Contact via WhatsApp
                </a>
              </div>
            </Section>
          </div>
        </motion.div>
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
