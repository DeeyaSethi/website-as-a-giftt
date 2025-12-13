import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const path = request.nextUrl.pathname;

    // Paths that require authentication
    const protectedPaths = ['/create', '/dashboard'];

    // Check if current path is protected
    const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix));

    if (isProtectedPath && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(url);
    }

    // Also protect sensitive API routes? 
    // API routes usually handle their own 401, but we could block here too.
    // For now, let's stick to page protection to avoid blocking public APIs if any.

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/create/:path*',
        '/dashboard/:path*',
    ],
};
