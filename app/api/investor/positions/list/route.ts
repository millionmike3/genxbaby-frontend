import { NextRequest,  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const positions = await db.position.findMany({
    where: { investorId: Number(session.user.id) },
  });

  return NextResponse.json({ positions });
}
