import { NextResponse } from "next/server";
import { computeLlpa } from "@/lib/llpaEngine";

export async function POST(req: Request) {
  const body = await req.json();
  const llpaBps = await computeLlpa(body);
  return NextResponse.json({ llpaBps });
}
