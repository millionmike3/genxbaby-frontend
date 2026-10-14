import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const employerName = String(data.get("employerName"));
  const position = String(data.get("position"));
  const startDate = new Date(String(data.get("startDate")));
  const endDateRaw = data.get("endDate");
  const endDate = endDateRaw ? new Date(String(endDateRaw)) : null;

  const borrower = await prisma.borrower.findUnique({
    where: { userId },
  });

  if (!borrower) {
    return NextResponse.redirect("/borrower/application");
  }

  await prisma.employment.create({
    data: {
      borrowerId: borrower.id,
      employerName,
      position,
      startDate,
      endDate,
    },
  });

  return NextResponse.redirect("/borrower/application/step-3");
}
