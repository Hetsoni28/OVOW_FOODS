"use client";

import { motion } from "framer-motion";
import { IconMapPin, IconClock } from "@/components/atoms/Icons";

export function AboutLocation() {
  return (
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
            <IconMapPin className="text-[#C9A24A] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-primary/50 mb-2">Location</h4>
              <p className="text-lg text-primary font-medium">Ahmedabad, Gujarat</p>
              <p className="text-primary/70">Serving the local area</p>
            </div>
          </div>
          <div className="flex gap-4">
            <IconClock className="text-[#C9A24A] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-primary/50 mb-2">Hours</h4>
              <p className="text-lg text-primary font-medium">Open Daily</p>
              <p className="text-primary/70">Delivery until 4:00 AM</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
