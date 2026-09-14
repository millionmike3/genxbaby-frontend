import { NextRequest,  NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const body = await request.json();

    if (!body.bankProfileId) {
      return NextResponse.json(
        { error: "Missing bankProfileId" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/reconcile`, {
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
    console.error("FRONTEND RECONCILE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to reconcile checks" },
      { status: 500 }
    );
  }
}
