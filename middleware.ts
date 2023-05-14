import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuth = req.cookies.has("accessToken");

  if (!isAuth) {
    if (
      pathname.startsWith("/edit-profile") ||
      pathname.startsWith("/upload") ||
      pathname.startsWith("/notification")
    ) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  } else {
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}
