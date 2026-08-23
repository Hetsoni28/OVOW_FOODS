"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { COMPANY_CONFIG } from "@/lib/config";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ContactPage() {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(COMPANY_CONFIG.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-12 pb-24">
      <div className="container-x max-w-5xl">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[.3em] text-[#C9A24A] font-bold mb-4">
            Get in touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-primary leading-tight">
            Talk to OVOW.
          </h1>
          <p className="mt-4 text-primary/60 max-w-lg mx-auto">
            Whether you have a question about our menu, need help with a bulk order, or just want to say hi, we're here for you.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {/* Call */}
          <motion.a
            variants={fadeUp}
            href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, "")}`}
            className="flex flex-col items-center text-center bg-white border border-primary/5 p-8 hover:border-primary/20 hover:shadow-sm transition-all group"
          >
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A24A]/10 transition-colors">
              <Phone size={20} className="text-primary group-hover:text-[#C9A24A] transition-colors" />
            </div>
            <h3 className="font-bold text-primary mb-1">Call Us</h3>
            <p className="text-sm text-primary/50">{COMPANY_CONFIG.phone}</p>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            variants={fadeUp}
            href={`https://wa.me/${COMPANY_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center bg-white border border-primary/5 p-8 hover:border-primary/20 hover:shadow-sm transition-all group"
          >
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#25D366]/20 transition-colors">
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            </div>
            <h3 className="font-bold text-primary mb-1">WhatsApp</h3>
            <p className="text-sm text-primary/50">Order or enquire</p>
          </motion.a>

          {/* Email */}
          <motion.a
            variants={fadeUp}
            href={`mailto:${COMPANY_CONFIG.email}`}
            className="flex flex-col items-center text-center bg-white border border-primary/5 p-8 hover:border-primary/20 hover:shadow-sm transition-all group"
          >
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A24A]/10 transition-colors">
              <Mail size={20} className="text-primary group-hover:text-[#C9A24A] transition-colors" />
            </div>
            <h3 className="font-bold text-primary mb-1">Email</h3>
            <p className="text-sm text-primary/50">{COMPANY_CONFIG.email}</p>
          </motion.a>

          {/* Hours */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center text-center bg-white border border-primary/5 p-8 hover:border-primary/20 hover:shadow-sm transition-all group"
          >
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A24A]/10 transition-colors">
              <Clock size={20} className="text-primary group-hover:text-[#C9A24A] transition-colors" />
            </div>
            <h3 className="font-bold text-primary mb-1">Hours</h3>
            <p className="text-sm text-primary/50">{COMPANY_CONFIG.hours}</p>
          </motion.div>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="bg-white border border-primary/5 p-4 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start mb-6">
            <div className="flex gap-3 items-start">
              <MapPin size={24} className="text-[#C9A24A] shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-2xl text-primary mb-2">Visit our Kitchen</h2>
                <p className="text-primary/60 leading-relaxed max-w-md">
                  {COMPANY_CONFIG.address}
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full aspect-square md:aspect-[21/9] bg-primary/5 relative overflow-hidden">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[20%] contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
