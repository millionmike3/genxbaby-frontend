// lib/session.ts
import "server-only";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt";
import { cookies } from "next/headers";
import { getPrisma } from "@/lib/db/prisma";

export async function getSession(token: string | undefined) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return {
      userId: payload.userId ?? null,
      ownerId: payload.ownerId ?? null,
      role: payload.role ?? null,
      fullName: payload.fullName ?? null,
    };
  } catch (err) {
    console.error("SESSION DECODE ERROR:", err);
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const session = await getSession(token);
  if (!session || !session.userId) return null;

  const prisma = await getPrisma();

  return prisma.user.findUnique({
    where: { id: session.userId },
  });
}
