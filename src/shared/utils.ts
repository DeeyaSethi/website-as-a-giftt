/**
 * Utility functions
 */

import type { GeneratedSiteConfig, Theme } from "./types";

/**
 * Generate a slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generate a unique site ID
 */
export function generateSiteId(): string {
  return `gift-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Validate hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Get contrast text color (black or white) based on background
 */
export function getContrastColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace("#", "");
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

/**
 * Sanitize HTML content (basic)
 */
export function sanitizeContent(content: string): string {
  // Basic sanitization - remove script tags and event handlers
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/on\w+='[^']*'/g, "");
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substr(0, length - 3) + "...";
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Validate site configuration
 */
export function validateSiteConfig(config: GeneratedSiteConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.theme) {
    errors.push("Theme is required");
  }

  if (!config.pages || config.pages.length === 0) {
    errors.push("At least one page is required");
  }

  if (!config.metadata?.title) {
    errors.push("Site title is required");
  }

  if (!config.metadata?.recipientName) {
    errors.push("Recipient name is required");
  }

  if (!config.colorPalette) {
    errors.push("Color palette is required");
  } else {
    // Validate colors
    Object.entries(config.colorPalette).forEach(([key, value]) => {
      if (!isValidHexColor(value)) {
        errors.push(`Invalid color for ${key}: ${value}`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a shareable URL
 */
export function generateShareableUrl(siteId: string, domain: string): string {
  return `${domain}/${siteId}`;
}

/**
 * Get theme-specific color palette
 */
// Convert colorPalette to template colors format
export function getColorsFromPalette(colorPalette: any) {
  return {
    primary: colorPalette.primary,
    secondary: colorPalette.secondary,
    accent: colorPalette.accent,
    background: colorPalette.background,
    textDark: colorPalette.text || "#1E293B",
    textMedium: "#64748B",
    textLight: "#94A3B8",
  };
}

export function getThemeColors(theme: Theme, colorPalette?: any) {
  // If colorPalette is provided (user-selected), use it
  if (colorPalette) {
    return getColorsFromPalette(colorPalette);
  }
  
  // Otherwise fallback to theme defaults
  const themes: Record<Theme, {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    textDark: string;
    textMedium: string;
    textLight: string;
  }> = {
    birthday: {
      primary: "#FF6B9D",
      secondary: "#FEC6DF",
      accent: "#FFE5EC",
      background: "#FFF5F7",
      textDark: "#2D1B2E",
      textMedium: "#6B4C6F",
      textLight: "#9F7FA3",
    },
    anniversary: {
      primary: "#C9A9E9",
      secondary: "#E5D4F7",
      accent: "#F3E8FF",
      background: "#FAF5FF",
      textDark: "#2E1A47",
      textMedium: "#5B4570",
      textLight: "#8B7398",
    },
    friendship: {
      primary: "#96D8FF",
      secondary: "#C9E9FF",
      accent: "#E5F4FF",
      background: "#F0F9FF",
      textDark: "#1A3447",
      textMedium: "#466480",
      textLight: "#6B8BA3",
    },
    newborn: {
      primary: "#B4E4CE",
      secondary: "#D9F2E6",
      accent: "#EDF9F3",
      background: "#F5FDF9",
      textDark: "#1A3E2E",
      textMedium: "#3D6B5A",
      textLight: "#6B9B87",
    },
    general: {
      primary: "#A78BFA",
      secondary: "#C4B5FD",
      accent: "#E9D5FF",
      background: "#FAF5FF",
      textDark: "#1E293B",
      textMedium: "#475569",
      textLight: "#64748B",
    },
  };

  return themes[theme] || themes.birthday;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

/**
 * Download text as file
 */
export function downloadAsFile(content: string, filename: string, mimeType: string = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

