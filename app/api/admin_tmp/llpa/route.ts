import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { rows } = await request.json();

  if (!Array.isArray(rows)) {
    return new Response(JSON.stringify({ error: "rows must be an array" }), {
      status: 400,
    });
  }

  await prisma.llpaGridRow.deleteMany(); // optional: clear existing
  await prisma.llpaGridRow.createMany({ data: rows });

  return NextResponse.json({ ok: true });
}
