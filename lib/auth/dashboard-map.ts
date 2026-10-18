// lib/auth/dashboard-map.ts

/**
 * Unified dashboard redirect map for all roles.
 * Every login route uses this to determine where the user should land.
 *
 * IMPORTANT:
 * - Keys MUST match the exact role strings stored in your database.
 * - Values MUST match your actual portal folder names.
 */

export const dashboardMap: Record<string, string> = {
  ADMIN: "/admin-portal",
  OWNER: "/owner-portal",
  INVESTOR: "/investor-portal",
  BORROWER: "/borrower-portal",
  UNDERWRITER: "/underwriter-portal",
  LOAN_OFFICER: "/loan-officer-portal",
  STAFF: "/staff-portal",
  SERVICING: "/servicing-portal",
  PROCESSING: "/processing-portal",
};

/**
 * Safe helper to get a dashboard path.
 * Falls back to /login if the role is unknown.
 */
export function getDashboardForRole(role: string): string {
  return dashboardMap[role] ?? "/login";
}
