import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt";

export async function auth() {
  const cookieStore = await cookies();   // 🔥 REQUIRED in Next.js 16

  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return {
      user: {
        id: payload.id,
        role: payload.role,
        fullName: payload.fullName,
      },
    };
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export async function requireRole(roles: string[]) {
  const cookieStore = await cookies();   // 🔥 REQUIRED

  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("Unauthorized");

  const { payload } = await jwtVerify(token, JWT_SECRET);

  if (!roles.includes(payload.role)) {
    throw new Error("Unauthorized");
  }

  return payload;
}
