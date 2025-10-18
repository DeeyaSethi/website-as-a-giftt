"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement AI generation
    console.log("Generating website for:", prompt);
    
    // Placeholder - will be implemented in Phase 2
    setTimeout(() => {
      setLoading(false);
      alert("AI generation coming soon! This is Phase 0 setup.");
    }, 2000);
  };

  const examplePrompts = [
    {
      label: "Anniversary celebration",
      text: "Create a romantic anniversary website for my partner who loves sunsets and jazz music. We've been together for 5 years."
    },
    {
      label: "Birthday tribute",
      text: "Make a birthday website for my best friend who's turning 30. She's a book lover, coffee enthusiast, and the kindest person I know."
    },
    {
      label: "Friendship appreciation",
      text: "Create a friendship page for my college roommate who's been my rock through everything. He loves hiking and terrible puns."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-display font-bold text-slate-900">
              Website as a Gift
            </Link>
            <Link 
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Back
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Create your gift
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Describe the person and occasion. Our AI will craft a beautiful, 
              personalized website that captures what makes them special.
            </p>
          </div>

          {/* Form */}
          <div className="card p-8 md:p-10 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label 
                  htmlFor="prompt" 
                  className="block text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide"
                >
                  Tell us your story
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: I want to create a birthday website for my mother who's turning 60. She loves gardening, classical music, and has the warmest smile. She's always been there for our family and deserves something special..."
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-0 focus:outline-none resize-none text-slate-900 placeholder:text-slate-400 transition-colors"
                  rows={8}
                  required
                />
                <p className="text-sm text-slate-500 mt-3">
                  Include their name, interests, personality, and what makes them special to you.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating your gift...
                  </span>
                ) : (
                  "Generate Website"
                )}
              </button>
            </form>
          </div>

          {/* Example Prompts */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
              Need inspiration?
            </h3>
            <div className="space-y-3">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPrompt(example.text)}
                  className="w-full text-left p-4 bg-white border-2 border-slate-100 hover:border-slate-300 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 mb-1">{example.label}</p>
                      <p className="text-sm text-slate-500 line-clamp-1">{example.text}</p>
                    </div>
                    <svg 
                      className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors flex-shrink-0 ml-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-3">Tips for best results</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Include specific details about their personality, interests, and what makes them unique</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Mention the tone you'd like (heartfelt, playful, romantic, celebratory)</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Share memorable moments or inside jokes that could be featured</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>The more context you provide, the more personalized your gift will be</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
