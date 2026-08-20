import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const checkId = url.searchParams.get("id");

    if (!checkId) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/details?id=${checkId}`);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND DETAILS ERROR:", err);
    return NextResponse.json({ error: "Failed to load check details" }, { status: 500 });
  }
}
