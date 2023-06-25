import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname; // relative path

    // Manage route protection
    const token = await getToken({ req });
    const isAuth = token?.role === "AUTHORIZED";
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "AUTHORIZED",
    },
  }
);

export const config = { matcher: [ '/dashboard/:path*', '/api/customers/:path*', '/api/cars/:path*', '/api/repairs/:path*'], };