"use client";

import { motion } from "framer-motion";
import { IconCheck, IconChefHat, IconShoppingBag, IconPhone, IconFlame } from "@/components/atoms/Icons";

const staggerFast = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function AboutContent() {
  return (
    <div className="container-x pb-24 md:pb-32 space-y-24 md:space-y-40">
      
      {/* 1. ABOUT OVOW FOODS */}
      <motion.section 
        variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl"
      >
        <motion.p variants={fadeUp} className="text-[#C9A24A] text-sm font-bold uppercase tracking-[0.2em] mb-4">Our Story</motion.p>
        <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl text-primary mb-8">About OVOW FOODS</motion.h2>
        <motion.div variants={fadeUp} className="space-y-6 text-lg md:text-xl text-primary/70 font-serif leading-relaxed">
          <p>
            OVOW FOODS is a 100% Pure Vegetarian Food Brand built on a simple belief — great food should be fresh, thoughtfully prepared and served with care.
          </p>
          <p>
            We believe that every meal deserves attention to detail. From carefully selected ingredients to authentic flavours and traditional cooking techniques, we focus on delivering a food experience that is fresh, consistent and memorable.
          </p>
          <p className="border-l-2 border-[#C9A24A] pl-6 italic font-medium text-primary/90">
            Our signature Dum Matka Biryani reflects this philosophy — traditional slow cooking, rich flavours and quality ingredients, prepared with care for every order.
          </p>
        </motion.div>
      </motion.section>

      {/* 2. OUR DIRECT ORDERING PROMISE */}
      <motion.section 
        variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        className="bg-primary/5 p-8 md:p-16 border border-primary/10 max-w-5xl"
      >
        <motion.p variants={fadeUp} className="text-[#C9A24A] text-sm font-bold uppercase tracking-[0.2em] mb-4">The Promise</motion.p>
        <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-5xl text-primary mb-8">Our Direct Ordering Promise</motion.h2>
        <motion.div variants={fadeUp} className="space-y-6 text-lg text-primary/80">
          <p>We believe in building a direct relationship with our customers.</p>
          <p>With the OVOW FOODS Direct Ordering System, you can order directly from us in a simple and convenient way.</p>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 my-10 py-8 border-y border-primary/10 font-serif text-xl md:text-2xl text-[#C9A24A] text-center">
            <span>You Order</span>
            <span className="hidden md:inline">→</span><span className="md:hidden">↓</span>
            <span>We Prepare Fresh</span>
            <span className="hidden md:inline">→</span><span className="md:hidden">↓</span>
            <span>We Deliver with Care</span>
          </div>
          
          <p>
            We do not keep selected special dishes prepared in advance. Your order allows us to prepare your food fresh and give every order the attention it deserves.
          </p>
        </motion.div>
      </motion.section>

      {/* 3. PRE-ORDERING & CATERING (Side by Side) */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        
        {/* Pre-ordering */}
        <motion.section variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <motion.div variants={fadeUp} className="h-16 w-16 bg-[#C9A24A]/10 text-[#C9A24A] flex items-center justify-center mb-8">
            <IconShoppingBag size={32} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-primary mb-6">Pre-Ordering</motion.h2>
          <motion.div variants={fadeUp} className="space-y-6 text-lg text-primary/70">
            <p>For our special dishes, planned meals and larger orders, we recommend Pre-Booking.</p>
            <p>This helps us plan the ingredients, preparation and cooking process properly so that your food reaches you fresh and at the quality we promise.</p>
            <div className="bg-white p-6 shadow-sm border border-primary/10 mt-8">
              <p className="font-serif text-xl font-bold text-primary mb-2 italic">BOOK TODAY. TASTE TOMORROW.</p>
              <p className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-primary/60">
                <IconPhone size={16} /> Pre-Order / Direct Order: <a href="https://wa.me/917567566214" className="text-[#C9A24A] hover:underline">756 756 6214</a>
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Catering & Bulk Orders */}
        <motion.section variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <motion.div variants={fadeUp} className="h-16 w-16 bg-primary/5 text-primary flex items-center justify-center mb-8">
            <IconChefHat size={32} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-primary mb-6">Catering & Bulk Orders</motion.h2>
          <motion.div variants={fadeUp} className="space-y-6 text-lg text-primary/70">
            <p>Planning a party, family function, corporate lunch or special event?</p>
            <p>OVOW FOODS also accepts Pure Veg Catering & Bulk Food Orders. We can prepare food for:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-primary/80">
              {["Family Functions & Parties", "Birthday & Anniversary Events", "Corporate & Office Lunches", "Small & Large Gatherings", "Special Events", "Bulk & Group Orders"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#C9A24A] mt-1">•</span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <p className="pt-4 font-bold text-primary/90">For Catering & Bulk Orders, Advance Booking is Recommended.</p>
            <p className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-primary/60">
              <IconPhone size={16} /> Catering Enquiries: <a href="https://wa.me/917567566214" className="text-[#C9A24A] hover:underline">756 756 6214</a>
            </p>
          </motion.div>
        </motion.section>

      </div>

      {/* 4. WHY OVOW FOODS */}
      <motion.section 
        variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-primary mb-12">Why OVOW FOODS?</motion.h2>
        
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            "100% Pure Vegetarian", "Freshly Prepared", "Quality Ingredients", 
            "Authentic Flavours", "Traditional Cooking Techniques", "Direct Ordering",
            "Catering & Bulk Orders", "Personal Customer Care"
          ].map((trait) => (
            <div key={trait} className="flex items-center gap-2 bg-white px-4 py-2 shadow-sm border border-primary/10">
              <IconCheck size={16} className="text-[#2E7D4F]" />
              <span className="text-sm font-bold uppercase tracking-wider text-primary/80">{trait}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="text-xl md:text-2xl font-serif text-primary/80 italic space-y-4 mb-16">
          <p>We are not just here to serve food.</p>
          <p>We are here to build a relationship with every customer, one great meal at a time.</p>
        </motion.div>

        <motion.div variants={fadeUp} className="inline-block border-t border-primary/20 pt-12 px-12">
          <p className="font-serif text-3xl text-primary mb-2">OVOW FOODS</p>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C9A24A] mb-4">Curating The Extraordinary</p>
          <p className="font-serif italic text-primary/60 text-lg">Taste the WOW. Experience OVOW.</p>
        </motion.div>
      </motion.section>

    </div>
  );
}
