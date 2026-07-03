import { getAdminSession, isSessionValid } from "./session";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!isSessionValid(session)) {
    session.destroy();
    throw new UnauthorizedError();
  }

  return session;
}

export async function getOptionalAdmin() {
  const session = await getAdminSession();
  return isSessionValid(session) ? session : null;
}
