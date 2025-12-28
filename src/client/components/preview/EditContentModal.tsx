"use client";

import { useState } from "react";
import { X, Save, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GeneratedSiteConfig } from "@/shared/types";

interface EditContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    siteData: GeneratedSiteConfig;
    onSave: (updatedData: GeneratedSiteConfig) => void;
}

export function EditContentModal({ isOpen, onClose, siteData, onSave }: EditContentModalProps) {
    // Find the hero page from the pages array
    const heroPage = siteData.pages?.find(page => page.type === "hero");
    
    // Local state for form fields
    const [formData, setFormData] = useState({
        projectTitle: siteData.metadata?.title || "",
        recipientName: siteData.metadata?.recipientName || "",
        heroTitle: heroPage?.content?.title || "",
        heroSubtitle: heroPage?.content?.subtitle || "",
        // We can add more fields here as needed (sections, etc.)
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update metadata
        const updatedMetadata = {
            ...siteData.metadata,
            title: formData.projectTitle,
            recipientName: formData.recipientName
        };

        // Update pages array - find and update the hero page
        const updatedPages = siteData.pages.map(page => {
            if (page.type === "hero") {
                return {
                    ...page,
                    content: {
                        ...page.content,
                        title: formData.heroTitle,
                        subtitle: formData.heroSubtitle
                    }
                };
            }
            return page;
        });

        // Deep merge updates into siteData structure
        const updatedSiteData: GeneratedSiteConfig = {
            ...siteData,
            metadata: updatedMetadata,
            pages: updatedPages
        };

        onSave(updatedSiteData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900">Edit Website Content</h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6 overflow-y-auto">
                        <form id="edit-content-form" onSubmit={handleSubmit} className="space-y-6">

                            {/* Project Info Section */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Project Details</h4>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Project Title (Internal)
                                    </label>
                                    <input
                                        type="text"
                                        name="projectTitle"
                                        value={formData.projectTitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="e.g., Mom's Birthday Gift"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Recipient Name
                                    </label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        value={formData.recipientName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="e.g., Mom"
                                    />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Hero Section */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Hero Section</h4>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Main Title / Greeting
                                    </label>
                                    <input
                                        type="text"
                                        name="heroTitle"
                                        value={formData.heroTitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Subtitle / Message
                                    </label>
                                    <textarea
                                        name="heroSubtitle"
                                        value={formData.heroSubtitle}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                        </form>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="edit-content-form"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
