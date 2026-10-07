import { NextRequest,  NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const body = await request.json();

    if (!body.check) {
      return NextResponse.json(
        { error: "Missing check data" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/advanced-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const pdfBytes = await response.arrayBuffer();

    return new NextResponse(pdfBytes, {
      status: response.status,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=check-advanced.pdf",
      },
    });

  } catch (err) {
    console.error("FRONTEND ADVANCED PDF ERROR:", err);
    return NextResponse.json(
      { error: "Failed to generate advanced PDF" },
      { status: 500 }
    );
  }
}
