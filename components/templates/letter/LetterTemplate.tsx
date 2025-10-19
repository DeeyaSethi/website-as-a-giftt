"use client";

import { motion } from "framer-motion";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";
import { Quote } from "lucide-react";

interface LetterTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

export function LetterTemplate({ content, theme, colorPalette }: LetterTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);

  return (
    <section
      className="min-h-screen py-20 px-4 flex items-center"
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, white 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto w-full"
      >
        {/* Minimal elegant card */}
        <div className="relative">
          {/* Quote icon - decorative */}
          <motion.div
            className="absolute -top-8 -left-4 opacity-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Quote size={80} style={{ color: colors.primary }} />
          </motion.div>

          {/* Letter content - super clean */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl">
            {content.title && (
              <motion.h2
                className="text-3xl md:text-4xl font-display font-bold mb-12 text-center"
                style={{ color: colors.primary }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {content.title}
              </motion.h2>
            )}

            {/* Body text - well spaced and minimal */}
            {content.body && (
              <div className="space-y-6">
                {content.body.split("\n\n").map((paragraph: string, idx: number) => (
                  <motion.p
                    key={idx}
                    className="text-lg md:text-xl text-slate-700 leading-relaxed font-light"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            )}

            {/* Signature - elegant */}
            {content.signature && (
              <motion.div
                className="mt-12 text-right"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                {content.closing && (
                  <p className="text-lg text-slate-600 mb-2">{content.closing}</p>
                )}
                <p
                  className="text-3xl md:text-4xl font-display italic"
                  style={{ color: colors.primary }}
                >
                  {content.signature}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
