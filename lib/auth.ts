import "server-only";

import { getSession, type AppSession } from "@/lib/session";
import type { AppRole } from "@/lib/jwt";

export async function auth(): Promise<AppSession | null> {
  return getSession();
}

export async function requireRole(
  roles: readonly string[]
): Promise<AppSession> {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!roles.includes(session.role)) {
    throw new Error("Unauthorized");
  }

  return session;
}

export function hasRole(
  session: AppSession | null,
  role: AppRole
): boolean {
  return session?.role === role;
}