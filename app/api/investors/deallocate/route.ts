import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const allocationId = String(data.get("id"));

  const alloc = await prisma.allocation.findUnique({
    where: { id: allocationId },
  });

  if (!alloc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Remove allocation
  await prisma.allocation.delete({
    where: { id: allocationId },
  });

  // Update deployed capital
  await prisma.investor.update({
    where: { id: alloc.investorId },
    data: {
      deployedCapital: {
        decrement: alloc.amount,
      },
    },
  });

  return NextResponse.redirect(`/admin/investors/${alloc.investorId}`);
}
