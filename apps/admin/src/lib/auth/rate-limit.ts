type RateLimitEntry = {
  failures: number;
  lockedUntil: number;
  lastAttempt: number;
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const WINDOW_MS = 60 * 60 * 1000;

const attempts = new Map<string, RateLimitEntry>();

function pruneExpired(now: number) {
  for (const [key, entry] of attempts.entries()) {
    if (entry.lockedUntil < now && now - entry.lastAttempt > WINDOW_MS) {
      attempts.delete(key);
    }
  }
}

export function getRateLimitKey(ip: string) {
  return ip || "unknown";
}

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  pruneExpired(now);

  const entry = attempts.get(key);
  if (!entry) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.lockedUntil - now) / 1000),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedLogin(key: string) {
  const now = Date.now();
  const entry = attempts.get(key) ?? {
    failures: 0,
    lockedUntil: 0,
    lastAttempt: now,
  };

  entry.failures += 1;
  entry.lastAttempt = now;

  if (entry.failures >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS;
    entry.failures = 0;
  }

  attempts.set(key, entry);
}

export function clearLoginAttempts(key: string) {
  attempts.delete(key);
}
