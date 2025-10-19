"use client";

import { useState } from "react";
import { TemplateComposer } from "@/components/preview/TemplateComposer";
import { GeneratedSiteConfig } from "@/lib/types";

const DEMO_SITE: GeneratedSiteConfig = {
  theme: "birthday",
  metadata: {
    title: "Happy Birthday Sarah!",
    description: "A special website just for you",
    recipientName: "Sarah",
    occasion: "birthday",
    createdAt: new Date(),
  },
  colorPalette: {
    primary: "#A78BFA",
    secondary: "#C4B5FD",
    accent: "#E9D5FF",
    background: "#FAF5FF",
    text: "#2E1A47",
  },
  pages: [
    {
      type: "hero",
      order: 0,
      content: {
        title: "Happy Birthday Sarah!",
        subtitle: "Another year of amazing adventures",
        message: "Today we celebrate you and all the incredible moments we've shared together!",
      },
    },
    {
      type: "letter",
      order: 1,
      content: {
        title: "A Letter for You",
        body: "Dear Sarah,\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        signature: "With love, Alex",
      },
    },
    {
      type: "gallery",
      order: 2,
      content: {
        title: "Our Memories",
        subtitle: "Captured moments together",
      },
    },
    {
      type: "timeline",
      order: 3,
      content: {
        title: "Our Journey",
        events: [
          {
            date: "January 2020",
            title: "First Meeting",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            date: "Summer 2020",
            title: "Road Trip Adventure",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          {
            date: "December 2020",
            title: "Holiday Celebration",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
          {
            date: "March 2021",
            title: "New Adventures Begin",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
        ],
      },
    },
    {
      type: "garden",
      order: 4,
      content: {
        title: "Plant a Garden of Love",
        subtitle: "Click to plant flowers and watch them grow",
        message: "Every flower represents a beautiful memory we've created together.",
      },
    },
    {
      type: "music",
      order: 5,
      content: {
        title: "Your Special Playlist",
        description: "Songs that remind me of you",
        playlist: [
          { title: "Happy Birthday Song", artist: "The Celebrators", duration: "3:45" },
          { title: "Best Day Ever", artist: "Joy Makers", duration: "4:12" },
          { title: "Celebration Time", artist: "Party Band", duration: "3:28" },
          { title: "You're Amazing", artist: "The Compliments", duration: "4:01" },
        ],
      },
    },
    {
      type: "travel",
      order: 6,
      content: {
        title: "Places We've Been",
        subtitle: "Our adventure map",
        locations: [
          {
            name: "Paris",
            x: 52,
            y: 35,
            emoji: "🗼",
            story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The Eiffel Tower at sunset was absolutely breathtaking.",
          },
          {
            name: "Tokyo",
            x: 85,
            y: 42,
            emoji: "🗾",
            story: "Sed do eiusmod tempor incididunt ut labore. Cherry blossoms and amazing ramen adventures throughout the city.",
          },
          {
            name: "New York",
            x: 25,
            y: 38,
            emoji: "🗽",
            story: "Ut enim ad minim veniam, quis nostrud. The city that never sleeps gave us memories that will last forever.",
          },
        ],
      },
    },
    {
      type: "recipes",
      order: 7,
      content: {
        title: "Our Recipe Collection",
        subtitle: "Dishes we love to make together",
        recipes: [
          {
            name: "Sarah's Famous Chocolate Cake",
            emoji: "🎂",
            time: "1 hour",
            servings: "8 people",
            ingredients: [
              "2 cups all-purpose flour",
              "1¾ cups granulated sugar",
              "¾ cup cocoa powder",
              "2 teaspoons baking soda",
              "1 teaspoon baking powder",
              "1 teaspoon salt",
              "2 eggs",
              "1 cup strong black coffee",
              "1 cup buttermilk",
              "½ cup vegetable oil",
              "1 teaspoon vanilla extract",
            ],
            instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Preheat oven to 350°F. Mix dry ingredients in a large bowl. In another bowl, whisk together eggs, coffee, buttermilk, oil, and vanilla. Gradually add wet ingredients to dry ingredients, mixing until just combined. Pour into prepared pans and bake for 30-35 minutes. Let cool completely before frosting.",
            note: "The secret ingredient is love (and good quality cocoa!)",
          },
          {
            name: "Perfect Sunday Pancakes",
            emoji: "🥞",
            time: "20 mins",
            servings: "4 people",
            ingredients: [
              "2 cups all-purpose flour",
              "2 tablespoons sugar",
              "2 teaspoons baking powder",
              "½ teaspoon salt",
              "2 eggs",
              "1½ cups milk",
              "¼ cup melted butter",
              "1 teaspoon vanilla extract",
            ],
            instructions: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Whisk together flour, sugar, baking powder, and salt. In a separate bowl, beat eggs and add milk, melted butter, and vanilla. Pour wet ingredients into dry ingredients and stir until just combined (lumps are okay!). Cook on a hot griddle until bubbles form, then flip and cook until golden brown.",
            note: "Our lazy Sunday morning tradition",
          },
        ],
      },
    },
    {
      type: "quotes",
      order: 8,
      content: {
        title: "Words That Inspire",
        subtitle: "Quotes that remind me of you",
        quotes: [
          {
            text: "In the end, we only regret the chances we didn't take, the relationships we were afraid to have, and the decisions we waited too long to make.",
            author: "Lewis Carroll",
            category: "courage",
          },
          {
            text: "Be yourself; everyone else is already taken. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            author: "Oscar Wilde",
            category: "authenticity",
          },
          {
            text: "The best time to plant a tree was 20 years ago. The second best time is now. Sed do eiusmod tempor incididunt ut labore.",
            author: "Chinese Proverb",
            category: "action",
          },
        ],
      },
    },
    {
      type: "memories",
      order: 9,
      content: {
        title: "Memory Matching Game",
        subtitle: "Find the pairs and relive our moments",
        message: "Each card represents a special memory we share!",
        memories: [
          { emoji: "☀️", title: "First Day", text: "When it all began..." },
          { emoji: "🎉", title: "Celebration", text: "That epic party!" },
          { emoji: "✈️", title: "Adventure", text: "Our first trip" },
          { emoji: "🎂", title: "Birthday", text: "Best birthday ever" },
          { emoji: "🌟", title: "Achievement", text: "You did it!" },
          { emoji: "💕", title: "Special Moment", text: "When we knew" },
        ],
      },
    },
  ],
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 text-center shadow-lg">
        <p className="text-sm font-medium">
          🎨 <strong>DEMO MODE</strong> - Preview of all templates with sample content
        </p>
      </div>

      <div className="pt-12">
        <TemplateComposer site={DEMO_SITE} />
      </div>
    </div>
  );
}

