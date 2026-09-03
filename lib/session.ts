// lib/session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days

export type Role = "admin" | "investor" | "borrower";

export interface Session {
  userId: string;
  role: Role;
  expiresAt: number;
}

export async function createSession(userId: string, role: Role) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

  return await new SignJWT({ userId, role, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .setIssuedAt()
    .sign(secret);
}

// IMPORTANT:
// getSession now expects the token to be passed in.
// No cookies(), no headers(), no broken APIs.
export async function getSession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);

    if (
      typeof payload.userId !== "string" ||
      typeof payload.role !== "string" ||
      typeof payload.expiresAt !== "number"
    ) {
      return null;
    }

    const session: Session = {
      userId: payload.userId,
      role: payload.role as Role,
      expiresAt: payload.expiresAt,
    };

    if (session.expiresAt < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
