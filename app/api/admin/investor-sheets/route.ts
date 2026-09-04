import { prisma } from "@/lib/prisma";

export async function GET() {
  const sheets = await prisma.investorPricingSheet.findMany({
    orderBy: { effectiveAt: "desc" },
  });
  return Response.json({ sheets });
}

export async function POST(req: Request) {
  const { investorId, baseSpread, llpaFactor } = await req.json();

  await prisma.investorPricingSheet.updateMany({
    where: { investorId },
    data: { active: false },
  });

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
