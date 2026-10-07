import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const body = await request.formData();
  const signerId = body.get("id") as string;

  const prisma = await getPrisma();

  const updated = await prisma.signer.update({
    where: { id: signerId },
    data: {
      name: body.get("name") as string,
      title: body.get("title") as string,
      signatureImage: body.get("signatureImage") as string,
      signatureUrl: body.get("signatureUrl") as string,
      bankProfileId: Number(body.get("bankProfileId")),
    },
  });

  return NextResponse.json(updated);
}
