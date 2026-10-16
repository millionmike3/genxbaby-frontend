import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { auth, requireRole } from "@/lib/auth";

export async function POST(req, { params }) {
  // 🔒 Enforce ADMIN or OWNER role
  try {
    await requireRole(["ADMIN", "OWNER"]);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 🔐 Verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = await getPrisma();
  const data = await req.formData();

  await prisma.llpaGrid.update({
    where: { id: params.id },
    data: {
      creditBucket: String(data.get("creditBucket")),
      ltvBucket: String(data.get("ltvBucket")),
      adjustmentBps: Number(data.get("adjustmentBps")),
    },
  });

  return NextResponse.redirect("/owner/manage/pricing/llpa");
}
