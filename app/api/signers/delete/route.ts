import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.formData();
  const id = body.get("id") as string;

  await prisma.signer.delete({
    where: { id }
  });

  return NextResponse.redirect("/signers");
}
