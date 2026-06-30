import { createClient } from "next-sanity";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvFile(filename) {
  try {
    const content = readFileSync(resolve(process.cwd(), filename), "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // optional file
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || "Admin User";
const role = process.argv[5] || "Administrator";

if (!email || !password) {
  console.error(
    'Usage: pnpm seed-admin "admin@example.com" "your-secure-password" [name] [role]'
  );
  process.exit(1);
}

if (password.length < 12) {
  console.error("Password must be at least 12 characters.");
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-12";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_* or SANITY_API_TOKEN in .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const normalizedEmail = email.toLowerCase().trim();
const passwordHash = await bcrypt.hash(password, 12);

const existing = await client.fetch(
  `*[_type == "adminProfile" && lower(email) == $email][0]{ _id }`,
  { email: normalizedEmail }
);

if (existing?._id) {
  await client
    .patch(existing._id)
    .set({ email: normalizedEmail, passwordHash, name, role })
    .commit();
  console.log(`Updated admin profile ${existing._id} for ${normalizedEmail}`);
} else {
  const anyProfile = await client.fetch(
    `*[_type == "adminProfile"][0]{ _id, email }`
  );
  if (anyProfile?._id) {
    await client
      .patch(anyProfile._id)
      .set({ email: normalizedEmail, passwordHash, name, role })
      .commit();
    console.log(
      `Updated existing admin profile ${anyProfile._id} → ${normalizedEmail}`
    );
  } else {
    const created = await client.create({
      _type: "adminProfile",
      name,
      email: normalizedEmail,
      role,
      passwordHash,
    });
    console.log(`Created admin profile ${created._id} for ${normalizedEmail}`);
  }
}

console.log("Done. Remove ADMIN_EMAIL / ADMIN_PASSWORD from .env if present.");
