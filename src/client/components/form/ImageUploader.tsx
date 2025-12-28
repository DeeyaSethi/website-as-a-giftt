"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { processImage, validateImageFile, type ProcessedImage } from "@/client/lib/imageProcessor";
import { uploadToCloudinary } from "@/server/cloudinary";

interface ImageUploaderProps {
  images: ProcessedImage[];
  onImagesChange: (images: ProcessedImage[]) => void;
  maxImages?: number;
  onOpenLibrary?: () => void;
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 10,
  onOpenLibrary
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);
    setProcessing(true);

    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;

    if (fileArray.length > remainingSlots) {
      setError(`You can only upload ${remainingSlots} more image(s)`);
      setProcessing(false);
      return;
    }

    try {
      const processedImages: ProcessedImage[] = [];

      for (const file of fileArray) {
        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
          setError(validation.error || "Invalid image");
          continue;
        }

        // 1. Generate local preview first (for immediate UI feedback)
        const processed = await processImage(file);

        // 2. Upload to Cloudinary
        try {
          // Check if env vars are set
          if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
            console.warn("Cloudinary credentials missing, falling back to local base64");
            // Push local version only
            processedImages.push(processed);
          } else {
            const cloudinaryRes = await uploadToCloudinary(file);

            // Replace the 'original' base64 with the Cloudinary URL
            // Ideally we keep thumbnail as base64 for fast load, but main image as URL
            processed.original = cloudinaryRes.secure_url;
            processed.variants.full = cloudinaryRes.secure_url;
            processed.variants.medium = cloudinaryRes.secure_url; // Use Cloudinary optimizations ideally

            // If we wanted to use Cloudinary transformations for thumbnails:
            // processed.variants.thumbnail = cloudinaryRes.secure_url.replace('/upload/', '/upload/w_400/');

            processedImages.push(processed);
          }
        } catch (uploadErr) {
          console.error("Cloudinary upload failed", uploadErr);
          setError("Failed to upload image to cloud. Using local fallback.");
          processedImages.push(processed); // Fallback
        }
      }

      onImagesChange([...images, ...processedImages]);
    } catch (err) {
      console.error("Error processing images:", err);
      setError("Failed to process images. Please try again.");
    } finally {
      setProcessing(false);
    }
  }, [images, maxImages, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = (id: string) => {
    onImagesChange(images.filter(img => img.id !== id));
  };

  const setAsCover = (id: string) => {
    const imageIndex = images.findIndex(img => img.id === id);
    if (imageIndex <= 0) return; // Already cover or not found

    const newImages = [...images];
    const [imageToMove] = newImages.splice(imageIndex, 1);
    newImages.unshift(imageToMove);
    onImagesChange(newImages);
  };

  const updateCaption = (id: string, caption: string) => {
    onImagesChange(
      images.map(img =>
        img.id === id ? { ...img, caption } : img
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Upload Options */}
      {images.length < maxImages && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all
              ${isDragging
                ? 'border-purple-500 bg-purple-50'
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }
              ${processing ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => handleFiles(e.target.files)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={processing}
            />

            <div className="flex flex-col items-center gap-3">
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
                  <p className="text-sm text-slate-600">Processing images...</p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                    <Upload className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-800 mb-1">
                      Upload from Device
                    </p>
                    <p className="text-sm text-slate-500">
                      Drop files or click to browse
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      JPG, PNG, WebP • Max 10MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Media Library Button */}
          {onOpenLibrary && (
            <button
              type="button"
              onClick={onOpenLibrary}
              className="relative border-2 border-dashed border-purple-300 rounded-xl p-6 md:p-8 text-center transition-all hover:border-purple-500 hover:shadow-lg group bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 hover:from-purple-100 hover:via-pink-100 hover:to-purple-100"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all">
                  <ImageIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-800 mb-1 group-hover:text-purple-700 transition-colors">
                    Browse Media Library
                  </p>
                  <p className="text-sm text-slate-600">
                    Choose from curated photos
                  </p>
                  <p className="text-xs text-purple-600 font-medium mt-1">
                    ✨ Recommended
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              {images.length} / {maxImages} images uploaded
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={image.id} className="group relative">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src={image.variants.thumbnail}
                    alt={image.caption || "Uploaded image"}
                    fill
                    className="object-cover"
                  />

                  {/* Visual Cue for Cover Image */}
                  {index === 0 ? (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                      Cover Photo
                    </div>
                  ) : (
                    <button
                      onClick={() => setAsCover(image.id)}
                      className="absolute top-2 left-2 bg-white text-purple-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 border border-purple-100 hover:bg-purple-600 hover:text-white transition-colors"
                    >
                      Make Cover
                    </button>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption input */}
                <input
                  type="text"
                  placeholder="Add a caption (optional)"
                  value={image.caption || ""}
                  onChange={(e) => updateCaption(image.id, e.target.value)}
                  className="mt-2 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

