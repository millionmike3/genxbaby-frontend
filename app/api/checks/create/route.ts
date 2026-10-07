console.log("LOADING CHECK CREATE ROUTE");

import { NextRequest,  NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  console.log("POST /api/checks/create HIT");

  try {
    const body = await request.json();
    console.log("RAW BODY:", body);

    const {
      checkNumber,
      payee,
      amount,
      memo,
      date,
      bankProfileId,
      signerId
    } = body;

    // ⭐ VALIDATE REQUIRED FIELDS (frontend only)
    if (!checkNumber || !payee || !amount || !date || !bankProfileId || !signerId) {
      console.error("Missing required fields:", body);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ⭐ Proxy request to backend
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error: any) {
    console.error("FRONTEND CHECK CREATE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
