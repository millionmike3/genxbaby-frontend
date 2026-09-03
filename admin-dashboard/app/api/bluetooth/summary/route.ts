// admin-dashboard/app/api/bluetooth/summary/route.ts

import { NextResponse } from "next/server";
import { getAdminBluetoothSummary } from "@/services/bluetooth-engine";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const range = searchParams.get("range"); // 1h, 24h, 7d, 30d
    const type = searchParams.get("type");   // mobile, laptop, unknown
    const signal = searchParams.get("signal"); // weak, fair, good, excellent

    const summary = await getAdminBluetoothSummary({
  range: range ?? undefined,
  type: type ?? undefined,
  signal: signal ?? undefined,
});


    return NextResponse.json({ success: true, summary });
  } catch (err) {
    console.error("BLUETOOTH SUMMARY ERROR:", err);
    return NextResponse.json({ error: "Failed to load Bluetooth summary" }, { status: 500 });
  }
}

