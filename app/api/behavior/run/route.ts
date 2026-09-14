import { NextRequest,  NextResponse } from "next/server";
import { runBehaviorEngine } from "@/lib/engines/behavior";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { applicationId } = await request.json();

  const profile = await runBehaviorEngine(applicationId);

  return NextResponse.json({ data: profile });
}
