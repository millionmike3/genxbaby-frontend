import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      oldCheckId,
      newCheckNumber,
      payee,
      amount,
      memo,
      date,
      bankProfileId,
      signerId
    } = body;

    // Basic validation (frontend only)
    if (!oldCheckId || !newCheckNumber || !bankProfileId || !signerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy reissue request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/reissue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("FRONTEND CHECK REISSUE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to reissue check" },
      { status: 500 }
    );
  }
}
