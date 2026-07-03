"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";

import { verifyAdminCredentials, hashAdminPassword } from "@/lib/auth/credentials";
import { fetchAdminByEmail } from "@/lib/auth/admin-store";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getWriteClient } from "@/sanity/lib/writeClient";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  getRateLimitKey,
  recordFailedLogin,
} from "@/lib/auth/rate-limit";
import {
  getSessionMaxAge,
  getSessionOptions,
  type AdminSessionData,
} from "@/lib/auth/session";

export type LoginResult =
  | { success: true }
  | { success: false; error: string };

function getClientIp(headerStore: Headers) {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return headerStore.get("x-real-ip") ?? "unknown";
}

export async function loginAction(
  email: string,
  password: string,
  rememberMe: boolean
): Promise<LoginResult> {
  const headerStore = await headers();
  const rateLimitKey = getRateLimitKey(getClientIp(headerStore));
  const rateLimit = checkLoginRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    const minutes = Math.max(1, Math.ceil(rateLimit.retryAfterSeconds / 60));
    return {
      success: false,
      error: `Too many failed attempts. Try again in ${minutes} minute(s).`,
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const isValid = await verifyAdminCredentials(normalizedEmail, password);

  if (!isValid) {
    recordFailedLogin(rateLimitKey);
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  clearLoginAttempts(rateLimitKey);

  const maxAge = getSessionMaxAge(rememberMe);
  const now = Date.now();
  const session = await getIronSession<AdminSessionData>(
    await (await import("next/headers")).cookies(),
    getSessionOptions(maxAge)
  );

  session.isLoggedIn = true;
  session.email = normalizedEmail;
  session.issuedAt = now;
  session.expiresAt = now + maxAge * 1000;
  await session.save();

  return { success: true };
}

export async function logoutAction() {
  const session = await getIronSession<AdminSessionData>(
    await (await import("next/headers")).cookies(),
    getSessionOptions()
  );
  session.destroy();
  redirect("/login");
}

export type ChangePasswordResult =
  | { success: true }
  | { success: false; error: string };

export async function changePasswordAction(
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordResult> {
  const session = await requireAdmin();

  if (newPassword.length < 12) {
    return { success: false, error: "New password must be at least 12 characters." };
  }

  const isValid = await verifyAdminCredentials(session.email, currentPassword);
  if (!isValid) {
    return { success: false, error: "Current password is incorrect." };
  }

  const admin = await fetchAdminByEmail(session.email);
  if (!admin?._id) {
    return { success: false, error: "Admin account not found." };
  }

  const passwordHash = await hashAdminPassword(newPassword);
  const writeClient = getWriteClient();
  await writeClient.patch(admin._id).set({ passwordHash }).commit();

  return { success: true };
}
