import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/server/db';
import User from '@/server/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-change-me';

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            // Also check Authorization header for flexibility
            const authHeader = req.headers.get('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return NextResponse.json(
                    { message: 'Not authenticated' },
                    { status: 401 }
                );
            }
        }

        // Use token from cookie or header (if cookie missing, try splitting header)
        const finalToken = token || req.headers.get('Authorization')?.split(' ')[1];

        if (!finalToken) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(finalToken, JWT_SECRET) as { userId: string };

        await dbConnect();
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
    }
}

// Handle Logout
export async function POST() {
    const response = NextResponse.json(
        { message: 'Logged out successfully' },
        { status: 200 }
    );
    response.cookies.delete('token');
    return response;
}
