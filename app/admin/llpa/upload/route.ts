import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { rows } = await req.json();
  await prisma.llpaGridRow.createMany({ data: rows });
  return Response.json({ ok: true });
}
