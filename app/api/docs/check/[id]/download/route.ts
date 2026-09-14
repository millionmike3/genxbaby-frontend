
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { id } = await context.params;

  const doc = await prisma.check.findUnique({
    where: { id },
  });

  if (!doc || !doc.pdfUrl) {
    return NextResponse.json({ error: "PDF not found" }, { status: 404 });
  }

  return NextResponse.redirect(doc.pdfUrl);
}
