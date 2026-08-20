
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Extract token
    const rawCookie = req.headers.get("cookie");
    const token = rawCookie
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT
    let payload: { userId: number; role: string };
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: number;
        role: string;
      };
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Ensure admin
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Hash new password
    const hash = await bcrypt.hash(password, 10);

    // Update admin password (Admins are Users)
    await prisma.user.update({
      where: { id: payload.userId },
      data: { passwordHash: hash },
    });

    // Log audit
    await prisma.audit.create({
      data: {
        action: "ADMIN_PASSWORD_UPDATE",
        details: { userId: payload.userId },
        adminId: payload.userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("UPDATE PASSWORD ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
