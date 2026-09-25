import { NextResponse } from "next/server";
import { evaluateAsset } from "@/lib/underwritingEngine";

export async function POST(req: Request) {
  const body = await req.json(); // property + mortgage snapshot
  const result = await evaluateAsset(body);
  return NextResponse.json(result);
}
