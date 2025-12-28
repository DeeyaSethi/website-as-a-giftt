/**
 * Dynamic template questions that adapt to user's interests
 * Analyzes the description to show relevant, personalized inputs
 */

export interface TemplateQuestion {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder: string;
  required?: boolean;
  helperText?: string;
  options?: string[];
}

/**
 * Get personalized questions based on template type and user description
 */
export function getTemplateQuestions(
  templateId: string
): TemplateQuestion[] {
  const desc = "";

  switch (templateId) {
    case "music":
      return getMusicQuestions(desc);
    case "travel":
      return getTravelQuestions(desc);
    case "garden":
      return getGardenQuestions(desc);
    case "memories":
      return getMemoriesQuestions(desc);
    case "techfacts":
      return getTechFactsQuestions(desc);
    default:
      return [];
  }
}

function getMusicQuestions(desc: string): TemplateQuestion[] {
  const questions: TemplateQuestion[] = [
    {
      id: "playlistSource",
      label: "How would you like to add music?",
      type: "select",
      placeholder: "",
      required: true,
      options: [
        "Choose a pre-made playlist (popular artists)",
        "Add my own YouTube links",
      ],
      helperText: "Select a curated playlist or add your own",
    },
    {
      id: "predefinedPlaylist",
      label: "Select a Playlist",
      type: "select",
      placeholder: "",
      required: false,
      options: [
        "Arijit Singh - Romantic Bollywood",
        "A.R. Rahman - Legendary Classics",
        "Shreya Ghoshal - Melodious Hits",
        "---",
        "Taylor Swift - Pop Essentials",
        "Ed Sheeran - Love Songs",
        "The Weeknd - R&B Vibes",
        "---",
        "BTS - K-pop Legends",
        "BLACKPINK - Girl Power",
        "---",
        "Timeless Love Songs - Romantic Classics",
        "Ultimate Party Mix - Dance Hits",
        "Indie Love Songs - Unique & Heartfelt",
      ],
      helperText: "Choose a curated playlist (only if you selected pre-made above)",
    },
    {
      id: "youtubeInput",
      label: "Your YouTube Links",
      type: "textarea",
      placeholder: "Paste YouTube links (one per line):\n\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ\nhttps://youtu.be/VIDEO_ID\n\nOr paste a full playlist URL:\nhttps://www.youtube.com/playlist?list=PLx0sYbCqOb8...",
      required: false,
      helperText: "🎵 Add your own links (only if you selected 'Add my own' above)",
    },
    {
      id: "playlistTitle",
      label: "Playlist Title (Optional)",
      type: "text",
      placeholder: "e.g., Our Special Songs, Songs That Remind Me of You",
      required: false,
      helperText: "Give your playlist a custom name",
    },
    {
      id: "playlistDescription",
      label: "What does this music mean? (Optional)",
      type: "text",
      placeholder: "e.g., Songs from our road trip, Your favorite artist's collection",
      required: false,
      helperText: "Add a personal touch to your playlist",
    },
    {
      id: "customThumbnail",
      label: "Custom Music Thumbnail (Optional)",
      type: "text",
      placeholder: "Paste image URL (e.g., from Canva or Imgur)",
      required: false,
      helperText: "🎨 Add a beautiful thumbnail if YouTube embedding fails. See CANVA_PROMPTS.md for ideas!",
    },
  ];

  return questions;
}

function getTravelQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "placesVisited",
      label: "Places You've Traveled Together & Memories",
      type: "textarea",
      placeholder: "List 3-5 places with a brief memory from each:\n• Paris - Got lost but found the best café\n• Tokyo - Cherry blossoms and late-night ramen\n• Bali - Sunset at the beach temple\n• New York - Times Square on New Year's Eve\n• Iceland - Chasing the Northern Lights",
      required: true,
      helperText: "AI will create beautiful travel stories for each place",
    },
  ];
}

function getGardenQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "flowerMeaning",
      label: "What do the flowers symbolize?",
      type: "select",
      placeholder: "",
      required: true,
      options: [
        "Our growing friendship",
        "Love that blooms",
        "Years of memories",
        "New beginnings",
        "Endless appreciation",
        "Personal growth",
      ],
      helperText: "Gives meaning to the interactive garden",
    },
    {
      id: "favoriteFlower",
      label: "Their favorite flower?",
      type: "text",
      placeholder: "e.g., Rose, Sunflower, Lily...",
      helperText: "We'll feature it prominently",
    },
  ];
}

function getMemoriesQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "favoriteMemories",
      label: "Share Your Favorite Memories",
      type: "textarea",
      placeholder: "List 3-5 special moments you've shared:\n• Watching the sunrise from the beach\n• Our midnight ice cream run\n• Got caught in the rain and danced\n• The surprise birthday party\n• Our first road trip adventure",
      required: true,
      helperText: "AI will present these beautifully on the page",
    },
  ];
}

function getTechFactsQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "techFactsMessage",
      label: "Roast Your Geeky Friend (Optional) 😄",
      type: "text",
      placeholder: "e.g., Go study, nerd! or Stop scrolling and learn something!",
      required: false,
      helperText: "Add a playful, teasing message for the tech geek",
    },
    {
      id: "fetchLiveFacts",
      label: "Fetch Live Tech Facts?",
      type: "select",
      placeholder: "",
      required: true,
      options: ["Use default facts (fast)", "Fetch fresh facts from API (slower)"],
      helperText: "Live facts require API call - may take longer",
    },
  ];
}

/**
 * Generate template-specific AI prompts for refinement
 */
export function getTemplateRefinementPrompt(
  templateId: string,
  content: any
): string {
  const desc = "";

  switch (templateId) {
    case "music":
      return getMusicRefinementPrompt(content, desc);
    case "travel":
      return getTravelRefinementPrompt(content, desc);
    case "garden":
      return getGardenRefinementPrompt(content, desc);
    case "memories":
      return getMemoriesRefinementPrompt(content, desc);
    case "techfacts":
      return getTechFactsRefinementPrompt(content, desc);
    default:
      return "";
  }
}

function getMusicRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create a YouTube music playlist integration.\n\n`;

  // Check if user selected pre-made or custom
  const usePredefined = content?.playlistSource?.includes("pre-made");

  if (usePredefined && content?.predefinedPlaylist) {
    prompt += `User selected pre-made playlist: ${content.predefinedPlaylist}\n\n`;
    prompt += `Map this selection to the correct playlistId:\n`;
    prompt += `- "Arijit Singh" → use playlistId: "arijit-singh"\n`;
    prompt += `- "A.R. Rahman" → use playlistId: "ar-rahman"\n`;
    prompt += `- "Shreya Ghoshal" → use playlistId: "shreya-ghoshal"\n`;
    prompt += `- "Taylor Swift" → use playlistId: "taylor-swift"\n`;
    prompt += `- "Ed Sheeran" → use playlistId: "ed-sheeran"\n`;
    prompt += `- "The Weeknd" → use playlistId: "weeknd"\n`;
    prompt += `- "BTS" → use playlistId: "bts"\n`;
    prompt += `- "BLACKPINK" → use playlistId: "blackpink"\n`;
    prompt += `- "Timeless Love Songs" → use playlistId: "romantic-classics"\n`;
    prompt += `- "Ultimate Party Mix" → use playlistId: "party-hits"\n`;
    prompt += `- "Indie Love Songs" → use playlistId: "indie-love"\n\n`;

    prompt += `Return:\n`;
    prompt += `{\n`;
    prompt += `  "usePredefined": true,\n`;
    prompt += `  "predefinedId": "matched-playlist-id",\n`;
    prompt += `  "title": "${content.playlistTitle || "User's custom title or artist name"}",\n`;
    prompt += `  "description": "${content.playlistDescription || "A description"}"\n`;
    prompt += `}\n`;
  } else if (content?.youtubeInput) {
    prompt += `YouTube links provided:\n${content.youtubeInput}\n\n`;

    if (content.playlistTitle) {
      prompt += `Playlist title: ${content.playlistTitle}\n\n`;
    }

    if (content.playlistDescription) {
      prompt += `Description: ${content.playlistDescription}\n\n`;
    }

    prompt += `IMPORTANT: Extract YouTube IDs from the provided links.\n\n`;
    prompt += `YouTube URL formats:\n`;
    prompt += `- https://www.youtube.com/watch?v=VIDEO_ID → extract VIDEO_ID\n`;
    prompt += `- https://youtu.be/VIDEO_ID → extract VIDEO_ID\n`;
    prompt += `- https://www.youtube.com/playlist?list=PLAYLIST_ID → extract PLAYLIST_ID\n\n`;

    prompt += `Generate response with:\n`;
    prompt += `{\n`;
    prompt += `  "title": "${content.playlistTitle || "Special Playlist"}",\n`;
    prompt += `  "description": "${content.playlistDescription || "A collection of meaningful songs"}",\n`;
    prompt += `  "youtubeVideos": [\n`;
    prompt += `    { "videoId": "extracted_video_id_1" },\n`;
    prompt += `    { "videoId": "extracted_video_id_2" }\n`;
    prompt += `  ]\n`;
    prompt += `}\n\n`;
    prompt += `OR if it's a playlist URL:\n`;
    prompt += `{ "playlistId": "extracted_playlist_id" }\n\n`;
    prompt += `Extract ALL video IDs from the links provided. Return ONLY valid video/playlist IDs.\n`;
  }

  return prompt;
}

function getTravelRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create beautiful travel stories from these memories.\n\n`;

  if (content && content.placesVisited) {
    prompt += `Places and memories:\n${content.placesVisited}\n\n`;
  }

  prompt += `Generate a 'destinations' array where each destination has:\n`;
  prompt += `- place: (location name, e.g., "Paris")\n`;
  prompt += `- story: (the memory provided, expanded to 2-3 sentences with warmth)\n`;
  prompt += `- emoji: (relevant emoji for the place)\n`;
  prompt += `- year: (if mentioned, otherwise leave blank)\n`;
  prompt += `\nKeep the personal touch and make it nostalgic.\n`;

  return prompt;
}

function getGardenRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create an interactive virtual garden.\n\n`;

  if (content && content.flowerMeaning) {
    prompt += `Flower symbolism: ${content.flowerMeaning}\n`;
  }
  if (content && content.favoriteFlower) {
    prompt += `Feature this flower: ${content.favoriteFlower}\n`;
  }

  prompt += `\nGenerate garden content with:\n`;
  prompt += `- A welcoming message about the garden's meaning\n`;
  prompt += `- Description connecting flowers to the relationship\n`;

  return prompt;
}

function getTechFactsRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create a PLAYFUL, HUMOROUS tech facts page - like a friend teasing their geeky friend.\n\n`;
  prompt += `TONE: Fun, friendly roasting. Think "go study, nerd!" vibes with emojis and humor.\n\n`;

  if (content && content.techFactsMessage) {
    prompt += `User's playful message: ${content.techFactsMessage}\n\n`;
  }

  // Check if we have fetched facts
  const hasFacts = content?.techFacts && Array.isArray(content.techFacts) && content.techFacts.length > 0;

  prompt += `Generate content with:\n`;
  prompt += `{\n`;
  prompt += `  "title": Something playful like "Go Study, You Geek! 🤓" or "Nerd Alert! 🚨" or "Time to Level Up Your Brain 🧠",\n`;
  prompt += `  "subtitle": Funny subtitle like "Your daily dose of nerdy knowledge (you're welcome)" or "Because you probably know this already" or "Facts to flex in your next tech debate",\n`;
  prompt += `  "message": "${content.techFactsMessage || "Go study, nerd! (Just kidding, you probably know all this already) 😄"}",\n`;

  if (hasFacts) {
    prompt += `  "techFacts": [\n`;
    content.techFacts.slice(0, 10).forEach((fact: string, idx: number) => {
      prompt += `    "${fact}"${idx < Math.min(content.techFacts.length, 10) - 1 ? ',' : ''}\n`;
    });
    prompt += `  ]\n`;
    prompt += `}\n\n`;
    prompt += `IMPORTANT: Use the techFacts array EXACTLY as provided above. These are already fetched from the API.\n`;
  } else {
    prompt += `  "techFacts": [] (will use default facts if not provided)\n`;
    prompt += `}\n\n`;
  }

  prompt += `Keep it FUN, PLAYFUL, and GEEKY with a friendly roasting vibe! Use emojis where appropriate. 🤓🚀💻\n`;

  return prompt;
}

function getMemoriesRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create a beautiful memory showcase.\n\n`;

  if (content && content.favoriteMemories) {
    prompt += `Memories to showcase:\n${content.favoriteMemories}\n\n`;
  }

  prompt += `Generate a 'memories' array where each memory has:\n`;
  prompt += `- title: (short, catchy 2-4 words)\n`;
  prompt += `- description: (the memory expanded to 1-2 heartfelt sentences)\n`;
  prompt += `- emoji: (relevant emoji)\n`;
  prompt += `- date: (season/year if mentioned, e.g., "Summer 2022")\n`;
  prompt += `\nMake it warm, nostalgic, and beautiful.\n`;

  return prompt;
}
