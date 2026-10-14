import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { analyzeStock } from "@/lib/sanitizer/stock";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const stocks = await prisma.stockSanitizer.findMany();

  for (const s of stocks) {
    const analysis = analyzeStock(s);

    await prisma.stockSanitizer.update({
      where: { id: s.id },
      data: {
        volatility: analysis.volatility,
        riskScore: analysis.riskScore,
        sector: analysis.sector,
      },
    });
  }

  return NextResponse.redirect("/stock-sanitizer");
}
