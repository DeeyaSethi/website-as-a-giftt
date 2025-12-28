"use client";

import { useState } from "react";
import { TemplateComposer } from "@/client/components/preview/TemplateComposer";
import { GeneratedSiteConfig } from "@/shared/types";
import { motion } from "framer-motion";

// Modern New-Age Style Demo
const MODERN_DEMO_SITE: GeneratedSiteConfig = {
  theme: "birthday",
  metadata: {
    title: "Happy Birthday Sarah!",
    description: "A special website just for you",
    recipientName: "Sarah",
    occasion: "birthday",
    createdAt: new Date(),
  },
  colorPalette: {
    primary: "#A78BFA",
    secondary: "#C4B5FD",
    accent: "#E9D5FF",
    background: "#FAF5FF",
    text: "#2E1A47",
  },
  pages: [
    {
      type: "hero",
      order: 0,
      content: {
        cardStyle: "new-age", // Modern minimalist style
        title: "Happy Birthday Sarah!",
        subtitle: "Another year of amazing adventures",
        message: "Today we celebrate you and all the incredible moments we've shared together!",
      },
    },
    {
      type: "letter",
      order: 1,
      content: {
        title: "A Letter for You",
        body: "Dear Sarah,\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        signature: "With love, Alex",
      },
    },
    {
      type: "gallery",
      order: 2,
      content: {
        title: "Our Memories",
        subtitle: "Captured moments together",
      },
    },
    {
      type: "garden",
      order: 4,
      content: {
        title: "Plant a Garden of Love",
        subtitle: "Click to plant flowers and watch them grow",
        message: "Every flower represents a beautiful memory we've created together.",
      },
    },
    {
      type: "music",
      order: 5,
      content: {
        title: "Your Special Playlist",
        description: "Songs that remind me of you",
        playlist: [
          { title: "Happy Birthday Song", artist: "The Celebrators", duration: "3:45" },
          { title: "Best Day Ever", artist: "Joy Makers", duration: "4:12" },
          { title: "Celebration Time", artist: "Party Band", duration: "3:28" },
          { title: "You're Amazing", artist: "The Compliments", duration: "4:01" },
        ],
      },
    },
    {
      type: "travel",
      order: 6,
      content: {
        title: "Places We've Been",
        subtitle: "Our adventure map",
        locations: [
          {
            name: "Paris",
            x: 52,
            y: 35,
            emoji: "🗼",
            story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The Eiffel Tower at sunset was absolutely breathtaking.",
          },
          {
            name: "Tokyo",
            x: 85,
            y: 42,
            emoji: "🗾",
            story: "Sed do eiusmod tempor incididunt ut labore. Cherry blossoms and amazing ramen adventures throughout the city.",
          },
          {
            name: "New York",
            x: 25,
            y: 38,
            emoji: "🗽",
            story: "Ut enim ad minim veniam, quis nostrud. The city that never sleeps gave us memories that will last forever.",
          },
        ],
      },
    },
    {
      type: "memories",
      order: 9,
      content: {
        title: "Memory Matching Game",
        subtitle: "Find the pairs and relive our moments",
        message: "Each card represents a special memory we share!",
        memories: [
          { emoji: "☀️", title: "First Day", text: "When it all began..." },
          { emoji: "🎉", title: "Celebration", text: "That epic party!" },
          { emoji: "✈️", title: "Adventure", text: "Our first trip" },
          { emoji: "🎂", title: "Birthday", text: "Best birthday ever" },
          { emoji: "🌟", title: "Achievement", text: "You did it!" },
          { emoji: "💕", title: "Special Moment", text: "When we knew" },
        ],
      },
    },
  ],
};

// Vintage Classic Style Demo
const VINTAGE_DEMO_SITE: GeneratedSiteConfig = {
  theme: "birthday",
  metadata: {
    title: "Happy Birthday Mom!",
    description: "A heartfelt celebration just for you",
    recipientName: "Mom",
    occasion: "birthday",
    createdAt: new Date(),
  },
  colorPalette: {
    primary: "#8B4513",
    secondary: "#D2691E",
    accent: "#DEB887",
    background: "#FFF8DC",
    text: "#3E2723",
  },
  pages: [
    {
      type: "hero",
      order: 0,
      content: {
        cardStyle: "vintage", // Classic vintage style
        title: "Happy Birthday Mom!",
        subtitle: "With Love & Gratitude",
        message: "To the most wonderful mother in the world. Your love, wisdom, and kindness continue to inspire us every day.",
      },
    },
    {
      type: "letter",
      order: 1,
      content: {
        title: "A Letter for You",
        body: "Dearest Mom,\n\nWords cannot express how grateful I am for everything you've done for me. Your unwavering support, endless patience, and boundless love have shaped who I am today.\n\nThrough every challenge and triumph, you've been there with open arms and a warm heart. Your wisdom guides me, your strength inspires me, and your love sustains me.\n\nOn this special day, I want you to know how deeply loved and appreciated you are. Thank you for being the amazing person you are.",
        signature: "Forever grateful, Your loving child",
      },
    },
    {
      type: "gallery",
      order: 2,
      content: {
        title: "Cherished Memories",
        subtitle: "Moments we treasure forever",
      },
    },
  ],
};

export default function DemoPage() {
  const [demoStyle, setDemoStyle] = useState<"modern" | "vintage">("modern");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Header with Style Toggle */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm font-medium">
            🎨 <strong>DEMO MODE</strong> - Preview greeting card styles
          </p>
          
          {/* Style Toggle */}
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setDemoStyle("modern")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                demoStyle === "modern"
                  ? "bg-white text-amber-600 shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              ✨ New-Age Modern
            </button>
            <button
              onClick={() => setDemoStyle("vintage")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                demoStyle === "vintage"
                  ? "bg-white text-amber-600 shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              📜 Vintage Classic
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        key={demoStyle}
        initial={{ opacity: 0, x: demoStyle === "modern" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-20"
      >
        <TemplateComposer site={demoStyle === "modern" ? MODERN_DEMO_SITE : VINTAGE_DEMO_SITE} />
      </motion.div>
    </div>
  );
}

