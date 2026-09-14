import { NextRequest,  NextResponse } from "next/server";
import { EnvironmentDAL } from "@/lib/dal/environment";
import { normalizeInput } from "@/lib/scoring/normalize";
import { scoreRisk } from "@/lib/scoring/risk";

// Define the shape of the environment scoring input
interface EnvironmentInput {
  deviceCount: number;
  bluetoothDensity: number;
  age?: number;
  incomeVolatility?: number;
  ipReputation?: string;
  locationId: string;
  timestamp?: string | number | Date;
}

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = (await request.json()) as EnvironmentInput;

  const { deviceCount, bluetoothDensity, locationId, timestamp } = body;

  // Normalize only the fields you actually have
  const normalized = normalizeInput({
    deviceCount: Number(deviceCount),
    bluetoothDensity: Number(bluetoothDensity),
    age: body.age ?? 0,
    incomeVolatility: body.incomeVolatility ?? 0,
    ipReputation: body.ipReputation ?? "unknown",
  });

  const riskScore = scoreRisk(normalized);

  await EnvironmentDAL.saveReading(locationId, {
    deviceCount: Number(deviceCount),
    bluetoothDensity: Number(bluetoothDensity),
    timestamp: timestamp ? new Date(timestamp) : new Date(),
    riskScore,
  });

  return NextResponse.json({ riskScore });
}
