import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function requireRole(roles: string[]) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized: No session found");
  }

  const userRole = session.user?.role;

  if (!userRole) {
    throw new Error("Unauthorized: Missing user role");
  }

  if (!roles.includes(userRole)) {
    throw new Error("Forbidden: Insufficient permissions");
  }

  return session;
}
