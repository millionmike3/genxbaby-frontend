import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch full application with borrower + underwriting case
    const app = await prisma.application.findUnique({
      where: { id },
      include: {
        borrower: true,
        underwritingCase: true,
      },
    });

    if (!app) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: app,
    });
  } catch (err) {
    console.error("Application API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
