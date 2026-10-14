import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req, { params }) {
  const prisma = await getPrisma();

  await prisma.staff.delete({
    where: { id: params.id },
  });

  return NextResponse.redirect("/owner/manage/staff");
}
