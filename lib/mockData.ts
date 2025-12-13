/**
 * Mock data for demo/testing without OpenAI API
 */

import type { GeneratedSiteConfig, Theme } from "./types";

export function generateMockSite(prompt: string): GeneratedSiteConfig {
  // Determine theme from prompt
  const theme: Theme = detectThemeFromPrompt(prompt);
  
  return {
    theme,
    pages: [
      {
        type: "hero",
        order: 0,
        content: {
          greeting: "Hey there!",
          title: theme === "birthday" 
            ? "Happy Birthday!" 
            : theme === "anniversary"
            ? "Happy Anniversary!"
            : theme === "friendship"
            ? "To My Best Friend"
            : "You're Amazing!",
          subtitle: "This website was made just for you",
          message: "Every moment with you is special. Here's a little something to celebrate our time together.",
        },
      },
      {
        type: "letter",
        order: 1,
        content: {
          title: "A Letter For You",
          salutation: "Dear Friend,",
          body: `I wanted to take a moment to express how much you mean to me. Over the years, we've shared countless memories, laughs, and adventures together.\n\nFrom late-night conversations to spontaneous road trips, every moment has been precious. You've been there through thick and thin, and I couldn't ask for a better companion on this journey called life.\n\nThank you for being you. Thank you for your friendship, your support, and your incredible spirit that lights up every room you enter.`,
          closing: "With all my love,",
          signature: "Your Friend",
        },
      },
      {
        type: "gallery",
        order: 2,
        content: {
          title: "Our Memories",
          subtitle: "A collection of our favorite moments together",
        },
      },
    ],
    metadata: {
      title: theme === "birthday" 
        ? "Birthday Celebration" 
        : theme === "anniversary"
        ? "Anniversary Memories"
        : "Special Celebration",
      description: "A personalized website created with love",
      recipientName: "You",
      occasion: theme,
      createdAt: new Date(),
    },
    colorPalette: {
      primary: "#A78BFA",
      secondary: "#C4B5FD",
      accent: "#E9D5FF",
      background: "#FAF5FF",
      text: "#1E293B",
    },
  };
}

function detectThemeFromPrompt(prompt: string): Theme {
  const lower = prompt.toLowerCase();
  
  if (lower.includes("birthday") || lower.includes("bday")) {
    return "birthday";
  }
  if (lower.includes("anniversary") || lower.includes("anni")) {
    return "anniversary";
  }
  if (lower.includes("friend") || lower.includes("bff")) {
    return "friendship";
  }
  if (lower.includes("baby") || lower.includes("newborn") || lower.includes("birth")) {
    return "newborn";
  }
  
  return "general";
}

