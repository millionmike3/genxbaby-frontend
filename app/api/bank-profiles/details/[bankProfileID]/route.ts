import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ bankProfileID: string }> }
) {
  try {
    // Next.js 16 requires awaiting params
    const { bankProfileID } = await context.params;

    if (!bankProfileID) {
      return NextResponse.json(
        { error: "Missing bank profile ID" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(
      `${backendUrl}/api/bank-profiles/details/${bankProfileID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BANK PROFILE DETAILS ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
