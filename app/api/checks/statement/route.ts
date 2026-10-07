import { NextRequest,  NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const body = await request.json();

    if (!body.bankProfileId) {
      return NextResponse.json(
        { error: "Missing bankProfileId" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/statement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const statementBytes = await response.arrayBuffer();

    return new NextResponse(statementBytes, {
      status: response.status,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=statement.pdf",
      },
    });

  } catch (err) {
    console.error("FRONTEND STATEMENT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to generate statement" },
      { status: 500 }
    );
  }
}
