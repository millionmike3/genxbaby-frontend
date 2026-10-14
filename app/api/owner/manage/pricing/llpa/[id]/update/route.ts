import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(req, { params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("session_owner")?.value 
             || cookieStore.get("session_admin")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  if (payload.role !== "ADMIN" && payload.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
