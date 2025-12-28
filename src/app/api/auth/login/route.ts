import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/server/db';
import User from '@/server/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-change-me';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Please provide email and password' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Account does not exist. Please register.' },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        const response = NextResponse.json(
            { message: 'Login successful', token, user: { name: user.name, email: user.email } },
            { status: 200 }
        );

        // Set cookie for better security/convenience if we want, but returning token is fine for "simple"
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);

        // Check for specific MongoDB connection errors
        if (error.name === 'MongoServerError' && error.code === 8000) {
            return NextResponse.json(
                { message: 'Database authentication failed. Please check your credentials.' },
                { status: 503 }
            );
        }

        if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
            return NextResponse.json(
                { message: 'Database connection failed. Please try again later.' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { message: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
