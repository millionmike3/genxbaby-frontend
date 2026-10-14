import { NextResponse } from "next/server";
import { computeLlpa } from "@/lib/llpaEngine";

export async function POST(req: Request) {
  const body = await req.json();
  const llpaBps = await computeLlpa(body);
  return NextResponse.json({ llpaBps });
}

export async function GET() {
  const res = await fetch("http://localhost:5000/llpa");
  const data = await res.json();
  return NextResponse.json(data);
}
