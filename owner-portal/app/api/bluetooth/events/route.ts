// owner-portal/app/api/bluetooth/events/route.ts

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const prisma = await getPrisma();
    const body = await req.json();

    const {
      name,
      deviceId,
      timestamp,
      userId,
      sessionId,
      signalStrength,
      metadata,
    } = body;

    const event = await prisma.bluetoothEvent.create({
      data: {
        name: name || "Unknown Device",
        deviceId,
        timestamp: new Date(timestamp),
        userId,
        sessionId,
        signalStrength,
        metadata,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (err) {
    console.error("BLUETOOTH EVENT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to record Bluetooth event" },
      { status: 500 }
    );
  }
}
