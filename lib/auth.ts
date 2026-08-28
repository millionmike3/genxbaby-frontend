import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function getUserFromCookie() {
  const cookieStore = await cookies();   // <-- FIX
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

export async function requireAdmin() {
  const user = await getUserFromCookie();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  return user;
}
