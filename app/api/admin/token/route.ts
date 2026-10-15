import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("admin_token")?.value ?? null;
    return NextResponse.json({ token });
  } catch (err) {
    console.error("Token route error:", err);
    return NextResponse.json({ token: null });
  }
}
