import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    // Setting public paths
    const isPublicPath = path === '/login' || path === '/signup';

    // Get token from cookies
    const token = request.cookies.get('token')?.value || '';

    // Redirect based on path & whether or not user has token
    if (isPublicPath && token) {

        // Redirect to homepage if has token
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Protected path with no token send to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    
}


    // Apply to these paths
export const config = {
        matcher: [
            '/',
            '/login',
            '/signup'
        ]
    }