/**
 * Cloudinary Client-side Upload Helper
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryResponse> {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("Missing Cloudinary configuration. Please check your environment variables.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    // Optional: Add folder
    formData.append("folder", "website-as-a-gift");

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Image upload failed");
    }

    return response.json();
}
