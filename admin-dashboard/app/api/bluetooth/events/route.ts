import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildDeviceFingerprint } from "@/services/bluetooth-engine/fingerprint";

export async function POST(req: Request) {
  try {
    const { deviceId, name, rssi } = await req.json();

    if (!deviceId || !name) {
      return NextResponse.json(
        { error: "deviceId and name are required" },
        { status: 400 }
      );
    }

    // Build fingerprint
    const fingerprint = buildDeviceFingerprint(deviceId, name);

    // Save event
    const event = await prisma.bluetoothEvent.create({
      data: {
        deviceId,
        name,
        rssi,
        fingerprint,
        timestamp: new Date(),
      },
    });

    return NextResponse.json({ event });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to process Bluetooth event" },
      { status: 500 }
    );
  }
}
