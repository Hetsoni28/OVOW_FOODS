"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Leaf, ShieldCheck, Package, MapPin, Clock } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F4EA] pt-32 pb-20 selection:bg-primary selection:text-white">
      {/* Cinematic Hero */}
      <section className="container-x mb-20 md:mb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A24A] mb-4">
            The Brand
          </motion.p>
          <motion.h1 variants={item} className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-[1.1]">
            More than food. <br />
            <span className="text-primary/60 italic">An experience.</span>
          </motion.h1>
          <motion.div variants={item} className="w-24 h-1.5 bg-[#C9A24A] mt-10 rounded-none" />
        </motion.div>
      </section>

      {/* Philosophy Split Layout */}
      <section className="container-x mb-24 md:mb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] bg-primary/5 rounded-none shadow-2xl overflow-hidden"
          >
            <Image 
              src="/placeholder-food.svg" 
              alt="OVOW Food Preparation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-multiply" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8">Our Philosophy</h2>
            <div className="space-y-6 text-lg md:text-xl text-primary/70 leading-relaxed font-serif">
              <p>
                OVOW FOODS offers delicious homemade-style food, premium bento boxes, desserts, and takeaway meals right in the heart of Ahmedabad. 
              </p>
              <p>
                We focus on fresh ingredients, rich taste, hygienic preparation, and quality packaging. Every dish is crafted with an uncompromising dedication to authenticity, ensuring that you don't just eat a meal—you savor a legacy.
              </p>
              <p className="font-medium text-primary">
                Enjoy tasty food made with love, exclusively for delivery and takeaway.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-primary/5 py-24 border-y border-primary/10">
        <div className="container-x">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Leaf,
                title: "100% Pure Vegetarian",
                desc: "Sourced from the freshest farms and prepared in a strictly vegetarian kitchen."
              },
              {
                icon: ShieldCheck,
                title: "Hygienic Preparation",
                desc: "State-of-the-art cleanliness standards for your peace of mind and health."
              },
              {
                icon: Package,
                title: "Quality Packaging",
                desc: "Premium, food-safe containers that preserve temperature, taste, and aesthetics."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className="bg-white p-10 shadow-lg border border-primary/10 rounded-none group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-14 h-14 bg-primary/5 flex items-center justify-center mb-6 rounded-none group-hover:bg-[#C9A24A]/10 transition-colors">
                  <feature.icon size={28} className="text-[#C9A24A]" />
                </div>
                <h3 className="font-serif text-2xl text-primary mb-3">{feature.title}</h3>
                <p className="text-primary/60 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location & Hours Footer */}
      <section className="container-x pt-24 pb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl border-l-4 border-[#C9A24A] pl-8 rounded-none"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">Visit Us</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <MapPin className="text-[#C9A24A] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-primary/50 mb-2">Location</h4>
                <p className="text-lg text-primary font-medium">13, Near Ghatlodiya</p>
                <p className="text-primary/70">Ahmedabad, Gujarat 382481</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-[#C9A24A] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-primary/50 mb-2">Hours</h4>
                <p className="text-lg text-primary font-medium">Open Daily</p>
                <p className="text-primary/70">Delivery until 4:00 AM</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
