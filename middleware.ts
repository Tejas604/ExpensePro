// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



/////
import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

const publicRoutes = [
  '/',           // Example: Home page
  '/about',      // Example: About page
  '/api/public', // Example: Public API route
];

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Check if the pathname is in the publicRoutes array
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next(); // Skip Clerk middleware for public routes
  }

  // Otherwise, apply Clerk middleware
  return clerkMiddleware(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
