import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const signerId = url.searchParams.get("id");

    if (!signerId) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/signer?id=${signerId}`, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND SIGNER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load signer" },
      { status: 500 }
    );
  }
}
