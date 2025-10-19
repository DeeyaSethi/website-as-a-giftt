"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Theme } from "@/lib/types";
import { getThemeColors } from "@/lib/utils";

interface RecipesTemplateProps {
  content: Record<string, any>;
  theme: Theme;
  colorPalette?: any;
}

const DEFAULT_RECIPES = [
  {
    name: "Grandma's Chocolate Chip Cookies",
    emoji: "🍪",
    time: "25 mins",
    servings: "24 cookies",
    ingredients: ["2 cups flour", "1 cup butter", "2 eggs", "1 cup chocolate chips", "1 tsp vanilla"],
    instructions: "Mix butter and sugar until fluffy. Add eggs and vanilla. Fold in flour and chocolate chips. Bake at 350°F for 12 minutes.",
    note: "The recipe that started it all!",
  },
  {
    name: "Perfect Pasta Carbonara",
    emoji: "🍝",
    time: "20 mins",
    servings: "4 people",
    ingredients: ["400g spaghetti", "200g pancetta", "4 eggs", "100g parmesan", "Black pepper"],
    instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese. Toss hot pasta with pancetta, then egg mixture. Serve immediately!",
    note: "Our anniversary dinner tradition",
  },
  {
    name: "Summer Berry Smoothie",
    emoji: "🥤",
    time: "5 mins",
    servings: "2 glasses",
    ingredients: ["1 cup strawberries", "1 cup blueberries", "1 banana", "1 cup yogurt", "Honey"],
    instructions: "Blend all ingredients until smooth. Add ice if desired. Garnish with fresh berries.",
    note: "Morning energy boost!",
  },
  {
    name: "Homemade Pizza Night",
    emoji: "🍕",
    time: "45 mins",
    servings: "4 people",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Your favorite toppings", "Olive oil"],
    instructions: "Roll out dough. Spread sauce. Add cheese and toppings. Bake at 450°F for 15 minutes until golden and bubbly.",
    note: "Friday night tradition",
  },
];

export function RecipesTemplate({ content, theme, colorPalette }: RecipesTemplateProps) {
  const colors = getThemeColors(theme, colorPalette);
  const recipes = content.recipes || DEFAULT_RECIPES;
  const [currentRecipe, setCurrentRecipe] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Extract personalized data (optional - only if provided)
  const cuisineType = content.cuisineType || null;
  const cookingMemory = content.cookingMemory || null;

  const nextRecipe = () => {
    setIsFlipped(false);
    setCurrentRecipe((prev) => (prev + 1) % recipes.length);
  };

  const prevRecipe = () => {
    setIsFlipped(false);
    setCurrentRecipe((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const recipe = recipes[currentRecipe];

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, white 100%)`,
      }}
    >
      {/* Floating food emojis */}
      {["🍓", "🥕", "🍋", "🌶️", "🧄", "🌿"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-10"
          initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <ChefHat className="w-16 h-16 mx-auto" style={{ color: colors.primary }} />
          </div>
          
          {/* Cuisine Type Tag */}
          {cuisineType && (
            <div className="mb-4">
              <span
                className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md border-2 inline-block"
                style={{
                  backgroundColor: `${colors.primary}20`,
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                🍽️ {cuisineType} Cuisine
              </span>
            </div>
          )}
          
          <h2
            className="text-5xl md:text-6xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {content.title || "Our Recipe Collection"}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-slate-600">{content.subtitle}</p>
          )}
          
          {/* Cooking Memory */}
          {cookingMemory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-2xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: `${colors.accent}60` }}>
                <div className="text-2xl mb-2">👨‍🍳</div>
                <p className="text-base italic text-slate-700 leading-relaxed">
                  {cookingMemory}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Recipe Card with Flip */}
        <div className="relative" style={{ perspective: "1000px", minHeight: "600px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRecipe}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.6s",
              }}
            >
              {/* Front of Card */}
              <div
                className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 ${
                  isFlipped ? "hidden" : "block"
                }`}
              >
                <div className="text-center mb-8">
                  <div className="text-8xl mb-4">{recipe.emoji}</div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center justify-center gap-6 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span style={{ color: colors.primary }}>📝</span> Ingredients
                    </h4>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 text-slate-700"
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                          />
                          {ingredient}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsFlipped(true)}
                    className="w-full py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: colors.primary }}
                  >
                    👉 Flip for Instructions
                  </button>
                </div>

                {recipe.note && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
                    <p className="text-sm text-amber-800 italic">💭 {recipe.note}</p>
                  </div>
                )}
              </div>

              {/* Back of Card */}
              <div
                className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 ${
                  isFlipped ? "block" : "hidden"
                }`}
                style={{ transform: "rotateY(180deg)" }}
              >
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span style={{ color: colors.primary }}>👨‍🍳</span> How to Make It
                </h4>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {recipe.instructions}
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setIsFlipped(false)}
                    className="w-full py-4 rounded-xl font-semibold border-2 hover:shadow-lg transition-all"
                    style={{
                      borderColor: colors.primary,
                      color: colors.primary,
                    }}
                  >
                    👈 Back to Ingredients
                  </button>

                  <div className="text-center text-slate-500 text-sm">
                    Recipe {currentRecipe + 1} of {recipes.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevRecipe}
              disabled={recipes.length <= 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: `${colors.primary}20`,
                color: colors.primary,
              }}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-2">
              {recipes.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentRecipe(idx);
                  }}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    backgroundColor:
                      idx === currentRecipe ? colors.primary : `${colors.primary}30`,
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextRecipe}
              disabled={recipes.length <= 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: `${colors.primary}20`,
                color: colors.primary,
              }}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message */}
        {content.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8"
          >
            <p className="text-xl text-slate-700 leading-relaxed">
              {content.message}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

