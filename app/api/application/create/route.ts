import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/authz";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await requireRole(["borrower"]);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.email) {
      return NextResponse.json(
        { error: "User is missing email" },
        { status: 400 }
      );
    }

    // Upsert borrower based on user email
    const borrower = await prisma.borrower.upsert({
      where: { email: user.email },
      update: {
        fullName: user.username ?? "Unknown",
        phone: user.phone ?? "",
        employer: null,
      },
      create: {
        email: user.email,
        fullName: user.username ?? "Unknown",
        phone: user.phone ?? "",
        employer: null,
        userId: user.id.toString(), // REQUIRED FIELD
      },
    });

    const application = await prisma.application.create({
      data: {
        borrowerId: borrower.id,
        status: "draft",
      },
    });

    await prisma.timelineEvent.create({
      data: {
        applicationId: application.id,
        type: "APPLICATION_CREATED",
        metadata: {
          borrowerId: borrower.id,
        },
      },
    });

    return NextResponse.json({ applicationId: application.id });
  } catch (err) {
    console.error("Application Create Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
