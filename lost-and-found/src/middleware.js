// src/middleware.js
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If user has a token and tries to access auth or signup, redirect to /home
  if (token && (url.pathname.startsWith('/auth') || url.pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // If user doesn't have a token and tries to access protected routes, redirect to auth
  if (!token && !(url.pathname.startsWith('/auth')) ) {
    return NextResponse.redirect(new URL('/auth?action=login', request.url));
  }

  // Allow the request to proceed if user is authenticated or accessing public routes
  return NextResponse.next();
}

// Set up route matching for middleware
export const config = {
  matcher: ['/auth/:path*','/home/:path*', '/form/:path*','/items/:path*','/lost/:path*','/found/:path*','/feedback/:path*','/profile/:path*'],  // Add any other protected routes here
};
