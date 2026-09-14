import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.formData();

  const signer = await prisma.signer.create({
    data: {
      name: body.get("name") as string,
      title: body.get("title") as string,
      signatureImage: body.get("signatureImage") as string,
      signatureUrl: body.get("signatureUrl") as string,

      // FIX: convert string → number
      bankProfileId: Number(body.get("bankProfileId"))
    }
  });

  return NextResponse.json(signer);
}
