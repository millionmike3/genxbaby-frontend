
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return NextResponse.redirect(
    new URL("/api/auth/logout", request.url),
    { status: 307 }
  );
}
