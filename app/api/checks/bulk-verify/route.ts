import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body.checkNumbers) || body.checkNumbers.length === 0) {
      return NextResponse.json(
        { error: "Missing checkNumbers array" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/bulk-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND BULK VERIFY ERROR:", err);
    return NextResponse.json(
      { error: "Failed to bulk verify checks" },
      { status: 500 }
    );
  }
}
