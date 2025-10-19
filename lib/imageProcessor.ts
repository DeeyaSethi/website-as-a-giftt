/**
 * Client-side image processing utilities
 */

export interface ProcessedImage {
  id: string;
  original: string; // Base64
  variants: {
    thumbnail: string; // Base64
    medium: string; // Base64
    full: string; // Base64
  };
  caption?: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Compress and resize an image file
 */
export async function processImage(
  file: File,
  maxSizeMB: number = 5
): Promise<ProcessedImage> {
  // Dynamic import for client-side only
  const imageCompressionModule = await import("browser-image-compression");
  const imageCompression = imageCompressionModule.default;

  // Generate unique ID
  const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Read original image
  const original = await fileToBase64(file);
  const img = await loadImage(original);

  // Compression options
  const compressionOptions = {
    maxSizeMB: maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp" as const,
  };

  // Generate variants
  const [thumbnail, medium, full] = await Promise.all([
    compressToSize(file, 300, imageCompression),
    compressToSize(file, 800, imageCompression),
    imageCompression(file, compressionOptions),
  ]);

  const thumbnailBase64 = await fileToBase64(thumbnail);
  const mediumBase64 = await fileToBase64(medium);
  const fullBase64 = await fileToBase64(full);

  return {
    id,
    original: fullBase64,
    variants: {
      thumbnail: thumbnailBase64,
      medium: mediumBase64,
      full: fullBase64,
    },
    width: img.width,
    height: img.height,
    size: full.size,
  };
}

/**
 * Compress image to specific max width
 */
async function compressToSize(
  file: File,
  maxWidth: number,
  imageCompression: any
): Promise<File> {
  return await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: maxWidth,
    useWebWorker: true,
    fileType: "image/webp" as const,
  });
}

/**
 * Convert File to Base64
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Load image to get dimensions
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Only JPG, PNG, and WebP images are allowed",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Image size must be less than 10MB",
    };
  }

  return { valid: true };
}

/**
 * Get image orientation
 */
export function getImageOrientation(width: number, height: number): "portrait" | "landscape" | "square" {
  if (width === height) return "square";
  return width > height ? "landscape" : "portrait";
}

