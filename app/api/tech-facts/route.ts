import { NextResponse } from "next/server";

export const runtime = "edge";

/**
 * API Route: Fetch Tech Facts from API Ninjas
 * GET /api/tech-facts?count=10
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get("count") || "10");

  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    console.warn("API_NINJAS_KEY not configured - using default facts");
    return NextResponse.json({
      success: false,
      error: "API key not configured",
      facts: [],
    });
  }

  try {
    const facts: string[] = [];
    
    // Fetch multiple facts (API Ninjas free tier: no limit parameter, returns 1 fact at a time)
    for (let i = 0; i < Math.min(count, 15); i++) {
      const response = await fetch("https://api.api-ninjas.com/v1/facts", {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error ${response.status}: ${errorText}`);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // API returns an array with one fact object
      if (data && Array.isArray(data) && data.length > 0 && data[0].fact) {
        facts.push(data[0].fact);
      }
    }

    return NextResponse.json({
      success: true,
      facts,
      count: facts.length,
    });
  } catch (error) {
    console.error("Error fetching tech facts:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch facts",
        facts: [],
      },
      { status: 500 }
    );
  }
}

