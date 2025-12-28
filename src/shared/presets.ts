/**
 * Pre-made template presets that feel personalized but are reusable
 */

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  category: "boys" | "girls" | "men" | "women" | "universal";
  tags: string[];
  icon: string;
  colorScheme: string;
  pages: {
    hero: {
      title: string;
      subtitle: string;
      message: string;
    };
    letter?: {
      body: string;
      signature: string;
    };
    extraTemplates?: string[]; // Additional templates: garden, music, travel, memories
  };
}

export const colorSchemes = {
  sunset: {
    name: "Sunset Vibes",
    emoji: "🌅",
    primary: "#FF6B9D",
    secondary: "#FFA94D",
    accent: "#FFD93D",
    background: "#FFF5F0",
    text: "#2D1B2E",
  },
  ocean: {
    name: "Ocean Breeze",
    emoji: "🌊",
    primary: "#4ECDC4",
    secondary: "#44A08D",
    accent: "#95E1D3",
    background: "#F0F8FF",
    text: "#1A2633",
  },
  lavender: {
    name: "Lavender Dreams",
    emoji: "💜",
    primary: "#A78BFA",
    secondary: "#C4B5FD",
    accent: "#E9D5FF",
    background: "#FAF5FF",
    text: "#2E1A47",
  },
  forest: {
    name: "Forest Green",
    emoji: "🌲",
    primary: "#059669",
    secondary: "#34D399",
    accent: "#A7F3D0",
    background: "#F0FDF4",
    text: "#064E3B",
  },
  rose: {
    name: "Rose Garden",
    emoji: "🌹",
    primary: "#E11D48",
    secondary: "#FB7185",
    accent: "#FEE2E2",
    background: "#FFF1F2",
    text: "#881337",
  },
  midnight: {
    name: "Midnight Sky",
    emoji: "🌙",
    primary: "#3B82F6",
    secondary: "#60A5FA",
    accent: "#DBEAFE",
    background: "#EFF6FF",
    text: "#1E3A8A",
  },
  sunshine: {
    name: "Sunshine Yellow",
    emoji: "☀️",
    primary: "#F59E0B",
    secondary: "#FCD34D",
    accent: "#FEF3C7",
    background: "#FFFBEB",
    text: "#78350F",
  },
  cherry: {
    name: "Cherry Blossom",
    emoji: "🌸",
    primary: "#EC4899",
    secondary: "#F9A8D4",
    accent: "#FCE7F3",
    background: "#FDF2F8",
    text: "#831843",
  },
};

