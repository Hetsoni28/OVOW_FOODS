"use client";

import { motion } from "framer-motion";
import { IconCamera, IconArrowRight, IconStar } from "@/components/atoms/Icons";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WHATSAPP_NUMBER = "917567566214";

// Sample placeholder moments (shown when no user submissions yet)
const SAMPLE_MOMENTS = [
  { name: "Priya S.", caption: "The Dum Matka Biryani was absolutely divine! 🍛", emoji: "🌟", color: "from-[#C9A24A]/20 to-[#1D5A40]/10" },
  { name: "Rahul M.", caption: "Best Paneer dish I've had in a long time!", emoji: "🧀", color: "from-[#1D5A40]/20 to-[#C9A24A]/10" },
  { name: "Meera K.", caption: "Ordered for our office lunch — everyone loved it!", emoji: "🎉", color: "from-[#0B2118]/10 to-[#C9A24A]/20" },
  { name: "Ankita P.", caption: "Pure vegetarian and pure delicious. OVOW wins! 🏆", emoji: "🏆", color: "from-[#C9A24A]/15 to-[#0B2118]/10" },
];

export function CustomerPhotoWall() {
  function handleShare() {
    const message = encodeURIComponent(
      `📸 *Sharing My OVOW FOODS Moment!*\n\n` +
      `Hi OVOW FOODS! I'm sending my food photo to be featured on your website.\n\n` +
      `[Attaching photo]\n\n` +
      `Name: \n` +
      `Caption: \n\n` +
      `Keep up the amazing food! 🍽️`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  }

  return (
    <section className="mt-20 pb-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-center mb-12"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24A] mb-3">Community</p>
        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">OVOW Moments</h2>
        <p className="text-primary/60 max-w-md mx-auto text-sm leading-relaxed">
          Real food. Real smiles. Real OVOW. Share your experience and get featured here.
        </p>
      </motion.div>

      {/* Moments Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {SAMPLE_MOMENTS.map((moment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className={`bg-gradient-to-br ${moment.color} border border-primary/8 p-5 md:p-6 rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
          >
            <div className="text-4xl mb-4">{moment.emoji}</div>
            <p className="text-sm text-primary/80 leading-relaxed mb-3 italic">"{moment.caption}"</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24A]">— {moment.name}</span>
            </div>
            <div className="flex gap-0.5 mt-2">
              {[1,2,3,4,5].map(s => (
                <IconStar key={s} size={10} className="text-[#C9A24A]" fill="#C9A24A" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA — Share Your Moment */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        className="bg-[#0B2118] p-8 md:p-12 text-center relative overflow-hidden rounded-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A24A]/5 via-transparent to-[#C9A24A]/5 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-[#C9A24A]/20 border border-[#C9A24A]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconCamera size={28} className="text-[#C9A24A]" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24A] mb-3">Be Featured</p>
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Share Your OVOW Moment
          </h3>
          <p className="text-white/60 max-w-sm mx-auto text-sm leading-relaxed mb-8">
            Snap a photo of your OVOW FOODS meal, send it to us on WhatsApp, and get featured on this wall!
          </p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-3 bg-[#C9A24A] hover:bg-white text-[#0B2118] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 group"
          >
            <IconCamera size={18} />
            Send My Photo
            <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mt-4">
            via WhatsApp · Photos reviewed before publishing
          </p>
        </div>
      </motion.div>
    </section>
  );
}
