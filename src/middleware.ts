import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isAuthPath = request.nextUrl.pathname.startsWith('/login');

  // Protect admin routes
  if (isAdminPath) {
    // Allow access to auth pages when not logged in
    if (isAuthPath) {
      if (token) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Require authentication for all other admin routes
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
