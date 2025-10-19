"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";
import { Theme } from "@/lib/types";
import { ProcessedImage } from "@/lib/imageProcessor";
import { getThemeColors } from "@/lib/utils";

interface MemoriesTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
  images?: ProcessedImage[];
}

const DEFAULT_MEMORIES = [
  { emoji: "☀️", title: "First Day", text: "When it all began..." },
  { emoji: "🎉", title: "Celebration", text: "That epic party!" },
  { emoji: "✈️", title: "Adventure", text: "Our first trip together" },
  { emoji: "🎂", title: "Birthday", text: "Best birthday ever" },
  { emoji: "🌟", title: "Achievement", text: "You did it!" },
  { emoji: "💕", title: "Special Moment", text: "When we knew" },
  { emoji: "🎨", title: "Creative Day", text: "Making memories" },
  { emoji: "🎵", title: "Concert", text: "Music and magic" },
];

export function MemoriesTemplate({
  content,
  theme,
  colorPalette,
  images,
}: MemoriesTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const memories = content.memories || DEFAULT_MEMORIES;
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  
  // Extract personalized data
  const memoryTheme = content.memoryTheme || null;
  const [moves, setMoves] = useState(0);

  // Create pairs (duplicate each memory)
  const gamePairs = [...memories.slice(0, 6), ...memories.slice(0, 6)]
    .sort(() => Math.random() - 0.5)
    .map((memory, idx) => ({ ...memory, id: idx, originalIndex: memories.indexOf(memory) }));

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (gamePairs[first].originalIndex === gamePairs[second].originalIndex) {
        // Match!
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, first, second]);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  const isFlipped = (index: number) =>
    flippedCards.includes(index) || matchedPairs.includes(index);

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondary}20 100%)`,
      }}
    >
      {/* Confetti when game is won */}
      {matchedPairs.length === gamePairs.length && typeof window !== 'undefined' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: -50,
                rotate: 0,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
              }}
            >
              {["🎉", "✨", "🎊", "⭐", "💫"][i % 5]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Sparkles className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
          
          {/* Memory Theme Tag */}
          {memoryTheme && (
            <div className="mb-6">
              <span
                className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md border-2 inline-block"
                style={{
                  backgroundColor: `${colors.primary}20`,
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                🎴 {memoryTheme}
              </span>
            </div>
          )}
          
          <h2
            className="text-5xl md:text-6xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {content.title || "Memory Matching Game"}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-slate-600">{content.subtitle}</p>
          )}
        </motion.div>

        {/* Game Stats */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="text-center bg-white rounded-2xl px-6 py-4 shadow-lg">
            <div className="text-3xl font-bold" style={{ color: colors.primary }}>
              {moves}
            </div>
            <div className="text-sm text-slate-600">Moves</div>
          </div>

          <div className="text-center bg-white rounded-2xl px-6 py-4 shadow-lg">
            <div className="text-3xl font-bold" style={{ color: colors.primary }}>
              {matchedPairs.length / 2} / {gamePairs.length / 2}
            </div>
            <div className="text-sm text-slate-600">Pairs Found</div>
          </div>

          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            style={{ color: colors.primary }}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">Reset</span>
          </button>
        </div>

        {/* Memory Cards Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8"
        >
          {gamePairs.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-square"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative w-full h-full cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped(index) ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s",
                }}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: isFlipped(index) ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Back of card */}
                <div
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    backfaceVisibility: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </div>

                {/* Front of card */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    borderTop: `4px solid ${colors.primary}`,
                  }}
                >
                  {images && images[memory.originalIndex] ? (
                    <img
                      src={images[memory.originalIndex].variants.thumbnail}
                      alt={memory.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <div className="text-4xl md:text-5xl mb-2">{memory.emoji}</div>
                      <div className="text-xs md:text-sm font-bold text-slate-800">
                        {memory.title}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Win Message */}
        <AnimatePresence>
          {matchedPairs.length === gamePairs.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.primary }}>
                Congratulations!
              </h3>
              <p className="text-xl text-slate-700 mb-6">
                You found all the memories in {moves} moves!
              </p>
              <button
                onClick={resetGame}
                className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ backgroundColor: colors.primary }}
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Memories List */}
        {content.showAllMemories && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
              All Our Memories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {memories.map((memory: any, idx: number) => (
                <div
                  key={idx}
                  className="text-center p-4 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-2">{memory.emoji}</div>
                  <div className="font-semibold text-slate-800">{memory.title}</div>
                  <div className="text-sm text-slate-600">{memory.text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Message */}
        {content.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8"
          >
            <p className="text-lg text-slate-700 leading-relaxed">{content.message}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

