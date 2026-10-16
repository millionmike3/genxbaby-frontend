import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const email = String(data.get("email"));
  const password = String(data.get("password"));

  const staff = await prisma.staff.findUnique({
    where: { email },
  });

  if (!staff || staff.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" });
  }

  const token = await new SignJWT({
    role: "STAFF",
    staffId: staff.id,
    email: staff.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  const cookieStore = await cookies();
  cookieStore.set("session_staff", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.redirect("/staff/dashboard");
}
