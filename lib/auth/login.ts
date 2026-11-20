// lib/auth/login.ts
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { JWT_SECRET } from "@/lib/jwt";
import { getPrisma } from "@/lib/db/prisma";

export async function roleLogin(email: string, password: string) {
  const prisma = getPrisma();

  // Load user record only
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  // Build JWT payload with role
  const payload = {
    userId: user.id,
    role: user.role,              // "OWNER" | "ADMIN" | "INVESTOR" | "PROCESSOR" | "UNDERWRITER"
    fullName: user.fullName ?? null,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  return { user, token };
}
