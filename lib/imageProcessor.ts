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
  try {
    // Dynamic import for client-side only - with better error handling
    let imageCompression: any;
    try {
      const module = await import("browser-image-compression");
      imageCompression = module.default || module;
    } catch (importError) {
      console.error("Failed to import browser-image-compression:", importError);
      // Fallback to simple base64 conversion without compression
      return await processImageFallback(file);
    }

    // Generate unique ID
    const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Read original image
    const original = await fileToBase64(file);
    const img = await loadImage(original);

    // MINIMAL Compression - Preserve quality as much as possible
    const compressionOptions = {
      maxSizeMB: 2, // Much higher limit - was 0.3MB
      maxWidthOrHeight: 1920, // Full HD - was 1200
      useWebWorker: false,
      fileType: "image/jpeg" as const,
      quality: 0.95, // Near-original quality - was 0.85
    };

    try {
      // Generate variants with MAXIMUM quality
      const [thumbnail, medium, full] = await Promise.all([
        compressToSize(file, 400, imageCompression, 0.92), // Larger, highest quality thumbnail
        compressToSize(file, 1200, imageCompression, 0.94), // High quality medium  
        compressToSize(file, 1920, imageCompression, 0.95), // Near-original full
      ]);

      const thumbnailBase64 = await fileToBase64(thumbnail);
      const mediumBase64 = await fileToBase64(medium);
      const fullBase64 = await fileToBase64(full);

      return {
        id,
        original: original, // Use strict original
        variants: {
          thumbnail: thumbnailBase64,
          medium: mediumBase64,
          full: original, // Use strict original (no compression)
        },
        width: img.width,
        height: img.height,
        size: full.size,
      };
    } catch (compressionError) {
      console.error("Compression failed, using fallback:", compressionError);
      return await processImageFallback(file);
    }
  } catch (error) {
    console.error("Image processing error:", error);
    throw new Error("Failed to process image. Please try a different image.");
  }
}

/**
 * Fallback image processing without compression
 */
async function processImageFallback(file: File): Promise<ProcessedImage> {
  const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const original = await fileToBase64(file);
  const img = await loadImage(original);

  // Create canvas-based thumbnails
  const thumbnail = await createThumbnail(img, 300);
  const medium = await createThumbnail(img, 800);

  return {
    id,
    original,
    variants: {
      thumbnail,
      medium,
      full: original,
    },
    width: img.width,
    height: img.height,
    size: file.size,
  };
}

/**
 * Create thumbnail using canvas
 */
function createThumbnail(img: HTMLImageElement, maxSize: number): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      resolve(img.src);
      return;
    }

    const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    resolve(canvas.toDataURL("image/jpeg", 0.8));
  });
}

/**
 * Compress image to specific max width
 */
async function compressToSize(
  file: File,
  maxWidth: number,
  imageCompression: any,
  quality: number = 0.95
): Promise<File> {
  return await imageCompression(file, {
    maxSizeMB: 2, // Much higher - preserve quality
    maxWidthOrHeight: maxWidth,
    useWebWorker: false,
    fileType: "image/jpeg" as const,
    quality: quality,
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
