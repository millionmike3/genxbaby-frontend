import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const prisma = getPrisma();

  const borrower = await prisma.borrower.findUnique({
    where: { email },
  });

  if (!borrower) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, borrower.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // TODO: Add JWT or session cookie
  return NextResponse.json({ success: true });
}
