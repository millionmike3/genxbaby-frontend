import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getServerSession } from "next-auth";
import { getSession } from "@/lib/session";

// Optional NextAuth session (if you use it anywhere)
export async function auth() {
  return await getServerSession();
}

// JWT secret for cookie-based auth
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret"
);

// Read user from auth_token cookie (legacy system)
export async function getUserFromCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

// Admin-only guard (legacy)
export async function requireAdmin() {
  const user = await getUserFromCookie();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  return user;
}

// NEW — Universal role guard for borrower, investor, owner, admin
export async function requireRole(roles: string[]) {
  const cookieStore = await cookies();   // <-- FIX
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);

  if (!session) throw new Error("Not authenticated");

  if (!roles.includes(session.role)) {
    throw new Error(`Unauthorized: ${roles.join(", ")} role required`);
  }

  return session;
}

