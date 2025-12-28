import { useState } from "react";
import { motion } from "framer-motion";

interface ColorPalette {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

interface GiftBoxOpenProps {
    isOpen: boolean;
    onOpenComplete: () => void;
    onStartMusic?: () => void;
    senderName?: string;
    recipientName?: string;
    musicUrl?: string; // Kept for interface compatibility but unused
    occasion?: string; // Kept for interface compatibility but unused
    colorPalette?: ColorPalette;
}

export function GiftBoxOpen({
    isOpen,
    onOpenComplete,
    onStartMusic,
    colorPalette
}: GiftBoxOpenProps) {
    const [isOpened, setIsOpened] = useState(false);

    // Use palette or defaults (Pastel Pink theme)
    const colors = {
        box: colorPalette?.primary || '#ffb3d9',
        boxDark: colorPalette?.accent || '#ff8fc7', // Slightly darker for gradient
        ribbon: colorPalette?.secondary || '#ffffff',
        ribbonShadow: '#eeeeee',
        bg: colorPalette?.background || '#ffffff',
    };

    // Handle "Tap to Open"
    const handleOpen = () => {
        if (onStartMusic) onStartMusic();

        setIsOpened(true);

        // Wait for animation
        setTimeout(() => {
            onOpenComplete();
        }, 2500);
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className={`fixed inset-0 z-[100] flex items-center justify-center ${isOpened ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={{ backgroundColor: colors.bg }}
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpened ? 0 : 1 }}
            transition={{ delay: 2, duration: 1 }} // Fade out after box opens
        >
            <motion.div
                className="text-center cursor-pointer w-full max-w-lg px-4"
                onClick={!isOpened ? handleOpen : undefined}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="mb-24"></div>

                <motion.div
                    className="relative w-full aspect-square max-w-[320px] mx-auto"
                    whileHover={!isOpened ? { scale: 1.05 } : {}}
                    whileTap={!isOpened ? { scale: 0.95 } : {}}
                >
                    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-xl">
                        <defs>
                            <pattern id="starPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <rect width="40" height="40" fill={colors.box} opacity="0.4" />
                                <circle cx="10" cy="10" r="1.5" fill="#ffffff" opacity="0.6" />
                                <circle cx="30" cy="20" r="1.5" fill="#ffffff" opacity="0.6" />
                                <circle cx="20" cy="30" r="1.5" fill="#ffffff" opacity="0.6" />
                            </pattern>

                            <linearGradient id="boxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={colors.box} style={{ stopOpacity: 1 }} />
                                <stop offset="100%" stopColor={colors.boxDark} style={{ stopOpacity: 1 }} />
                            </linearGradient>

                            <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={colors.ribbon} style={{ stopOpacity: 1 }} />
                                <stop offset="100%" stopColor={colors.ribbonShadow} style={{ stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        {/* Box Bottom (Static base) */}
                        <g>
                            <rect x="100" y="180" width="200" height="160" fill="url(#boxGradient)" rx="4" />
                            <rect x="100" y="180" width="200" height="160" fill="url(#starPattern)" rx="4" />
                            {/* Vertical ribbon on box */}
                            <rect x="185" y="180" width="30" height="160" fill="url(#ribbonGradient)" />
                        </g>

                        {/* Box Lid & Bow (Animates Up) */}
                        <motion.g
                            initial={{ y: 0, rotate: 0 }}
                            animate={isOpened ? { y: -800, rotate: -20 } : { y: 0 }}
                            transition={{ duration: 1.2, ease: "backIn" }}
                        >
                            {/* Shadow underneath lid to give depth */}
                            <rect x="75" y="135" width="250" height="55" fill="#000" opacity="0.1" rx="4" />

                            {/* Lid Main */}
                            <rect x="80" y="140" width="240" height="50" fill="url(#boxGradient)" rx="4" />
                            <rect x="80" y="140" width="240" height="50" fill="url(#starPattern)" rx="4" />

                            {/* Horizontal ribbon on lid */}
                            <rect x="80" y="155" width="240" height="25" fill="url(#ribbonGradient)" />

                            {/* Vertical ribbon bit on lid */}
                            <rect x="185" y="140" width="30" height="50" fill="url(#ribbonGradient)" />

                            {/* Bow Construction - Animate "Untying" */}
                            <motion.g
                                transform="translate(0, -10)"
                                animate={isOpened ? { scale: [1, 1.2, 0.8], rotate: [0, 5, -5, 0] } : {}}
                            >
                                {/* Tails */}
                                <path d="M 185 185 L 160 240 L 170 245 L 195 190 Z" fill="url(#ribbonGradient)" />
                                <path d="M 215 185 L 240 240 L 230 245 L 205 190 Z" fill="url(#ribbonGradient)" />

                                {/* Loops */}
                                <ellipse cx="160" cy="150" rx="35" ry="45" fill="url(#ribbonGradient)" transform="rotate(-15 160 150)" />
                                <ellipse cx="240" cy="150" rx="35" ry="45" fill="url(#ribbonGradient)" transform="rotate(15 240 150)" />

                                {/* Center Knot */}
                                <circle cx="200" cy="155" r="20" fill={colors.ribbon} />
                            </motion.g>
                        </motion.g>
                    </svg>
                </motion.div>

                <div className="mt-12 h-8 pointer-events-none">
                    {!isOpened && (
                        <p className="text-sm tracking-widest uppercase font-medium text-slate-400">
                            Tap to open
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
