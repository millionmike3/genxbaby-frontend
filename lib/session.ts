// lib/session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getPrisma } from "@/lib/db/prisma";

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

// getSession(token) — correct pattern
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

// ⭐ Corrected getCurrentUser()
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const session = await getSession(token);
  if (!session) return null;

  const prisma = await getPrisma();

  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  return user;
}
