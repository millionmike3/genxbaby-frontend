import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ---------------------------------------------
    // Proxy check list request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("FRONTEND CHECK LIST ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load check list" },
      { status: 500 }
    );
  }
}
