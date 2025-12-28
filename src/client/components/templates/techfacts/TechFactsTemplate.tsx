"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Code, Wifi, Zap, RefreshCw, Lightbulb, Terminal, Globe } from "lucide-react";
import { Theme } from "@/shared/types";
import { getThemeColors } from "@/shared/utils";

interface TechFactsTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

// Default tech facts (fallback if API fails) - with a fun, geeky twist
const DEFAULT_TECH_FACTS = [
  "The first computer bug was an actual bug - a moth that crash-landed into Harvard's Mark II computer in 1947. Even bugs had better coding skills back then!",
  "The first 1GB hard drive (1980) weighed 550 pounds and cost $40,000. Your phone's storage would've been worth millions!",
  "The first domain name ever registered was Symbolics.com on March 15, 1985. They were flexing before flexing was cool.",
  "QWERTY keyboard was designed to SLOW typists down to prevent typewriter jams. Imagine if your IDE did that today!",
  "Windows was almost called 'Interface Manager'. Dodged a bullet there, Microsoft.",
  "The first computer mouse was carved from wood with ONE button. Minimalism at its finest.",
  "Email existed BEFORE the World Wide Web. Mind = blown 🤯",
  "The first webcam was built at Cambridge University... to check if the coffee pot was full. Priorities!",
  "Google's original name was 'Backrub'. Yeah, let that sink in. You'd be 'Backrubbing' things.",
  "The average person spends 7+ hours online daily. You're probably above average, let's be honest.",
  "The first programmer was a woman - Ada Lovelace, in the 1840s. She coded before computers existed. Legendary.",
  "There are more possible iterations of a chess game than atoms in the universe. Your brain just exploded.",
  "The first YouTube video was 'Me at the zoo' uploaded on April 23, 2005. Peak content.",
  "Nintendo started as a playing card company in 1889. From cards to consoles - epic pivot!",
];

export function TechFactsTemplate({ content, theme, colorPalette }: TechFactsTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use provided facts or fallback to defaults
  // Ensure facts is always a valid array with content
  const facts = (content.techFacts && Array.isArray(content.techFacts) && content.techFacts.length > 0)
    ? content.techFacts
    : DEFAULT_TECH_FACTS;
  
  const title = content.title || "Go Study, You Geek! 🤓";
  const subtitle = content.subtitle || "Your daily dose of nerdy knowledge (you're welcome)";

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
      setIsRefreshing(false);
    }, 500);
  };

  // Auto-rotate facts every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}15 50%, ${colors.accent}10 100%)`,
      }}
    >
      {/* Animated tech background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const icons = [Cpu, Code, Wifi, Zap, Terminal, Globe];
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Icon className="w-8 h-8" style={{ color: colors.primary }} />
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Cpu className="w-16 h-16" style={{ color: colors.primary }} />
          </motion.div>

          <h2
            className="text-5xl md:text-6xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {title}
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>

          <div className="flex items-center justify-center gap-2">
            <Code className="w-5 h-5" style={{ color: colors.secondary }} />
            <span className="text-sm font-mono text-slate-500">
              {facts.length} facts loaded
            </span>
          </div>
        </motion.div>

        {/* Main Fact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-200 relative">
            {/* Decorative corner */}
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{
                background: `radial-gradient(circle at top right, ${colors.primary}, transparent)`,
              }}
            />

            <div className="p-8 md:p-12 relative">
              {/* Fact Number Badge */}
              <motion.div
                key={`badge-${currentFactIndex}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                style={{ background: colors.primary }}
              >
                {currentFactIndex + 1}
              </motion.div>

              {/* Lightbulb Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="mb-6"
              >
                <Lightbulb
                  className="w-12 h-12"
                  style={{ color: colors.secondary }}
                />
              </motion.div>

              {/* Fact Text */}
              <motion.div
                key={`fact-${currentFactIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed font-medium mb-8">
                  {facts[currentFactIndex]}
                </p>
              </motion.div>

              {/* Refresh Button */}
              <div className="flex justify-center">
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isRefreshing}
                  className="px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all flex items-center gap-3"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    opacity: isRefreshing ? 0.6 : 1,
                  }}
                >
                  <motion.div
                    animate={{ rotate: isRefreshing ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                  {isRefreshing ? "Loading..." : "Next Fact"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-2 mb-12"
        >
          {facts.slice(0, 10).map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentFactIndex(idx)}
              whileHover={{ scale: 1.3 }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: idx === currentFactIndex ? colors.primary : colors.primary + "30",
                width: idx === currentFactIndex ? "24px" : "8px",
              }}
            />
          ))}
          {facts.length > 10 && (
            <span className="text-xs text-slate-500 ml-2">+{facts.length - 10} more</span>
          )}
        </motion.div>

        {/* Fun Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Terminal, label: "Geeky", value: "100%" },
            { icon: Zap, label: "Mind-Blowing", value: "∞" },
            { icon: Code, label: "Tech Level", value: "9000" },
            { icon: Globe, label: "Facts", value: facts.length },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-slate-100"
            >
              <stat.icon
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: colors.primary }}
              />
              <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional Message */}
        {content.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8"
          >
            <p className="text-lg text-slate-700 leading-relaxed italic">
              "{content.message}"
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

