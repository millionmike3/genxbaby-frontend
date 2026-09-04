import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { investorId, baseSpread, llpaFactor } = await req.json();
  await prisma.investorPricingSheet.create({
    data: {
      investorId,
      name: `Sheet ${new Date().toISOString()}`,
      effectiveAt: new Date(),
      baseSpread,
      llpaFactor,
      active: true,
    },
  });
  return Response.json({ ok: true });
}
