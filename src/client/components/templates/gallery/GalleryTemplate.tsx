"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react";
import { Theme } from "@/shared/types";
import { ProcessedImage } from "@/client/lib/imageProcessor";
import { getThemeColors } from "@/shared/utils";
import { OCCASION_MUSIC_FALLBACKS } from "@/client/constants/musicAssets";

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

  // Background music
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isTitleInView) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 150);

      // Start playing background music when gallery comes into view
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Set volume to 30%
        audioRef.current.play().catch(err => {
          console.log("Audio autoplay prevented:", err);
        });
      }
    }
  }, [isTitleInView]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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

        {/* Background Music */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          className="hidden"
        >
          <source src={OCCASION_MUSIC_FALLBACKS.gallery} type="audio/mpeg" />
        </audio>

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

          {/* Layout Rendering */}
          {(() => {
            const layout = content.layout || 'masonry';

            // --- GRID LAYOUT ---
            if (layout === 'grid') {
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-square relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
                      onClick={() => setSelectedIndex(index)}
                    >
                      <img
                        src={image.variants.medium}
                        alt={image.caption || `Photo ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        {image.caption && <p className="text-white text-sm font-medium truncate">{image.caption}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            }

            // --- PHOTO STRIP LAYOUT ---
            if (layout === 'photostrip') {
              // Group images into strips of 3 or 4
              const strips = [];
              const stripSize = 3;
              for (let i = 0; i < images.length; i += stripSize) {
                strips.push(images.slice(i, i + stripSize));
              }

              return (
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                  {strips.map((strip, stripIndex) => (
                    <motion.div
                      key={stripIndex}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: stripIndex * 0.2 }}
                      className="bg-white p-4 pb-8 shadow-2xl flex flex-col gap-4 w-full max-w-[280px] transform hover:-translate-y-4 transition-transform duration-300"
                      style={{
                        rotate: (stripIndex % 2 === 0 ? -2 : 2) + 'deg'
                      }}
                    >
                      {/* Strip Header */}
                      <div className="text-center pb-2 border-b-2 border-dashed border-slate-200 mb-2">
                        <div className="font-bold text-slate-300 text-xs tracking-widest uppercase">Photo Booth</div>
                      </div>

                      {strip.map((image, imgIndex) => {
                        const globalIndex = stripIndex * stripSize + imgIndex;
                        return (
                          <div
                            key={image.id}
                            className="bg-slate-100 overflow-hidden cursor-pointer relative group"
                            style={{ aspectRatio: '3/4' }}
                            onClick={() => setSelectedIndex(globalIndex)}
                          >
                            <img
                              src={image.variants.medium}
                              alt={image.caption || "Photo"}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              loading="lazy"
                            />
                          </div>
                        )
                      })}

                      {/* Strip Footer / Date */}
                      <div className="text-center pt-4">
                        <p className="font-handwriting text-slate-400 transform -rotate-2">{content.title || "Memories"}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            }

            // --- MASONRY LAYOUT (Default) ---
            return (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                {images.map((image, index) => {
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
                        <div className="relative overflow-hidden bg-slate-100">
                          <img
                            src={image.variants.medium}
                            alt={image.caption || `Photo ${index + 1}`}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
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
            );
          })()}
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
