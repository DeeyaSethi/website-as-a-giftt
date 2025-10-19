"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";

interface QuotesTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

const DEFAULT_QUOTES = [
  {
    text: "In the end, we only regret the chances we didn't take.",
    author: "Lewis Carroll",
    category: "courage",
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "authenticity",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "passion",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "action",
  },
];

export function QuotesTemplate({ content, theme, colorPalette }: QuotesTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const quotes = content.quotes || DEFAULT_QUOTES;
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Extract personalized data (optional - only if provided)
  const quoteTheme = content.quoteTheme || null;
  const favoriteAuthor = content.favoriteAuthor || null;
  const iconicMovieQuote = content.iconicMovieQuote || null;

  // Auto-advance quotes
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, quotes.length]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const quote = quotes[currentQuote];

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}20 50%, ${colors.accent}10 100%)`,
      }}
    >
      {/* Animated background particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors.accent,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Featured Movie Quote (if provided) */}
        {iconicMovieQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border-2" style={{ borderColor: `${colors.primary}40` }}>
              <div className="text-6xl text-center mb-6">🎬</div>
              <p className="text-3xl md:text-4xl font-display text-center italic leading-relaxed" style={{ color: colors.textDark }}>
                "{iconicMovieQuote}"
              </p>
              <div className="text-center mt-6">
                <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                  Iconic Movie Quote
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Quote className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
          
          {/* Theme Tags */}
          {(quoteTheme || favoriteAuthor) && (
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              {quoteTheme && (
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  ✨ {quoteTheme}
                </span>
              )}
              {favoriteAuthor && (
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${colors.secondary}20`,
                    color: colors.textDark,
                  }}
                >
                  📚 {favoriteAuthor}
                </span>
              )}
            </div>
          )}
          
          <h2
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {content.title || "Words to Live By"}
          </h2>
          {content.subtitle && (
            <p className="text-lg text-slate-600">{content.subtitle}</p>
          )}
        </motion.div>

        {/* Quote Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-16 relative overflow-hidden"
            >
              {/* Decorative quotes */}
              <div
                className="absolute top-8 left-8 text-8xl opacity-10 font-serif"
                style={{ color: colors.primary }}
              >
                "
              </div>
              <div
                className="absolute bottom-8 right-8 text-8xl opacity-10 font-serif rotate-180"
                style={{ color: colors.primary }}
              >
                "
              </div>

              {/* Quote Content */}
              <div className="relative z-10 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-4xl font-display leading-relaxed text-slate-800 mb-8"
                >
                  {quote.text}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className="h-1 w-16 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <p className="text-xl font-semibold" style={{ color: colors.primary }}>
                    — {quote.author}
                  </p>
                  {quote.category && (
                    <span
                      className="px-4 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary,
                      }}
                    >
                      {quote.category}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Progress indicator */}
              {isAutoPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: colors.primary }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevQuote}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
              style={{ color: colors.primary }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-6">
              {/* Dots */}
              <div className="flex gap-2">
                {quotes.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuote(idx)}
                    className="transition-all"
                    style={{
                      width: idx === currentQuote ? "32px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor:
                        idx === currentQuote ? colors.primary : `${colors.primary}30`,
                    }}
                  />
                ))}
              </div>

              {/* Play/Pause */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                style={{ color: colors.primary }}
              >
                {isAutoPlaying ? (
                  <Pause className="w-5 h-5" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5" fill="currentColor" />
                )}
              </button>
            </div>

            <button
              onClick={nextQuote}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
              style={{ color: colors.primary }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-slate-500 text-sm">
            {currentQuote + 1} / {quotes.length}
          </div>
        </div>

        {/* Message */}
        {content.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8"
          >
            <p className="text-lg text-slate-700">{content.message}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

