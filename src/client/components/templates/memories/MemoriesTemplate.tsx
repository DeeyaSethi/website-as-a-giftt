"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Theme } from "@/shared/types";
import { ProcessedImage } from "@/client/lib/imageProcessor";
import { getThemeColors } from "@/shared/utils";
import { Heart, Sparkles, Star, Calendar } from "lucide-react";
import { useState } from "react";

interface MemoriesTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
  images?: ProcessedImage[];
}

export function MemoriesTemplate({
  content,
  theme,
  colorPalette,
  images,
}: MemoriesTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const memories = content.memories || [];
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at top, ${colors.primary}10, transparent 50%),
                     radial-gradient(ellipse at bottom, ${colors.accent}10, transparent 50%),
                     linear-gradient(135deg, white 0%, ${colors.background} 100%)`,
      }}
    >
      {/* Floating sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${(i * 3.3) % 100}%`,
            top: `${(i * 7) % 100}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: (i % 4) * 0.5,
          }}
        >
          {i % 3 === 0 ? (
            <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
          ) : i % 3 === 1 ? (
            <Star className="w-3 h-3" style={{ color: colors.accent }} />
          ) : (
            <Heart className="w-3 h-3" style={{ color: colors.secondary }} />
          )}
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-display font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {content.title || "Precious Moments"}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </motion.div>

        {/* Memories Grid - Masonry layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                boxShadow: `0 20px 60px ${colors.primary}30`,
              }}
              onClick={() => setSelectedMemory(selectedMemory === index ? null : index)}
              className="cursor-pointer group relative"
            >
              <div
                className="relative rounded-3xl p-6 md:p-8 shadow-xl border-2 backdrop-blur-md overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderColor: selectedMemory === index ? colors.primary : `${colors.primary}20`,
                  minHeight: "280px",
                }}
              >
                {/* Gradient background */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${colors.primary}, transparent 70%),
                                 radial-gradient(circle at 70% 80%, ${colors.secondary}, transparent 70%)`,
                  }}
                />

                {/* Large emoji */}
                <motion.div
                  className="text-6xl md:text-7xl mb-4 filter drop-shadow-lg"
                  animate={selectedMemory === index ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {memory.emoji || "✨"}
                </motion.div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl font-display font-bold mb-3"
                  style={{ color: colors.primary }}
                >
                  {memory.title}
                </h3>

                {/* Date badge */}
                {memory.date && (
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4" style={{ color: colors.accent }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: colors.accent }}
                    >
                      {memory.date}
                    </span>
                  </div>
                )}

                {/* Description */}
                <motion.p
                  className="text-base text-slate-700 leading-relaxed relative z-10"
                  initial={false}
                  animate={{ 
                    opacity: selectedMemory === index ? 1 : 0.7,
                  }}
                >
                  {memory.description}
                </motion.p>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                  }}
                />

                {/* Selected indicator */}
                <AnimatePresence>
                  {selectedMemory === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-4 right-4"
                    >
                      <Heart
                        className="w-8 h-8"
                        style={{ color: colors.accent, fill: colors.accent }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 rounded-tl-3xl opacity-20" style={{ borderColor: colors.primary }} />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 rounded-br-3xl opacity-20" style={{ borderColor: colors.secondary }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {memories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: colors.primary }} />
            <p className="text-xl text-slate-500">
              No memories to display yet. Share some special moments!
            </p>
          </motion.div>
        )}

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-md"
            style={{
              backgroundColor: `${colors.primary}10`,
              border: `2px solid ${colors.primary}30`,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: colors.primary }} />
            </motion.div>
            <p
              className="text-lg font-semibold"
              style={{ color: colors.primary }}
            >
              Every moment with you is a memory I treasure
            </p>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-5 h-5" style={{ color: colors.accent }} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
