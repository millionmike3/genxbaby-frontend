import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

// If you are using your own auth() wrapper, import it here:
// import { auth } from "@/lib/auth";

export async function requireRole(roles: string[]) {
  // Use NextAuth session
  const session = await getServerSession(authOptions);

  // If you use your own auth() function instead, swap this line:
  // const session = await auth();

  if (!session || !session.user || !session.user.role) {
    return null;
  }

  if (!roles.includes(session.user.role)) {
    return null;
  }

  return session;
}
