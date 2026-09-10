import { NextResponse } from "next/server";
import { runUnderwriting } from "@/lib/services/underwriting";

export async function POST(req: Request) {
  const body = await req.json();
  const applicationId = body.applicationId as string | undefined;

  if (!applicationId) {
    return NextResponse.json(
      { error: "Missing applicationId" },
      { status: 400 }
    );
  }

  const uwCase = await runUnderwriting({ applicationId });

  return NextResponse.json({ uwCase });
}
