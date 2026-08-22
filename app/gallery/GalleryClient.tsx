"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/animations";
import { X, Play } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { LazyVideo } from "@/components/atoms/LazyVideo";

type GalleryMedia = {
  _id: string;
  caption: string;
  category: string;
  spanSize: string;
  videoUrl: string;
};

const CATEGORIES = ["All", "Food", "Events", "Packaging", "Behind the Scenes"];

// Component to handle individual video hover interactions seamlessly
function GalleryVideoItem({ 
  img, 
  onClick 
}: { 
  img: GalleryMedia; 
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser if not muted, but we are muted so it's fine.
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Optional: reset to beginning on hover out
      // videoRef.current.currentTime = 0; 
    }
  };

  return (
    <motion.div
      layout
      layoutId={`gallery-container-${img._id}`}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden group bg-[#f3efe6] rounded-2xl md:rounded-3xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 w-full aspect-[4/3]`}
    >
      <motion.div layoutId={`gallery-media-${img._id}`} className="absolute inset-0 w-full h-full">
        {img.videoUrl && (
          <LazyVideo
            src={img.videoUrl}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] pointer-events-none"
          />
        )}
      </motion.div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out flex flex-col items-center justify-center p-6">
        
        {/* Play Button */}
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center mb-6 transform translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-[50ms] ease-out">
          <Play className="text-white fill-white ml-1" size={24} />
        </div>
        
        {/* Caption */}
        <p className="text-white font-serif text-2xl md:text-4xl text-center transform translate-y-0 opacity-100 md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-[100ms] ease-out leading-tight">
          {img.caption}
        </p>
      </div>
    </motion.div>
  );
}


export function GalleryClient({ initialImages }: { initialImages: GalleryMedia[] }) {
  const [filteredImages, setFilteredImages] = useState<GalleryMedia[]>(initialImages);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryMedia | null>(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(initialImages);
    } else {
      setFilteredImages(initialImages.filter((img) => img.category === activeCategory));
    }
  }, [activeCategory, initialImages]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImage]);

  return (
    <>
      {/* Header */}
      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-primary/40 font-bold mb-4">
          The OVOW Experience
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight">
          A feast for the eyes.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 text-lg text-primary/70 max-w-xl mx-auto">
          Explore our culinary creations, from the rich textures of our signature dishes to our premium packaging designed to keep your food hot and fresh.
        </motion.p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-2 mb-16"
      >
        {CATEGORIES.map((cat) => (
          <div key={cat} className="relative">
            <button suppressHydrationWarning
              onClick={() => setActiveCategory(cat)}
              className={`relative z-10 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-primary hover:text-primary/70"
              }`}
            >
              {cat}
            </button>
            {activeCategory === cat && (
              <motion.div
                layoutId="gallery-filter-bg"
                className="absolute inset-0 bg-primary z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Perfect Aspect-Ratio Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <GalleryVideoItem 
              key={img._id} 
              img={img} 
              onClick={() => setSelectedImage(img)} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredImages.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center text-primary/50 py-32"
        >
          No videos found in this category yet.
        </motion.div>
      )}

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-40 mb-20 text-center"
      >
        <p className="font-serif text-3xl md:text-5xl mb-8">Ready to taste it?</p>
        <Button suppressHydrationWarning href="/menu" className="px-10 py-5 text-sm font-bold uppercase tracking-widest">
          Order Now
        </Button>
      </motion.div>

      {/* Cinematic Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12 cursor-zoom-out"
          >
            {/* Solid Backdrop - Fixed invalid Tailwind opacity class */}
            <div 
              className="absolute inset-0 bg-black/95" 
              onClick={() => setSelectedImage(null)}
            />
            
            {/* Close Button */}
            <button suppressHydrationWarning 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-[110]"
            >
              <X size={24} />
            </button>
            
            {/* Shared Layout Container */}
            <motion.div
              layoutId={`gallery-container-${selectedImage._id}`}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-7xl aspect-[9/16] md:aspect-video h-[100dvh] md:h-auto bg-black shadow-2xl flex items-center justify-center overflow-hidden z-[105] cursor-default md:rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div layoutId={`gallery-media-${selectedImage._id}`} className="absolute inset-0 w-full h-full">
                <LazyVideo
                  key={selectedImage._id}
                  src={selectedImage.videoUrl}
                  controls={false}
                  muted={false}
                  className="w-full h-full object-contain md:object-cover"
                  threshold={0}
                  rootMargin="0px"
                />
              </motion.div>
              
              {/* Lightbox Text Overlay (Fade In) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 md:p-16 text-center pointer-events-none"
              >
                <p className="text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4">{selectedImage.category}</p>
                <p className="text-white font-serif text-3xl md:text-6xl leading-tight">{selectedImage.caption}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
