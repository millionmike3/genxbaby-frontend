import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { emails, checks } = await req.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "No emails provided" },
        { status: 400 }
      );
    }

    if (!checks || !Array.isArray(checks) || checks.length === 0) {
      return NextResponse.json(
        { error: "No checks provided" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy bulk email request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/bulk-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emails, checks }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BULK EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Failed to send bulk email" },
      { status: 500 }
    );
  }
}
