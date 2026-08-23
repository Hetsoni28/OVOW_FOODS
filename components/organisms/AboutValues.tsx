"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Package } from "lucide-react";
import {  container, item  } from "@/lib/animations";

export function AboutValues() {
  return (
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
  );
}
