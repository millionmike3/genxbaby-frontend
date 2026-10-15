import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();   // ✔ Turbopack requires await
    const token = cookieStore.get("admin_token")?.value ?? null;

    return NextResponse.json({ token });
  } catch (err) {
    console.error("TOKEN ROUTE ERROR:", err);
    return NextResponse.json({ token: null }, { status: 500 });
  }
}
