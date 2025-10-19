"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Theme } from "@/lib/types";
import { ProcessedImage } from "@/lib/imageProcessor";
import { getThemeColors } from "@/lib/utils";

interface GalleryTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
  images?: ProcessedImage[];
}

export function GalleryTemplate({
  content,
  theme,
  colorPalette,
  images,
}: GalleryTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <section
        className="min-h-screen py-20 px-4 flex items-center justify-center"
        style={{
          background: `linear-gradient(180deg, white 0%, ${colors.background} 100%)`,
        }}
      >
        <div className="text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {content.title || "Memories"}
          </motion.h2>
          <p className="text-slate-500">Upload photos to see them here</p>
        </div>
      </section>
    );
  }

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <section
        className="min-h-screen py-20 px-4"
        style={{
          background: `linear-gradient(180deg, white 0%, ${colors.background} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Minimal header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-6xl font-display font-bold"
              style={{ color: colors.primary }}
            >
              {content.title || "Moments"}
            </h2>
          </motion.div>

          {/* Modern grid - clean masonry */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer overflow-hidden rounded-2xl shadow-lg break-inside-avoid bg-white"
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={image.variants.medium}
                  alt={image.caption || `Photo ${index + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen lightbox with navigation */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-10 h-10" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white/80 hover:text-white transition-colors z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>
                <button
                  className="absolute right-4 text-white/80 hover:text-white transition-colors z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="w-12 h-12" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedIndex].variants.full}
                alt={images[selectedIndex].caption || "Photo"}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
              {images[selectedIndex].caption && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-center mt-6 text-xl font-light"
                >
                  {images[selectedIndex].caption}
                </motion.p>
              )}
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
