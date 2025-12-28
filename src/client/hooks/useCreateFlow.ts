"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProcessedImage } from "@/client/lib/imageProcessor";
import { AVAILABLE_TEMPLATES, COLOR_SCHEMES } from "@/app/create/constants";
import {
    getHeroTitleSuggestions,
    getHeroSubtitleSuggestions,
    getHeroMessageSuggestions,
    getLetterBodySuggestions,
    getLetterSignatureSuggestions
} from "@/client/lib/suggestionUtils";

export function useCreateFlow() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);

    // Step 1: Name & Occasion
    const [recipientName, setRecipientName] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState("");
    const [relationshipContext, setRelationshipContext] = useState("");

    // Step 2: Templates
    const [selectedTemplates, setSelectedTemplates] = useState<string[]>(["hero"]);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["hero"]));

    // Step 3: Colors
    const [selectedColorScheme, setSelectedColorScheme] = useState(COLOR_SCHEMES[0]);

    // Step 4: Content
    const [images, setImages] = useState<ProcessedImage[]>([]);
    const [templateContent, setTemplateContent] = useState<Record<string, any>>({});
    const [refineWithAI, setRefineWithAI] = useState(true);

    // Project State
    const [isSaving, setIsSaving] = useState(false);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const totalSteps = 5;

    // Load existing project if applicable
    useEffect(() => {
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

                if (config.recipientName) setRecipientName(config.recipientName);
                if (config.occasion) setSelectedOccasion(config.occasion);
                if (config.relationshipContext) setRelationshipContext(config.relationshipContext);
                if (config.selectedTemplates) setSelectedTemplates(config.selectedTemplates);
                if (config.colorScheme) setSelectedColorScheme(config.colorScheme);
                if (config.templateContent) setTemplateContent(config.templateContent);
                if (config.images) setImages(config.images);
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
                    relationshipContext,
                    originalPrompt: "",
                    selectedTemplates,
                    templateContent,
                    colorScheme: selectedColorScheme,
                    images,
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
                    window.history.replaceState(null, '', `?projectId=${data.project._id}`);
                    if (!silent) alert("Project saved successfully!");
                }
            } else {
                if (res.status === 401) {
                    if (!silent) alert("Please login to save your work.");
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
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const removeTemplate = (templateId: string) => {
        setSelectedTemplates((prev) => prev.filter((id) => id !== templateId));
        setTemplateContent((prev) => {
            const newContent = { ...prev };
            delete newContent[templateId];
            return newContent;
        });
        setExpandedSections((prev) => {
            const newSet = new Set(prev);
            newSet.delete(templateId);
            return newSet;
        });
    };

    // Suggestion helpers removed (now imported)

    const handleGenerate = async () => {
        setIsGenerating(true);
        setErrorMessage("");

        // 1. Prepare Content (Autofill defaults if empty)
        const filledTemplateContent = { ...templateContent };

        // Helper: Pick random or first item
        const pickOne = (arr: string[]) => arr[0];

        // Hero Defaults
        if (selectedTemplates.includes("hero")) {
            if (!filledTemplateContent.hero) filledTemplateContent.hero = {};

            const context = { recipientName, occasion: selectedOccasion };

            if (!filledTemplateContent.hero.title)
                filledTemplateContent.hero.title = pickOne(getHeroTitleSuggestions(context));

            if (!filledTemplateContent.hero.subtitle)
                filledTemplateContent.hero.subtitle = pickOne(getHeroSubtitleSuggestions(context));

            if (!filledTemplateContent.hero.message)
                filledTemplateContent.hero.message = pickOne(getHeroMessageSuggestions(context));
        }

        // Letter Defaults
        if (selectedTemplates.includes("letter")) {
            if (!filledTemplateContent.letter) filledTemplateContent.letter = {};

            const context = { recipientName, occasion: selectedOccasion };

            if (!filledTemplateContent.letter.body)
                filledTemplateContent.letter.body = pickOne(getLetterBodySuggestions(context));

            if (!filledTemplateContent.letter.signature)
                filledTemplateContent.letter.signature = pickOne(getLetterSignatureSuggestions());
        }

        // TechFacts Defaults
        if (selectedTemplates.includes("techfacts")) {
            if (!filledTemplateContent.techfacts) filledTemplateContent.techfacts = {};
        }

        try {
            // Update local state so saveProject uses filled content
            setTemplateContent(filledTemplateContent);

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recipientName,
                    occasion: selectedOccasion,
                    relationshipContext,
                    originalPrompt: "",
                    selectedTemplates,
                    templateContent: filledTemplateContent,
                    images,
                    colorScheme: selectedColorScheme,
                    refineWithAI,
                }),
            });

            saveProject(true).catch(err => console.error("Auto-save failed", err));

            const data = await response.json();

            if (data.success) {
                try {
                    // Optimization logic for sessionStorage
                    const optimizedData = {
                        ...data.config,
                        images: data.config.images?.slice(0, 3).map((img: any) => ({
                            id: img.id,
                            caption: img.caption,
                            variants: {
                                thumbnail: img.variants.thumbnail,
                                medium: img.variants.thumbnail,
                                full: img.variants.thumbnail,
                            }
                        }))
                    };

                    sessionStorage.setItem("generatedSite", JSON.stringify(optimizedData));
                    router.push("/preview");
                } catch (storageError: any) {
                    console.error("Storage quota exceeded", storageError);
                    try {
                        const minimalData = {
                            theme: data.config.theme,
                            colorPalette: data.config.colorPalette,
                            pages: data.config.pages,
                            metadata: data.config.metadata,
                            images: []
                        };
                        sessionStorage.setItem("generatedSite", JSON.stringify(minimalData));
                        router.push("/preview");
                    } catch (finalError) {
                        setErrorMessage("Generated site is too large to preview.");
                    }
                }
            } else {
                if (data.retryable) {
                    setErrorMessage(data.error || "Something went wrong. Please try again!");
                } else {
                    setErrorMessage(data.error || "Failed to generate website.");
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
        if (step === 1) return recipientName.trim() && selectedOccasion && relationshipContext.trim();
        if (step === 2) return selectedTemplates.length > 0;
        if (step === 3) return selectedColorScheme;
        return true;
    };

    return {
        step,
        totalSteps,
        recipientName,
        setRecipientName,
        selectedOccasion,
        setSelectedOccasion,
        relationshipContext,
        setRelationshipContext,
        selectedTemplates,
        toggleTemplate,
        removeTemplate,
        selectedColorScheme,
        setSelectedColorScheme,
        templateContent,
        setTemplateContent,
        images,
        setImages,
        refineWithAI,
        setRefineWithAI,
        expandedSections,
        toggleSection,
        isGenerating,
        isSaving,
        errorMessage,
        setErrorMessage,
        handleNext,
        handleBack,
        handleGenerate,
        saveProject,
        canProceed,
        projectId
    };
}
