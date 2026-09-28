import { NextResponse } from "next/server";
import { getUnderwritingProfile } from "@/services/analytics-engine/underwritingEngine";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));

  const profile = await getUnderwritingProfile(userId);

  return NextResponse.json(profile);
}
