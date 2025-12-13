"use client";

import { motion } from "framer-motion";
import { Play, Music2, Youtube, ExternalLink, Sparkles } from "lucide-react";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";
import { getPlaylistById } from "@/lib/predefinedPlaylists";

interface MusicTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

export function MusicTemplate({ content, theme, colorPalette }: MusicTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);

  // Check if using predefined playlist
  const usePredefined = content.usePredefined || false;
  const predefinedId = content.predefinedId || null;
  const predefinedPlaylist = usePredefined && predefinedId ? getPlaylistById(predefinedId) : null;

  // Extract YouTube data from content (custom or predefined)
  let youtubeVideos = content.youtubeVideos || [];
  let playlistId = content.playlistId || null;
  let playlistTitle = content.title || content.playlistTitle || "Our Special Playlist";
  let playlistDescription = content.description || content.playlistDescription || "";
  let customThumbnail = content.customThumbnail || "/images/music-thumbnail-default.png";
  let isPredefined = false;

  // Override with predefined data if available
  if (predefinedPlaylist) {
    playlistId = predefinedPlaylist.playlistId;
    playlistTitle = content.title || predefinedPlaylist.name;
    playlistDescription = content.description || predefinedPlaylist.description;
    isPredefined = true;
    youtubeVideos = [];
  }

  // Get first video ID for fallback URL
  const firstVideoId = youtubeVideos[0]?.videoId || null;

  // If no music provided, show instructions
  if (!youtubeVideos.length && !playlistId) {
    return (
      <section
        className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}25 100%)`,
        }}
      >
        <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl p-12 shadow-2xl">
          <Music2 className="w-20 h-20 mx-auto mb-6" style={{ color: colors.primary }} />
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
            No Music Added Yet
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Add YouTube music links during creation to see your playlist here!
          </p>
          <div className="text-left bg-slate-50 rounded-xl p-6 space-y-2 text-sm text-slate-600">
            <p><strong>Supported formats:</strong></p>
            <p>• Individual video: https://www.youtube.com/watch?v=VIDEO_ID</p>
            <p>• Short link: https://youtu.be/VIDEO_ID</p>
            <p>• Full playlist: https://www.youtube.com/playlist?list=PLAYLIST_ID</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.accent}20 100%)`,
      }}
    >
      {/* Animated musical notes background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {["🎵", "🎶", "🎸", "🎤", "🎧"][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Youtube className="w-12 h-12" style={{ color: "#FF0000" }} />
            <Music2 className="w-10 h-10" style={{ color: colors.primary }} />
          </div>
          
          <h2
            className="text-5xl md:text-6xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {playlistTitle}
          </h2>
          
          {playlistDescription && (
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {playlistDescription}
            </p>
          )}

          <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <Play className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-sm font-medium text-slate-700">
                {playlistId ? "YouTube Playlist" : `${youtubeVideos.length} ${youtubeVideos.length === 1 ? "Track" : "Tracks"}`}
              </span>
            </div>
            
            {isPredefined && predefinedPlaylist && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border-2"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                  borderColor: colors.primary,
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-sm font-semibold" style={{ color: colors.primary }}>
                  Curated: {predefinedPlaylist.artist}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Music Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-100">
            {/* Thumbnail Image */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)`,
                }}
              >
                <img 
                  src={customThumbnail} 
                  alt={playlistTitle}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* YouTube Button */}
            <div className="p-8 bg-gradient-to-b from-white to-slate-50">
              <div className="flex justify-center">
                <motion.button
                  onClick={() => {
                    const url = playlistId 
                      ? `https://www.youtube.com/playlist?list=${playlistId}`
                      : firstVideoId
                      ? `https://www.youtube.com/watch?v=${firstVideoId}`
                      : null;
                    if (url) window.open(url, '_blank');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-full flex items-center gap-4 shadow-xl transition-all font-bold text-lg"
                >
                  <Play className="w-6 h-6" fill="white" />
                  Watch on YouTube
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Optional Message */}
        {content.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <p className="text-xl text-slate-700 leading-relaxed">
              {content.message}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
