// Pre-defined YouTube playlists for quick selection
// Users can choose these instead of providing their own links

// IMPORTANT: Use playlist IDs, not individual video IDs
// Playlists are more reliable for embedding (videos can disable embedding)
// Format: https://www.youtube.com/playlist?list=PLAYLIST_ID

export interface PredefinedPlaylist {
  id: string;
  name: string;
  artist: string;
  description: string;
  playlistId: string; // YouTube playlist ID
  thumbnail?: string;
  category: "bollywood" | "hollywood" | "kpop" | "indie" | "romantic" | "party";
}

export const PREDEFINED_PLAYLISTS: PredefinedPlaylist[] = [
  // Bollywood
  {
    id: "arijit-singh",
    name: "Best of Arijit Singh",
    artist: "Arijit Singh",
    description: "Romantic Bollywood hits",
    playlistId: "PLcIhgbBHGaG9SZnVHkNbZ5s7OPADZKwfR", // PLACEHOLDER - Replace with actual
    category: "bollywood",
  },
  {
    id: "ar-rahman",
    name: "A.R. Rahman Classics",
    artist: "A.R. Rahman",
    description: "Legendary compositions",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "bollywood",
  },
  {
    id: "shreya-ghoshal",
    name: "Shreya Ghoshal Hits",
    artist: "Shreya Ghoshal",
    description: "Melodious voice, beautiful songs",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "bollywood",
  },
  
  // Hollywood Pop
  {
    id: "taylor-swift",
    name: "Taylor Swift Essentials",
    artist: "Taylor Swift",
    description: "Pop anthems and heartfelt ballads",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "hollywood",
  },
  {
    id: "ed-sheeran",
    name: "Ed Sheeran Love Songs",
    artist: "Ed Sheeran",
    description: "Perfect for romantic moments",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "hollywood",
  },
  {
    id: "weeknd",
    name: "The Weeknd Vibes",
    artist: "The Weeknd",
    description: "Smooth R&B and pop hits",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "hollywood",
  },
  
  // K-Pop
  {
    id: "bts",
    name: "BTS Greatest Hits",
    artist: "BTS",
    description: "K-pop legends",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "kpop",
  },
  {
    id: "blackpink",
    name: "BLACKPINK Power",
    artist: "BLACKPINK",
    description: "Girl power anthems",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "kpop",
  },
  
  // Indie/Alternative
  {
    id: "indie-love",
    name: "Indie Love Songs",
    artist: "Various Artists",
    description: "Unique and heartfelt",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "indie",
  },
  
  // Romantic
  {
    id: "romantic-classics",
    name: "Timeless Love Songs",
    artist: "Various Artists",
    description: "Classic romantic ballads",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "romantic",
  },
  
  // Party
  {
    id: "party-hits",
    name: "Ultimate Party Mix",
    artist: "Various Artists",
    description: "Dance floor bangers",
    playlistId: "PLAYLIST_ID_HERE", // PLACEHOLDER - Replace with actual
    category: "party",
  },
];

// Helper to get playlists by category
export function getPlaylistsByCategory(category: string): PredefinedPlaylist[] {
  return PREDEFINED_PLAYLISTS.filter(p => p.category === category);
}

// Helper to get playlist by ID
export function getPlaylistById(id: string): PredefinedPlaylist | undefined {
  return PREDEFINED_PLAYLISTS.find(p => p.id === id);
}

