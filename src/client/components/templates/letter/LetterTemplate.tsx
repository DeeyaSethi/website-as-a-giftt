"use client";

import { motion, useInView } from "framer-motion";
import { Theme } from "@/shared/types";
import { getThemeColors } from "@/shared/utils";
import { Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { OCCASION_MUSIC_FALLBACKS } from "@/client/constants/musicAssets";
import { GiftBoxOpen } from "@/client/components/GiftBoxOpen";
import { LetterCard } from "./LetterCard";



interface LetterTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

export function LetterTemplate({ content, theme, colorPalette }: LetterTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [giftBoxCompleted, setGiftBoxCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const sectionRef = useRef(null);

  // Determine music logic
  const occasion = content.occasion || 'default';
  // Only play if explicitly enabled (or for legacy support if needed, but strictly following new rule: defaults only)
  const videoUrl = (content.includeMusic !== false) ? (OCCASION_MUSIC_FALLBACKS[occasion] || OCCASION_MUSIC_FALLBACKS['default']) : null;

  useEffect(() => {
    console.log('🎼 [LetterTemplate] Init music config:', { includeMusic: content.includeMusic, occasion, videoUrl });
  }, [content.includeMusic, occasion, videoUrl]);

  useEffect(() => {
    console.log('🎼 [LetterTemplate] isPlaying changed to:', isPlaying);
  }, [isPlaying]);


  // When Gift Box is done, open the envelope
  useEffect(() => {
    if (giftBoxCompleted && !isEnvelopeOpen) {
      const timer = setTimeout(() => setIsEnvelopeOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [giftBoxCompleted, isEnvelopeOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 50%, ${colors.accent}20 100%)`,
      }}
    >
      {/* Persistent Music Player (Native Audio Only - No YouTube) */}
      <div style={{ position: 'fixed', bottom: 0, right: 0, width: '1px', height: '1px', opacity: 0.01, pointerEvents: 'none', zIndex: -1 }}>
        {videoUrl && (
          <audio
            ref={(audio) => {
              if (audio) {
                audio.volume = 1.0;
                audio.muted = isMuted;
                if (isPlaying) {
                  const playPromise = audio.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(error => {
                      console.error("Audio play failed:", error);
                    });
                  }
                } else {
                  audio.pause();
                }
              }
            }}
            src={videoUrl}
            loop
          />
        )}
      </div>

      {/* Gift Box Overlay */}
      <GiftBoxOpen
        isOpen={true}
        onOpenComplete={() => setGiftBoxCompleted(true)}
        onStartMusic={() => setIsPlaying(true)}
        senderName={content.senderName}
        recipientName={content.recipientName}
        colorPalette={colorPalette}
      />

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

      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-center">
        {/* Reveal the card only after the gift box is opened */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: giftBoxCompleted ? 1 : 0,
            scale: giftBoxCompleted ? 1 : 0.8
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full"
        >
          <LetterCard
            isOpen={isEnvelopeOpen}
            content={content}
            colorPalette={colorPalette}
          />
        </motion.div>
      </div>

      {/* Aesthetic Mute Toggle - Only visible after gift opens */}
      {giftBoxCompleted && (
        <motion.button
          onClick={() => setIsMuted(!isMuted)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-md bg-white/30 border border-white/50 shadow-lg hover:scale-105 active:scale-95 transition-all group"
          style={{ color: colors.primary }}
          whileHover={{ boxShadow: `0 0 15px ${colors.primary}40` }}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <Volume2 className="w-5 h-5" strokeWidth={2.5} />
          )}
        </motion.button>
      )}
    </section>
  );
}
