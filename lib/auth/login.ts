// lib/auth/login.ts
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { JWT_SECRET } from "@/lib/jwt";
import { getPrisma } from "@/lib/db/prisma";

export async function roleLogin(email: string, password: string, role: string) {
  const prisma = getPrisma();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== role) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  const token = await new SignJWT({
    id: user.id,
    role: user.role,
    fullName: user.fullName ?? null,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  return { user, token };
}
