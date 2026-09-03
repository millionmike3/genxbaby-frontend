// admin-dashboard/app/api/bluetooth/correlation/route.ts

import { NextResponse } from "next/server";
import { getBluetoothBehaviorCorrelation } from "@/services/bluetooth-engine/correlation";

export async function GET() {
  try {
    const data = await getBluetoothBehaviorCorrelation();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("BLUETOOTH CORRELATION ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load Bluetooth correlation" },
      { status: 500 }
    );
  }
}
