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

  // Deploy Modal State
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployStep, setDeployStep] = useState<'confirm' | 'deploying' | 'success'>('confirm');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

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

  const handleDeployClick = () => {
    setShowDeployModal(true);
    setDeployStep('confirm');
  };

  const handleConfirmDeploy = async () => {
    if (!siteData) return;

    try {
      setDeployStep('deploying');

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: siteData.metadata?.title || 'Untitled Project',
          config: siteData
        })
      });

      const data = await response.json();

      if (response.ok && data.slug) {
        const url = `${window.location.origin}/${data.slug}`;
        setDeployedUrl(url);
        setDeployStep('success');
      } else {
        alert('Failed to save project. Please try again.');
        setShowDeployModal(false);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('An error occurred while saving.');
      setShowDeployModal(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(deployedUrl);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
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
    <div className="min-h-screen bg-slate-50 relative">
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
            </a> to use real AI generation.
          </p>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
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
                onClick={handleDeployClick}
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
              className={`mx-auto bg-white rounded-lg shadow-2xl overflow-hidden ${isMobilePreview ? "max-w-[375px]" : "w-full"
                }`}
              style={{
                height: isMobilePreview ? "667px" : "auto",
              }}
            >
              {/* Rendered Site via Iframe */}
              <iframe
                src="/preview/live"
                className="w-full h-full bg-white border-none"
                title="Website Preview"
                style={{
                  height: isMobilePreview ? "667px" : "calc(100vh - 200px)", // Dynamic height for desktop/mobile
                  minHeight: "500px"
                }}
              />
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

      {/* Deploy Confirmation Modal */}
      <AnimatePresence>
        {showDeployModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => setShowDeployModal(false)}
            />
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden pointer-events-auto"
              >
                {deployStep === 'confirm' && (
                  <div className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Publish Website?</h3>
                    <p className="text-slate-600">
                      This will make your website public and generate a shareable link. Are you ready to share your gift with the world?
                    </p>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowDeployModal(false)}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDeploy}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Yes, Publish!
                      </button>
                    </div>
                  </div>
                )}

                {deployStep === 'deploying' && (
                  <div className="p-8 text-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
                    <h3 className="text-xl font-bold text-slate-900">Publishing...</h3>
                    <p className="text-slate-600">Creating your special link.</p>
                  </div>
                )}

                {deployStep === 'success' && (
                  <div className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Project Published! 🎉</h3>
                    <p className="text-slate-600 text-sm">
                      Your website is live. Share this link with your special person!
                    </p>

                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <code className="text-sm text-slate-800 truncate flex-1 text-left">
                        {deployedUrl}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-white rounded-md transition-colors text-slate-600 hover:text-blue-600"
                        title="Copy to clipboard"
                      >
                        {hasCopied ? (
                          <span className="text-xs font-bold text-green-600">Copied!</span>
                        ) : (
                          <span className="text-xs font-medium">Copy</span>
                        )}
                      </button>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowDeployModal(false)}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                      >
                        Close
                      </button>
                      <a
                        href={deployedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                      >
                        Open Site
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
