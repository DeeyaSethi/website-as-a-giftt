"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { COLOR_SCHEMES } from "@/app/create/constants";

interface Step3ColorsProps {
    selectedColorScheme: any;
    setSelectedColorScheme: (scheme: any) => void;
}

export function Step3Colors({
    selectedColorScheme,
    setSelectedColorScheme,
}: Step3ColorsProps) {
    return (
        <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    Pick Your Colors 🎨
                </h1>
                <p className="text-lg text-slate-600">
                    Choose a color scheme that matches their vibe
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLOR_SCHEMES.map((scheme) => {
                    const isSelected = selectedColorScheme.name === scheme.name;

                    return (
                        <button
                            key={scheme.name}
                            onClick={() => setSelectedColorScheme(scheme)}
                            className={`p-6 rounded-2xl border-2 text-left transition-all ${isSelected
                                ? "border-purple-500 shadow-lg scale-[1.02]"
                                : "border-slate-200 bg-white hover:border-purple-300 hover:shadow-md"
                                }`}
                            style={{
                                background: isSelected
                                    ? `linear-gradient(135deg, ${scheme.background} 0%, ${scheme.accent} 100%)`
                                    : "white",
                            }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl">{scheme.icon}</span>
                                    <h3 className="font-bold text-lg text-slate-900">{scheme.name}</h3>
                                </div>
                                {isSelected && (
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <div
                                    className="w-12 h-12 rounded-lg shadow-inner"
                                    style={{ backgroundColor: scheme.primary }}
                                />
                                <div
                                    className="w-12 h-12 rounded-lg shadow-inner"
                                    style={{ backgroundColor: scheme.secondary }}
                                />
                                <div
                                    className="w-12 h-12 rounded-lg shadow-inner"
                                    style={{ backgroundColor: scheme.accent }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}
