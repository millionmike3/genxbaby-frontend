import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body.checkIds) || body.checkIds.length === 0) {
      return NextResponse.json(
        { error: "Missing checkIds array" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/bulk-delete`, {
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
    console.error("FRONTEND BULK DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to bulk delete checks" },
      { status: 500 }
    );
  }
}
