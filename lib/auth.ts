import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getServerSession } from "next-auth";

// Optional NextAuth session (if you use it anywhere)
export async function auth() {
  return await getServerSession();
}

// JWT secret for cookie-based auth
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret"
);

// Legacy — still safe to keep if old routes use it
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

// Legacy admin guard — safe to keep for old pages
export async function requireAdmin() {
  const user = await getUserFromCookie();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  return user;
}

// NEW — Correct universal role guard for admin
export async function requireRole(roles: string[]) {
  const token = cookies().get("admin_token")?.value;
  if (!token) throw new Error("Unauthorized");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(token, secret);

  if (!roles.includes(payload.role)) {
    throw new Error("Unauthorized");
  }

  return payload;
}
