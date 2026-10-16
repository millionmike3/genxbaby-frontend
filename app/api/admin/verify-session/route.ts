import { NextResponse } from "next/server";
import { auth, requireRole } from "@/lib/auth";

export async function GET() {
  try {
    // 🔒 Enforce admin role
    await requireRole(["ADMIN"]);

    // 🔐 Read verified session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: session.user.id,
        role: session.user.role,
        fullName: session.user.fullName,
      },
    });
  } catch (err) {
    console.error("ADMIN SESSION ERROR:", err);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
