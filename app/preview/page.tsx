"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Share2, RefreshCw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GeneratedSiteConfig } from "@/lib/types";
import { TemplateComposer } from "@/components/preview/TemplateComposer";

export default function PreviewPage() {
  const router = useRouter();
  const [siteData, setSiteData] = useState<GeneratedSiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Load generated site data from sessionStorage
    const dataStr = sessionStorage.getItem("generatedSite");
    if (!dataStr) {
      router.push("/create");
      return;
    }

    try {
      const parsed = JSON.parse(dataStr);
      setSiteData(parsed.site || parsed);
      setIsDemoMode(parsed.demo || false);
    } catch (error) {
      console.error("Failed to parse site data:", error);
      router.push("/create");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleDownload = () => {
    // TODO: Implement site download as ZIP
    alert("Download functionality coming soon!");
  };

  const handleShare = async () => {
    // TODO: Implement deployment and sharing
    alert("Deployment and sharing coming in Phase 6!");
  };

  const handleRegenerate = () => {
    router.push("/create");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-blue flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-pastel-purple mx-auto mb-4" />
          <p className="text-slate-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!siteData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-center">
          <p className="text-sm text-blue-800">
            ✨ <strong>Demo Mode:</strong> This is a preview using mock data. 
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline ml-1 font-medium hover:text-blue-900"
            >
              Get a FREE Gemini API key
            </a> to use real AI generation (1M tokens/day free!).
          </p>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back Button */}
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Edit</span>
            </button>

            {/* Center: Title */}
            <div className="text-center">
              <h1 className="text-lg font-semibold text-slate-900">
                {siteData?.metadata?.title || "Your Website"}
              </h1>
              <p className="text-sm text-slate-500 capitalize">
                {siteData?.theme || "birthday"} Theme
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobilePreview(!isMobilePreview)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {isMobilePreview ? "Desktop" : "Mobile"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button
                onClick={handleShare}
                className="btn-primary flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Deploy & Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Area */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobilePreview ? "mobile" : "desktop"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mx-auto bg-white rounded-lg shadow-2xl overflow-hidden ${
                isMobilePreview ? "max-w-[375px]" : "w-full"
              }`}
              style={{
                height: isMobilePreview ? "667px" : "auto",
              }}
            >
              {/* Rendered Site */}
              <div
                className={`${
                  isMobilePreview ? "h-full overflow-y-auto" : ""
                }`}
              >
                <TemplateComposer site={siteData} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Regenerate Hint */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">
              Not happy with the result?
            </p>
            <button
              onClick={handleRegenerate}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate Website
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

