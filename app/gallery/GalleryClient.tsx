"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { GalleryHeader } from "@/components/organisms/GalleryHeader";
import { GalleryFilters } from "@/components/organisms/GalleryFilters";
import { GalleryVideoItem } from "@/components/organisms/GalleryVideoItem";
import { GalleryLightbox } from "@/components/organisms/GalleryLightbox";
import type { GalleryMedia } from "@/lib/types";

const CATEGORIES = ["All", "Food", "Events", "Packaging", "Behind the Scenes"];

export function GalleryClient({ initialImages }: { initialImages: GalleryMedia[] }) {
  const [filteredImages, setFilteredImages] = useState<GalleryMedia[]>(initialImages);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryMedia | null>(null);

  useEffect(() => {
    if (activeCategory === "All") setFilteredImages(initialImages);
    else setFilteredImages(initialImages.filter((img) => img.category === activeCategory));
  }, [activeCategory, initialImages]);

  useEffect(() => {
    if (selectedImage) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImage]);

  return (
    <>
      <GalleryHeader />
      <GalleryFilters categories={CATEGORIES} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <GalleryVideoItem key={img._id} img={img} onClick={() => setSelectedImage(img)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredImages.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-primary/50 py-32">
          No videos found in this category yet.
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-40 mb-20 text-center">
        <p className="font-serif text-3xl md:text-5xl mb-8">Ready to taste it?</p>
        <Button suppressHydrationWarning href="/menu" className="px-10 py-5 text-sm font-bold uppercase tracking-widest">
          Order Now
        </Button>
      </motion.div>

      <AnimatePresence>
        {selectedImage && <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>
    </>
  );
}
