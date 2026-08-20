import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { checkIds } = await req.json();

    if (!checkIds || !Array.isArray(checkIds) || checkIds.length === 0) {
      return NextResponse.json(
        { error: "No check IDs provided" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy batch PDF generation to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkIds }),
    });

    // Backend returns raw PDF bytes
    const pdfBytes = await response.arrayBuffer();

    return new NextResponse(pdfBytes, {
      status: response.status,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=batch-checks.pdf",
      },
    });
  } catch (error) {
    console.error("FRONTEND BATCH PDF ERROR:", error);
    return NextResponse.json(
      { error: "Failed to generate batch PDF" },
      { status: 500 }
    );
  }
}
