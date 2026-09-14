import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const disclosure = await prisma.disclosure.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        title: true,
        url: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: disclosure });
  } catch (err) {
    console.error("Disclosure Lookup Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
