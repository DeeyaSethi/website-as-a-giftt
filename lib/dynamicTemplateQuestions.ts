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
  templateId: string,
  userDescription: string = ""
): TemplateQuestion[] {
  const desc = userDescription.toLowerCase();

  switch (templateId) {
    case "music":
      return getMusicQuestions(desc);
    case "recipes":
      return getRecipeQuestions(desc);
    case "travel":
      return getTravelQuestions(desc);
    case "garden":
      return getGardenQuestions(desc);
    case "quotes":
      return getQuotesQuestions(desc);
    case "timeline":
      return getTimelineQuestions(desc);
    case "memories":
      return getMemoriesQuestions(desc);
    default:
      return [];
  }
}

function getMusicQuestions(desc: string): TemplateQuestion[] {
  const questions: TemplateQuestion[] = [
    {
      id: "musicType",
      label: "What kind of music do they love?",
      type: "select",
      placeholder: "",
      required: true,
      options: [
        "Bollywood Songs",
        "Hollywood Pop",
        "Classical Music",
        "Rock & Metal",
        "Hip Hop & Rap",
        "EDM & Electronic",
        "Indie & Alternative",
        "K-pop & J-pop",
        "Jazz & Blues",
        "Country Music",
      ],
      helperText: "AI will suggest songs in this genre",
    },
  ];

  // If Bollywood mentioned
  if (desc.includes("bollywood") || desc.includes("hindi")) {
    questions.push({
      id: "bollywoodEra",
      label: "Favorite Bollywood era?",
      type: "select",
      placeholder: "",
      options: ["90s Classics", "2000s Hits", "Modern (2010+)", "Golden Era (70s-80s)", "All Time Favorites"],
      helperText: "We'll pick iconic songs from this period",
    });
  }

  // If specific artists mentioned
  questions.push({
    id: "favoriteArtists",
    label: "Favorite artists or bands? (optional)",
    type: "text",
    placeholder: "e.g., Arijit Singh, Taylor Swift, AR Rahman...",
    helperText: "Comma separated - AI will include their songs",
  });

  // Add mood/occasion
  questions.push({
    id: "playlistMood",
    label: "What's the vibe?",
    type: "select",
    placeholder: "",
    required: true,
    options: [
      "Romantic & Dreamy",
      "Upbeat & Energetic",
      "Chill & Relaxing",
      "Nostalgic & Emotional",
      "Party & Dance",
      "Motivational & Inspiring",
    ],
    helperText: "Sets the overall playlist mood",
  });

  // Movie dialogues if they love movies
  if (desc.includes("movie") || desc.includes("film") || desc.includes("cinema")) {
    questions.push({
      id: "favoriteMovieDialogue",
      label: "Favorite movie dialogue? (optional)",
      type: "textarea",
      placeholder: "e.g., 'Mere paas maa hai' or any iconic line they love...",
      helperText: "We'll feature this beautifully in the template",
    });
  }

  return questions;
}

function getRecipeQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "cuisineType",
      label: "What cuisine do they love?",
      type: "select",
      placeholder: "",
      required: true,
      options: [
        "Indian",
        "Italian",
        "Chinese",
        "Mexican",
        "Japanese",
        "Mediterranean",
        "Thai",
        "American",
        "Fusion",
      ],
      helperText: "AI will suggest recipes from this cuisine",
    },
    {
      id: "favoriteDishe",
      label: "Their favorite dish?",
      type: "text",
      placeholder: "e.g., Biryani, Pizza, Pad Thai...",
      required: true,
      helperText: "We'll include this recipe with details",
    },
    {
      id: "cookingMemory",
      label: "A cooking memory together? (optional)",
      type: "textarea",
      placeholder: "e.g., That time we tried making pasta and it was a disaster...",
      helperText: "Personal touch for the recipe book",
    },
  ];
}

function getTravelQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "favoritePlaces",
      label: "Places you've visited together (or dream destinations)",
      type: "textarea",
      placeholder: "e.g., Paris (2019), Tokyo, Goa beaches, Kashmir...",
      required: true,
      helperText: "One per line - AI will create stories for each",
    },
    {
      id: "travelStyle",
      label: "Their travel style?",
      type: "select",
      placeholder: "",
      options: [
        "Beach & Relaxation",
        "Adventure & Hiking",
        "City & Culture",
        "Food & Local Experiences",
        "Luxury & Comfort",
        "Backpacking & Budget",
      ],
      helperText: "Personalizes the travel stories",
    },
    {
      id: "memorableTrip",
      label: "Most memorable trip moment? (optional)",
      type: "textarea",
      placeholder: "A funny or beautiful memory from your travels...",
      helperText: "We'll highlight this story",
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

function getQuotesQuestions(desc: string): TemplateQuestion[] {
  const questions: TemplateQuestion[] = [
    {
      id: "quoteTheme",
      label: "What kind of quotes resonate with them?",
      type: "select",
      placeholder: "",
      required: true,
      options: [
        "Motivational & Success",
        "Life & Wisdom",
        "Love & Relationships",
        "Humor & Fun",
        "Spiritual & Peace",
        "Friendship & Loyalty",
        "Dreams & Ambition",
      ],
      helperText: "AI will curate quotes in this theme",
    },
  ];

  // If they love books/authors
  if (desc.includes("book") || desc.includes("read") || desc.includes("author")) {
    questions.push({
      id: "favoriteAuthor",
      label: "Favorite author or book? (optional)",
      type: "text",
      placeholder: "e.g., Paulo Coelho, Harry Potter, Rumi...",
      helperText: "We'll include quotes from them",
    });
  }

  // If they're into movies
  if (desc.includes("movie") || desc.includes("film")) {
    questions.push({
      id: "iconicMovieQuote",
      label: "Iconic movie quote they love? (optional)",
      type: "text",
      placeholder: "e.g., 'May the Force be with you' or Bollywood dialogue...",
      helperText: "We'll feature this beautifully",
    });
  }

  return questions;
}

function getTimelineQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "relationshipType",
      label: "What's your relationship timeline about?",
      type: "select",
      placeholder: "",
      required: true,
      options: [
        "Our Friendship",
        "Our Love Story",
        "Family Moments",
        "Professional Journey",
        "Personal Growth",
        "Shared Adventures",
      ],
      helperText: "Sets the narrative tone",
    },
    {
      id: "keyMoments",
      label: "Key moments to include (one per line)",
      type: "textarea",
      placeholder: "e.g.,\n2018 - First meeting at college\n2020 - Road trip to Goa\n2023 - Started business together",
      required: true,
      helperText: "Format: Year/Date - Event title - Brief description",
    },
  ];
}

