import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  // Extract session token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = await getPrisma();
  const body = await req.json();

  const { amount, type } = body;

  await prisma.investorFundingRequest.create({
    data: {
      investorId: Number(session.userId),
      amount,
      type,
      status: "PENDING",
    },
  });

  return NextResponse.json({ ok: true });
}
