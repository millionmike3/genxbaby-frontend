import { NextRequest,  NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const body = await request.json();

    if (!body.fileBase64) {
      return NextResponse.json(
        { error: "Missing fileBase64" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Failed to upload check" },
      { status: 500 }
    );
  }
}
