"use client";

import { motion, useInView } from "framer-motion";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";
import { Heart, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface LetterTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

export function LetterTemplate({ content, theme, colorPalette }: LetterTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-open envelope after component is in view
  useEffect(() => {
    if (isInView && !isOpen) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, isOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 50%, ${colors.accent}20 100%)`,
      }}
    >
      {/* Floating decorative hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              y: [-20, 20, -20],
              x: [0, 10, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${10 + i * 6}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
          >
            <Heart className="w-4 h-4" style={{ color: colors.primary }} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Elegant Envelope Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Envelope - Opens to reveal letter */}
          <div className="relative" style={{ perspective: "1500px" }}>
            {/* Envelope Flap - Triangle that opens */}
            <motion.div
              animate={{
                rotateX: isOpen ? -180 : 0,
              }}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute top-0 left-0 right-0 z-20"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="h-20 md:h-28 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                }}
              />
            </motion.div>

            {/* Letter Paper - Slides up when opening */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: isOpen ? -24 : 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative"
            >
              <div
                className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 40px,
                      ${colors.primary}08 40px,
                      ${colors.primary}08 41px
                    )
                  `,
                }}
              >
                {/* Decorative top border - Rainbow gradient */}
                <div
                  className="h-3"
                  style={{
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
                  }}
                ></div>

                {/* Letter content */}
                <div className="p-8 md:p-16">
                  {/* Decorative sparkles at top */}
                  <div className="flex justify-center mb-10">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: [0, 180, 360],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      >
                        <Sparkles className="w-6 h-6 mx-2" style={{ color: colors.primary, opacity: 0.7 }} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Title */}
                  {content.title && (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={isOpen ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.4, duration: 0.6 }}
                      className="text-3xl md:text-5xl font-display font-bold mb-12 text-center"
                      style={{ color: colors.primary }}
                    >
                      {content.title}
                    </motion.h2>
                  )}

                  {/* Body text - Elegant paragraph style */}
                  {content.body && (
                    <div className="space-y-6 text-left max-w-2xl mx-auto">
                      {content.body.split("\n\n").map((paragraph: string, idx: number) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isOpen ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 1.6 + idx * 0.2, duration: 0.6 }}
                          className="text-lg md:text-xl text-slate-700 leading-relaxed"
                          style={{
                            fontFamily: "var(--font-sans)",
                            textIndent: idx === 0 ? "2.5em" : "0",
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  )}

                  {/* Signature - Elegant calligraphy style */}
                  {content.signature && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isOpen ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 2.2, duration: 0.6 }}
                      className="mt-16 text-right max-w-2xl mx-auto"
                    >
                      <div className="inline-block">
                        <p
                          className="text-3xl md:text-5xl font-display italic mb-3"
                          style={{
                            color: colors.primary,
                            textShadow: `2px 2px 6px ${colors.primary}25`,
                          }}
                        >
                          {content.signature}
                        </p>
                        <div
                          className="h-0.5 w-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Decorative bottom element - Heart seal */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={isOpen ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 2.7, duration: 0.6, type: "spring" }}
                    className="flex justify-center mt-14"
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}25, ${colors.secondary}25)`,
                        border: `3px solid ${colors.primary}`,
                      }}
                    >
                      <Heart className="w-10 h-10 fill-current" style={{ color: colors.primary }} />
                    </div>
                  </motion.div>
                </div>

                {/* Decorative bottom border */}
                <div
                  className="h-3"
                  style={{
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
                  }}
                ></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
