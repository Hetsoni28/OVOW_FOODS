"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import type { GalleryMedia } from "@/lib/types";

export function GalleryVideoItem({ 
  img, 
  onClick 
}: { 
  img: GalleryMedia; 
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out flex flex-col items-center justify-center p-6 z-[2]">
        
        {/* Play Button */}
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center mb-6 transform translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-[50ms] ease-out">
          <Play className="text-white fill-white ml-1" size={24} />
        </div>
        
        {/* Caption */}
        <p className="text-white font-serif text-2xl md:text-4xl text-center transform translate-y-0 opacity-100 md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-[100ms] ease-out leading-tight">
          {img.caption}
        </p>
      </div>

      {/* Full-card touch interceptor */}
      <div
        className="absolute inset-0 z-[3]"
        onClick={onClick}
        onTouchStart={(e) => { e.preventDefault(); onClick(); }}
      />
    </motion.div>
  );
}
