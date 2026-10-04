import { NextResponse } from "next/server";
import { sendEmailNotification, sendSmsNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const { type, to, subject, message } = body;

  if (type === "EMAIL") {
    await sendEmailNotification(to, subject, message);
  } else if (type === "SMS") {
    await sendSmsNotification(to, message);
  }

  return NextResponse.json({ success: true });
}
