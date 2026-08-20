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
    // Proxy CSV generation to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/batch-csv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkIds }),
    });

    // Backend returns raw CSV text
    const csv = await response.text();

    return new NextResponse(csv, {
      status: response.status,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="checks_export.csv"`,
      },
    });
  } catch (error) {
    console.error("FRONTEND BATCH CSV ERROR:", error);
    return NextResponse.json(
      { error: "Failed to export CSV" },
      { status: 500 }
    );
  }
}
