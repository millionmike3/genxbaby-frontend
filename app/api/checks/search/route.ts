import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");

    if (!q) {
      return NextResponse.json({ error: "Missing search query" }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/search?q=${q}`);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND SEARCH ERROR:", err);
    return NextResponse.json({ error: "Failed to search checks" }, { status: 500 });
  }
}
