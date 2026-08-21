"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/animations";
import { Star } from "lucide-react";
import Link from "next/link";
import { ReviewForm } from "@/components/organisms/ReviewForm";
import { Button } from "@/components/atoms/Button";

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export function ReviewsClient({ reviews }: { reviews: Review[] }) {
  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start mt-10">
        
        {/* Left Column: Sticky Header & Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-10">
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#2E7D4F] font-bold mb-4">
              Real Food. Real Love.
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              What our guests say.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-primary/70 mb-10">
              Join hundreds of satisfied guests and discover the ultimate premium vegetarian dining experience at home.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <ReviewForm />
          </motion.div>
        </div>

        {/* Right Column: Reviews Grid */}
        <div className="lg:col-span-7">
          <motion.div 
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 gap-6"
          >
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                variants={fadeUp}
                className="relative bg-white p-8 border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative Quote Mark */}
                <div className="absolute -top-6 -right-2 text-primary/[0.03] font-serif text-[140px] leading-none group-hover:text-primary/[0.05] transition-colors duration-500 select-none">
                  "
                </div>
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6 text-[#C9A24A]">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} size={14} fill="currentColor" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, idx) => (
                      <Star key={`empty-${idx}`} size={14} className="text-[#C9A24A]/30" />
                    ))}
                  </div>
                  <p className="font-serif text-xl md:text-2xl leading-relaxed mb-8 text-primary/90">
                    "{review.comment}"
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center justify-between border-t border-primary/10 pt-6 mt-auto">
                  <p className="font-bold text-xs uppercase tracking-widest text-primary">{review.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">{review.date}</p>
                </div>
              </motion.div>
            ))}
            {reviews.length === 0 && (
              <div className="col-span-full text-center text-primary/50 py-20 bg-white border border-primary/10">
                No reviews published yet. Be the first to leave one!
              </div>
            )}
          </motion.div>
        </div>
      </div>


    </>
  );
}
