"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Check } from "lucide-react";
import ImageUploader from "@/client/components/form/ImageUploader";
import { ProcessedImage } from "@/client/lib/imageProcessor";
import { MediaLibraryModal } from "@/client/components/create/MediaLibraryModal";

interface Step5CoverProps {
    images: ProcessedImage[];
    setImages: (images: ProcessedImage[]) => void;
    selectedTemplates: string[];
    templateContent: Record<string, any>;
    setTemplateContent: (content: Record<string, any>) => void;
    refineWithAI: boolean;
    setRefineWithAI: (refine: boolean) => void;
}

export function Step5Cover({
    images,
    setImages,
    selectedTemplates,
    templateContent,
    setTemplateContent,
    refineWithAI,
    setRefineWithAI
}: Step5CoverProps) {
    const hasGallery = selectedTemplates.includes("gallery") || selectedTemplates.includes("memories");
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);

    const handleLibrarySelect = (selectedImages: ProcessedImage[]) => {
        const currentUrls = new Set(images.map(img => img.original));
        const newImages = selectedImages
            .filter(img => !currentUrls.has(img.original))
            .map(img => ({
                ...img,
                // Regenerate unique ID to prevent duplicates
                id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 5)}`
            }));
        setImages([...images, ...newImages]);
    };

    const updateContent = (templateId: string, field: string, value: any) => {
        setTemplateContent({
            ...templateContent,
            [templateId]: {
                ...templateContent[templateId],
                [field]: value,
            },
        });
    };

    return (
        <motion.div
            key="step5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    {hasGallery ? "Photos & Gallery 📸" : "Add a Cover Photo 📸"}
                </h1>
                <p className="text-lg text-slate-600">
                    {hasGallery
                        ? "Customize your gallery and upload your favorite moments"
                        : "Upload a photo for the welcome page"}
                </p>
            </div>

            {/* Gallery Configuration Section */}
            {selectedTemplates.includes("gallery") && (
                <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-md border border-purple-100 p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="text-3xl">🎨</span>
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Choose Gallery Layout
                        </span>
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Gallery Title</label>
                        <input
                            type="text"
                            value={templateContent.gallery?.title || ""}
                            onChange={(e) => updateContent("gallery", "title", e.target.value)}
                            placeholder="e.g., Our Memories"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none mb-6"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                        {[
                            {
                                id: 'masonry',
                                name: 'Masonry',
                                desc: 'Artistic & scattered',
                                img: '/assets/layout-masonry.png'
                            },
                            {
                                id: 'grid',
                                name: 'Grid',
                                desc: 'Clean & structured',
                                img: '/assets/layout-grid.png'
                            },
                            {
                                id: 'photostrip',
                                name: 'Photo Booth',
                                desc: 'Vintage strips',
                                img: '/assets/layout-photostrip.png'
                            },
                        ].map((layout) => {
                            const isSelected = (templateContent.gallery?.layout || 'masonry') === layout.id;
                            return (
                                <button
                                    key={layout.id}
                                    onClick={() => updateContent("gallery", "layout", layout.id)}
                                    className={`relative group rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 ${isSelected
                                        ? "border-purple-500 ring-2 ring-purple-200 shadow-lg scale-[1.02]"
                                        : "border-slate-200 hover:border-purple-300 hover:shadow-md"
                                        }`}
                                >
                                    {/* Preview Image */}
                                    <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-slate-100 relative">
                                        <img
                                            src={layout.img}
                                            alt={layout.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-purple-900/10 flex items-center justify-center">
                                                <div className="bg-white rounded-full p-1 md:p-2 shadow-lg">
                                                    <Check className="w-3 h-3 md:w-6 md:h-6 text-purple-600" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div className={`p-2 md:p-4 text-left transition-colors ${isSelected ? 'bg-purple-50' : 'bg-white'}`}>
                                        <div className="font-bold text-slate-900 text-xs md:text-base">{layout.name}</div>
                                        <div className="text-[10px] md:text-xs text-slate-500 hidden sm:block">{layout.desc}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Image Uploader Section */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 hover:shadow-xl transition-all">
                <div className="mb-6 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
                        <span className="text-2xl">📸</span>
                        Add Your Photos
                    </h3>
                    <p className="text-sm text-slate-600">
                        {images.length === 0
                            ? "Choose from our library or upload your own"
                            : `${images.length} photo${images.length === 1 ? '' : 's'} added • ${30 - images.length} remaining`}
                    </p>
                </div>

                <ImageUploader
                    images={images}
                    onImagesChange={setImages}
                    maxImages={30}
                    onOpenLibrary={() => setIsLibraryOpen(true)}
                />
            </div>

            {/* AI Refinement Toggle - Prominent */}
            <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl p-1 shadow-xl">
                <div className="bg-white rounded-xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                ✨ AI Content Refinement
                            </h3>
                            <p className="text-sm md:text-base text-slate-700 mb-4">
                                {refineWithAI
                                    ? "AI will polish your text, enhance the flow, and add personalized touches to make your gift even more special."
                                    : "Your content will be used exactly as written - no AI modifications."}
                            </p>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={refineWithAI}
                                    onChange={(e) => setRefineWithAI(e.target.checked)}
                                    className="w-6 h-6 mt-0.5 rounded-md border-2 border-purple-300 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <span className="text-base font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                                        Enable AI refinement & personalization
                                    </span>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Recommended for the best results ✨
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <MediaLibraryModal
                isOpen={isLibraryOpen}
                onClose={() => setIsLibraryOpen(false)}
                onSelect={handleLibrarySelect}
            />
        </motion.div>
    );
}
