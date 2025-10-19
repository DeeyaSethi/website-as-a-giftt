import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateMockSite } from "@/lib/mockData";
import { getTemplateRefinementPrompt } from "@/lib/dynamicTemplateQuestions";

export const runtime = "edge";
export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const DEMO_MODE = false; // Disabled - always use Gemini

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      recipientName,
      occasion,
      originalPrompt,
      selectedTemplates,
      templateContent,
      images,
      colorScheme,
      refineWithAI,
    } = body;

    if (!recipientName || !selectedTemplates || selectedTemplates.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Generating site for:", recipientName);

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables.",
          success: false,
          retryable: false,
        },
        { status: 500 }
      );
    }

    let config;
    let isDemo = false;

    if (DEMO_MODE && false) { // Never true now
      // Demo mode
      console.log("🎭 DEMO MODE: Using mock data");
      config = generateMockSite(originalPrompt || `Website for ${recipientName}`);
      config.images = images || [];
      
      // Apply user-selected color scheme
      if (colorScheme) {
        config.colorPalette = {
          primary: colorScheme.primary,
          secondary: colorScheme.secondary,
          accent: colorScheme.accent,
          background: colorScheme.background,
          text: "#1E293B",
        };
      }
      
      isDemo = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } else {
      // AI mode - refine and generate
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          temperature: 0.8,
          responseMimeType: "application/json",
        },
      });

      const prompt = buildGenerationPrompt(
        recipientName,
        originalPrompt,
        selectedTemplates,
        templateContent,
        images,
        refineWithAI
      );

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      try {
        config = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", responseText);
        return NextResponse.json(
          {
            error: "AI returned an invalid response. Please try again!",
            success: false,
            retryable: true,
          },
          { status: 500 }
        );
      }

      // Validate required fields
      if (!config.theme || !config.pages || !Array.isArray(config.pages) || !config.colorPalette) {
        console.error("Invalid config structure:", config);
        return NextResponse.json(
          {
            error: "AI returned incomplete data. Please try generating again!",
            success: false,
            retryable: true,
          },
          { status: 500 }
        );
      }

      // Add images
      config.images = images || [];

      // Apply user-selected color scheme
      if (colorScheme) {
        config.colorPalette = {
          primary: colorScheme.primary,
          secondary: colorScheme.secondary,
          accent: colorScheme.accent,
          background: colorScheme.background,
          text: "#1E293B",
        };
      }

      // Ensure metadata
      if (!config.metadata) {
        config.metadata = {
          title: `Gift for ${recipientName}`,
          description: "A personalized website",
          recipientName,
          occasion: occasion || config.theme || "general",
          createdAt: new Date(),
        };
      }
      
      if (!config.metadata.createdAt) {
        config.metadata.createdAt = new Date();
      }
      
      if (!config.metadata.recipientName) {
        config.metadata.recipientName = recipientName;
      }
    }
    
    // Attach user-uploaded images to the config
    if (images && images.length > 0) {
      config.images = images;
    }

    return NextResponse.json({
      success: true,
      site: config,
      demo: isDemo,
      message: "Site generated successfully!",
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}

function buildGenerationPrompt(
  recipientName: string,
  originalPrompt: string,
  selectedTemplates: string[],
  templateContent: any,
  images: any[],
  refineWithAI: boolean
): string {
  let prompt = `Create a personalized gift website configuration.

RECIPIENT: ${recipientName}
CONTEXT: ${originalPrompt}

SELECTED TEMPLATES: ${selectedTemplates.join(", ")}
NOTE: Only generate content for the templates listed above.

USER'S CONTENT (${refineWithAI ? 'REFINE AND PERSONALIZE' : 'USE EXACTLY'}):

`;

  // Add each template's content
  selectedTemplates.forEach((templateId, index) => {
    const content = templateContent[templateId];
    
    if (templateId === "hero") {
      prompt += `HERO PAGE (order: 0):
- Title: ${content?.title || recipientName}
- Subtitle: ${content?.subtitle || ""}
- Message: ${content?.message || ""}

`;
    } else if (templateId === "letter") {
      prompt += `LETTER PAGE (order: 1):
- Body: ${content?.body || ""}
- Signature: ${content?.signature || ""}

`;
    } else if (templateId === "timeline") {
      prompt += `TIMELINE PAGE (order: ${index}):
- User provided: ${content?.keyMoments || ""}
- Relationship type: ${content?.relationshipType || ""}

`;
    } else if (templateId === "gallery") {
      prompt += `GALLERY PAGE (order: ${index}):
- ${images.length} photos uploaded
- Title: "Our Memories"

`;
    } else {
      // Get template-specific refinement prompt
      const templatePrompt = getTemplateRefinementPrompt(templateId, content, originalPrompt || "");
      
      if (templatePrompt) {
        prompt += `${templateId.toUpperCase()} PAGE (order: ${index}):
${templatePrompt}

`;
      } else {
        prompt += `${templateId.toUpperCase()} PAGE (order: ${index}):
Content provided by user:
${JSON.stringify(content, null, 2)}

`;
      }
    }
  });

  prompt += `
${refineWithAI ? `
INSTRUCTIONS:
1. Refine and polish ALL the user's text - fix grammar, improve flow, make it more impactful
2. Keep the meaning and personal touch
3. Make it concise and beautiful
4. Keep the same structure (hero, letter, etc.)
` : `
INSTRUCTIONS:
1. Use the user's text EXACTLY as provided
2. Do NOT change or rewrite anything
`}

5. Choose appropriate theme colors for the occasion
6. Generate proper JSON structure

Return JSON matching this structure:
{
  "theme": "birthday" | "anniversary" | "friendship" | "newborn" | "general",
  "metadata": {
    "title": "string",
    "description": "string",
    "recipientName": "${recipientName}",
    "occasion": "string",
    "createdAt": "${new Date().toISOString()}"
  },
  "colorPalette": {
    "primary": "hex",
    "secondary": "hex",
    "accent": "hex",
    "background": "hex",
    "text": "hex"
  },
  "pages": [
    {
      "type": "hero" | "letter" | "gallery" | "timeline" | "music" | "garden" | etc,
      "order": number,
      "content": { ... appropriate fields ... }
    }
  ]
}`;

  return prompt;
}
