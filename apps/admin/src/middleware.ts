import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getAdminSessionFromRequest,
  isSessionValid,
} from "@/lib/auth/session";

const PUBLIC_PATHS = new Set(["/login"]);

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    /\.(?:ico|png|jpg|jpeg|gif|svg|webp|woff2?)$/i.test(pathname)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getAdminSessionFromRequest(request, response);
  const isLoggedIn = isSessionValid(session);
  const isPublic = PUBLIC_PATHS.has(pathname);

  if (!isLoggedIn && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLoggedIn && isPublic) {
    return response;
  }

  if (isLoggedIn && session.expiresAt <= Date.now()) {
    const loginResponse = NextResponse.redirect(
      new URL("/login", request.url)
    );
    const expiredSession = await getAdminSessionFromRequest(
      request,
      loginResponse
    );
    expiredSession.destroy();
    return loginResponse;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
