"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Check, Loader2 } from "lucide-react";
import ImageUploader from "@/components/form/ImageUploader";
import { ProcessedImage } from "@/lib/imageProcessor";
import { getTemplateQuestions, type TemplateQuestion } from "@/lib/dynamicTemplateQuestions";

// Step 1: Name & Occasion with Sample Prompts
const OCCASION_PROMPTS = [
  {
    occasion: "Birthday",
    image: "/images/occasions/birthday.jpg",
    samples: [
      "Best friend who loves gaming and pizza",
      "Sister who's passionate about art and travel",
      "Dad who enjoys cooking and classic rock music",
    ],
  },
  {
    occasion: "Anniversary",
    image: "/images/occasions/anniversary.jpg",
    samples: [
      "Partner who loves stargazing and poetry",
      "Spouse who enjoys hiking and photography",
      "Love who adores coffee and cozy mornings",
    ],
  },
  {
    occasion: "Friendship",
    image: "/images/occasions/friendship.jpg",
    samples: [
      "Best friend who's obsessed with K-pop and bubble tea",
      "Friend who loves books and rainy days",
      "Buddy who enjoys skateboarding and indie music",
    ],
  },
  {
    occasion: "Congratulations",
    image: "/images/occasions/congratulations.jpg",
    samples: [
      "Graduate who's starting their dream job",
      "Friend who just bought their first home",
      "Sister who achieved a personal milestone",
    ],
  },
  {
    occasion: "Just Because",
    image: "/images/occasions/just-because.jpg",
    samples: [
      "Someone special who deserves appreciation",
      "Friend who's been there through everything",
      "Person who brightens every day",
    ],
  },
];

// Step 2: Template Selection (keeping emojis for now - will need icons)
const AVAILABLE_TEMPLATES = [
  { id: "hero", name: "Welcome Page", icon: "🏠", description: "Beautiful landing page", required: true },
  { id: "letter", name: "Personal Letter", icon: "💌", description: "Heartfelt message" },
  { id: "gallery", name: "Photo Gallery", icon: "📸", description: "Share memories" },
  { id: "timeline", name: "Journey Timeline", icon: "📅", description: "Milestones together" },
  { id: "music", name: "Music Player", icon: "🎵", description: "Special playlist" },
  { id: "garden", name: "Flower Garden", icon: "🌸", description: "Interactive planting" },
  { id: "travel", name: "Travel Map", icon: "✈️", description: "Places visited" },
  { id: "recipes", name: "Recipe Book", icon: "🍳", description: "Favorite dishes" },
  { id: "quotes", name: "Inspiration Quotes", icon: "💭", description: "Motivational words" },
  { id: "memories", name: "Memory Game", icon: "🎴", description: "Fun matching game" },
];

