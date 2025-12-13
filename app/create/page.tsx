"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Check, Loader2, ChevronDown, Trash2, Home, Mail, Music, Camera, Flower, Plane, Gamepad2, Cpu } from "lucide-react";
import { useEffect } from "react";
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

// Step 2: Template Selection
const AVAILABLE_TEMPLATES = [
  { id: "hero", name: "Welcome Page", icon: "🏠", description: "Beautiful landing page", required: true },
  { id: "letter", name: "Personal Letter", icon: "💌", description: "Heartfelt message" },
  { id: "gallery", name: "Photo Gallery", icon: "📸", description: "Share memories" },
  { id: "music", name: "Music Player", icon: "🎵", description: "Special playlist" },
  { id: "garden", name: "Flower Garden", icon: "🌸", description: "Interactive planting" },
  { id: "travel", name: "Travel Stories", icon: "✈️", description: "Places and memories" },
  { id: "memories", name: "Memory Showcase", icon: "🎴", description: "Beautiful memories display" },
  { id: "techfacts", name: "Tech Facts", icon: "💻", description: "Roast your geeky friend with nerdy trivia" },
];

// Step 3: Color Schemes (keeping emojis for now)
// Template Icons Mapping
const TEMPLATE_ICONS: Record<string, any> = {
  hero: Home,
  letter: Mail,
  gallery: Camera,
  music: Music,
  garden: Flower,
  travel: Plane,
  memories: Gamepad2,
  techfacts: Cpu,
};

