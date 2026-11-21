import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.role !== "INVESTOR") {
      return NextResponse.json(
        { error: "Investor access required" },
        { status: 403 }
      );
    }

    const investorId = session.userId;

    if (!Number.isSafeInteger(investorId) || investorId <= 0) {
      return NextResponse.json(
        { error: "Invalid investor identity" },
        { status: 401 }
      );
    }

    const prisma = await getPrisma();

    const positions = await prisma.position.findMany({
      where: {
        investorId,
      },
    });

    return NextResponse.json(
      { positions },
      { status: 200 }
    );
  } catch (error) {
    console.error("INVESTOR POSITIONS ERROR:", error);

    return NextResponse.json(
      { error: "Unable to retrieve investor positions." },
      { status: 500 }
    );
  }
}
