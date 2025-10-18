/**
 * Utility functions
 */

import type { GeneratedSiteConfig } from "./types";

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

