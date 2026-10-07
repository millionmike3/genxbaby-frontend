import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const lo = await prisma.loanOfficer.findUnique({ where: { email } });
  if (!lo) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(password, lo.passwordHash);
  if (!ok) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // naive session token; replace with JWT or proper session store
  const token = `${lo.id}:${Date.now()}`;
  cookies().set("lo_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  // TODO: issue JWT or session cookie
  return NextResponse.json({
    success: true,
    loanOfficer: { id: lo.id, name: lo.name, email: lo.email },
  });
}
