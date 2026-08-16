import { NextRequest, NextResponse } from "next/server";

const verificationCookieName = "origin-peptides-researcher-verified";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/verify") {
    return NextResponse.next();
  }

  const isVerified = request.cookies.get(verificationCookieName)?.value === "true";

  if (isVerified) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/verify", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api).*)"]
};
