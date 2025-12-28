import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/server/db";
import Project from "@/server/models/Project";

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-change-me';

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        // Check Authorization header as fallback
        const finalToken = token || req.headers.get('Authorization')?.split(' ')[1];

        if (!finalToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userId: string;
        try {
            const decoded = jwt.verify(finalToken, JWT_SECRET) as { userId: string };
            userId = decoded.userId;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        await dbConnect();

        // Fetch all projects for the user and select only the images field
        const projects = await Project.find({ userId })
            .select("config.images")
            .lean();

        // Flatten all images into a single array
        const allImages = projects.flatMap((p) => p.config.images || []);

        // Deduplicate images based on original URL
        const uniqueImages = Array.from(
            new Map(allImages.map((img) => [img.original, img])).values()
        );

        return NextResponse.json({ images: uniqueImages });
    } catch (error) {
        console.error("Error fetching user images:", error);
        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }
}
