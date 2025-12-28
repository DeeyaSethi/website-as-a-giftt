import { useEffect, useState } from 'react';
import styles from './LetterCard.module.css';

interface LetterCardProps {
    isOpen: boolean;
    content: {
        greeting?: string;
        recipientName?: string;
        body?: string;
        signature?: string;
    };
    colorPalette?: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
}

export function LetterCard({ isOpen, content, colorPalette }: LetterCardProps) {
    // Defaults matching the user's design if no palette provided
    const colors = {
        background: colorPalette?.background || '#f5e6d3',
        envelope: colorPalette?.primary || '#d4af6e', // Gold/primary
        envelopeDark: colorPalette?.accent || '#b89555', // Darker gold/accent
        paper: '#fffef9', // Usually mostly white/cream
        text: colorPalette?.text || '#4a3f2f',
        accent: colorPalette?.accent || '#8b6f47',
    };

    // Helper to darken/lighten hex colors could go here, 
    // but we'll try to use CSS filters or the provided palette for simplicity.

    return (
        <div className={styles.cardScene}>
            <div className={`${styles.envelope} ${isOpen ? styles.envelopeOpen : ''}`}>

                {/* Envelope Back */}
                <div
                    className={styles.envelopeBack}
                    style={{
                        background: `linear-gradient(135deg, ${colors.envelope} 0%, ${colors.envelopeDark} 100%)`,
                        border: `2px solid ${colors.envelopeDark}`
                    }}
                ></div>

                {/* Envelope Flap */}
                <div
                    className={styles.envelopeFlap}
                    style={{
                        background: `linear-gradient(135deg, ${colors.envelope} 0%, ${colors.envelopeDark} 100%)`,
                        borderLeft: `2px solid ${colors.envelopeDark}`,
                        borderRight: `2px solid ${colors.envelopeDark}`,
                    }}
                ></div>

                {/* Letter Container */}
                <div className={styles.letterContainer}>
                    <div
                        className={styles.letterPaper}
                        style={{
                            background: `linear-gradient(135deg, ${colors.paper} 0%, #faf8f0 100%)`,
                            border: `1px solid ${colors.envelope}40`
                        }}
                    >
                        {/* Decorative Flourishes */}
                        <svg className={`${styles.decorativeFlourish} ${styles.flourishTopLeft}`} viewBox="0 0 100 100">
                            <path d="M10,50 Q20,20 50,10 Q80,20 90,50" stroke={colors.envelope} strokeWidth="2" fill="none" />
                            <path d="M50,10 Q50,30 30,50 Q10,70 10,90" stroke={colors.envelope} strokeWidth="2" fill="none" />
                            <circle cx="50" cy="10" r="3" fill={colors.envelope} />
                            <circle cx="10" cy="50" r="3" fill={colors.envelope} />
                        </svg>
                        <svg className={`${styles.decorativeFlourish} ${styles.flourishBottomRight}`} viewBox="0 0 100 100">
                            <path d="M10,50 Q20,20 50,10 Q80,20 90,50" stroke={colors.envelope} strokeWidth="2" fill="none" />
                            <path d="M50,10 Q50,30 30,50 Q10,70 10,90" stroke={colors.envelope} strokeWidth="2" fill="none" />
                            <circle cx="50" cy="10" r="3" fill={colors.envelope} />
                            <circle cx="10" cy="50" r="3" fill={colors.envelope} />
                        </svg>

                        <div
                            className={styles.letterBorder}
                            style={{ borderColor: colors.envelope }}
                        ></div>

                        <div className={styles.letterContent}>
                            <p
                                className={styles.letterGreeting}
                                style={{ color: colors.accent }}
                            >
                                {content.greeting || "Dear"}
                            </p>
                            <p
                                className={styles.letterRecipient}
                                style={{ color: colors.text }}
                            >
                                {content.recipientName || "My Dearest"}
                            </p>

                            <div
                                className={styles.letterBody}
                                style={{ color: colors.text }}
                            >
                                {content.body ?
                                    content.body.split('\n').map((paragraph, i) => (
                                        <p key={i} className="mb-4">{paragraph}</p>
                                    ))
                                    : "You are truly special to me..."
                                }
                            </div>

                            <p
                                className={styles.letterSignature}
                                style={{ color: colors.accent }}
                            >
                                {content.signature || "With Love"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
