// lib/authz.ts
import { getSession } from "./session";

export async function requireRole(roles: ("admin" | "investor" | "borrower")[]) {
  const session = await getSession();
  if (!session || !roles.includes(session.role)) {
    throw new Error("FORBIDDEN");
  }
  return session;
}
