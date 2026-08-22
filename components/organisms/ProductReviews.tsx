"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { fadeUp, staggerFast } from "@/lib/animations";

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export function ProductReviews({
  reviews,
  productName,
}: {
  reviews: Review[];
  productName: string;
}) {
  if (reviews.length === 0) {
    return (
      <section className="mt-20 md:mt-32 border-t border-primary/10 pt-16">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare size={20} className="text-[#C9A24A]" />
          <h2 className="font-serif text-3xl md:text-4xl text-primary">
            Customer Reviews
          </h2>
        </div>
        <p className="text-primary/50 text-lg">
          No reviews yet for {productName}. Be the first to share your experience!
        </p>
      </section>
    );
  }

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const rounded = Math.round(avg * 10) / 10;

  return (
    <section className="mt-20 md:mt-32 border-t border-primary/10 pt-16">
      <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare size={20} className="text-[#C9A24A]" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              Customer Reviews
            </h2>
          </div>
          <p className="text-primary/50 text-sm uppercase tracking-widest font-bold">
            {productName}
          </p>
        </div>
        <div className="sm:ml-auto flex items-center gap-4 bg-[#0B2118] px-6 py-4 shadow-lg">
          <div>
            <p className="text-[#C9A24A] font-serif text-4xl font-bold leading-none">
              {rounded}
            </p>
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.round(avg) ? "#C9A24A" : "transparent"}
                  className={i < Math.round(avg) ? "text-[#C9A24A]" : "text-[#C9A24A]/30"}
                />
              ))}
            </div>
          </div>
          <div className="border-l border-white/10 pl-4">
            <p className="text-white font-bold text-lg">{reviews.length}</p>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">
              Review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            variants={fadeUp}
            className="relative bg-white p-8 border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-6 -right-2 text-primary/[0.03] font-serif text-[140px] leading-none select-none">"</div>
            <div className="relative z-10">
              <div className="flex gap-1 mb-5 text-[#C9A24A]">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" />
                ))}
                {[...Array(5 - review.rating)].map((_, idx) => (
                  <Star key={`e-${idx}`} size={14} className="text-[#C9A24A]/30" />
                ))}
              </div>
              <p className="font-serif text-xl leading-relaxed mb-8 text-primary/90">"{review.comment}"</p>
            </div>
            <div className="relative z-10 flex items-center justify-between border-t border-primary/10 pt-5 mt-auto">
              <p className="font-bold text-xs uppercase tracking-widest text-primary">{review.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">{review.date}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
