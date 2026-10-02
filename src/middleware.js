import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Admin route protection.
 *
 * The matcher below is deliberately narrow: middleware runs only for /admin,
 * never for ordinary page views. The template previously matched almost every
 * request and, on each one, fetched Supabase to decide whether to show a
 * "coming soon" gate — a per-visitor network round trip (and, on Vercel, a
 * billed edge invocation) for a page that no longer exists.
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') return NextResponse.next();

  const token = request.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.redirect(new URL('/admin/login', request.url));

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // No signing secret configured: the admin panel is unusable, so send the
    // visitor to the login screen rather than failing open.
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
  } catch {
    const res = NextResponse.redirect(new URL('/admin/login', request.url));
    res.cookies.delete('admin_token');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
