// Core Types for Website as a Gift

/**
 * Available themes for generated websites
 */
export type Theme = "birthday" | "anniversary" | "friendship" | "newborn" | "general";

/**
 * Available page component types
 */
export type PageType = 
  | "hero" 
  | "letter" 
  | "gallery" 
  | "timeline" 
  | "messages"
  | "garden"
  | "music"
  | "travel"
  | "recipes"
  | "quotes"
  | "memories";

/**
 * Tone/style of the content
 */
export type ContentTone = "heartfelt" | "funny" | "romantic" | "casual" | "professional";

/**
 * User input for site generation
 */
export interface UserInput {
  prompt: string;
  recipientName?: string;
  occasion?: string;
  tone?: ContentTone;
  additionalDetails?: Record<string, any>;
}

/**
 * AI-generated site configuration
 */
export interface GeneratedSiteConfig {
  theme: Theme;
  pages: PageConfig[];
  metadata: SiteMetadata;
  colorPalette: ColorPalette;
  images?: import("./imageProcessor").ProcessedImage[]; // User-uploaded images
}

/**
 * Configuration for a single page
 */
export interface PageConfig {
  type: PageType;
  order: number;
  content: PageContent;
  variant?: string; // e.g., "classic", "modern", "minimal"
}

/**
 * Content for a page (flexible structure)
 */
export interface PageContent {
  title?: string;
  subtitle?: string;
  body?: string;
  items?: any[]; // For galleries, timelines, etc.
  [key: string]: any; // Allow additional properties
}

/**
 * Site metadata
 */
export interface SiteMetadata {
  title: string;
  description: string;
  recipientName: string;
  createdAt: Date;
  occasion: string;
}

/**
 * Color palette for theming
 */
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

/**
 * Template component interface
 * All page templates must implement this
 */
export interface TemplateComponent {
  type: PageType;
  variant: string;
  render: (content: PageContent, colorPalette: ColorPalette) => React.ReactNode;
}

/**
 * AI Response structure
 */
export interface AIGenerationResponse {
  success: boolean;
  config?: GeneratedSiteConfig;
  error?: string;
}

/**
 * Deployment options
 */
export interface DeploymentConfig {
  platform: "github" | "vercel" | "download";
  repoName?: string;
  customDomain?: string;
}

/**
 * Deployment result
 */
export interface DeploymentResult {
  success: boolean;
  url?: string;
  error?: string;
  platform: DeploymentConfig["platform"];
}

