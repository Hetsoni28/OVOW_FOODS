"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { COMPANY_CONFIG } from "@/lib/config";
import { fadeUp, stagger } from "@/lib/animations";

export function ContactGrid() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24"
    >
      {/* WhatsApp - Spans 2 columns on lg */}
      <motion.a
        variants={fadeUp}
        whileHover={{ y: -8, scale: 1.01 }}
        href={`https://wa.me/${COMPANY_CONFIG.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="lg:col-span-2 relative flex flex-col justify-end bg-gradient-to-br from-[#2E7D4F]/10 to-[#2E7D4F]/5 border border-[#2E7D4F]/10 p-8 hover:border-[#2E7D4F]/30 hover:shadow-[0_20px_40px_rgba(46,125,79,0.12)] transition-all duration-500 group overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
          <WhatsAppIcon className="w-48 h-48 text-[#2E7D4F]" />
        </div>
        <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-16 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
          <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
        </div>
        <div className="relative z-10">
          <h3 className="font-serif text-3xl md:text-4xl text-primary mb-2">WhatsApp</h3>
          <p className="text-sm md:text-base text-primary/60 font-medium">Quick replies for orders and enquiries</p>
        </div>
      </motion.a>

      {/* Call */}
      <motion.a
        variants={fadeUp}
        whileHover={{ y: -8, scale: 1.02 }}
        href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, "")}`}
        className="relative flex flex-col justify-end bg-white border border-primary/5 p-8 hover:border-[#C9A24A]/30 hover:shadow-[0_20px_40px_rgba(201,162,74,0.1)] transition-all duration-500 group overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
          <Phone className="w-32 h-32 text-primary" />
        </div>
        <div className="w-12 h-12 bg-[#F9F6F0] rounded-xl flex items-center justify-center mb-12 relative z-10 group-hover:-translate-y-2 group-hover:bg-[#C9A24A]/10 transition-all duration-500">
          <Phone size={20} className="text-primary group-hover:text-[#C9A24A] transition-colors" />
        </div>
        <div className="relative z-10">
          <h3 className="font-bold text-primary mb-1">Call Us</h3>
          <p className="text-primary/60">{COMPANY_CONFIG.phone}</p>
        </div>
      </motion.a>

      {/* Email */}
      <motion.a
        variants={fadeUp}
        whileHover={{ y: -8, scale: 1.02 }}
        href={`mailto:${COMPANY_CONFIG.email}`}
        className="relative flex flex-col justify-end bg-white border border-primary/5 p-8 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(18,59,42,0.06)] transition-all duration-500 group overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
          <Mail className="w-32 h-32 text-primary" />
        </div>
        <div className="w-12 h-12 bg-[#F9F6F0] rounded-xl flex items-center justify-center mb-12 relative z-10 group-hover:-translate-y-2 group-hover:bg-primary/5 transition-all duration-500">
          <Mail size={20} className="text-primary" />
        </div>
        <div className="relative z-10">
          <h3 className="font-bold text-primary mb-1">Email</h3>
          <p className="text-primary/60">{COMPANY_CONFIG.email}</p>
        </div>
      </motion.a>

      {/* Hours - Spans 2 columns on lg */}
      <motion.div
        variants={fadeUp}
        whileHover={{ y: -8, scale: 1.01 }}
        className="lg:col-span-2 relative flex flex-col justify-end bg-primary border border-primary/5 p-8 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
          <Clock className="w-48 h-48 text-white" />
        </div>
        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-16 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
          <Clock size={24} className="text-[#C9A24A]" />
        </div>
        <div className="relative z-10">
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">Opening Hours</h3>
          <p className="text-sm md:text-base text-white/70 font-medium">{COMPANY_CONFIG.hours}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
