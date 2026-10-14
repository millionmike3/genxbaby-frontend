
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getServerSession } from "next-auth";
import { JWT_SECRET } from "@/lib/jwt";

// Optional NextAuth session
export async function auth() {
  return await getServerSession();
}

// Read user from either admin_token or auth_token
export async function getUserFromCookie() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_token")?.value ||
    cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

// Universal role guard
export async function requireRole(roles: string[]) {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_token")?.value ||
    cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  // Verify JWT using unified secret
  const { payload } = await jwtVerify(token, JWT_SECRET);

  if (!roles.includes(payload.role)) {
    throw new Error("Unauthorized");
  }

  return payload;
}
