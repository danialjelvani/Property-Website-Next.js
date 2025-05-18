export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/properties/add/:path*",
    "/properties/saved/:path*",
    "/profile/:path*",
    "/messages/:path*",
  ],
};
