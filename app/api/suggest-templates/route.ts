import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";
export const maxDuration = 30;

const AVAILABLE_TEMPLATES = [
  { id: "hero", name: "Welcome Page", description: "Beautiful landing page", required: true },
  { id: "letter", name: "Personal Letter", description: "Heartfelt message" },
  { id: "gallery", name: "Photo Gallery", description: "Share memories through photos" },
  { id: "music", name: "Music Player", description: "Special playlist or favorite songs" },
  { id: "garden", name: "Flower Garden", description: "Interactive flower planting experience" },
  { id: "travel", name: "Travel Map", description: "Places you've visited together" },
  { id: "memories", name: "Memory Showcase", description: "Beautiful display of favorite memories" },
  { id: "techfacts", name: "Tech Facts", description: "Playful tech trivia to roast your geeky friend" },
];

export async function POST(request: NextRequest) {
  try {
    const { recipientName, occasion, description } = await request.json();

    if (!recipientName || !occasion) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      // Return default recommendations if no API key
      console.log("No Gemini API key - using default recommendations");
      return NextResponse.json({
        success: true,
        recommended: ["hero", "letter", "gallery"],
        reasoning: "Default recommendations",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const prompt = `You are an expert at creating personalized gift websites. Based on the user's input, recommend the most appropriate templates.

USER INPUT:
- Recipient Name: ${recipientName}
- Occasion: ${occasion}
- Description: ${description || "No additional details provided"}

AVAILABLE TEMPLATES:
${AVAILABLE_TEMPLATES.map(
  (t) => `- ${t.id}: ${t.name} - ${t.description}`
).join("\n")}

TASK:
Analyze the user's input and recommend 3-5 templates that would create the most meaningful and personalized experience.

GUIDELINES:
1. "hero" is always required (already included by default)
2. "letter" is great for personal, emotional occasions
3. "gallery" is perfect when photos are mentioned or for visual memories
4. "music" is ideal when music, concerts, or songs are mentioned
5. "garden" fits nature lovers, gardening enthusiasts, or symbolic growth
6. "travel" is great for adventurers, wanderlust, or when travel/places are mentioned
7. "memories" is perfect for showcasing favorite moments and special memories
8. "techfacts" is ideal for tech enthusiasts, coders, gamers, engineers, geeks, or anyone into technology/computers/coding

Respond with a JSON object:
{
  "recommended": ["hero", "letter", "gallery"], // Array of 3-5 template IDs in priority order
  "reasoning": "Brief explanation of why these templates fit"
}

IMPORTANT: Only recommend templates that truly fit the user's context. Be selective and thoughtful.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    // Validate response
    if (!parsed.recommended || !Array.isArray(parsed.recommended)) {
      throw new Error("Invalid response format");
    }

    // Ensure hero is always first
    const recommended = parsed.recommended.filter((id: string) => id !== "hero");
    const finalRecommended = ["hero", ...recommended.slice(0, 4)];

    return NextResponse.json({
      success: true,
      recommended: finalRecommended,
      reasoning: parsed.reasoning || "Personalized recommendations based on your input",
    });
  } catch (error) {
    console.error("Template suggestion error:", error);
    
    // Fallback to default recommendations
    return NextResponse.json({
      success: true,
      recommended: ["hero", "letter", "gallery"],
      reasoning: "Default recommendations",
      fallback: true,
    });
  }
}

