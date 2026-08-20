import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { checkId } = body;

    if (!checkId) {
      return NextResponse.json(
        { error: "Missing checkId" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update check" },
      { status: 500 }
    );
  }
}
