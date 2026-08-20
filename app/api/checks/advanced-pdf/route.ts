import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
        Cookie: req.headers.get("cookie") || "",
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
