"use client";

import { motion } from "framer-motion";
import { Theme } from "@/lib/types";
import { ProcessedImage } from "@/lib/imageProcessor";
import { getThemeColors } from "@/lib/utils";
import { useRef } from "react";
import { OccasionEffects } from "@/components/animations/OccasionEffects";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowDown, Music, Calendar, Heart, Star, Sparkles, Gift } from "lucide-react";

interface HeroTemplateProps {
  content: {
    title?: string;
    subtitle?: string;
    message?: string;
    occasion?: string;
    cardStyle?: string;
  };
  theme: Theme;
  colorPalette?: any;
  images?: ProcessedImage[];
  availablePages?: string[];
  onNavigate?: (pageIndex: number) => void;
}

export function HeroTemplate({ content, theme, colorPalette, images, availablePages, onNavigate }: HeroTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const backgroundImage = images?.[0];
  const sectionRef = useRef(null);

  // REMOVED: Scroll animations that caused fading
  // const { scrollYProgress } = useScroll(...)
  // const opacity = useTransform(...)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8"
      style={{
        // Warmer gradient
        background: `radial-gradient(circle at 50% 50%, #ffffff 0%, ${colors.background}40 100%)`,
      }}
    >
      {/* Noise Texture Overlay - Slightly decreased opacity for warmth */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 mix-blend-multiply" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Occasion Animation Layer - Increased visibility */}
      <div className="absolute inset-0 z-0 opacity-80">
        <OccasionEffects occasion={content.occasion} colors={colors} />
      </div>

      {/* Main Content - CLEAN & WARM LAYOUT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-28">

        {/* Left Side: Photo (Straight & Elegant) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative lg:w-1/2 max-w-lg"
        >
          <TiltCard intensity={5} className="relative z-10">
            <div className="bg-white p-4 pb-16 rounded-sm shadow-2xl">
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100 relative">
                {backgroundImage ? (
                  <img
                    src={backgroundImage.variants.full}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Heart className="w-12 h-12 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 ring-1 ring-black/5" />
              </div>
            </div>

            {/* Handwritten Caption on Bottom */}
            <div className="absolute bottom-4 left-0 right-0 text-center z-20">
              <p className="font-handwriting text-3xl text-slate-600">
                To my favorite person
              </p>
            </div>
          </TiltCard>
        </motion.div>

        {/* Right Side: Message & Widgets */}
        <div className="lg:w-1/2 space-y-12 text-center lg:text-left pt-8 lg:pt-0">

          {/* Title Group */}
          <div className="space-y-8">
            {content.occasion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-handwriting text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={{ color: colors.primary }}
              >
                <span>{content.occasion},</span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl leading-none text-slate-800"
            >
              {content.title || "For You"}
            </motion.h1>

            {content.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-500 font-light max-w-md mx-auto lg:mx-0 leading-relaxed"
              >
                {content.subtitle}
              </motion.p>
            )}
          </div>

          {/* Message Card (Sticky Note Style) */}
          {content.message && (
            <motion.div
              initial={{ opacity: 0, rotate: 1 }}
              animate={{ opacity: 1, rotate: 1 }}
              transition={{ delay: 0.5 }}
              className="relative bg-[#fffdf0] p-8 shadow-lg max-w-md mx-auto lg:mx-0 transform rotate-1 border border-yellow-100/50"
            >
              <p className="font-handwriting text-2xl md:text-3xl leading-relaxed text-slate-700">
                {content.message}
              </p>
            </motion.div>
          )}

          {/* Navigation "Pill" Buttons */}
          {availablePages && availablePages.length > 1 && onNavigate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {availablePages.slice(1, 4).map((pageType: string, idx: number) => {
                const pageLabels: Record<string, string> = {
                  letter: "Read Letter", gallery: "Photos", music: "Playlist",
                  garden: "Garden", travel: "Adventures", memories: "Memories",
                };
                return (
                  <button
                    key={pageType}
                    onClick={() => onNavigate(idx + 1)}
                    className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="font-body text-sm uppercase tracking-widest font-medium text-slate-500 group-hover:text-slate-800">
                      {pageLabels[pageType] || pageType}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}

        </div>

      </div>

    </section>
  );
}
