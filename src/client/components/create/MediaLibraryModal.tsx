"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { ProcessedImage } from "@/client/lib/imageProcessor";

interface MediaLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (selectedImages: ProcessedImage[]) => void;
}

export function MediaLibraryModal({
    isOpen,
    onClose,
    onSelect
}: MediaLibraryModalProps) {
    const [libraryImages, setLibraryImages] = useState<ProcessedImage[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchImages();
        }
    }, [isOpen]);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/images");
            if (res.ok) {
                const data = await res.json();
                setLibraryImages(data.images);
            }
        } catch (error) {
            console.error("Failed to fetch library images", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSelection = (img: ProcessedImage) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(img.id)) {
            newSelected.delete(img.id);
        } else {
            newSelected.add(img.id);
        }
        setSelectedIds(newSelected);
    };

    const handleConfirm = () => {
        const selectedImages = libraryImages.filter(img => selectedIds.has(img.id));
        onSelect(selectedImages);
        onClose();
        setSelectedIds(new Set()); // Reset selection
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900">Media Library</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-64">
                                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
                                    <p className="text-slate-500">Loading your photos...</p>
                                </div>
                            ) : libraryImages.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-slate-500">No previous photos found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {libraryImages.map((img) => {
                                        const isSelected = selectedIds.has(img.id);
                                        return (
                                            <div
                                                key={img.id}
                                                onClick={() => toggleSelection(img)}
                                                className={`
                                                    relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all group
                                                    ${isSelected ? 'border-purple-600 ring-2 ring-purple-200' : 'border-transparent hover:border-purple-300'}
                                                `}
                                            >
                                                <Image
                                                    src={img.variants.thumbnail || img.original}
                                                    alt="Library image"
                                                    fill
                                                    className="object-cover"
                                                />
                                                {isSelected && (
                                                    <div className="absolute inset-0 bg-purple-900/20 z-10 flex items-center justify-center">
                                                        <div className="bg-purple-600 text-white rounded-full p-1">
                                                            <CheckCircle2 className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Hover Overlay */}
                                                {!isSelected && (
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-between items-center">
                            <span className="text-slate-600 font-medium">
                                {selectedIds.size} selected
                            </span>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={selectedIds.size === 0}
                                    className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                                >
                                    Add Selected
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
