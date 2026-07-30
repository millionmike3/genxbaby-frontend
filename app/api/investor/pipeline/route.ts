import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const deals = await prisma.pipelineDeal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(deals);
}
