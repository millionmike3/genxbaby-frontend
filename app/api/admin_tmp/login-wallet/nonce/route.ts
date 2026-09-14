import { NextRequest,  NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const nonce = crypto.randomBytes(16).toString("hex");

  return NextResponse.json({
    nonce,
    message: `GenxBaby Admin Login\nNonce: ${nonce}`,
  });
}
