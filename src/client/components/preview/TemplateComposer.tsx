"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { GeneratedSiteConfig } from "@/shared/types";
import { HeroTemplate } from "@/client/components/templates/hero/HeroTemplate";
import { LetterTemplate } from "@/client/components/templates/letter/LetterTemplate";
import { GalleryTemplate } from "@/client/components/templates/gallery/GalleryTemplate";
import { GardenTemplate } from "@/client/components/templates/garden/GardenTemplate";
import { MusicTemplate } from "@/client/components/templates/music/MusicTemplate";
import { TravelTemplate } from "@/client/components/templates/travel/TravelTemplate";
import { MemoriesTemplate } from "@/client/components/templates/memories/MemoriesTemplate";
import { TechFactsTemplate } from "@/client/components/templates/techfacts/TechFactsTemplate";

interface TemplateComposerProps {
  site: GeneratedSiteConfig;
}

// Elegant SVG Icons for Navigation
const NavIcon = ({ type, className = "w-5 h-5" }: { type: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    hero: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    letter: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    gallery: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    garden: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3c0 1.5.5 2.5 1.5 3.5L8 11H5c-1.5 0-2.5.5-3.5 1.5S0 14.5 0 16s.5 2.5 1.5 3.5S3.5 21 5 21h14c1.5 0 2.5-.5 3.5-1.5s1.5-2 1.5-3.5-.5-2.5-1.5-3.5S20.5 11 19 11h-3l-2.5-2.5C14.5 7.5 15 6.5 15 5a3 3 0 0 0-3-3z" />
        <path d="M12 22v-9" />
      </svg>
    ),
    music: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    travel: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    memories: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    techfacts: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  };

  return icons[type] || icons.hero;
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
      {/* Top Navigation Bar - Minimal & Modern */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Animated Home Icon - Left */}
          <button
            onClick={() => goToPage(0)}
            className="group relative"
            title="Home"
          >
            <div className="relative">
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${site.colorPalette.primary}, ${site.colorPalette.secondary})`
                }}
              />

              {/* Icon container */}
              <div
                className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${site.colorPalette.primary}, ${site.colorPalette.secondary})`
                }}
              >
                <div className="text-white group-hover:rotate-12 transition-transform duration-300">
                  <NavIcon type="hero" className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
          </button>

          {/* Desktop Navigation - Icon Only */}
          <div className="hidden md:flex items-center gap-2">
            {site.pages.slice(1).map((page, idx) => {
              const actualIdx = idx + 1;
              const isActive = actualIdx === currentPageIndex;
              return (
                <button
                  key={actualIdx}
                  onClick={() => goToPage(actualIdx)}
                  className="group relative p-2.5 rounded-lg transition-all hover:scale-110"
                  style={{
                    backgroundColor: isActive ? `${site.colorPalette.primary}15` : 'transparent',
                  }}
                  title={PAGE_LABELS[page.type]}
                >
                  <div
                    className="transition-all"
                    style={{
                      filter: isActive ? 'none' : 'grayscale(50%)',
                      opacity: isActive ? 1 : 0.6,
                      color: site.colorPalette.primary,
                    }}
                  >
                    <NavIcon type={page.type} className="w-5 h-5" />
                  </div>

                  {/* Tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {PAGE_LABELS[page.type]}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: site.colorPalette.primary }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: site.colorPalette.primary }}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu - Minimal */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="p-3 grid grid-cols-4 gap-2">
                {site.pages.map((page, idx) => {
                  const isActive = idx === currentPageIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => goToPage(idx)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: isActive
                          ? `${site.colorPalette.primary}20`
                          : 'transparent',
                      }}
                    >
                      <div style={{ color: isActive ? site.colorPalette.primary : '#64748b' }}>
                        <NavIcon type={page.type} className="w-6 h-6" />
                      </div>
                      <span
                        className="text-[10px] font-medium"
                        style={{
                          color: isActive ? site.colorPalette.primary : '#64748b'
                        }}
                      >
                        {PAGE_LABELS[page.type]}
                      </span>
                    </button>
                  );
                })}
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
