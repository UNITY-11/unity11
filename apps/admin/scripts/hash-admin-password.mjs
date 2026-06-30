import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: pnpm hash-password \"your-secure-password\"");
  process.exit(1);
}

if (password.length < 12) {
  console.error("Use a password with at least 12 characters.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log(hash);
