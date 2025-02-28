import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get("token")?.value;
  const languageCookie = request.cookies.get("language");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Ensure language cookie is set
  if (!languageCookie) {
    response.cookies.set("language", "en", {
      path: "/",
      maxAge: 31536000, // 1 year
    });
  }

  // Protect admin routes: Redirect to login if not authenticated
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

// Apply middleware to all pages but ensure protection for admin routes
export const config = {
  matcher: ["/:path*"],
};
