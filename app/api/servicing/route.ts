import { generateAmortization } from "@/services/servicing";

export async function POST(req: Request) {
  const { principal, rate, termMonths } = await req.json();
  const schedule = generateAmortization(principal, rate, termMonths);
  return Response.json({ schedule });
}
