import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Call your backend login endpoint
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  // If backend returns an error, forward it
  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  // Backend returns:
  // { token, cookieName, role, roles }
  const { token, cookieName, role, roles } = data;

  // Prepare frontend response
  const res = NextResponse.json({
    success: true,
    role,
    roles,
  });

  // Set the correct cookie based on backend cookieName
  res.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
