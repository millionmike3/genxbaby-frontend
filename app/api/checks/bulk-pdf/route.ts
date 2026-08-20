import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { checks } = await req.json();

    if (!checks || !Array.isArray(checks) || checks.length === 0) {
      return NextResponse.json(
        { error: "No checks provided" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy bulk PDF ZIP generation to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/bulk-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checks }),
    });

    // Backend returns ZIP bytes
    const zipBytes = await response.arrayBuffer();

    return new NextResponse(zipBytes, {
      status: response.status,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=checks-bulk.zip",
      },
    });
  } catch (err) {
    console.error("FRONTEND BULK PDF ERROR:", err);
    return NextResponse.json(
      { error: "Failed to export bulk PDFs" },
      { status: 500 }
    );
  }
}
