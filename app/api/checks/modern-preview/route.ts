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

    const response = await fetch(`${backendUrl}/api/checks/modern-preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const previewBytes = await response.arrayBuffer();

    return new NextResponse(previewBytes, {
      status: response.status,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "inline; filename=check-preview.png",
      },
    });

  } catch (err) {
    console.error("FRONTEND MODERN PREVIEW ERROR:", err);
    return NextResponse.json(
      { error: "Failed to generate preview" },
      { status: 500 }
    );
  }
}