export const templatePresets: TemplatePreset[] = [
  // === BOYS / YOUNG MEN ===
  {
    id: "gamer-boy",
    name: "The Gamer",
    description: "For the gaming enthusiast",
    category: "boys",
    tags: ["gaming", "tech", "competitive"],
    icon: "🎮",
    colorScheme: "midnight",
    pages: {
      hero: {
        title: "Level Up!",
        subtitle: "Another year, another achievement unlocked",
        message: "You're the MVP of life!",
      },
      letter: {
        body: "Just like your favorite games, life is full of epic quests and legendary moments. You've conquered another year with skill, determination, and style.\n\nFrom late-night gaming sessions to real-world victories, you make everything look easy. Here's to more high scores, epic wins, and unforgettable adventures ahead.\n\nKeep crushing it, champion!",
        signature: "Your Player 2",
      },
    },
  },
  {
    id: "sports-bro",
    name: "The Athlete",
    description: "For the sports enthusiast",
    category: "boys",
    tags: ["sports", "fitness", "active"],
    icon: "⚽",
    colorScheme: "forest",
    pages: {
      hero: {
        title: "Champion Vibes!",
        subtitle: "Always bringing your A-game",
        message: "You're a winner in every way!",
      },
      letter: {
        body: "Whether on the field or in life, you play to win. Your determination, team spirit, and never-give-up attitude inspire everyone around you.\n\nFrom early morning workouts to game-day victories, you show us what dedication looks like. Here's to more goals scored, records broken, and championships won.\n\nKeep being the champion you are!",
        signature: "Your Biggest Fan",
      },
    },
  },
  {
    id: "tech-genius",
    name: "The Tech Genius",
    description: "For the tech-savvy innovator",
    category: "boys",
    tags: ["tech", "coding", "innovation"],
    icon: "💻",
    colorScheme: "midnight",
    pages: {
      hero: {
        title: "Ctrl + Awesome",
        subtitle: "Coding the future, one line at a time",
        message: "You're programmed for greatness!",
      },
      letter: {
        body: "In a world of bugs, you're the debug solution. Your brilliant mind and innovative thinking turn complex problems into elegant solutions.\n\nFrom building apps to fixing tech disasters, you make the impossible look easy. Here's to more breakthrough ideas and world-changing innovations.\n\nKeep compiling greatness!",
        signature: "Your Dev Team",
      },
    },
  },

  // === GIRLS / YOUNG WOMEN ===
  {
    id: "fashionista",
    name: "The Fashionista",
    description: "For the style icon",
    category: "girls",
    tags: ["fashion", "style", "trends"],
    icon: "👗",
    colorScheme: "rose",
    pages: {
      hero: {
        title: "Style Queen!",
        subtitle: "Setting trends, not following them",
        message: "You make the world more beautiful!",
      },
      letter: {
        body: "Your style isn't just about clothes—it's about confidence, creativity, and authenticity. You turn heads and inspire trends with your unique fashion sense.\n\nFrom your signature looks to your impeccable taste, you show us that style is an art form. Here's to more runway-worthy moments and fashion-forward adventures.\n\nKeep slaying!",
        signature: "Your Style Squad",
      },
    },
  },
  {
    id: "bookworm",
    name: "The Bookworm",
    description: "For the literary lover",
    category: "girls",
    tags: ["reading", "books", "literature"],
    icon: "📚",
    colorScheme: "lavender",
    pages: {
      hero: {
        title: "Chapter & Verse",
        subtitle: "Living a thousand lives through stories",
        message: "Your story is the best one yet!",
      },
      letter: {
        body: "Like the characters in your favorite books, you're complex, inspiring, and unforgettable. Your love for stories has taught us to see magic in everyday moments.\n\nFrom cozy reading nooks to literary adventures, you remind us that books are portals to infinite worlds. Here's to more plot twists, happy endings, and new chapters.\n\nKeep writing your beautiful story!",
        signature: "Your Reading Buddy",
      },
    },
  },
  {
    id: "artistic-soul",
    name: "The Artist",
    description: "For the creative spirit",
    category: "girls",
    tags: ["art", "creative", "painting"],
    icon: "🎨",
    colorScheme: "sunset",
    pages: {
      hero: {
        title: "Masterpiece!",
        subtitle: "Painting the world with your creativity",
        message: "You're a work of art!",
      },
      letter: {
        body: "Your creativity knows no bounds. Every day, you turn blank canvases into beautiful expressions of joy, emotion, and imagination.\n\nFrom sketches to masterpieces, you see beauty where others see ordinary. Here's to more colorful creations, artistic adventures, and inspired moments.\n\nKeep creating magic!",
        signature: "Your Muse",
      },
    },
  },

  // === MEN ===
  {
    id: "adventure-man",
    name: "The Adventurer",
    description: "For the explorer at heart",
    category: "men",
    tags: ["adventure", "travel", "outdoors"],
    icon: "🏔️",
    colorScheme: "forest",
    pages: {
      hero: {
        title: "Adventure Awaits",
        subtitle: "Exploring life one journey at a time",
        message: "The world is better with you in it!",
      },
      letter: {
        body: "Your adventurous spirit inspires us to step outside our comfort zones and embrace the unknown. Whether scaling mountains or navigating life's challenges, you face everything with courage and curiosity.\n\nFrom epic travels to everyday adventures, you remind us that life is meant to be lived fully. Here's to more summits reached, paths explored, and memories made.\n\nKeep blazing trails!",
        signature: "Your Adventure Crew",
      },
      extraTemplates: ["travel"],
    },
  },
  {
    id: "wise-mentor",
    name: "The Mentor",
    description: "For the guiding light",
    category: "men",
    tags: ["wisdom", "mentor", "leader"],
    icon: "🦉",
    colorScheme: "midnight",
    pages: {
      hero: {
        title: "Legendary",
        subtitle: "Wisdom that lights the way",
        message: "Thank you for being our guide!",
      },
      letter: {
        body: "Your wisdom and guidance have shaped countless lives, including mine. You lead not with authority, but with integrity, patience, and genuine care.\n\nFrom sage advice to powerful lessons, you've shown us what true leadership looks like. Here's to the impact you've made and the legacy you're building.\n\nThank you for everything!",
        signature: "Your Grateful Student",
      },
      extraTemplates: [],
    },
  },
  {
    id: "family-man",
    name: "The Family Guy",
    description: "For the devoted family person",
    category: "men",
    tags: ["family", "caring", "devoted"],
    icon: "👨‍👩‍👧‍👦",
    colorScheme: "ocean",
    pages: {
      hero: {
        title: "Our Hero",
        subtitle: "The heart of our family",
        message: "You make everything better!",
      },
      letter: {
        body: "You're the foundation our family is built on. Your love, support, and unwavering dedication create the warmth that makes our house a home.\n\nFrom early mornings to late nights, you show up for us every single day. Here's to celebrating the incredible person you are and the difference you make in our lives.\n\nWe love you!",
        signature: "Your Family",
      },
    },
  },

  // === WOMEN ===
  {
    id: "boss-lady",
    name: "The Boss Lady",
    description: "For the powerhouse professional",
    category: "women",
    tags: ["career", "leader", "ambitious"],
    icon: "💼",
    colorScheme: "rose",
    pages: {
      hero: {
        title: "Unstoppable!",
        subtitle: "Breaking glass ceilings and taking names",
        message: "You're an absolute powerhouse!",
      },
      letter: {
        body: "Your ambition, intelligence, and grace inspire everyone around you. You've shown us that success isn't just about reaching the top—it's about lifting others as you climb.\n\nFrom boardroom victories to personal triumphs, you handle everything with style and strength. Here's to more milestones achieved and barriers broken.\n\nKeep conquering!",
        signature: "Your Biggest Supporter",
      },
    },
  },
  {
    id: "wellness-queen",
    name: "The Wellness Queen",
    description: "For the health and wellness enthusiast",
    category: "women",
    tags: ["wellness", "health", "mindfulness"],
    icon: "🧘‍♀️",
    colorScheme: "forest",
    pages: {
      hero: {
        title: "Radiant Energy",
        subtitle: "Glowing from the inside out",
        message: "Your light illuminates the world!",
      },
      letter: {
        body: "Your dedication to wellness and self-care reminds us all to prioritize what truly matters. You've mastered the art of balance, finding harmony between mind, body, and spirit.\n\nFrom morning yoga to mindful moments, you show us that taking care of ourselves is an act of love. Here's to more peaceful mornings, energizing workouts, and centered living.\n\nKeep shining!",
        signature: "Your Wellness Circle",
      },
    },
  },
  {
    id: "super-mom",
    name: "The Super Mom",
    description: "For the amazing mother",
    category: "women",
    tags: ["mother", "caring", "nurturing"],
    icon: "👩‍👧‍👦",
    colorScheme: "cherry",
    pages: {
      hero: {
        title: "Our Everything",
        subtitle: "The heart that holds us together",
        message: "You're our hero!",
      },
      letter: {
        body: "You juggle a million things while making it look effortless. Your love, patience, and strength create the foundation of our family.\n\nFrom comforting hugs to words of wisdom, you're always there when we need you. Here's to celebrating the incredible woman and mother you are.\n\nWe love you more than words can say!",
        signature: "Your Family",
      },
    },
  },

  // === UNIVERSAL ===
  {
    id: "best-friend",
    name: "The Best Friend",
    description: "For your ride-or-die",
    category: "universal",
    tags: ["friendship", "loyal", "fun"],
    icon: "🤝",
    colorScheme: "sunshine",
    pages: {
      hero: {
        title: "My Person",
        subtitle: "Through thick and thin",
        message: "Life is better with you in it!",
      },
      letter: {
        body: "You're more than a friend—you're family. From late-night conversations to spontaneous adventures, every moment with you is a gift.\n\nYou know me better than I know myself. You celebrate my wins, support me through challenges, and make ordinary days extraordinary. Here's to our friendship and all the memories we've yet to make.\n\nThank you for being you!",
        signature: "Your Best Friend",
      },
    },
  },
  {
    id: "party-animal",
    name: "The Life of the Party",
    description: "For the social butterfly",
    category: "universal",
    tags: ["fun", "social", "energetic"],
    icon: "🎉",
    colorScheme: "sunset",
    pages: {
      hero: {
        title: "Party Time!",
        subtitle: "Bringing the energy everywhere you go",
        message: "You light up every room!",
      },
      letter: {
        body: "Your energy is contagious, your laugh is infectious, and your presence makes every gathering memorable. You have this incredible ability to make everyone feel welcome and valued.\n\nFrom epic celebrations to casual hangouts, you turn ordinary moments into unforgettable experiences. Here's to more dance floors conquered and good times shared.\n\nKeep spreading the joy!",
        signature: "Your Party Crew",
      },
    },
  },
];

// Helper function to get presets by category
export function getPresetsByCategory(category: string) {
  return templatePresets.filter((p) => p.category === category || p.category === "universal");
}

// Helper function to get preset by ID
export function getPresetById(id: string) {
  return templatePresets.find((p) => p.id === id);
}

// Helper function to apply color scheme
export function applyColorScheme(schemeId: string) {
  return colorSchemes[schemeId as keyof typeof colorSchemes] || colorSchemes.lavender;
}