// Step 3: Color Schemes (keeping emojis for now)
const COLOR_SCHEMES = [
  {
    name: "Lavender Dreams",
    icon: "💜",
    primary: "#A78BFA",
    secondary: "#C4B5FD",
    accent: "#E9D5FF",
    background: "#FAF5FF",
  },
  {
    name: "Sunset Vibes",
    icon: "🌅",
    primary: "#FF6B9D",
    secondary: "#FFA94D",
    accent: "#FFD93D",
    background: "#FFF5F0",
  },
  {
    name: "Ocean Breeze",
    icon: "🌊",
    primary: "#4ECDC4",
    secondary: "#44A08D",
    accent: "#95E1D3",
    background: "#F0F8FF",
  },
  {
    name: "Forest Green",
    icon: "🌲",
    primary: "#059669",
    secondary: "#34D399",
    accent: "#A7F3D0",
    background: "#F0FDF4",
  },
  {
    name: "Rose Garden",
    icon: "🌹",
    primary: "#E11D48",
    secondary: "#FB7185",
    accent: "#FEE2E2",
    background: "#FFF1F2",
  },
  {
    name: "Midnight Sky",
    icon: "🌙",
    primary: "#3B82F6",
    secondary: "#60A5FA",
    accent: "#DBEAFE",
    background: "#EFF6FF",
  },
  {
    name: "Sunshine Yellow",
    icon: "☀️",
    primary: "#F59E0B",
    secondary: "#FCD34D",
    accent: "#FEF3C7",
    background: "#FFFBEB",
  },
  {
    name: "Cherry Blossom",
    icon: "🌸",
    primary: "#EC4899",
    secondary: "#F9A8D4",
    accent: "#FCE7F3",
    background: "#FDF2F8",
  },
];

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1: Name & Occasion
  const [recipientName, setRecipientName] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [userDescription, setUserDescription] = useState("");

  // Step 2: Templates
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(["hero"]);
  const [recommendedTemplates, setRecommendedTemplates] = useState<string[]>([]);
  const [recommendationReasoning, setRecommendationReasoning] = useState("");
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Step 3: Colors
  const [selectedColorScheme, setSelectedColorScheme] = useState(COLOR_SCHEMES[0]);

  // Step 4: Content
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [templateContent, setTemplateContent] = useState<Record<string, any>>({});
  const [refineWithAI, setRefineWithAI] = useState(true);

  const totalSteps = 4;

  const handleNext = async () => {
    if (step < totalSteps) {
      // If moving from Step 1 to Step 2, get AI recommendations
      if (step === 1) {
        await fetchTemplateRecommendations();
      }
      setStep(step + 1);
    }
  };

  const fetchTemplateRecommendations = async () => {
    setIsLoadingRecommendations(true);
    try {
      const response = await fetch("/api/suggest-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName,
          occasion: selectedOccasion,
          description: userDescription,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.recommended) {
        setRecommendedTemplates(data.recommended);
        setRecommendationReasoning(data.reasoning || "");
        // Auto-select recommended templates
        setSelectedTemplates(data.recommended.slice(0, 4)); // Select top 4 recommendations
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      // Keep default selection if API fails
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleTemplate = (templateId: string) => {
    const template = AVAILABLE_TEMPLATES.find((t) => t.id === templateId);
    if (template?.required) return;

    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter((id) => id !== templateId));
    } else {
      setSelectedTemplates([...selectedTemplates, templateId]);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName,
          occasion: selectedOccasion,
          originalPrompt: userDescription,
          selectedTemplates,
          templateContent,
          images,
          colorScheme: selectedColorScheme,
          refineWithAI,
        }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("generatedSite", JSON.stringify({ site: data.site, demo: data.demo || false }));
        router.push("/preview");
      } else {
        // Show user-friendly error
        if (data.retryable) {
          setErrorMessage(data.error || "Something went wrong. Please try again!");
        } else {
          setErrorMessage(data.error || "Failed to generate website. Please check your inputs.");
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return recipientName.trim() && selectedOccasion;
    if (step === 2) return selectedTemplates.length > 0;
    if (step === 3) return selectedColorScheme;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700">
              Step {step} of {totalSteps}
            </h2>
            <span className="text-xs text-slate-500">
              {step === 1 && "Tell us about them"}
              {step === 2 && "Choose templates"}
              {step === 3 && "Pick colors"}
              {step === 4 && "Add your content"}
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: Name & Occasion */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    Who's this gift for? 🎁
                  </h1>
                  <p className="text-lg text-slate-600">
                    Tell us about them and we'll create something magical
                  </p>
                </div>

                {/* Name Input */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Their Name *
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g., Sarah, Mom, Alex..."
                    className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Occasion Selection */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    What's the Occasion? *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {OCCASION_PROMPTS.map((occ) => (
                      <button
                        key={occ.occasion}
                        onClick={() => setSelectedOccasion(occ.occasion)}
                        className={`p-4 rounded-xl border-2 transition-all text-left overflow-hidden ${
                          selectedOccasion === occ.occasion
                            ? "border-purple-500 bg-purple-50 shadow-md"
                            : "border-slate-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="w-12 h-12 mb-3 rounded-lg overflow-hidden bg-white">
                          <img
                            src={occ.image}
                            alt={occ.occasion}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-semibold text-slate-900">{occ.occasion}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description with Sample Prompts */}
                {selectedOccasion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-lg"
                  >
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Tell us more about them (optional)
                    </label>
                    <textarea
                      value={userDescription}
                      onChange={(e) => setUserDescription(e.target.value)}
                      placeholder="e.g., loves music, enjoys hiking, coffee enthusiast..."
                      rows={3}
                      className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    />

                    {/* Sample Prompts */}
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-500 mb-2">
                        💡 Need inspiration? Try these:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {OCCASION_PROMPTS.find((o) => o.occasion === selectedOccasion)?.samples.map(
                          (sample, idx) => (
                            <button
                              key={idx}
                              onClick={() => setUserDescription(sample)}
                              className="px-3 py-1.5 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 transition-colors"
                            >
                              {sample}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* STEP 2: Template Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    Choose Your Pages 📄
                  </h1>
                  <p className="text-lg text-slate-600">
                    We've selected templates perfect for {recipientName}
                  </p>
                </div>

                {/* AI Reasoning */}
                {recommendationReasoning && !isLoadingRecommendations && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200"
                  >
                    <p className="text-sm text-purple-900">
                      <strong className="font-semibold">✨ AI Recommendation:</strong>{" "}
                      {recommendationReasoning}
                    </p>
                  </motion.div>
                )}

                {/* Recommended Templates */}
                {recommendedTemplates.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-shrink-0 w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                      <h3 className="text-xl font-bold text-slate-900">
                        Recommended For You
                      </h3>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-purple-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {AVAILABLE_TEMPLATES.filter((t) =>
                        recommendedTemplates.includes(t.id)
                      ).map((template) => {
                        const isSelected = selectedTemplates.includes(template.id);
                        const isRequired = template.required;

                        return (
                          <button
                            key={template.id}
                            onClick={() => toggleTemplate(template.id)}
                            disabled={isRequired}
                            className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                              isSelected
                                ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl scale-[1.02]"
                                : "border-purple-200 bg-white hover:border-purple-400 hover:shadow-lg"
                            } ${isRequired ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            {/* Recommended badge */}
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                                ⭐ AI Pick
                              </span>
                            </div>

                            <div className="flex items-start justify-between">
                              <div className="flex-1 pr-20">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-4xl">{template.icon}</span>
                                  <div>
                                    <h3 className="font-bold text-lg text-slate-900">
                                      {template.name}
                                      {isRequired && (
                                        <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                          Required
                                        </span>
                                      )}
                                    </h3>
                                    <p className="text-sm text-slate-600">{template.description}</p>
                                  </div>
                                </div>
                              </div>
                              {isSelected && (
                                <div className="flex-shrink-0 absolute bottom-3 right-3">
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Other Templates */}
                {recommendedTemplates.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-shrink-0 w-1 h-6 bg-slate-300 rounded-full" />
                      <h3 className="text-lg font-semibold text-slate-700">
                        More Options
                      </h3>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {AVAILABLE_TEMPLATES.filter(
                        (t) => !recommendedTemplates.includes(t.id)
                      ).map((template) => {
                        const isSelected = selectedTemplates.includes(template.id);
                        const isRequired = template.required;

                        return (
                          <button
                            key={template.id}
                            onClick={() => toggleTemplate(template.id)}
                            disabled={isRequired}
                            className={`p-6 rounded-2xl border-2 text-left transition-all ${
                              isSelected
                                ? "border-purple-500 bg-purple-50 shadow-lg scale-[1.02]"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                            } ${isRequired ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-4xl">{template.icon}</span>
                                  <div>
                                    <h3 className="font-bold text-lg text-slate-900">
                                      {template.name}
                                      {isRequired && (
                                        <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                          Required
                                        </span>
                                      )}
                                    </h3>
                                    <p className="text-sm text-slate-600">{template.description}</p>
                                  </div>
                                </div>
                              </div>
                              {isSelected && (
                                <div className="flex-shrink-0">
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Loading state during recommendations */}
                {isLoadingRecommendations && (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-3" />
                    <p className="text-slate-600">Analyzing your preferences...</p>
                  </div>
                )}

                <div className="text-center text-sm text-slate-600 pt-4 border-t border-slate-200">
                  Selected: {selectedTemplates.length} page{selectedTemplates.length !== 1 ? "s" : ""}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Color Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    Pick Your Colors 🎨
                  </h1>
                  <p className="text-lg text-slate-600">
                    Choose a color scheme that matches their vibe
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COLOR_SCHEMES.map((scheme) => {
                    const isSelected = selectedColorScheme.name === scheme.name;

                    return (
                      <button
                        key={scheme.name}
                        onClick={() => setSelectedColorScheme(scheme)}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          isSelected
                            ? "border-purple-500 shadow-lg scale-[1.02]"
                            : "border-slate-200 bg-white hover:border-purple-300 hover:shadow-md"
                        }`}
                        style={{
                          background: isSelected
                            ? `linear-gradient(135deg, ${scheme.background} 0%, ${scheme.accent} 100%)`
                            : "white",
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{scheme.icon}</span>
                            <h3 className="font-bold text-lg text-slate-900">{scheme.name}</h3>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <div
                            className="w-12 h-12 rounded-lg shadow-inner"
                            style={{ backgroundColor: scheme.primary }}
                          />
                          <div
                            className="w-12 h-12 rounded-lg shadow-inner"
                            style={{ backgroundColor: scheme.secondary }}
                          />
                          <div
                            className="w-12 h-12 rounded-lg shadow-inner"
                            style={{ backgroundColor: scheme.accent }}
                          />
                          <div
                            className="w-12 h-12 rounded-lg shadow-inner border-2 border-slate-200"
                            style={{ backgroundColor: scheme.background }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Content Input */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    Add Your Content ✍️
                  </h1>
                  <p className="text-lg text-slate-600">
                    Fill in what you want to say (we'll make it perfect!)
                  </p>
                </div>

                {/* Hero Content (Always Required) */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🏠</span>
                    <h3 className="font-bold text-lg">Welcome Page</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Main Title (short & impactful)
                      </label>
                      <input
                        type="text"
                        value={templateContent.hero?.title || ""}
                        onChange={(e) =>
                          setTemplateContent({
                            ...templateContent,
                            hero: { ...templateContent.hero, title: e.target.value },
                          })
                        }
                        placeholder={`Happy ${selectedOccasion} ${recipientName}!`}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subtitle (one line)
                      </label>
                      <input
                        type="text"
                        value={templateContent.hero?.subtitle || ""}
                        onChange={(e) =>
                          setTemplateContent({
                            ...templateContent,
                            hero: { ...templateContent.hero, subtitle: e.target.value },
                          })
                        }
                        placeholder="Something special just for you..."
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Welcome Message
                      </label>
                      <textarea
                        value={templateContent.hero?.message || ""}
                        onChange={(e) =>
                          setTemplateContent({
                            ...templateContent,
                            hero: { ...templateContent.hero, message: e.target.value },
                          })
                        }
                        placeholder="A warm welcome message..."
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                 {/* Letter Content */}
                 {selectedTemplates.includes("letter") && (
                   <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-300">
                     <div className="flex items-center gap-2 mb-4">
                       <span className="text-2xl">💌</span>
                       <h3 className="font-bold text-lg">Personal Letter</h3>
                       {recommendedTemplates.includes("letter") && (
                         <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
                           ⭐ AI Pick
                         </span>
                       )}
                     </div>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-slate-700 mb-2">
                           Your Message
                         </label>
                         <textarea
                           value={templateContent.letter?.body || ""}
                           onChange={(e) =>
                             setTemplateContent({
                               ...templateContent,
                               letter: { ...templateContent.letter, body: e.target.value },
                             })
                           }
                           placeholder="Dear [Name], write your heartfelt message here..."
                           rows={6}
                           className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-slate-700 mb-2">
                           Sign-off
                         </label>
                         <input
                           type="text"
                           value={templateContent.letter?.signature || ""}
                           onChange={(e) =>
                             setTemplateContent({
                               ...templateContent,
                               letter: { ...templateContent.letter, signature: e.target.value },
                             })
                           }
                           placeholder="With love, [Your name]"
                           className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                         />
                       </div>
                     </div>
                   </div>
                 )}

                 {/* Dynamic Template Questions */}
                 {selectedTemplates.filter(t => t !== "hero" && t !== "letter" && t !== "gallery" && t !== "memories").map((templateId) => {
                   const questions = getTemplateQuestions(templateId, userDescription);
                   const template = AVAILABLE_TEMPLATES.find(t => t.id === templateId);
                   
                   if (questions.length === 0) return null;
 
                   return (
                     <div key={templateId} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-300">
                       <div className="flex items-center gap-2 mb-4">
                         <span className="text-2xl">{template?.icon}</span>
                         <h3 className="font-bold text-lg">{template?.name}</h3>
                         {recommendedTemplates.includes(templateId) && (
                           <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
                             ⭐ AI Pick
                           </span>
                         )}
                       </div>
                       <p className="text-sm text-slate-600 mb-4">{template?.description}</p>
                       
                       <div className="space-y-4">
                         {questions.map((question) => (
                           <div key={question.id}>
                             <label className="block text-sm font-medium text-slate-700 mb-2">
                               {question.label}
                               {question.required && <span className="text-red-500 ml-1">*</span>}
                             </label>
                             
                             {question.type === "textarea" ? (
                               <textarea
                                 value={templateContent[templateId]?.[question.id] || ""}
                                 onChange={(e) =>
                                   setTemplateContent({
                                     ...templateContent,
                                     [templateId]: {
                                       ...templateContent[templateId],
                                       [question.id]: e.target.value,
                                     },
                                   })
                                 }
                                 placeholder={question.placeholder}
                                 rows={4}
                                 className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                               />
                             ) : question.type === "select" ? (
                               <select
                                 value={templateContent[templateId]?.[question.id] || ""}
                                 onChange={(e) =>
                                   setTemplateContent({
                                     ...templateContent,
                                     [templateId]: {
                                       ...templateContent[templateId],
                                       [question.id]: e.target.value,
                                     },
                                   })
                                 }
                                 className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white"
                               >
                                 <option value="">Select...</option>
                                 {question.options?.map((option) => (
                                   <option key={option} value={option}>
                                     {option}
                                   </option>
                                 ))}
                               </select>
                             ) : (
                               <input
                                 type="text"
                                 value={templateContent[templateId]?.[question.id] || ""}
                                 onChange={(e) =>
                                   setTemplateContent({
                                     ...templateContent,
                                     [templateId]: {
                                       ...templateContent[templateId],
                                       [question.id]: e.target.value,
                                     },
                                   })
                                 }
                                 placeholder={question.placeholder}
                                 className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                               />
                             )}
                             
                             {question.helperText && (
                               <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                 <Sparkles className="w-3 h-3" />
                                 {question.helperText}
                               </p>
                             )}
                           </div>
                         ))}
                       </div>
                     </div>
                   );
                 })}

                {/* Photos Upload */}
                {(selectedTemplates.includes("gallery") || selectedTemplates.includes("memories")) && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">📸</span>
                      <h3 className="font-bold text-lg">Upload Photos</h3>
                    </div>
                    <ImageUploader images={images} onImagesChange={setImages} />
                  </div>
                )}

                {/* AI Refinement Toggle */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-purple-900">AI Content Refinement</h4>
                      </div>
                      <p className="text-sm text-slate-700 mb-3">
                        {refineWithAI
                          ? "AI will polish your text, improve flow, and add personalized details based on interests (like song lyrics for music lovers, movie dialogues for cinema fans, etc.)"
                          : "Your content will be used exactly as written - no changes from AI."}
                      </p>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={refineWithAI}
                          onChange={(e) => setRefineWithAI(e.target.checked)}
                          className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-slate-900">
                          Enable AI refinement & personalization
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-2xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-1">Oops! Something went wrong</h3>
                  <p className="text-red-700">{errorMessage}</p>
                  <button
                    onClick={() => setErrorMessage("")}
                    className="mt-3 text-sm font-semibold text-red-700 hover:text-red-900 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed() || isLoadingRecommendations}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {isLoadingRecommendations && step === 1 ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Website
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
