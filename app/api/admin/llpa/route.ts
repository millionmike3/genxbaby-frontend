import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { rows } = await req.json();

  if (!Array.isArray(rows)) {
    return new Response(JSON.stringify({ error: "rows must be an array" }), {
      status: 400,
    });
  }

  await prisma.llpaGridRow.deleteMany(); // optional: clear existing
  await prisma.llpaGridRow.createMany({ data: rows });

  return Response.json({ ok: true });
}
