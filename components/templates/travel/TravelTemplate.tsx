"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";

interface TravelTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

const DEFAULT_LOCATIONS = [
  { name: "Paris", x: 52, y: 35, emoji: "🗼", story: "Where we fell in love with croissants" },
  { name: "Tokyo", x: 85, y: 42, emoji: "🗾", story: "Cherry blossoms and ramen adventures" },
  { name: "New York", x: 25, y: 38, emoji: "🗽", story: "The city that never sleeps" },
  { name: "Bali", x: 80, y: 65, emoji: "🏝️", story: "Paradise found" },
  { name: "Iceland", x: 45, y: 20, emoji: "🏔️", story: "Northern lights magic" },
];

export function TravelTemplate({ content, theme, colorPalette }: TravelTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const locations = content.locations || DEFAULT_LOCATIONS;
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  
  // Extract personalized data (optional - only if provided)
  const travelStyle = content.travelStyle || null;
  const memorableTrip = content.memorableTrip || null;
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondary}20 100%)`,
      }}
    >
      {/* Floating planes */}
      <motion.div
        className="absolute text-4xl"
        animate={{
          x: [-100, 1200],
          y: [100, 150, 100],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        ✈️
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Travel Style Tag */}
          {travelStyle && (
            <div className="mb-6">
              <span
                className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md border-2 inline-block"
                style={{
                  backgroundColor: `${colors.primary}20`,
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                ✈️ {travelStyle}
              </span>
            </div>
          )}
          
          <h2
            className="text-5xl md:text-6xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {content.title || "Our Adventures"}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-slate-600">{content.subtitle}</p>
          )}
          
          {/* Memorable Trip Story */}
          {memorableTrip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-2xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: `${colors.accent}60` }}>
                <div className="text-2xl mb-2">🌟</div>
                <p className="text-base italic text-slate-700 leading-relaxed">
                  {memorableTrip}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          {/* Map Container */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              height: "500px",
              background: "linear-gradient(180deg, #a8daff 0%, #b8e6ff 50%, #c8f0ff 100%)",
            }}
          >
            {/* Simplified world map */}
            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.3 }}
            >
              {/* Continents (simplified shapes) */}
              <path
                d="M 100,200 Q 150,180 200,190 T 300,200 L 320,250 Q 300,270 250,260 L 180,270 Q 120,250 100,200 Z"
                fill="#7CB342"
              />
              <path
                d="M 400,150 Q 480,140 550,160 T 650,180 L 680,220 Q 650,260 580,250 L 500,240 Q 430,220 400,150 Z"
                fill="#7CB342"
              />
              <path
                d="M 700,200 Q 750,190 820,210 T 920,230 L 940,280 Q 900,320 840,310 L 760,300 Q 710,270 700,200 Z"
                fill="#7CB342"
              />
              <path
                d="M 150,300 Q 200,290 270,310 T 350,330 L 360,380 Q 320,410 260,400 L 190,390 Q 140,360 150,300 Z"
                fill="#7CB342"
              />
            </svg>

            {/* Pins */}
            {locations.map((location: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: idx * 0.2, type: "spring", stiffness: 200 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  transform: "translate(-50%, -100%)",
                }}
                onMouseEnter={() => setHoveredPin(idx)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => setSelectedLocation(location)}
              >
                {/* Pin */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <MapPin
                    className="w-10 h-10 drop-shadow-lg"
                    style={{ color: colors.primary }}
                    fill={colors.primary}
                  />
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xl">
                    {location.emoji}
                  </div>
                </motion.div>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredPin === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap z-10"
                      style={{ borderTop: `3px solid ${colors.primary}` }}
                    >
                      <div className="font-bold text-slate-900">{location.name}</div>
                      <div className="text-xs text-slate-600">Click for story</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Connection line to previous pin */}
                {idx > 0 && (
                  <svg
                    className="absolute"
                    style={{
                      left: 0,
                      top: 0,
                      width: "1000px",
                      height: "500px",
                      pointerEvents: "none",
                      position: "fixed",
                    }}
                  >
                    <motion.line
                      x1={`${locations[idx - 1].x}%`}
                      y1={`${locations[idx - 1].y}%`}
                      x2={`${location.x}%`}
                      y2={`${location.y}%`}
                      stroke={colors.accent}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                    />
                  </svg>
                )}
              </motion.div>
            ))}

            {/* Animated clouds */}
            <motion.div
              className="absolute top-10 text-4xl opacity-70"
              animate={{ x: [-50, 1000] }}
              transition={{ duration: 30, repeat: Infinity }}
            >
              ☁️
            </motion.div>
            <motion.div
              className="absolute top-32 text-3xl opacity-60"
              animate={{ x: [-100, 1000] }}
              transition={{ duration: 25, repeat: Infinity, delay: 5 }}
            >
              ☁️
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold" style={{ color: colors.primary }}>
                {locations.length}
              </div>
              <div className="text-sm text-slate-600">Places Visited</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl font-bold" style={{ color: colors.primary }}>
                ∞
              </div>
              <div className="text-sm text-slate-600">Memories Made</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-bold" style={{ color: colors.primary }}>
                ∞
              </div>
              <div className="text-sm text-slate-600">More to Explore</div>
            </div>
          </div>
        </motion.div>

        {/* Location Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {locations.map((location: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer"
              onClick={() => setSelectedLocation(location)}
              style={{ borderLeft: `4px solid ${colors.primary}` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{location.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-slate-600">{location.story}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message */}
        {content.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8"
          >
            <p className="text-xl text-slate-700 leading-relaxed italic">
              "{content.message}"
            </p>
          </motion.div>
        )}
      </div>

      {/* Selected Location Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <div className="text-6xl mb-4">{selectedLocation.emoji}</div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                  {selectedLocation.name}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {selectedLocation.story}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

