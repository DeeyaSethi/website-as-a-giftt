"use client";

import { motion } from "framer-motion";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";
import { MapPin, Plane, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

interface TravelTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

export function TravelTemplate({ content, theme, colorPalette }: TravelTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const destinations = content.destinations || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, white 50%, ${colors.accent}15 100%)`,
      }}
    >
      {/* Animated flying plane */}
      <motion.div
        className="absolute text-4xl opacity-20"
        animate={{
          x: [-100, typeof window !== 'undefined' ? window.innerWidth + 100 : 1300],
          y: [100, 150, 100],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        ✈️
      </motion.div>

      {/* Floating location pins */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-10"
          style={{
            left: `${(i * 15 + 10) % 90}%`,
            top: `${(i * 20 + 15) % 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          📍
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <Plane className="w-10 h-10 text-white" />
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
            {content.title || "Our Adventures"}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </motion.div>

        {/* Journey Path */}
        <div className="relative">
          {/* Dotted path line */}
          <div className="absolute left-8 md:left-16 top-0 bottom-0 w-1 hidden md:block">
            <div 
              className="w-full h-full border-l-4 border-dashed opacity-20"
              style={{ borderColor: colors.primary }}
            />
          </div>

          {/* Destinations */}
          <div className="space-y-12">
            {destinations.map((destination: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                {/* Pin marker */}
                <motion.div
                  className="absolute left-0 md:left-8 top-0 z-10"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    }}
                  >
                    <span className="text-2xl md:text-3xl">{destination.emoji || "📍"}</span>
                  </div>
                </motion.div>

                {/* Content card */}
                <motion.div
                  className="ml-20 md:ml-32 relative cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="rounded-3xl p-6 md:p-8 shadow-2xl border-2 backdrop-blur-sm relative overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderColor: `${colors.primary}30`,
                    }}
                  >
                    {/* Decorative gradient overlay */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                      style={{ background: colors.secondary }}
                    />

                    {/* Year badge */}
                    {destination.year && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.2 }}
                        className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-4"
                        style={{
                          backgroundColor: `${colors.accent}40`,
                          color: colors.primary,
                        }}
                      >
                        {destination.year}
                      </motion.div>
                    )}

                    {/* Place name */}
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />
                      <h3
                        className="text-2xl md:text-3xl font-display font-bold"
                        style={{ color: colors.primary }}
                      >
                        {destination.place}
                      </h3>
                    </div>

                    {/* Story */}
                    <motion.div
                      initial={false}
                      animate={{ height: expandedIndex === index ? "auto" : "auto" }}
                      className="overflow-hidden"
                    >
                      <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
                        {destination.story}
                      </p>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="flex items-center gap-2 text-slate-400">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm">Tap to explore</span>
                    </div>

                    {/* Heart floating animation */}
                    {expandedIndex === index && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ 
                          scale: [0, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Heart
                          className="w-8 h-8"
                          style={{ color: colors.accent, fill: colors.accent }}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div
            className="inline-block px-8 py-4 rounded-full backdrop-blur-md"
            style={{
              backgroundColor: `${colors.primary}10`,
              border: `2px solid ${colors.primary}30`,
            }}
          >
            <p
              className="text-lg font-semibold"
              style={{ color: colors.primary }}
            >
              ✨ Every journey with you is a treasure ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
