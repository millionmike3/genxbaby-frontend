import { NextRequest, NextResponse } from "next/server";
import { BehaviorDAL } from "@/lib/dal/behavior";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const event = await BehaviorDAL.collectBehavior(body.userId, body);

    return NextResponse.json({ success: true, event });
  } catch (err) {
    console.error("Behavior Collect Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
