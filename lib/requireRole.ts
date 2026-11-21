
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt";

export interface AuthenticatedUser {
  id: string;
  email?: string;
  role: string;
}

export async function requireRole(
  roles: string[]
): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    const userId =
      typeof payload.sub === "string" ? payload.sub : null;

    const role =
      typeof payload.role === "string"
        ? payload.role.toUpperCase()
        : null;

    if (!userId || !role) {
      return null;
    }

    if (!roles.map((item) => item.toUpperCase()).includes(role)) {
      return null;
    }

    return {
      id: userId,
      email:
        typeof payload.email === "string"
          ? payload.email
          : undefined,
      role,
    };
  } catch {
    return null;
  }
}
