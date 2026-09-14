import { NextRequest,  NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const body = await request.json();

    if (!Array.isArray(body.checkIds) || body.checkIds.length === 0) {
      return NextResponse.json(
        { error: "Missing checkIds array" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/bulk-void`, {
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
    console.error("FRONTEND BULK VOID ERROR:", err);
    return NextResponse.json(
      { error: "Failed to bulk void checks" },
      { status: 500 }
    );
  }
}
