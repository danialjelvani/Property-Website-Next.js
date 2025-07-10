import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;

  const { pathname } = req.nextUrl;

  const protectedPaths = [
    "/messages",
    "/profile",
    "/properties/add",
    "/properties/saved",
  ];

  const isProtected =
    protectedPaths.some((path) => pathname.startsWith(path)) ||
    /^\/properties\/[^\/]+\/edit$/.test(pathname); // Matches /properties/:id/edit

  if (isProtected && !isAuth) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/properties/add/:path*",
    "/properties/saved/:path*",
    "/properties/:id/edit",
    "/profile/:path*",
    "/messages/:path*",
  ],
};
