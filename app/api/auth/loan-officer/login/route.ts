import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const email = String(data.get("email"));
  const password = String(data.get("password"));

  const officer = await prisma.loanOfficer.findUnique({
    where: { email },
  });

  if (!officer || officer.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" });
  }

  // Create JWT
  const token = await new SignJWT({
    role: "LOAN_OFFICER",
    officerId: officer.id,
    email: officer.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.redirect("/loan-officer/dashboard");
}
