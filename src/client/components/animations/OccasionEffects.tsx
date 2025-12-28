"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OccasionEffectsProps {
    occasion?: string;
    colors?: { primary: string; secondary: string; accent: string };
}

export function OccasionEffects({ occasion, colors }: OccasionEffectsProps) {
    const [mounted, setMounted] = useState(false);
    const normalizedOccasion = occasion?.toLowerCase() || "default";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    switch (true) {
        case normalizedOccasion.includes("birthday"):
            return <BirthdayConfetti colors={colors} />;

        case normalizedOccasion.includes("anniversary"):
        case normalizedOccasion.includes("love"):
        case normalizedOccasion.includes("valentine"):
        case normalizedOccasion.includes("wedding"):
            return <FloatingHearts colors={colors} />;

        case normalizedOccasion.includes("christmas"):
        case normalizedOccasion.includes("holiday"):
            return <Snowfall />;

        default:
            return <SubtleSparkles colors={colors} />;
    }
}

function BirthdayConfetti({ colors }: { colors?: any }) {
    // Generate random confetti pieces
    const pieces = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 50,
        rotation: Math.random() * 360,
        color: [colors?.primary, colors?.secondary, colors?.accent, "#FFD700", "#FF69B4"][
            Math.floor(Math.random() * 5)
        ] || "#FFD700",
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {pieces.map((piece) => (
                <motion.div
                    key={piece.id}
                    initial={{ top: `${piece.y}%`, left: `${piece.x}%`, rotate: piece.rotation, opacity: 1 }}
                    animate={{
                        top: "120%",
                        rotate: piece.rotation + 360,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                    style={{
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        backgroundColor: piece.color,
                        borderRadius: Math.random() > 0.5 ? "50%" : "0",
                    }}
                />
            ))}
        </div>
    );
}

function FloatingHearts({ colors }: { colors?: any }) {
    const hearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        scale: 0.5 + Math.random() * 1,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ bottom: "-10%", left: `${heart.x}%`, opacity: 0, scale: heart.scale, rotate: 0 }}
                    animate={{
                        bottom: "120%",
                        opacity: [0, 0.8, 0],
                        rotate: [0, 45, -45, 0],
                        x: [0, 20, -20, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                    style={{
                        position: "absolute",
                        color: colors?.primary || "#FF69B4",
                        fontSize: "2rem",
                    }}
                >
                    ❤
                </motion.div>
            ))}
        </div>
    );
}

function Snowfall() {
    const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    initial={{ top: "-10%", left: `${flake.x}%`, opacity: 0 }}
                    animate={{
                        top: "110%",
                        opacity: [0, 0.8, 0],
                        x: ["-20px", "20px"] // Drift
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                        x: {
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 3 + Math.random() * 2,
                            ease: "easeInOut"
                        }
                    }}
                    style={{
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        filter: "blur(1px)",
                    }}
                />
            ))}
        </div>
    );
}

function SubtleSparkles({ colors }: { colors?: any }) {
    const sparkles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    initial={{ top: `${sparkle.y}%`, left: `${sparkle.x}%`, opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                    style={{
                        position: "absolute",
                        width: "4px",
                        height: "4px",
                        backgroundColor: colors?.accent || "gold",
                        borderRadius: "50%",
                        boxShadow: `0 0 5px ${colors?.accent || "gold"}`,
                    }}
                />
            ))}
        </div>
    );
}
