import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // console.log("MIDDLEWARE: ", request.url);

  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  const { pathname } = request.nextUrl;

  if (
    !token &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/search") ||
      pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.next();
  }

  if (
    token &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decodedToken = decodeJwt(token);

  // check if token is going to expire in 5 minutes
  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    return NextResponse.redirect(
      new URL(`/api/refresh-token?redirect=${encodeURIComponent(pathname)}`, request.url)
    );
  }

  if (!decodedToken.admin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (decodedToken.admin && pathname.startsWith("/account/favourites")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/account",
    "/account/:path*",
    "/search",
  ],
};
