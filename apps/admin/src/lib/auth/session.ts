import type { SessionOptions } from "iron-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

import { getAuthSecret } from "./env";

export interface AdminSessionData {
  isLoggedIn: boolean;
  email: string;
  issuedAt: number;
  expiresAt: number;
}

export const SESSION_COOKIE_NAME = "unity11_admin_session";

const ONE_DAY_SECONDS = 60 * 60 * 24;
const THIRTY_DAYS_SECONDS = ONE_DAY_SECONDS * 30;

export function getSessionOptions(maxAgeSeconds = ONE_DAY_SECONDS): SessionOptions {
  return {
    password: getAuthSecret(),
    cookieName: SESSION_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: maxAgeSeconds,
      path: "/",
    },
  };
}

export async function getAdminSession() {
  const session = await getIronSession<AdminSessionData>(
    await cookies(),
    getSessionOptions()
  );
  return session;
}

export async function getAdminSessionFromRequest(
  request: NextRequest,
  response: NextResponse
) {
  return getIronSession<AdminSessionData>(
    request,
    response,
    getSessionOptions()
  );
}

export function isSessionValid(session: AdminSessionData) {
  return (
    session.isLoggedIn === true &&
    typeof session.email === "string" &&
    session.email.length > 0 &&
    typeof session.expiresAt === "number" &&
    session.expiresAt > Date.now()
  );
}

export function getSessionMaxAge(rememberMe: boolean) {
  return rememberMe ? THIRTY_DAYS_SECONDS : ONE_DAY_SECONDS;
}
