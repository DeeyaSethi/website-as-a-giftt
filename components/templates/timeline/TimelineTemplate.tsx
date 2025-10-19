"use client";

import { motion } from "framer-motion";
import { Theme } from "@/lib/types";
import { ProcessedImage } from "@/lib/imageProcessor";
import { getThemeColors } from "@/lib/utils";

interface TimelineTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
  images?: ProcessedImage[];
}

export function TimelineTemplate({
  content,
  theme,
  colorPalette,
  images,
}: TimelineTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const events = content.events || [];
  
  // Extract personalized data
  const relationshipType = content.relationshipType || null;

  return (
    <section
      className="min-h-screen py-20 px-4"
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, white 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Minimal header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Relationship Type Tag */}
          {relationshipType && (
            <div className="mb-6">
              <span
                className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md border-2 inline-block"
                style={{
                  backgroundColor: `${colors.primary}20`,
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                💫 {relationshipType}
              </span>
            </div>
          )}
          
          <h2
            className="text-5xl md:text-6xl font-display font-bold"
            style={{ color: colors.primary }}
          >
            {content.title || "Journey"}
          </h2>
        </motion.div>

        {/* Modern timeline - horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block"
            style={{ backgroundColor: colors.accent, opacity: 0.3 }}
          />

          {/* Events */}
          <div className="space-y-16 md:space-y-24">
            {events.map((event: any, index: number) => {
              const isLeft = index % 2 === 0;
              const eventImage = images?.[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
                >
                  {/* Content side */}
                  <div className="flex-1">
                    <motion.div
                      className="bg-white rounded-3xl p-8 md:p-10 shadow-xl"
                      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Date badge */}
                      {event.date && (
                        <div
                          className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                          style={{
                            backgroundColor: `${colors.primary}15`,
                            color: colors.primary,
                          }}
                        >
                          {event.date}
                        </div>
                      )}

                      {/* Title */}
                      {event.title && (
                        <h3
                          className="text-2xl md:text-3xl font-display font-bold mb-3"
                          style={{ color: colors.primary }}
                        >
                          {event.title}
                        </h3>
                      )}

                      {/* Description - minimal */}
                      {event.description && (
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                          {event.description}
                        </p>
                      )}

                      {/* Image inline if available */}
                      {eventImage && (
                        <motion.div
                          className="mt-6 rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <img
                            src={eventImage.variants.medium}
                            alt={eventImage.caption || event.title}
                            className="w-full h-64 object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline dot - desktop only */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <motion.div
                      className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: colors.primary }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring" }}
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>

                  {/* Empty spacer for layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
