"use client";

import { motion } from "framer-motion";
import { Theme } from "@/lib/types";
import { ProcessedImage } from "@/lib/imageProcessor";
import { getThemeColors } from "@/lib/utils";
import { Heart, Sparkles, Star, ChevronDown } from "lucide-react";

interface HeroTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
  images?: ProcessedImage[];
  availablePages?: string[];
  onNavigate?: (pageIndex: number) => void;
}

export function HeroTemplate({ content, theme, colorPalette, images, availablePages, onNavigate }: HeroTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const backgroundImage = images?.[0];

  // Floating particles for elegance
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${backgroundImage.variants.full}) center/cover fixed`
          : `linear-gradient(135deg, ${colors.background} 0%, ${colors.accent}40 50%, ${colors.background} 100%)`,
      }}
    >
      {/* Elegant animated background */}
      {!backgroundImage && (
        <>
          {/* Large gradient orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: colors.primary }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            initial={{ top: "-10%", left: "-10%" }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            style={{ backgroundColor: colors.secondary }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            initial={{ bottom: "-5%", right: "-5%" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15"
            style={{ backgroundColor: colors.accent }}
            animate={{
              scale: [1, 1.4, 1],
              x: [-50, 50, -50],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            initial={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: colors.primary,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: 0.3,
              }}
              animate={{
                y: [-20, -80, -20],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="0" cy="0" r="100" fill={backgroundImage ? "white" : colors.primary} />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="100" cy="100" r="100" fill={backgroundImage ? "white" : colors.primary} />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Decorative line above title */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center mb-8"
          >
            <div
              className="h-[2px] w-16"
              style={{
                background: `linear-gradient(90deg, transparent, ${
                  backgroundImage ? "white" : colors.primary
                }, transparent)`,
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="mx-4"
            >
              <Sparkles
                className="w-6 h-6"
                style={{ color: backgroundImage ? "white" : colors.primary }}
              />
            </motion.div>
            <div
              className="h-[2px] w-16"
              style={{
                background: `linear-gradient(90deg, transparent, ${
                  backgroundImage ? "white" : colors.primary
                }, transparent)`,
              }}
            />
          </motion.div>

          {/* Main title - huge and elegant */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display font-bold mb-6 leading-[0.9]"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              color: backgroundImage ? "white" : colors.textDark,
              textShadow: backgroundImage
                ? "0 4px 20px rgba(0,0,0,0.3)"
                : `0 2px 40px ${colors.primary}40`,
              letterSpacing: "-0.02em",
            }}
          >
            {content.title || "For You"}
          </motion.h1>

          {/* Subtitle with elegant styling */}
          {content.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-3xl font-light tracking-wide mb-8"
              style={{
                color: backgroundImage
                  ? "rgba(255,255,255,0.9)"
                  : colors.textMedium,
                fontFamily: "var(--font-display)",
              }}
            >
              {content.subtitle}
            </motion.p>
          )}

          {/* Message in elegant card */}
          {content.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div
                className="backdrop-blur-xl rounded-3xl p-8 border shadow-2xl"
                style={{
                  backgroundColor: backgroundImage
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.8)",
                  borderColor: backgroundImage
                    ? "rgba(255,255,255,0.2)"
                    : `${colors.primary}40`,
                }}
              >
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    color: backgroundImage ? "white" : colors.textDark,
                  }}
                >
                  {content.message}
                </p>
              </div>
            </motion.div>
          )}

          {/* Explore More - Elegant cards */}
          {availablePages && availablePages.length > 1 && onNavigate && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-16"
            >
              <p
                className="text-sm tracking-[0.3em] uppercase font-semibold mb-6"
                style={{
                  color: backgroundImage
                    ? "rgba(255,255,255,0.7)"
                    : colors.textMedium,
                }}
              >
                Explore
              </p>

              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {availablePages.slice(1, 5).map((pageType, idx) => {
                  const pageInfo: Record<
                    string,
                    { label: string; icon: any; description: string }
                  > = {
                    letter: {
                      label: "Letter",
                      icon: Heart,
                      description: "A note for you",
                    },
                    gallery: {
                      label: "Gallery",
                      icon: Sparkles,
                      description: "Our moments",
                    },
                    timeline: {
                      label: "Timeline",
                      icon: Star,
                      description: "Our journey",
                    },
                    music: {
                      label: "Music",
                      icon: Sparkles,
                      description: "Your playlist",
                    },
                    garden: {
                      label: "Garden",
                      icon: Sparkles,
                      description: "Plant flowers",
                    },
                    travel: {
                      label: "Travel",
                      icon: Star,
                      description: "Adventures",
                    },
                    recipes: {
                      label: "Recipes",
                      icon: Heart,
                      description: "Our dishes",
                    },
                    quotes: {
                      label: "Quotes",
                      icon: Sparkles,
                      description: "Inspiration",
                    },
                    memories: {
                      label: "Memories",
                      icon: Heart,
                      description: "Play & match",
                    },
                  };

                  const info =
                    pageInfo[pageType] ||
                    ({
                      label: pageType,
                      icon: Sparkles,
                      description: "Discover",
                    } as any);
                  const IconComponent = info.icon;

                  return (
                    <motion.button
                      key={pageType}
                      onClick={() => onNavigate(idx + 1)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + idx * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border-2 p-6 min-w-[140px] transition-all shadow-lg hover:shadow-2xl"
                      style={{
                        backgroundColor: backgroundImage
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.9)",
                        borderColor: backgroundImage
                          ? "rgba(255,255,255,0.2)"
                          : `${colors.primary}30`,
                      }}
                    >
                      {/* Hover gradient effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`,
                        }}
                      />

                      <div className="relative z-10 flex flex-col items-center">
                        <IconComponent
                          className="w-8 h-8 mb-3 transition-transform group-hover:scale-110"
                          style={{
                            color: backgroundImage ? "white" : colors.primary,
                          }}
                        />
                        <div
                          className="font-semibold text-sm mb-1"
                          style={{
                            color: backgroundImage ? "white" : colors.textDark,
                          }}
                        >
                          {info.label}
                        </div>
                        <div
                          className="text-xs opacity-70"
                          style={{
                            color: backgroundImage ? "white" : colors.textMedium,
                          }}
                        >
                          {info.description}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator - minimal and elegant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <ChevronDown
            className="w-6 h-6 opacity-40"
            style={{ color: backgroundImage ? "white" : colors.textMedium }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
