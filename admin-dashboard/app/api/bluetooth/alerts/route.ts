// admin-dashboard/app/api/bluetooth/alerts/route.ts

import { NextResponse } from "next/server";
import { getBluetoothAlerts } from "@/services/bluetooth-engine";

export async function GET() {
  try {
    const alerts = await getBluetoothAlerts();

    return NextResponse.json({
      success: true,
      alerts,
    });
  } catch (err) {
    console.error("BLUETOOTH ALERTS ERROR:", err);

    return NextResponse.json(
      { error: "Failed to load Bluetooth alerts" },
      { status: 500 }
    );
  }
}
