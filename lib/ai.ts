import OpenAI from "openai";
import type {
  UserInput,
  GeneratedSiteConfig,
  AIGenerationResponse,
  Theme,
  PageType,
  ContentTone,
} from "./types";

/**
 * Initialize OpenAI client
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a complete site configuration from user input
 */
export async function generateSiteConfig(
  input: UserInput
): Promise<AIGenerationResponse> {
  try {
    const prompt = buildPrompt(input);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const config = JSON.parse(content) as GeneratedSiteConfig;
    
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
 * System prompt for AI
 */
const SYSTEM_PROMPT = `You are an expert at creating personalized gift websites. Your job is to analyze user input and generate a complete website configuration.

You must respond with a valid JSON object matching this structure:
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
      "type": "hero" | "letter" | "gallery" | "timeline" | "messages",
      "order": number,
      "variant": "string",
      "content": {
        // Content varies by page type
      }
    }
  ]
}

Guidelines:
1. Choose 3-5 pages that best fit the occasion
2. Generate heartfelt, personalized content based on the details provided
3. Match the tone requested (heartfelt, funny, romantic, casual)
4. Pick appropriate colors for the theme
5. Be creative but appropriate
6. Keep text concise and impactful

Page types and their content structure:
- hero: { title, subtitle, greeting }
- letter: { title, body, signature }
- gallery: { title, items: [{ caption, placeholder }] }
- timeline: { title, events: [{ date, title, description }] }
- messages: { title, messages: [{ from, message }] }`;

/**
 * Build the user prompt
 */
function buildPrompt(input: UserInput): string {
  return `Create a personalized gift website based on this description:

${input.prompt}

${input.recipientName ? `Recipient: ${input.recipientName}` : ""}
${input.occasion ? `Occasion: ${input.occasion}` : ""}
${input.tone ? `Desired tone: ${input.tone}` : ""}

Generate a complete website configuration with appropriate theme, pages, content, and colors.`;
}

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
  // This can be used for regenerating individual pages
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Generate content for a ${pageType} page in a gift website. Return JSON only.`,
      },
      {
        role: "user",
        content: context,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.8,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

