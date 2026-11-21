import "server-only";

import { jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

import {
  JWT_SECRET,
  JWT_ISSUER,
  JWT_AUDIENCE,
  JWT_ALGORITHMS,
  isAppRole,
  type AppRole,
} from "@/lib/jwt";

import { getPrisma } from "@/lib/db/prisma";

export type AppSession = {
  userId: number;
  id: number;
  role: AppRole;
  ownerId: string | null;
  borrowerId: string | null;
  fullName: string;
  email: string;
  username: string | null;
  user: {
    id: number;
    role: AppRole;
    fullName: string;
    email: string;
    username: string | null;
  };
  sub: string;
  payload: JWTPayload;
};

function parseUserId(sub: unknown): number | null {
  if (typeof sub !== "string" || !/^[1-9]\d*$/.test(sub)) {
    return null;
  }

  const id = Number(sub);

  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

async function readToken(token?: string): Promise<string | undefined> {
  if (token) return token;

  const cookieStore = await cookies();

  return cookieStore.get("auth_token")?.value;
}

export async function getSession(
  token?: string
): Promise<AppSession | null> {
  const actualToken = await readToken(token);

  if (!actualToken) return null;

  try {
    const { payload } = await jwtVerify(actualToken, JWT_SECRET, {
      algorithms: [...JWT_ALGORITHMS],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    if (payload.typ !== "access") return null;

    const userId = parseUserId(payload.sub);

    if (!userId || !isAppRole(payload.role)) {
      return null;
    }

    const prisma = await getPrisma();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        owner: true,
      },
    });

    if (!user || user.role !== payload.role || user.status !== "ACTIVE") {
      return null;
    }

    // Borrower is a separate application identity.
    // Its ID is a string and must not replace the integer User ID.
    const borrower =
      payload.role === "BORROWER"
        ? await prisma.borrower.findUnique({
            where: { userId },
            select: {
              id: true,
              fullName: true,
              firstName: true,
              lastName: true,
            },
          })
        : null;

    const fullName =
      user.owner?.fullName ||
      borrower?.fullName ||
      [borrower?.firstName, borrower?.lastName].filter(Boolean).join(" ") ||
      user.username ||
      user.email;

    const ownerId =
      payload.role === "OWNER" ? user.owner?.id ?? null : null;

    const borrowerId = borrower?.id ?? null;

    return {
      userId: user.id,
      id: user.id,
      role: user.role as AppRole,
      ownerId,
      borrowerId,
      fullName,
      email: user.email,
      username: user.username,
      user: {
        id: user.id,
        role: user.role as AppRole,
        fullName,
        email: user.email,
        username: user.username,
      },
      sub: String(user.id),
      payload,
    };
  } catch (error) {
    console.error("SESSION VERIFICATION ERROR:", error);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) return null;

  const prisma = await getPrisma();

  return prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      owner: true,
    },
  });
}