import { NextRequest,  NextResponse } from "next/server";
import { BehaviorDAL } from "@/lib/dal/behavior";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.json();

  const event = await BehaviorDAL.collect(body.applicationId, {
    type: body.type,
    hesitation: body.hesitation,
    depth: body.depth,
    duration: body.duration,
  });

  return NextResponse.json({ data: event });
}