function getMemoriesQuestions(desc: string): TemplateQuestion[] {
  return [
    {
      id: "memoryTheme",
      label: "What memories should the game showcase?",
      type: "select",
      placeholder: "",
      required: true,
      options: [
        "Funny moments together",
        "Adventures & trips",
        "Inside jokes",
        "Special celebrations",
        "Random beautiful days",
        "Achievements & milestones",
      ],
      helperText: "AI will create matching cards around this theme",
    },
    {
      id: "specificMemories",
      label: "List specific memories (optional)",
      type: "textarea",
      placeholder: "e.g.,\n- That coffee shop incident\n- Our first concert\n- The surprise party",
      helperText: "These will become the memory cards",
    },
  ];
}

/**
 * Generate template-specific AI prompts for refinement
 */
export function getTemplateRefinementPrompt(
  templateId: string,
  content: any,
  userDescription: string
): string {
  const desc = userDescription.toLowerCase();

  switch (templateId) {
    case "music":
      return getMusicRefinementPrompt(content, desc);
    case "recipes":
      return getRecipeRefinementPrompt(content, desc);
    case "quotes":
      return getQuotesRefinementPrompt(content, desc);
    case "travel":
      return getTravelRefinementPrompt(content, desc);
    default:
      return "";
  }
}

function getMusicRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create a personalized music playlist section.\n\n`;
  
  if (content.musicType) {
    prompt += `Music Genre: ${content.musicType}\n`;
  }
  if (content.playlistMood) {
    prompt += `Mood: ${content.playlistMood}\n`;
  }
  if (content.favoriteArtists) {
    prompt += `Include songs by: ${content.favoriteArtists}\n`;
  }
  if (content.bollywoodEra) {
    prompt += `Bollywood Era: ${content.bollywoodEra}\n`;
  }

  prompt += `\nGenerate 8-10 ${content.musicType || "meaningful"} songs that fit the ${
    content.playlistMood || "vibe"
  }. Include:\n`;
  prompt += `- Song title\n- Artist name\n- A one-line reason why this song fits\n`;
  
  if (content.favoriteMovieDialogue) {
    prompt += `\nAlso feature this dialogue beautifully:\n"${content.favoriteMovieDialogue}"\n`;
  }

  return prompt;
}

function getRecipeRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create a personalized recipe collection.\n\n`;
  
  if (content.cuisineType) {
    prompt += `Cuisine: ${content.cuisineType}\n`;
  }
  if (content.favoriteDish) {
    prompt += `Must include recipe for: ${content.favoriteDish}\n`;
  }
  if (content.cookingMemory) {
    prompt += `Include this memory:\n"${content.cookingMemory}"\n`;
  }

  prompt += `\nGenerate 3-4 authentic ${content.cuisineType || ""} recipes with:\n`;
  prompt += `- Recipe name\n- Ingredients list\n- Step-by-step instructions\n- A personal note or fun fact\n`;

  return prompt;
}

function getQuotesRefinementPrompt(content: any, desc: string): string {
  let prompt = `Curate an inspiring collection of quotes.\n\n`;
  
  if (content.quoteTheme) {
    prompt += `Theme: ${content.quoteTheme}\n`;
  }
  if (content.favoriteAuthor) {
    prompt += `Include quotes from: ${content.favoriteAuthor}\n`;
  }
  if (content.iconicMovieQuote) {
    prompt += `Feature this movie quote:\n"${content.iconicMovieQuote}"\n`;
  }

  prompt += `\nGenerate 6-8 meaningful quotes about ${content.quoteTheme || "life"}.\n`;
  prompt += `Mix of:\n- Classic wisdom\n- Modern inspiration\n- ${content.favoriteAuthor ? "Quotes from " + content.favoriteAuthor : "Diverse sources"}\n`;

  return prompt;
}

function getTravelRefinementPrompt(content: any, desc: string): string {
  let prompt = `Create an interactive travel map with stories.\n\n`;
  
  if (content.favoritePlaces) {
    prompt += `Places to feature:\n${content.favoritePlaces}\n`;
  }
  if (content.travelStyle) {
    prompt += `Travel Style: ${content.travelStyle}\n`;
  }
  if (content.memorableTrip) {
    prompt += `Highlight this memory:\n"${content.memorableTrip}"\n`;
  }

  prompt += `\nFor each location, create:\n`;
  prompt += `- Location name\n- Brief story (2-3 sentences)\n- Why it's special\n- A memorable moment there\n`;

  return prompt;
}

