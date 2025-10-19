import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { prompt, recipientName } = await request.json();

    if (!prompt || !recipientName) {
      return NextResponse.json(
        { error: "Prompt and recipient name are required" },
        { status: 400 }
      );
    }

    // Use AI to analyze and suggest templates
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const analysisPrompt = `Analyze this prompt and suggest appropriate website templates based on the recipient's interests and the occasion.

PROMPT: "${prompt}"
RECIPIENT: "${recipientName}"

Available templates:
- hero: Opening page (always include)
- letter: Personal letter/message
- gallery: Photo gallery
- timeline: Timeline of events/milestones
- music: Music playlist (for music lovers)
- garden: Flower garden (for flower/gardening lovers)
- travel: Travel map (for travelers/adventure lovers)
- recipes: Recipe collection (for food/cooking lovers)
- quotes: Inspiring quotes collection
- memories: Memory cards/moments

Return JSON with:
{
  "suggestedTemplates": ["hero", "letter", ...],  // 3-5 most relevant templates
  "reasoning": "Brief explanation of why these templates fit"
}

Guidelines:
1. Always include "hero" first
2. Look for interests mentioned (flowers → garden, music → music, travel → travel, etc.)
3. Include "letter" if it's a personal occasion
4. Include "gallery" if they mention "memories" or "photos"
5. Include "timeline" for anniversaries, long friendships, relationships
6. Be smart about matching interests to templates`;

    const result = await model.generateContent(analysisPrompt);
    const response = JSON.parse(result.response.text());

    return NextResponse.json({
      success: true,
      suggestedTemplates: response.suggestedTemplates || ["hero", "letter", "gallery"],
      reasoning: response.reasoning,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    
    // Fallback to default templates
    return NextResponse.json({
      success: true,
      suggestedTemplates: ["hero", "letter", "gallery"],
      reasoning: "Using default templates",
    });
  }
}

