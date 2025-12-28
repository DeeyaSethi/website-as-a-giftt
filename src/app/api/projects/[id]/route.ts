import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/server/db';
import Project from '@/server/models/Project';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-change-me';

async function getUser(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Also check Authorization header
    const authHeader = req.headers.get('Authorization');
    const finalToken = token || (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

    if (!finalToken) return null;

    try {
        const decoded = jwt.verify(finalToken, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (e) {
        return null;
    }
}

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const userId = await getUser(req);
        // Allow public access based on slug later, but for editing we need auth
        if (!userId) {
            // If standard GET by ID for editing, require auth
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const project = await Project.findOne({ _id: params.id, userId });

        if (!project) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const userId = await getUser(req);
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const updates = await req.json();
        await dbConnect();

        const project = await Project.findOneAndUpdate(
            { _id: params.id, userId },
            { ...updates, updatedAt: Date.now() },
            { new: true }
        );

        if (!project) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const userId = await getUser(req);
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const project = await Project.findOneAndDelete({ _id: params.id, userId });

        if (!project) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
