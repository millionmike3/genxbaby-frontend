import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/admin/behavior/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BEHAVIOR PROXY ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch behavior" },
      { status: 500 }
    );
  }
}
