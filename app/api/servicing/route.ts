import { generateAmortization } from "@/services/servicing";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  const { principal, rate, termMonths } = await request.json();
  const schedule = generateAmortization(principal, rate, termMonths);
  return NextResponse.json({ schedule });
}
