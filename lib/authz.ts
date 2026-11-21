import "server-only";

import { auth } from "@/lib/auth";
import type { AppSession } from "@/lib/session";

export async function requireRole(
  roles: readonly string[]
): Promise<AppSession | null> {
  const session = await auth();

  if (!session) {
    return null;
  }

  if (!roles.includes(session.role)) {
    return null;
  }

  return session;
}
