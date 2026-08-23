"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import type { GalleryMedia } from "./GalleryTypes";

interface GalleryLightboxProps {
  selectedImage: GalleryMedia;
  onClose: () => void;
}

export function GalleryLightbox({ selectedImage, onClose }: GalleryLightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12 cursor-zoom-out"
    >
      {/* Solid Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95" 
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button suppressHydrationWarning 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-[110]"
      >
        <X size={24} />
      </button>
      
      {/* Shared Layout Container */}
      <motion.div
        layoutId={`gallery-container-${selectedImage._id}`}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-7xl aspect-[4/3] md:aspect-video h-auto bg-black shadow-2xl flex items-center justify-center overflow-hidden z-[105] cursor-default md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div layoutId={`gallery-media-${selectedImage._id}`} className="absolute inset-0 w-full h-full">
          <LazyVideo
            key={selectedImage._id}
            src={selectedImage.videoUrl}
            controls={false}
            muted={false}
            className="w-full h-full object-cover pointer-events-none z-0"
            threshold={0}
            rootMargin="0px"
          />
        </motion.div>
        
        {/* Invisible touch-blocker */}
        <div
          className="absolute inset-0 z-10"
          onClick={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        />
        
        {/* Lightbox Text Overlay (Fade In) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 md:p-16 text-center pointer-events-none z-20"
        >
          <p className="text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4">{selectedImage.category}</p>
          <p className="text-white font-serif text-3xl md:text-6xl leading-tight mb-6">{selectedImage.caption}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
