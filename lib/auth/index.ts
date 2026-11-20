// lib/auth/index.ts
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt";
import { requireRole as _requireRole } from "./requireRole";

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return {
      userId: payload.userId,
      ownerId: payload.ownerId,
      role: payload.role,
      fullName: payload.fullName,
    };
  } catch {
    return null;
  }
}

export const requireRole = _requireRole;
