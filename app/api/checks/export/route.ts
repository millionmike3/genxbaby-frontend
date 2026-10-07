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

    const response = await fetch(`${backendUrl}/api/checks/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const exportBytes = await response.arrayBuffer();

    return new NextResponse(exportBytes, {
      status: response.status,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=checks-export.zip",
      },
    });

  } catch (err) {
    console.error("FRONTEND EXPORT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to export checks" },
      { status: 500 }
    );
  }
}
