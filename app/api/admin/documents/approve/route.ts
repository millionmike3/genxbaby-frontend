import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const form = await req.formData();
  const id = String(form.get("id"));

  await prisma.documentApproval.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  return NextResponse.redirect("/admin/documents");
}
