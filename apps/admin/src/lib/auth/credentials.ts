import bcrypt from "bcryptjs";

import { fetchAdminByEmail } from "./admin-store";

const DUMMY_HASH =
  "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const admin = await fetchAdminByEmail(normalizedEmail);
  const hash = admin?.passwordHash ?? DUMMY_HASH;

  const passwordMatches = await bcrypt.compare(password, hash);
  return Boolean(admin?.passwordHash && passwordMatches);
}

export async function hashAdminPassword(password: string) {
  return bcrypt.hash(password, 12);
}
