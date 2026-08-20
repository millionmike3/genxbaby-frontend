import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const bankProfileId = url.searchParams.get("id");

    if (!bankProfileId) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/bank-profile?id=${bankProfileId}`, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND BANK PROFILE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load bank profile" },
      { status: 500 }
    );
  }
}
