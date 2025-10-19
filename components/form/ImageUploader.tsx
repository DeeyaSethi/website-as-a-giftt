"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { processImage, validateImageFile, type ProcessedImage } from "@/lib/imageProcessor";

interface ImageUploaderProps {
  images: ProcessedImage[];
  onImagesChange: (images: ProcessedImage[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ 
  images, 
  onImagesChange,
  maxImages = 10 
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

        // Process image
        const processed = await processImage(file);
        processedImages.push(processed);
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

  const updateCaption = (id: string, caption: string) => {
    onImagesChange(
      images.map(img => 
        img.id === id ? { ...img, caption } : img
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all
            ${isDragging 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-slate-300 hover:border-slate-400'
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
                <Upload className="w-12 h-12 text-slate-400" />
                <div>
                  <p className="text-base font-medium text-slate-700 mb-1">
                    Drop images here or click to upload
                  </p>
                  <p className="text-sm text-slate-500">
                    Up to {maxImages - images.length} more images • JPG, PNG, WebP • Max 10MB each
                  </p>
                </div>
              </>
            )}
          </div>
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
            {images.map((image) => (
              <div key={image.id} className="group relative">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src={image.variants.thumbnail}
                    alt={image.caption || "Uploaded image"}
                    fill
                    className="object-cover"
                  />
                  
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

