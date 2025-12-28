import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/server/db';
import Project from '@/server/models/Project';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-change-me';

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const authHeader = req.headers.get('Authorization');
        const finalToken = token || (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

        if (!finalToken) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const decoded = jwt.verify(finalToken, JWT_SECRET) as { userId: string };
        const body = await req.json();
        const { title, config } = body;

        await dbConnect();

        // Generate Slug
        let baseSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        // Append random string for uniqueness
        const uniqueSuffix = Math.random().toString(36).substring(2, 7);
        const slug = `${baseSlug}-${uniqueSuffix}`;

        const project = await Project.create({
            userId: decoded.userId,
            title,
            config,
            slug,
            status: 'published' // Default to published for sharing
        });

        return NextResponse.json({ project, slug }, { status: 201 });

    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { message: 'Failed to create project' },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const authHeader = req.headers.get('Authorization');

        const finalToken = token || (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

        if (!finalToken) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(finalToken, JWT_SECRET) as { userId: string };
        await dbConnect();
        const projects = await Project.find({ userId: decoded.userId })
            .select('title config.theme config.colorPalette config.metadata config.pages updatedAt status slug')
            .sort({ updatedAt: -1 });

        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { message: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}
