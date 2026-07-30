import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const investors = await prisma.investor.findMany({
    orderBy: { investorPotentialScore: "desc" },
  });

  return Response.json(investors);
}
