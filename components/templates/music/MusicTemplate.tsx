"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Heart, Volume2 } from "lucide-react";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";

interface MusicTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

const DEFAULT_PLAYLIST = [
  { title: "Your Song", artist: "Elton John", duration: "4:01", mood: "❤️" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", duration: "3:02", mood: "💕" },
  { title: "Perfect", artist: "Ed Sheeran", duration: "4:23", mood: "🥰" },
  { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45", mood: "💫" },
  { title: "All of Me", artist: "John Legend", duration: "4:29", mood: "💖" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41", mood: "✨" },
];

export function MusicTemplate({ content, theme, colorPalette }: MusicTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const playlist = content.songs || content.playlist || DEFAULT_PLAYLIST;
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Extract personalized data (optional - only if provided)
  const musicType = content.musicType || null;
  const playlistMood = content.playlistMood || null;
  const movieDialogue = content.favoriteMovieDialogue || null;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
  };

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const song = playlist[currentSong];

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}40 50%, ${colors.accent}30 100%)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {["🎵", "🎶", "🎸", "🎹", "🎤", "🎧"][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Movie Dialogue Feature (if provided) */}
        {movieDialogue && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
              <div className="text-6xl mb-4">🎬</div>
              <div className="text-4xl md:text-5xl font-display italic mb-4" style={{ color: colors.textDark }}>
                "{movieDialogue}"
              </div>
              <p className="text-sm uppercase tracking-widest" style={{ color: colors.textMedium }}>
                Iconic Dialogue
              </p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Genre & Mood Tags */}
          {(musicType || playlistMood) && (
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              {musicType && (
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border-2"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                >
                  🎵 {musicType}
                </span>
              )}
              {playlistMood && (
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border-2"
                  style={{
                    backgroundColor: `${colors.secondary}20`,
                    borderColor: colors.secondary,
                    color: colors.textDark,
                  }}
                >
                  ✨ {playlistMood}
                </span>
              )}
            </div>
          )}
          
          <h2
            className="text-5xl md:text-6xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {content.title || "Our Playlist"}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-slate-600">{content.subtitle}</p>
          )}
        </motion.div>

        {/* Music Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Album Art / Visualization */}
          <div
            className="relative h-80 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSong}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="text-9xl"
              >
                {song.mood}
              </motion.div>
            </AnimatePresence>

            {/* Animated equalizer */}
            {isPlaying && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-white rounded-full"
                    animate={{ height: [20, 60, 20] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSong}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center mb-6"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {song.title}
                </h3>
                <p className="text-lg text-slate-600">{song.artist}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: colors.primary,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>{Math.floor((progress / 100) * 240)}s</span>
                <span>{song.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={handlePrevious}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <SkipBack className="w-6 h-6" style={{ color: colors.primary }} />
              </button>

              <button
                onClick={handlePlayPause}
                className="p-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ backgroundColor: colors.primary }}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Play className="w-8 h-8 text-white" fill="white" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <SkipForward className="w-6 h-6" style={{ color: colors.primary }} />
              </button>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center justify-between text-slate-600">
              <button
                onClick={() => toggleFavorite(currentSong)}
                className="flex items-center gap-2 hover:text-red-500 transition-colors"
              >
                <Heart
                  className="w-5 h-5"
                  fill={favorites.includes(currentSong) ? "currentColor" : "none"}
                />
                <span className="text-sm">
                  {favorites.includes(currentSong) ? "Favorited" : "Add to Favorites"}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                <div className="w-20 h-1 bg-slate-200 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "70%", background: colors.primary }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>🎵</span> Full Playlist
          </h3>
          <div className="space-y-2">
            {playlist.map((s, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setCurrentSong(idx);
                  setProgress(0);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  idx === currentSong
                    ? "bg-gradient-to-r shadow-lg"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
                style={
                  idx === currentSong
                    ? {
                        backgroundImage: `linear-gradient(90deg, ${colors.primary}20, ${colors.secondary}20)`,
                        borderLeft: `4px solid ${colors.primary}`,
                      }
                    : {}
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{s.mood}</span>
                    <div>
                      <div className="font-semibold text-slate-900">{s.title}</div>
                      <div className="text-sm text-slate-600">{s.artist}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">{s.duration}</span>
                    {idx === currentSong && isPlaying && (
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                            animate={{ height: [8, 16, 8] }}
                            transition={{
                              duration: 0.4,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Message */}
        {content.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8"
          >
            <p className="text-xl text-slate-700 leading-relaxed">{content.message}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

