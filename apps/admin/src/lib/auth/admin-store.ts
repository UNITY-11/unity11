import { readClient } from "@/sanity/lib/client";
import { adminByEmailQuery } from "@/sanity/lib/queries";

export type AdminAuthRecord = {
  _id: string;
  email: string;
  passwordHash?: string;
};

export async function fetchAdminByEmail(email: string) {
  const normalizedEmail = email.toLowerCase().trim();
  return readClient.fetch<AdminAuthRecord | null>(adminByEmailQuery, {
    email: normalizedEmail,
  });
}
