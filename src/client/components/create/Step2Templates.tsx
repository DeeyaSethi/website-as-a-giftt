"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AVAILABLE_TEMPLATES } from "@/app/create/constants";

interface Step2TemplatesProps {
    selectedTemplates: string[];
    toggleTemplate: (id: string) => void;
}

export function Step2Templates({
    selectedTemplates,
    toggleTemplate,
}: Step2TemplatesProps) {
    return (
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
                    Select the sections you want to include
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AVAILABLE_TEMPLATES.map((template) => {
                    const isSelected = selectedTemplates.includes(template.id);
                    const isRequired = template.required;

                    return (
                        <button
                            key={template.id}
                            onClick={() => toggleTemplate(template.id)}
                            disabled={isRequired}
                            className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${isSelected
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

            <div className="text-center text-sm text-slate-600 pt-4 border-t border-slate-200">
                Selected: {selectedTemplates.length} page{selectedTemplates.length !== 1 ? "s" : ""}
            </div>
        </motion.div>
    );
}
