import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  try {
    const docs = await prisma.borrowerDocument.findMany({
      where: { applicationId: params.applicationId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: docs });
  } catch (err) {
    console.error("Document List Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
