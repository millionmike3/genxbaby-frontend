// lib/session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
const SESSION_COOKIE = "session";
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days

export type Role = "admin" | "investor" | "borrower";

export interface Session {
  userId: string;
  role: Role;
  expiresAt: number;
}

export async function createSession(userId: string, role: Role) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

  const token = await new SignJWT({ userId, role, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .setIssuedAt()
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const session = payload as Session;
    if (session.expiresAt < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}
