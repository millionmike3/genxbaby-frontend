import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/admin/behavior`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BEHAVIOR LIST PROXY ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch behavior profiles" },
      { status: 500 }
    );
  }
}
