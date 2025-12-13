"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react";
import { Theme } from "@/lib/types";
import { ProcessedImage } from "@/lib/imageProcessor";
import { getThemeColors } from "@/lib/utils";
import { useRef } from "react";

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
  const [currentPage, setCurrentPage] = useState(0);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

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

  // Camera flash effect
  const [showFlash, setShowFlash] = useState(false);
  
  useEffect(() => {
    if (isTitleInView) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 150);
    }
  }, [isTitleInView]);

  return (
    <>
      <section
        className="relative min-h-screen py-20 px-4 overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at top right, ${colors.primary}10, transparent 50%),
            radial-gradient(circle at bottom left, ${colors.secondary}10, transparent 50%),
            linear-gradient(180deg, #fafafa 0%, ${colors.background}20 100%)
          `,
        }}
      >
        {/* Camera Flash Effect */}
        <AnimatePresence>
          {showFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-white z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Floating camera icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 12}%`,
                top: `${10 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [-5, 5, -5],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Camera className="w-12 h-12" style={{ color: colors.primary }} />
            </motion.div>
          ))}
        </div>

        {/* Decorative paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, ${colors.primary}, transparent 2px, transparent 4px),
              repeating-linear-gradient(90deg, ${colors.primary}, transparent 2px, transparent 4px)
            `,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Dramatic Album Cover Opening */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-center mb-20"
          >
            {/* Album Cover Design */}
            <div className="relative inline-block">
              {/* Corner decorations - Gold photo corners */}
              {[
                { position: "-left-8 -top-8", rotate: "0deg" },
                { position: "-right-8 -top-8", rotate: "90deg" },
                { position: "-left-8 -bottom-8", rotate: "-90deg" },
                { position: "-right-8 -bottom-8", rotate: "180deg" },
              ].map((corner, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={isTitleInView ? { scale: 1, rotate: corner.rotate } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: "spring" }}
                  className={`absolute ${corner.position} w-8 h-8`}
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    clipPath: "polygon(0 0, 100% 0, 100% 30%, 30% 100%, 0 100%)",
                    boxShadow: `0 4px 10px ${colors.primary}40`,
                  }}
                />
              ))}

              {/* Camera icon above title */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <div 
                  className="relative inline-flex items-center justify-center w-20 h-20 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                    border: `3px solid ${colors.primary}`,
                    boxShadow: `0 8px 30px ${colors.primary}30`,
                  }}
                >
                  <Camera className="w-10 h-10" style={{ color: colors.primary }} />
                  {/* Sparkles around camera */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: ["-10px", "50%", "-10px"][i],
                        left: ["50%", "calc(100% + 10px)", "calc(100% + 10px)"][i],
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.6,
                      }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-5xl md:text-7xl font-display font-bold px-8 mb-4"
                style={{ 
                  color: colors.primary,
                  textShadow: `4px 4px 8px ${colors.primary}20`,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {content.title || "Our Moments"}
              </motion.h2>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isTitleInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="h-1 mx-auto mb-4"
                style={{
                  width: "200px",
                  background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.secondary}, transparent)`,
                  borderRadius: "10px",
                }}
              />
            </div>

            {content.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isTitleInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="text-xl text-slate-600 font-light tracking-wide"
              >
                {content.subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Modern grid - clean masonry */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {images.map((image, index) => {
              // Random slight rotation for authentic polaroid feel
              const rotation = [-2, -1, 0, 1, 2][index % 5];
              
              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 40, rotate: rotation - 5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="cursor-pointer break-inside-avoid group"
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Polaroid Frame */}
                  <div 
                    className="bg-white p-3 pb-12 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    style={{
                      boxShadow: `
                        0 4px 6px ${colors.primary}10,
                        0 10px 20px rgba(0,0,0,0.1),
                        0 1px 3px rgba(0,0,0,0.05)
                      `,
                    }}
                  >
                    {/* Photo */}
                    <div className="relative overflow-hidden bg-slate-100">
                      <img
                        src={image.variants.medium}
                        alt={image.caption || `Photo ${index + 1}`}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Caption area - like writing on polaroid */}
                    {image.caption && (
                      <div className="mt-3 px-1">
                        <p 
                          className="text-center text-sm font-handwriting text-slate-600"
                          style={{ fontFamily: "'Shadows Into Light', cursive" }}
                        >
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
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
