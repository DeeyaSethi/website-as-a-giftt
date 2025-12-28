import { Home, Mail, Camera, Music, Flower, Plane, Gamepad2, Cpu } from "lucide-react";

export const OCCASION_PROMPTS = [
    {
        occasion: "Birthday",
        image: "/images/occasions/birthday.jpg",
        samples: [
            "Best friend who loves gaming and pizza",
            "Sister who's passionate about art and travel",
            "Dad who enjoys cooking and classic rock music",
        ],
    },
    {
        occasion: "Anniversary",
        image: "/images/occasions/anniversary.jpg",
        samples: [
            "Partner who loves stargazing and poetry",
            "Spouse who enjoys hiking and photography",
            "Love who adores coffee and cozy mornings",
        ],
    },
    {
        occasion: "Friendship",
        image: "/images/occasions/friendship.jpg",
        samples: [
            "Best friend who's obsessed with K-pop and bubble tea",
            "Friend who loves books and rainy days",
            "Buddy who enjoys skateboarding and indie music",
        ],
    },
    {
        occasion: "Congratulations",
        image: "/images/occasions/congratulations.jpg",
        samples: [
            "Graduate who's starting their dream job",
            "Friend who just bought their first home",
            "Sister who achieved a personal milestone",
        ],
    },
    {
        occasion: "Just Because",
        image: "/images/occasions/just-because.jpg",
        samples: [
            "Someone special who deserves appreciation",
            "Friend who's been there through everything",
            "Person who brightens every day",
        ],
    },
];

export const AVAILABLE_TEMPLATES = [
    { id: "hero", name: "Welcome Page", icon: "🏠", description: "Beautiful landing page", required: true },
    { id: "letter", name: "Personal Letter", icon: "💌", description: "Heartfelt message" },
    { id: "gallery", name: "Photo Gallery", icon: "📸", description: "Share memories" },
    { id: "music", name: "Music Player", icon: "🎵", description: "Special playlist" },
    { id: "garden", name: "Flower Garden", icon: "🌸", description: "Interactive planting" },
    { id: "travel", name: "Travel Stories", icon: "✈️", description: "Places and memories" },
    { id: "memories", name: "Memory Showcase", icon: "🎴", description: "Beautiful memories display" },
    { id: "techfacts", name: "Tech Facts", icon: "💻", description: "Roast your geeky friend with nerdy trivia" },
];

export const TEMPLATE_ICONS: Record<string, any> = {
    hero: Home,
    letter: Mail,
    gallery: Camera,
    music: Music,
    garden: Flower,
    travel: Plane,
    memories: Gamepad2,
    techfacts: Cpu,
};

export const TEMPLATE_COLORS: Record<string, { from: string; to: string; icon: string }> = {
    hero: { from: "from-purple-100", to: "to-pink-100", icon: "text-purple-600" },
    letter: { from: "from-pink-100", to: "to-rose-100", icon: "text-pink-600" },
    gallery: { from: "from-blue-100", to: "to-cyan-100", icon: "text-blue-600" },
    music: { from: "from-violet-100", to: "to-purple-100", icon: "text-violet-600" },
    garden: { from: "from-green-100", to: "to-emerald-100", icon: "text-green-600" },
    travel: { from: "from-sky-100", to: "to-blue-100", icon: "text-sky-600" },
    memories: { from: "from-rose-100", to: "to-pink-100", icon: "text-rose-600" },
    techfacts: { from: "from-cyan-100", to: "to-teal-100", icon: "text-cyan-600" },
};

export const COLOR_SCHEMES = [
    {
        name: "Lavender Dreams",
        icon: "💜",
        primary: "#A78BFA",
        secondary: "#C4B5FD",
        accent: "#E9D5FF",
        background: "#FAF5FF",
    },
    {
        name: "Sunset Vibes",
        icon: "🌅",
        primary: "#FF6B9D",
        secondary: "#FFA94D",
        accent: "#FFD93D",
        background: "#FFF5F0",
    },
    {
        name: "Ocean Breeze",
        icon: "🌊",
        primary: "#4ECDC4",
        secondary: "#44A08D",
        accent: "#95E1D3",
        background: "#F0F8FF",
    },
    {
        name: "Forest Green",
        icon: "🌲",
        primary: "#059669",
        secondary: "#34D399",
        accent: "#A7F3D0",
        background: "#F0FDF4",
    },
    {
        name: "Rose Garden",
        icon: "🌹",
        primary: "#E11D48",
        secondary: "#FB7185",
        accent: "#FEE2E2",
        background: "#FFF1F2",
    },
    {
        name: "Midnight Sky",
        icon: "🌙",
        primary: "#3B82F6",
        secondary: "#60A5FA",
        accent: "#DBEAFE",
        background: "#EFF6FF",
    },
    {
        name: "Sunshine Yellow",
        icon: "☀️",
        primary: "#F59E0B",
        secondary: "#FCD34D",
        accent: "#FEF3C7",
        background: "#FFFBEB",
    },
    {
        name: "Cherry Blossom",
        icon: "🌸",
        primary: "#EC4899",
        secondary: "#F9A8D4",
        accent: "#FCE7F3",
        background: "#FDF2F8",
    },
];
