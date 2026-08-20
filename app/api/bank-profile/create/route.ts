import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/bank-profile/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND BANK PROFILE CREATE ERROR:", err);
    return NextResponse.json({ error: "Failed to create bank profile" }, { status: 500 });
  }
}
