import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const investorId = String(data.get("investorId"));
  const mortgageId = Number(data.get("mortgageId"));
  const amount = Number(data.get("amount"));

  // Create allocation
  await prisma.allocation.create({
    data: {
      investorId,
      mortgageId,
      amount,
    },
  });

  // Update deployed capital
  await prisma.investor.update({
    where: { id: investorId },
    data: {
      deployedCapital: {
        increment: amount,
      },
    },
  });

  return NextResponse.redirect(`/admin/investors/${investorId}`);
}
