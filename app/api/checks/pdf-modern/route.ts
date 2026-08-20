import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { check } = body;

    if (!check) {
      return NextResponse.json(
        { error: "Missing check data" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy modern PDF generation to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/pdf-modern`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ check }),
    });

    // Backend returns raw PDF bytes
    const pdfBytes = await response.arrayBuffer();

    return new NextResponse(pdfBytes, {
      status: response.status,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=check-modern.pdf",
      },
    });
  } catch (error) {
    console.error("FRONTEND PDF-MODERN ERROR:", error);
    return NextResponse.json(
      { error: "Failed to generate modern PDF" },
      { status: 500 }
    );
  }
}
