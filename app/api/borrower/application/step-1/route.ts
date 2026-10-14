import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  await prisma.borrower.update({
    where: { userId },
    data: {
      fullName: String(data.get("fullName")),
      phone: String(data.get("phone")),
      email: String(data.get("email")),
    },
  });

  return NextResponse.redirect("/borrower/application/step-2");
}
