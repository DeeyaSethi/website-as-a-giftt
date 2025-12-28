"use client";

import { motion } from "framer-motion";
import { Sparkles, Trash2, ChevronDown } from "lucide-react";
import {
    AVAILABLE_TEMPLATES,
    TEMPLATE_ICONS,
    TEMPLATE_COLORS
} from "@/app/create/constants";
import { getTemplateQuestions } from "@/client/lib/dynamicTemplateQuestions";
import {
    getHeroTitleSuggestions,
    getHeroSubtitleSuggestions,
    getHeroMessageSuggestions,
    getLetterBodySuggestions,
    getLetterSignatureSuggestions
} from "@/client/lib/suggestionUtils";

interface Step4ContentProps {
    selectedTemplates: string[];
    templateContent: Record<string, any>;
    setTemplateContent: (content: Record<string, any>) => void;
    expandedSections: Set<string>;
    toggleSection: (id: string) => void;
    removeTemplate: (id: string) => void;
    refineWithAI: boolean;
    setRefineWithAI: (refine: boolean) => void;
    recipientName: string;
    selectedOccasion: string;
}

export function Step4Content({
    selectedTemplates,
    templateContent,
    setTemplateContent,
    expandedSections,
    toggleSection,
    removeTemplate,
    refineWithAI,
    setRefineWithAI,
    recipientName,
    selectedOccasion,
}: Step4ContentProps) {

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
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    Add Your Details ✍️
                </h1>
                <p className="text-lg text-slate-600">
                    Fill in the content for each section
                </p>
            </div>

            {/* AI Refinement Info - Moved to Top */}
            <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100">
                <p className="text-sm text-slate-700 text-center">
                    💡 <span className="font-medium">Tip:</span> You can choose to refine your content using AI in the next step
                </p>
            </div>

            {/* Hero Section (Welcome Page) */}
            {selectedTemplates.includes("hero") && (
                <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div
                        onClick={() => toggleSection("hero")}
                        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <span className="text-2xl">🏠</span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-slate-900">Welcome Page</h3>
                                <p className="text-sm text-slate-500">The first thing they'll see</p>
                            </div>
                        </div>
                        <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.has("hero") ? "rotate-180" : ""}`}
                        />
                    </div>

                    {expandedSections.has("hero") && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-6 border-t border-slate-100"
                        >
                            <div className="pt-5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Main Title</label>
                                    <input
                                        type="text"
                                        value={templateContent.hero?.title || ""}
                                        onChange={(e) => updateContent("hero", "title", e.target.value)}
                                        placeholder="e.g., Happy Birthday, Sarah!"
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                                    />
                                    <div className="mt-2 text-xs text-slate-500 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        <span className="whitespace-nowrap font-medium self-center">✨ Ideas:</span>
                                        {getHeroTitleSuggestions({ recipientName, occasion: selectedOccasion }).map((text, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => updateContent("hero", "title", text)}
                                                className="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                                            >
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        value={templateContent.hero?.subtitle || ""}
                                        onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                                        placeholder="e.g., A collection of memories just for you"
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                                    />
                                    <div className="mt-2 text-xs text-slate-500 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        <span className="whitespace-nowrap font-medium self-center">✨ Ideas:</span>
                                        {getHeroSubtitleSuggestions({ recipientName, occasion: selectedOccasion }).map((text, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => updateContent("hero", "subtitle", text)}
                                                className="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                                            >
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Welcome Message</label>
                                    <textarea
                                        value={templateContent.hero?.message || ""}
                                        onChange={(e) => updateContent("hero", "message", e.target.value)}
                                        placeholder="Short welcome message..."
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                                    />
                                    <div className="mt-2 text-xs text-slate-500 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        <span className="whitespace-nowrap font-medium self-center">✨ Ideas:</span>
                                        {getHeroMessageSuggestions({ recipientName, occasion: selectedOccasion }).map((text, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => updateContent("hero", "message", text)}
                                                className="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                                            >
                                                {text.length > 30 ? text.substring(0, 30) + '...' : text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Letter Section */}
            {selectedTemplates.includes("letter") && (
                <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div
                        onClick={() => toggleSection("letter")}
                        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                                <span className="text-2xl">💌</span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-slate-900">Personal Letter</h3>
                                <p className="text-sm text-slate-500">Write a heartfelt message</p>
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
                                className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.has("letter") ? "rotate-180" : ""}`}
                            />
                        </div>
                    </div>

                    {expandedSections.has("letter") && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-6 border-t border-slate-100"
                        >
                            <div className="pt-5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Letter</label>
                                    <textarea
                                        value={templateContent.letter?.body || ""}
                                        onChange={(e) => updateContent("letter", "body", e.target.value)}
                                        placeholder="Write your message here..."
                                        rows={8}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                                    />
                                    <div className="mt-2 text-xs text-slate-500 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        <span className="whitespace-nowrap font-medium self-center">✨ Ideas:</span>
                                        {getLetterBodySuggestions({ recipientName, occasion: selectedOccasion }).map((text, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    const current = templateContent.letter?.body || "";
                                                    updateContent("letter", "body", current + (current ? "\n\n" : "") + text);
                                                }}
                                                className="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors truncate max-w-[200px]"
                                            >
                                                {text.substring(0, 30)}...
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Sign-off</label>
                                <input
                                    type="text"
                                    value={templateContent.letter?.signature || ""}
                                    onChange={(e) => updateContent("letter", "signature", e.target.value)}
                                    placeholder="With love, [Your name]"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="text-xs text-slate-500 mr-1 self-center">Quick fill:</span>
                                    {getLetterSignatureSuggestions().map((prefix, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => updateContent("letter", "signature", prefix)}
                                            className="text-xs px-3 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full border border-pink-200 transition-colors"
                                        >
                                            {prefix}
                                        </button>
                                    ))}
                                </div>
                                <div className="pt-2 border-t border-slate-100 mt-2">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={templateContent.letter?.includeMusic || false}
                                            onChange={(e) => updateContent("letter", "includeMusic", e.target.checked)}
                                            className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-700">Include Background Music? 🎵</span>
                                            <span className="text-xs text-slate-500">Beautiful instrumental music will play when they open their gift box.</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}


            {/* Dynamic Template Questions */}
            {selectedTemplates.filter(t => t !== "hero" && t !== "letter" && t !== "gallery").map((templateId) => {
                const questions = getTemplateQuestions(templateId);
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
                                    className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.has(templateId) ? "rotate-180" : ""}`}
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
                                                    onChange={(e) => updateContent(templateId, question.id, e.target.value)}
                                                    placeholder={question.placeholder}
                                                    rows={4}
                                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                                                />
                                            ) : question.type === "select" ? (
                                                <select
                                                    value={templateContent[templateId]?.[question.id] || ""}
                                                    onChange={(e) => updateContent(templateId, question.id, e.target.value)}
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
                                                    onChange={(e) => updateContent(templateId, question.id, e.target.value)}
                                                    placeholder={question.placeholder}
                                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                                                />
                                            )}
                                            {question.helperText && (
                                                <p className="mt-1 text-xs text-slate-500">{question.helperText}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                );
            })
            }
        </motion.div >
    );
}
