import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/admin/users`, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND ADMIN USERS ERROR:", err);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}
