"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";

interface GardenTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

const FLOWERS = [
  { emoji: "🌸", name: "Cherry Blossom", color: "#FFB7C5" },
  { emoji: "🌺", name: "Hibiscus", color: "#FF6B9D" },
  { emoji: "🌻", name: "Sunflower", color: "#FFD700" },
  { emoji: "🌹", name: "Rose", color: "#E11D48" },
  { emoji: "🌷", name: "Tulip", color: "#F472B6" },
  { emoji: "🌼", name: "Daisy", color: "#FBBF24" },
  { emoji: "🪷", name: "Lotus", color: "#DDA0DD" },
  { emoji: "💐", name: "Bouquet", color: "#FF69B4" },
];

export function GardenTemplate({ content, theme, colorPalette }: GardenTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const [plantedFlowers, setPlantedFlowers] = useState<
    Array<{ id: number; flower: typeof FLOWERS[0]; x: number; y: number; delay: number }>
  >([]);
  const [selectedFlower, setSelectedFlower] = useState(0);
  const [isPlanting, setIsPlanting] = useState(false);
  
  // Extract personalized data
  const flowerMeaning = content.flowerMeaning || null;
  const favoriteFlower = content.favoriteFlower || null;

  const handlePlantFlower = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlanting) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Don't plant outside garden area
    if (y < 30 || y > 85) return;

    const newFlower = {
      id: Date.now(),
      flower: FLOWERS[selectedFlower],
      x,
      y,
      delay: 0,
    };

    setPlantedFlowers([...plantedFlowers, newFlower]);
  };

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #87CEEB 0%, #98D8C8 50%, #7CB342 100%)`,
      }}
    >
      {/* Clouds */}
      <motion.div
        className="absolute top-10 left-10 text-6xl opacity-70"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="absolute top-20 right-20 text-5xl opacity-60"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        ☁️
      </motion.div>

      {/* Sun */}
      <motion.div
        className="absolute top-10 right-10 text-7xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        ☀️
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            {content.title || "Our Garden of Memories"}
          </h2>
          
          {/* Flower Meaning */}
          {flowerMeaning && (
            <div className="mb-4">
              <span className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/30 text-white inline-block">
                🌸 {flowerMeaning}
              </span>
            </div>
          )}
          
          {content.message && (
            <p className="text-xl text-white/90" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
              {content.message}
            </p>
          )}
          
          {/* Favorite Flower */}
          {favoriteFlower && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border-2 border-white/30">
                <p className="text-white font-semibold">
                  💐 Favorite: {favoriteFlower}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Flower Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Plant Flowers:</h3>
            <button
              onClick={() => setIsPlanting(!isPlanting)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isPlanting
                  ? "bg-green-500 text-white shadow-lg scale-105"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {isPlanting ? "🌱 Planting Mode ON" : "Click to Start Planting"}
            </button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {FLOWERS.map((flower, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFlower(idx)}
                className={`p-4 rounded-xl transition-all ${
                  selectedFlower === idx
                    ? "bg-green-100 scale-110 shadow-lg ring-4 ring-green-400"
                    : "bg-slate-50 hover:bg-slate-100 hover:scale-105"
                }`}
              >
                <div className="text-4xl">{flower.emoji}</div>
                <div className="text-xs mt-1 font-semibold text-slate-600">
                  {flower.name}
                </div>
              </button>
            ))}
          </div>

          {plantedFlowers.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                🌸 {plantedFlowers.length} flowers planted
              </p>
              <button
                onClick={() => setPlantedFlowers([])}
                className="text-sm text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Garden
              </button>
            </div>
          )}
        </motion.div>

        {/* Garden Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-gradient-to-b from-green-200 to-green-400 rounded-3xl overflow-hidden shadow-2xl"
          style={{ height: "500px", cursor: isPlanting ? "crosshair" : "default" }}
          onClick={handlePlantFlower}
        >
          {/* Grass texture */}
          <div className="absolute inset-0 opacity-20">
            <div className="text-6xl leading-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <span key={i} className="inline-block">🌿</span>
              ))}
            </div>
          </div>

          {/* Planted Flowers */}
          <AnimatePresence>
            {plantedFlowers.map((planted) => (
              <motion.div
                key={planted.id}
                initial={{ scale: 0, y: 50, rotate: -180 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="absolute text-6xl cursor-pointer hover:scale-125 transition-transform"
                style={{
                  left: `${planted.x}%`,
                  top: `${planted.y}%`,
                  transform: "translate(-50%, -50%)",
                  filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
                }}
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
              >
                {planted.flower.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Planting Guide */}
          {isPlanting && plantedFlowers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-white/90 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-xl font-bold text-slate-800 mb-2">
                  Click anywhere to plant flowers!
                </p>
                <p className="text-sm text-slate-600">
                  Create your personal garden of memories
                </p>
              </div>
            </motion.div>
          )}

          {/* Butterflies */}
          {plantedFlowers.length > 3 && (
            <>
              <motion.div
                className="absolute text-4xl"
                animate={{
                  x: [0, 200, 400, 200, 0],
                  y: [100, 50, 150, 200, 100],
                }}
                transition={{ duration: 15, repeat: Infinity }}
              >
                🦋
              </motion.div>
              <motion.div
                className="absolute text-4xl"
                animate={{
                  x: [400, 200, 0, 200, 400],
                  y: [50, 100, 200, 150, 50],
                }}
                transition={{ duration: 12, repeat: Infinity }}
              >
                🦋
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Message */}
        {content.caption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-xl text-white font-light"
               style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
              {content.caption}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

