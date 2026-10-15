import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  const { token } = await req.json();
  const session = await getSession(token);

  return NextResponse.json({ session });
}
