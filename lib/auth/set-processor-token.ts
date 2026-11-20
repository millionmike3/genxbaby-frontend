import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";

export async function setProcessorToken(user) {
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    SECRET,
    { expiresIn: "2h" }
  );

  cookies().set({
    name: "processor_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",   // ← REQUIRED
  });

  return token;
}
