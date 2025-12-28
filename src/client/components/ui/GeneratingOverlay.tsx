"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface GeneratingOverlayProps {
    isGenerating: boolean;
}

const LOADING_MESSAGES = [
    "Your gift is cooking... 🍳",
    "Best people think of best gifts... 🎁",
    "Wrapping up your memories... 🎀",
    "Adding a sprinkle of magic... ✨",
    "Designing the perfect reveal... 💌",
    "Polishing the pixels... 🎨",
    "Almost ready for the big surprise... 🥳"
];

export function GeneratingOverlay({ isGenerating }: GeneratingOverlayProps) {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        if (!isGenerating) {
            setMessageIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [isGenerating]);

    if (!isGenerating) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col items-center justify-center p-4 overflow-hidden"
        >
            {/* Animated Gradient Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl">
                {/* Main Gift Box Icon */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-12 relative"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 scale-110" />

                    {/* Gift box */}
                    <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Floating sparkles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                background: i % 2 === 0
                                    ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                                    : 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                                left: '50%',
                                top: '50%',
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                x: [0, (Math.cos(i * 45 * Math.PI / 180) * 80)],
                                y: [0, (Math.sin(i * 45 * Math.PI / 180) * 80)],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Loading bar */}
                <div className="w-64 h-2 bg-white/50 rounded-full overflow-hidden mb-8 shadow-inner">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Rotating Messages */}
                <div className="h-24 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={messageIndex}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.9 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-center"
                        >
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {LOADING_MESSAGES[messageIndex]}
                            </p>
                            <p className="text-sm text-slate-600 font-medium">
                                Hang tight, magic is happening...
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
