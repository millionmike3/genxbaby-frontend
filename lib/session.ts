// lib/session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getPrisma } from "@/lib/db/prisma";
import { JWT_SECRET } from "@/lib/jwt";

export type Role =
  | "ADMIN"
  | "INVESTOR"
  | "BORROWER"
  | "OWNER"
  | "UNDERWRITER"
  | "PROCESSING"
  | "SERVICING"
  | "STAFF"
  | "LOAN_OFFICER";

export interface SessionPayload {
  id: number;
  role: Role;
  fullName?: string | null;
}

// Create a JWT session (used in login route)
export async function createSession(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// Legacy-safe: validate JWT and return payload
// (Unified system uses auth(), but this keeps compatibility)
export async function getSession(token: string | undefined) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

// Unified system: get current user from auth_token
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const session = await getSession(token);
  if (!session) return null;

  const prisma = await getPrisma();

  const user = await prisma.user.findUnique({
    where: { id: Number(session.id) },
  });

  return user;
}
