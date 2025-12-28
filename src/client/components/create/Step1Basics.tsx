"use client";

import { motion } from "framer-motion";
import { OCCASION_PROMPTS } from "@/app/create/constants";

interface Step1BasicsProps {
    recipientName: string;
    setRecipientName: (name: string) => void;
    relationshipContext: string;
    setRelationshipContext: (ctx: string) => void;
    selectedOccasion: string;
    setSelectedOccasion: (occasion: string) => void;
}

export function Step1Basics({
    recipientName,
    setRecipientName,
    relationshipContext,
    setRelationshipContext,
    selectedOccasion,
    setSelectedOccasion,
}: Step1BasicsProps) {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
                    Who's this gift for? 🎁
                </h1>
                <p className="text-lg text-slate-600">
                    5 quick steps to a beautiful website
                </p>
            </div>

            {/* Name Input */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Their Name *
                </label>
                <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g., Sarah, Mom, Alex..."
                    className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
            </div>

            {/* Relationship & Context Input */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Relation & Occasion Constraint *
                </label>
                <p className="text-xs text-slate-500 mb-3">
                    How do you know them? What's the occasion? (One line)
                </p>
                <input
                    type="text"
                    value={relationshipContext}
                    onChange={(e) => setRelationshipContext(e.target.value)}
                    placeholder="e.g., My boyfriend of 3 years, for our anniversary..."
                    className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
            </div>

            {/* Occasion Selection */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                    What's the Occasion? *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {OCCASION_PROMPTS.map((occ) => (
                        <button
                            key={occ.occasion}
                            onClick={() => setSelectedOccasion(occ.occasion)}
                            className={`p-4 rounded-xl border-2 transition-all text-left overflow-hidden ${selectedOccasion === occ.occasion
                                ? "border-purple-500 bg-purple-50 shadow-md"
                                : "border-slate-200 hover:border-purple-300"
                                }`}
                        >
                            <div className="w-12 h-12 mb-3 rounded-lg overflow-hidden bg-white">
                                <img
                                    src={occ.image}
                                    alt={occ.occasion}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="font-semibold text-slate-900">{occ.occasion}</div>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
