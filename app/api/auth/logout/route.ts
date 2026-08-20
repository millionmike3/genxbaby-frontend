import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND LOGOUT ERROR:", err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
