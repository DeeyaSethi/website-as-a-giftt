"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { GeneratedSiteConfig } from "@/lib/types";
import { HeroTemplate } from "@/components/templates/hero/HeroTemplate";
import { LetterTemplate } from "@/components/templates/letter/LetterTemplate";
import { GalleryTemplate } from "@/components/templates/gallery/GalleryTemplate";
import { GardenTemplate } from "@/components/templates/garden/GardenTemplate";
import { MusicTemplate } from "@/components/templates/music/MusicTemplate";
import { TravelTemplate } from "@/components/templates/travel/TravelTemplate";
import { MemoriesTemplate } from "@/components/templates/memories/MemoriesTemplate";
import { TechFactsTemplate } from "@/components/templates/techfacts/TechFactsTemplate";

interface TemplateComposerProps {
  site: GeneratedSiteConfig;
}

const PAGE_ICONS: Record<string, string> = {
  hero: "🏠",
  letter: "💌",
  gallery: "📸",
  garden: "🌸",
  music: "🎵",
  travel: "✈️",
  memories: "🎴",
  techfacts: "💻",
};

const PAGE_LABELS: Record<string, string> = {
  hero: "Home",
  letter: "Letter",
  gallery: "Gallery",
  garden: "Garden",
  music: "Music",
  travel: "Travel",
  memories: "Memories",
  techfacts: "Tech Facts",
};

/**
 * Multi-page composer with navigation
 * Each template gets its own page with smooth transitions
 */
export function TemplateComposer({ site }: TemplateComposerProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentPage = site.pages[currentPageIndex];
  const totalPages = site.pages.length;

  const goToPage = (index: number) => {
    if (index === currentPageIndex) return;
    setDirection(index > currentPageIndex ? 1 : -1);
    setCurrentPageIndex(index);
    setIsMenuOpen(false);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setDirection(1);
      setCurrentPageIndex(currentPageIndex + 1);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setDirection(-1);
      setCurrentPageIndex(currentPageIndex - 1);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = (page: any, index: number) => {
    const key = `${page.type}-${index}`;

    switch (page.type) {
      case "hero":
        return (
          <HeroTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
            images={site.images}
            availablePages={site.pages.map(p => p.type)}
            onNavigate={goToPage}
          />
        );

      case "letter":
        return (
          <LetterTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
          />
        );

      case "gallery":
        return (
          <GalleryTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
            images={site.images}
          />
        );

      case "garden":
        return (
          <GardenTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
          />
        );

      case "music":
        return (
          <MusicTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
          />
        );

      case "travel":
        return (
          <TravelTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
          />
        );

      case "memories":
        return (
          <MemoriesTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
            images={site.images}
          />
        );

      case "techfacts":
        return (
          <TechFactsTemplate
            key={key}
            content={page.content}
            theme={site.theme}
            colorPalette={site.colorPalette}
          />
        );

      default:
        console.warn(`Unknown page type: ${page.type}`);
        return null;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen relative">
      {/* Top Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b-2"
        style={{ borderBottomColor: site.colorPalette.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Site Title */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">{PAGE_ICONS[currentPage.type]}</span>
            <div>
              <h1 className="font-bold text-lg text-slate-900">
                {site.metadata.title}
              </h1>
              <p className="text-xs text-slate-600">
                {PAGE_LABELS[currentPage.type]}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {site.pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                className="px-4 py-2 rounded-lg transition-all flex items-center gap-2 hover:scale-105"
                style={{
                  backgroundColor:
                    idx === currentPageIndex
                      ? site.colorPalette.primary
                      : "transparent",
                  color:
                    idx === currentPageIndex
                      ? "white"
                      : site.colorPalette.primary,
                  border: `2px solid ${
                    idx === currentPageIndex
                      ? site.colorPalette.primary
                      : "transparent"
                  }`,
                }}
              >
                <span className="text-lg">{PAGE_ICONS[page.type]}</span>
                <span className="font-medium text-sm">
                  {PAGE_LABELS[page.type]}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: site.colorPalette.primary }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 bg-white overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {site.pages.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className="w-full px-4 py-3 rounded-lg transition-all flex items-center gap-3 text-left"
                    style={{
                      backgroundColor:
                        idx === currentPageIndex
                          ? site.colorPalette.primary
                          : `${site.colorPalette.primary}10`,
                      color:
                        idx === currentPageIndex
                          ? "white"
                          : site.colorPalette.primary,
                    }}
                  >
                    <span className="text-2xl">{PAGE_ICONS[page.type]}</span>
                    <span className="font-medium">
                      {PAGE_LABELS[page.type]}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content with Animation */}
      <div className="pt-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {renderPage(currentPage, currentPageIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows (Desktop) */}
      {totalPages > 1 && (
        <>
          {currentPageIndex > 0 && (
            <button
              onClick={prevPage}
              className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white shadow-2xl hover:scale-110 transition-all items-center justify-center"
              style={{ color: site.colorPalette.primary }}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentPageIndex < totalPages - 1 && (
            <button
              onClick={nextPage}
              className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white shadow-2xl hover:scale-110 transition-all items-center justify-center"
              style={{ color: site.colorPalette.primary }}
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </>
      )}

      {/* Page Indicator Dots */}
      {totalPages > 1 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg">
          {site.pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className="transition-all rounded-full"
              style={{
                width: idx === currentPageIndex ? "32px" : "8px",
                height: "8px",
                backgroundColor:
                  idx === currentPageIndex
                    ? site.colorPalette.primary
                    : `${site.colorPalette.primary}30`,
              }}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-600">
            Made with 💝 for {site.metadata.recipientName} •{" "}
            <span className="text-xs text-slate-400">
              Page {currentPageIndex + 1} of {totalPages}
            </span>
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Created on {new Date(site.metadata.createdAt).toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
}
