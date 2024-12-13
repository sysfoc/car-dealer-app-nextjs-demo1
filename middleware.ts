import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const languageCookie = request.cookies.get("language");

  if (!languageCookie) {
    const response = NextResponse.next();
    response.cookies.set("language", "en", {
      path: "/",
      maxAge: 31536000,
    });
    return response;
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/:path*",
};
