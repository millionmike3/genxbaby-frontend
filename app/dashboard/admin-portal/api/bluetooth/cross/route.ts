import { NextResponse } from "next/server";
import { getBluetoothHeatmapData } from "@/services/bluetooth-engine";
import { getBehaviorHeatmapData } from "@/services/behavior-engine";
import { getStockHeatmapData } from "@/services/stock-engine";

export async function GET() {
  try {
    const bluetooth = await getBluetoothHeatmapData();
    const behavior = await getBehaviorHeatmapData();
    const stock = await getStockHeatmapData();

    return NextResponse.json({
      success: true,
      bluetooth,
      behavior,
      stock,
    });
  } catch (err) {
    console.error("CROSS-ENGINE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load cross-engine intelligence" },
      { status: 500 }
    );
  }
}
