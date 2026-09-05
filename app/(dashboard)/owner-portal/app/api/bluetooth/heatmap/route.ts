// owner-portal/app/api/bluetooth/heatmap/route.ts

import { NextResponse } from "next/server";
import { getBluetoothHeatmapData } from "@/services/bluetooth-engine";

export async function GET() {
  try {
    const data = await getBluetoothHeatmapData();
    return NextResponse.json({ success: true, devices: data });
  } catch (err) {
    console.error("BLUETOOTH HEATMAP ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load Bluetooth heatmap" },
      { status: 500 }
    );
  }
}