const TEMPLATE_COLORS: Record<string, { from: string; to: string; icon: string }> = {
  hero: { from: "from-purple-100", to: "to-pink-100", icon: "text-purple-600" },
  letter: { from: "from-pink-100", to: "to-rose-100", icon: "text-pink-600" },
  gallery: { from: "from-blue-100", to: "to-cyan-100", icon: "text-blue-600" },
  music: { from: "from-violet-100", to: "to-purple-100", icon: "text-violet-600" },
  garden: { from: "from-green-100", to: "to-emerald-100", icon: "text-green-600" },
  travel: { from: "from-sky-100", to: "to-blue-100", icon: "text-sky-600" },
  memories: { from: "from-rose-100", to: "to-pink-100", icon: "text-rose-600" },
  techfacts: { from: "from-cyan-100", to: "to-teal-100", icon: "text-cyan-600" },
};

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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["hero"]));
  const [skippedSections, setSkippedSections] = useState<Set<string>>(new Set());

  // Step 3: Colors
  const [selectedColorScheme, setSelectedColorScheme] = useState(COLOR_SCHEMES[0]);

  // Step 4: Content
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [templateContent, setTemplateContent] = useState<Record<string, any>>({});
  const [refineWithAI, setRefineWithAI] = useState(true);

  // Project State
  const [isSaving, setIsSaving] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  const totalSteps = 4;

  // Load existing project if applicable
  useEffect(() => {
    // Check URL params
    const searchParams = new URLSearchParams(window.location.search);
    const pId = searchParams.get('projectId');

    if (pId) {
      setProjectId(pId);
      fetchProject(pId);
    }
  }, []);

  const fetchProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (res.ok) {
        const { project } = await res.json();
        const config = project.config;

        // Restore State
        if (config.recipientName) setRecipientName(config.recipientName);
        if (config.occasion) setSelectedOccasion(config.occasion);
        if (config.originalPrompt) setUserDescription(config.originalPrompt);
        if (config.selectedTemplates) setSelectedTemplates(config.selectedTemplates);
        if (config.colorScheme) setSelectedColorScheme(config.colorScheme);
        if (config.templateContent) setTemplateContent(config.templateContent);
        if (config.images) setImages(config.images);

        // If we are revisiting, maybe jump to last step or first? Let's stay at 1 unless we add a persistent step tracker
      }
    } catch (err) {
      console.error("Failed to load project", err);
    }
  };

  const saveProject = async (silent = false) => {
    if (!recipientName) {
      setErrorMessage("Please at least enter a name before saving.");
      return;
    }

    setIsSaving(true);
    try {
      const projectData = {
        title: `${recipientName}'s ${selectedOccasion || 'Gift'}`,
        status: 'draft',
        config: {
          recipientName,
          occasion: selectedOccasion,
          originalPrompt: userDescription,
          selectedTemplates,
          templateContent,
          colorScheme: selectedColorScheme,
          images, // Cloudinary URLs are already here if uploaded
        }
      };

      const url = projectId ? `/api/projects/${projectId}` : '/api/projects';
      const method = projectId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.project) {
          setProjectId(data.project._id);
          // Update URL without reload
          window.history.replaceState(null, '', `?projectId=${data.project._id}`);
          if (!silent) alert("Project saved successfully!");
        }
      } else {
        if (res.status === 401) {
          if (!silent) alert("Please login to save your work.");
          // Redirect to login? Or open modal? For now just alert.
        } else {
          throw new Error("Failed to save");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to save project.");
    } finally {
      setIsSaving(false);
    }
  };

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

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleSkipSection = (sectionId: string) => {
    setSkippedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const removeTemplate = (templateId: string) => {
    // Remove from selected templates
    setSelectedTemplates((prev) => prev.filter((id) => id !== templateId));
    // Clean up any content for this template
    setTemplateContent((prev) => {
      const newContent = { ...prev };
      delete newContent[templateId];
      return newContent;
    });
    // Remove from expanded and skipped sections
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(templateId);
      return newSet;
    });
    setSkippedSections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(templateId);
      return newSet;
    });
  };

  // Autofill helpers
  const getHeroTitleSuggestions = () => {
    const name = recipientName || "[Name]";
    const occasion = selectedOccasion.toLowerCase();
    return [
      `Happy ${selectedOccasion} ${name}!`,
      `${name}, You're Amazing!`,
      `For You, ${name}`,
      `Celebrating ${name}`,
      `${name}'s Special Day`,
    ];
  };

  const getHeroSubtitleSuggestions = () => {
    return [
      "Something special just for you",
      "Made with love",
      "You deserve this celebration",
      "Here's to you!",
      "A gift from the heart",
    ];
  };

  const getHeroMessageSuggestions = () => {
    const name = recipientName || "you";
    return [
      `Welcome to your special website, ${name}! I created this just for you.`,
      `Hey ${name}! I wanted to make something unique to celebrate you.`,
      `${name}, you mean so much to me. This website is a small token of my appreciation.`,
      `I hope this brings a smile to your face, ${name}. You deserve all the happiness!`,
    ];
  };

  const getLetterBodySuggestions = () => {
    const name = recipientName || "[Name]";
    const occasion = selectedOccasion.toLowerCase();

    if (occasion.includes("birthday")) {
      return [
        `Dear ${name},\n\nHappy Birthday! I hope this year brings you endless joy and amazing adventures. You're such an incredible person and I'm so grateful to have you in my life.`,
        `Hey ${name}!\n\nWishing you the happiest of birthdays! May all your dreams come true this year. Thank you for being such an amazing friend.`,
      ];
    } else if (occasion.includes("anniversary")) {
      return [
        `My Dearest ${name},\n\nHappy Anniversary! Every moment with you is a treasure. Thank you for all the beautiful memories we've created together.`,
        `To ${name},\n\nAnother year of love, laughter, and unforgettable moments. Here's to many more years together!`,
      ];
    } else if (occasion.includes("friendship")) {
      return [
        `Dear ${name},\n\nI wanted to take a moment to tell you how much your friendship means to me. You've been there through thick and thin, and I'm so grateful.`,
        `Hey ${name}!\n\nJust wanted to remind you how awesome you are! Thanks for being such an amazing friend.`,
      ];
    } else {
      return [
        `Dear ${name},\n\nI wanted to create something special for you to show how much I care. I hope this brings a smile to your face!`,
        `Hey ${name}!\n\nYou're such an incredible person, and I wanted to celebrate that. Thank you for being you!`,
      ];
    }
  };

  const getTechFactsMessageSuggestions = () => {
    const name = recipientName || "you";
    return [
      `Go study, ${name}! 🤓 (Just kidding, you already know all this stuff)`,
      `${name}, stop scrolling and learn something, nerd! 😄`,
      `For ${name}, the ultimate geek who Googles everything (even on Google)`,
      `${name}, may your code compile and your coffee be strong! ☕`,
      `To ${name} - the friend who turns everything into a tech debate 🤖`,
      `${name}, I bet you'll correct half of these facts... and I'm ready for it! 😂`,
    ];
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

      // Auto-save the draft when generating
      // We don't await this to block the UI, but we want it to happen
      saveProject(true).catch(err => console.error("Auto-save failed", err));

      const data = await response.json();

      if (data.success) {
        try {
          // LOG: Check what we received
          console.log('🎨 Generated Site Data:');
          console.log('  Theme:', data.config.theme);
          console.log('  Pages:', data.config.pages?.length);
          console.log('  Images:', data.config.images?.length);

          // Calculate sizes
          const originalSize = JSON.stringify(data.config).length;
          console.log('  Original config size:', (originalSize / 1024).toFixed(2), 'KB');

          // AGGRESSIVE optimization - only use thumbnails to save space
          const optimizedData = {
            ...data.config,
            images: data.config.images?.slice(0, 3).map((img: any) => ({
              id: img.id,
              caption: img.caption,
              variants: {
                thumbnail: img.variants.thumbnail,
                medium: img.variants.thumbnail, // Use thumbnail for medium too
                full: img.variants.thumbnail,    // Use thumbnail for all to save space
              }
            }))
          };

          const optimizedSize = JSON.stringify(optimizedData).length;
          console.log('  Optimized size:', (optimizedSize / 1024).toFixed(2), 'KB');
          console.log('  SessionStorage limit: ~5-10 MB');
          console.log('  Will it fit?', optimizedSize < 5 * 1024 * 1024 ? '✅ YES' : '❌ NO');

          sessionStorage.setItem("generatedSite", JSON.stringify(optimizedData));
          console.log('✅ Successfully stored in sessionStorage!');
          router.push("/preview");
        } catch (storageError: any) {
          // If STILL too large, store minimal data without images
          console.error("❌ Storage quota exceeded even with thumbnails:", storageError);
          console.log("🔄 Trying without images...");

          try {
            const minimalData = {
              theme: data.config.theme,
              colorPalette: data.config.colorPalette,
              pages: data.config.pages,
              metadata: data.config.metadata,
              images: [] // No images
            };

            const minimalSize = JSON.stringify(minimalData).length;
            console.log('  Minimal size (no images):', (minimalSize / 1024).toFixed(2), 'KB');

            sessionStorage.setItem("generatedSite", JSON.stringify(minimalData));
            console.log('✅ Stored without images - preview will work but no photos');
            router.push("/preview");
          } catch (finalError) {
            console.error("❌ Even minimal data too large:", finalError);
            setErrorMessage("Generated site is too large to preview. Try using fewer images or simpler content.");
          }
        }
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
                        className={`p-4 rounded-xl border-2 transition-all text-left overflow-hidden ${selectedOccasion === occ.occasion
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
                        💡 Quick traits (click to add multiple):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "🎵 Loves music",
                          "✈️ Travel enthusiast",
                          "💻 Tech & coding",
                          "🍳 Cooking lover",
                          "📚 Bookworm",
                          "🎨 Art & design",
                          "🎮 Gaming fan",
                          "☕ Coffee addict",
                          "🏋️ Fitness enthusiast",
                          "📸 Photography",
                          "🌱 Nature lover",
                          "🎬 Movie buff",
                          "🎤 Singing",
                          "✍️ Writing",
                          "🧘 Yoga",
                          "🐕 Animal lover",
                        ].map((trait, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const cleanTrait = trait.split(" ").slice(1).join(" ");
                              setUserDescription(
                                userDescription
                                  ? `${userDescription}, ${cleanTrait.toLowerCase()}`
                                  : cleanTrait.charAt(0).toUpperCase() + cleanTrait.slice(1).toLowerCase()
                              );
                            }}
                            className="px-3 py-1.5 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 transition-colors hover:scale-105"
                          >
                            {trait}
                          </button>
                        ))}
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
                            className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${isSelected
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
                            className={`p-6 rounded-2xl border-2 text-left transition-all ${isSelected
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
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${isSelected
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
                <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleSection("hero")}
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <Home className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-slate-900">Welcome Page</h3>
                        <p className="text-sm text-slate-500">Required • Main landing page</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.has("hero") ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {expandedSections.has("hero") && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 space-y-4 border-t border-slate-100"
                    >
                      <div className="pt-4 space-y-4">
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
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs text-slate-500 mr-1">Quick fill:</span>
                            {getHeroTitleSuggestions().slice(0, 3).map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  setTemplateContent({
                                    ...templateContent,
                                    hero: { ...templateContent.hero, title: suggestion },
                                  })
                                }
                                className="text-xs px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 transition-colors"
                              >
                                {suggestion.length > 30 ? suggestion.slice(0, 30) + "..." : suggestion}
                              </button>
                            ))}
                          </div>
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
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs text-slate-500 mr-1">Quick fill:</span>
                            {getHeroSubtitleSuggestions().slice(0, 3).map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  setTemplateContent({
                                    ...templateContent,
                                    hero: { ...templateContent.hero, subtitle: suggestion },
                                  })
                                }
                                className="text-xs px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
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
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs text-slate-500 mr-1">Quick fill:</span>
                            {getHeroMessageSuggestions().slice(0, 2).map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  setTemplateContent({
                                    ...templateContent,
                                    hero: { ...templateContent.hero, message: suggestion },
                                  })
                                }
                                className="text-xs px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 transition-colors"
                              >
                                Option {idx + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Letter Content */}
                {selectedTemplates.includes("letter") && (
                  <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div
                      onClick={() => toggleSection("letter")}
                      className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-pink-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg text-slate-900">Personal Letter</h3>
                          <p className="text-sm text-slate-500">
                            {skippedSections.has("letter") ? "Skipped - Click to enable" : "Heartfelt message"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTemplate("letter");
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                          title="Remove this section"
                        >
                          <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                        </button>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.has("letter") ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </div>

                    {expandedSections.has("letter") && !skippedSections.has("letter") && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 space-y-4 border-t border-slate-100"
                      >
                        <div className="pt-4 space-y-4">
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
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="text-xs text-slate-500 mr-1">Quick templates:</span>
                              {getLetterBodySuggestions().map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() =>
                                    setTemplateContent({
                                      ...templateContent,
                                      letter: { ...templateContent.letter, body: suggestion },
                                    })
                                  }
                                  className="text-xs px-3 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full border border-pink-200 transition-colors"
                                >
                                  Template {idx + 1}
                                </button>
                              ))}
                            </div>
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
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="text-xs text-slate-500 mr-1">Quick fill:</span>
                              {["With love", "Forever yours", "Warmest wishes", "Yours truly", "Always"].map((prefix, idx) => (
                                <button
                                  key={idx}
                                  onClick={() =>
                                    setTemplateContent({
                                      ...templateContent,
                                      letter: { ...templateContent.letter, signature: prefix },
                                    })
                                  }
                                  className="text-xs px-3 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full border border-pink-200 transition-colors"
                                >
                                  {prefix}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Dynamic Template Questions */}
                {selectedTemplates.filter(t => t !== "hero" && t !== "letter" && t !== "gallery").map((templateId) => {
                  const questions = getTemplateQuestions(templateId, userDescription);
                  const template = AVAILABLE_TEMPLATES.find(t => t.id === templateId);
                  const Icon = TEMPLATE_ICONS[templateId] || Sparkles;
                  const colors = TEMPLATE_COLORS[templateId] || TEMPLATE_COLORS.hero;

                  if (questions.length === 0) return null;

                  return (
                    <div key={templateId} className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                      <div
                        onClick={() => toggleSection(templateId)}
                        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.from} ${colors.to} flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${colors.icon}`} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-lg text-slate-900">{template?.name}</h3>
                            <p className="text-sm text-slate-500">{template?.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTemplate(templateId);
                            }}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Remove this section"
                          >
                            <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                          </button>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.has(templateId) ? "rotate-180" : ""
                              }`}
                          />
                        </div>
                      </div>

                      {expandedSections.has(templateId) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 border-t border-slate-100"
                        >
                          <div className="pt-5 space-y-4">
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
                                    {question.options?.map((option, optIndex) => (
                                      <option
                                        key={`${question.id}-opt-${optIndex}`}
                                        value={option}
                                        disabled={option === "---"}
                                      >
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

                                {/* Autofill suggestions for techFactsMessage */}
                                {templateId === "techfacts" && question.id === "techFactsMessage" && (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {getTechFactsMessageSuggestions().slice(0, 3).map((suggestion, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() =>
                                          setTemplateContent({
                                            ...templateContent,
                                            techfacts: {
                                              ...templateContent.techfacts,
                                              techFactsMessage: suggestion
                                            },
                                          })
                                        }
                                        className="text-xs px-3 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-full border border-cyan-200 transition-colors"
                                      >
                                        {suggestion.length > 35 ? suggestion.slice(0, 35) + "..." : suggestion}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                {/* Photos Upload */}
                {(selectedTemplates.includes("gallery") || selectedTemplates.includes("memories")) && (
                  <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">Upload Photos</h3>
                        <p className="text-sm text-slate-500">Add your favorite memories</p>
                      </div>
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
                    <Sparkles className="w-5 h-5" />
                    Generate Website
                  </>
                )}
              </button>
            )}
          </div>

          {/* Save Draft Button (New) */}
          <div className="mt-8 text-center border-t border-slate-200 pt-6">
            <button
              onClick={() => saveProject()}
              disabled={isSaving}
              className="text-slate-500 hover:text-purple-600 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Start over or save for later? <span className="underline">Save Draft</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
