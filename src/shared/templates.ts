/**
 * Template Registry
 * Maps page types to their available template variants
 */

import type { PageType, TemplateComponent } from "./types";

export interface TemplateRegistry {
  [key: string]: {
    [variant: string]: TemplateComponent;
  };
}

/**
 * Registry of all available templates
 * This will be populated as we build template components
 */
export const templateRegistry: TemplateRegistry = {
  hero: {
    // Will add variants: basic, animated, minimal
  },
  letter: {
    // Will add variants: classic, handwritten, modern
  },
  gallery: {
    // Will add variants: grid, masonry, carousel
  },
  messages: {
    // Will add variants: cards, list, bubbles
  },
};

/**
 * Get a template component by type and variant
 */
export function getTemplate(
  type: PageType,
  variant: string = "default"
): TemplateComponent | null {
  const typeTemplates = templateRegistry[type];
  if (!typeTemplates) {
    console.error(`No templates found for type: ${type}`);
    return null;
  }

  const template = typeTemplates[variant] || typeTemplates["default"];
  if (!template) {
    console.error(`No template found for ${type}:${variant}`);
    return null;
  }

  return template;
}

/**
 * Get all available variants for a page type
 */
export function getAvailableVariants(type: PageType): string[] {
  const typeTemplates = templateRegistry[type];
  if (!typeTemplates) return [];
  return Object.keys(typeTemplates);
}

/**
 * Check if a template exists
 */
export function templateExists(type: PageType, variant: string): boolean {
  return !!(templateRegistry[type]?.[variant]);
}

