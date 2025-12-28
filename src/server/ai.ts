import { GoogleGenerativeAI } from "@google/generative-ai";
import type {
  UserInput,
  GeneratedSiteConfig,
  AIGenerationResponse,
  PageType,
} from "@/shared/types";

/**
 * Initialize Gemini client
 */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Generate a complete site configuration from user input
 */
export async function generateSiteConfig(
  input: UserInput
): Promise<AIGenerationResponse> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.8,
        responseMimeType: "application/json",
      },
    });
    
    const prompt = buildFullPrompt(input);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("No response from AI");
    }

    const config = JSON.parse(text) as GeneratedSiteConfig;
    
    // Validate and sanitize the config
    const validatedConfig = validateConfig(config);

    return {
      success: true,
      config: validatedConfig,
    };
  } catch (error) {
    console.error("AI generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Build complete prompt with system instructions
 */
function buildFullPrompt(input: UserInput): string {
  const userContent = input.additionalDetails || {};
  
  let prompt = `${SYSTEM_PROMPT}

RECIPIENT: ${input.recipientName}
OCCASION: ${input.occasion || 'general'}

USER PROVIDED CONTENT (USE EXACTLY AS PROVIDED):

`;

  // Hero content
  if (userContent.hero) {
    prompt += `HERO PAGE:
- Title: ${userContent.hero.title || input.recipientName}
- Subtitle: ${userContent.hero.subtitle || ''}
- Message: ${userContent.hero.message || ''}

`;
  }

  // Letter content
  if (userContent.letter) {
    prompt += `LETTER PAGE:
- Body: ${userContent.letter.body || ''}
- Signature: ${userContent.letter.signature || 'Your Friend'}

`;
  }

  // Gallery
  if (userContent.gallery && userContent.images?.length > 0) {
    prompt += `GALLERY PAGE:
User has uploaded ${userContent.images.length} photos. Include a gallery page.

`;
  }

  prompt += `
IMPORTANT: Use the user's provided content EXACTLY as written. Only choose appropriate theme colors.

Generate the complete JSON configuration now. Include ONLY the pages the user provided content for.`;

  return prompt;
}

/**
 * System prompt for AI
 */
const SYSTEM_PROMPT = `You are assembling a personalized gift website. The user has provided specific content they want to use.

YOUR JOB:
1. Use the user's provided content EXACTLY as written - do NOT rewrite or change it
2. Choose appropriate theme colors based on the occasion
3. Structure the content into the correct JSON format
4. Include ONLY the pages the user provided content for
5. If content is missing or empty, skip that page

You must respond with a valid JSON object matching this EXACT structure:
{
  "theme": "birthday" | "anniversary" | "friendship" | "newborn" | "general",
  "metadata": {
    "title": "string",
    "description": "string",
    "recipientName": "string",
    "occasion": "string",
    "createdAt": "ISO date string"
  },
  "colorPalette": {
    "primary": "hex color",
    "secondary": "hex color",
    "accent": "hex color",
    "background": "hex color",
    "text": "hex color"
  },
  "pages": [
    {
      "type": "hero" | "letter" | "gallery" | "music" | "garden" | "travel" | "memories",
      "order": number,
      "variant": "string",
      "content": {
        // Content structure based on page type
      }
    }
  ]
}

Guidelines:
1. **USE USER CONTENT**: Copy the user's provided text EXACTLY - do NOT modify, rewrite, or "improve" it
2. **FILL METADATA**: Generate appropriate title, description based on recipient name and occasion
3. **CHOOSE COLORS**: Pick a color palette that matches the occasion/theme
4. **INCLUDE ONLY PROVIDED PAGES**: If user provided hero + letter, include ONLY those two pages
5. **CORRECT ORDER**: Always hero (0), then letter (1), gallery (2), and other pages as applicable

Page types and their content structure:

HERO PAGE (ALWAYS FIRST):
{
  "type": "hero",
  "order": 0,
  "content": {
    "title": "Main impact text - HUGE and SHORT (max 5 words, e.g., 'Sarah!' or 'Happy Birthday!' or 'You're Amazing!')",
    "subtitle": "One impactful line only (optional, max 10 words)",
    "message": "ONE sentence only. Make it count."
  }
}
EXAMPLE: For a music-lover birthday → title: "Rock On, Sarah!", subtitle: "Another year, another playlist", message: "Let's celebrate you and your incredible vibe."

LETTER PAGE:
{
  "type": "letter",
  "order": 1,
  "content": {
    "title": "Short title (2-4 words, e.g., 'For You' or 'A Note')",
    "body": "2-3 SHORT paragraphs MAX. Each paragraph 2-3 sentences. Be heartfelt but BRIEF. Reference their interests if mentioned. Use \\n\\n between paragraphs.",
    "signature": "Sender name or 'Your Friend' or similar"
  }
}
EXAMPLE: For a travel-lover → Reference their adventures, favorite places, or wanderlust spirit in the letter.

GALLERY PAGE:
{
  "type": "gallery",
  "order": 2,
  "content": {
    "title": "Gallery title (e.g., 'Our Memories')",
    "subtitle": "Optional subtitle"
  }
}`;

/**
 * Validate and sanitize AI-generated config
 */
function validateConfig(config: any): GeneratedSiteConfig {
  // Basic validation - ensure all required fields exist
  if (!config.theme || !config.pages || !config.metadata || !config.colorPalette) {
    throw new Error("Invalid config structure from AI");
  }

  // Ensure pages are ordered
  config.pages.sort((a: any, b: any) => a.order - b.order);

  // Ensure dates are Date objects
  if (config.metadata.createdAt) {
    config.metadata.createdAt = new Date(config.metadata.createdAt);
  }

  return config as GeneratedSiteConfig;
}

/**
 * Generate content for a specific page type (helper function)
 */
export async function generatePageContent(
  pageType: PageType,
  context: string
): Promise<any> {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.8,
      responseMimeType: "application/json",
    },
  });

  const prompt = `Generate content for a ${pageType} page in a gift website based on: ${context}. Return JSON only with appropriate fields for this page type.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text() || "{}");
}
