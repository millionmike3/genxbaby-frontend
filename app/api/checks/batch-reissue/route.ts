import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { checkIds } = await req.json();

    if (!checkIds || !Array.isArray(checkIds) || checkIds.length === 0) {
      return NextResponse.json(
        { error: "No check IDs provided" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy batch reissue request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/batch-reissue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkIds }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("FRONTEND BATCH REISSUE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to reissue checks" },
      { status: 500 }
    );
  }
}
