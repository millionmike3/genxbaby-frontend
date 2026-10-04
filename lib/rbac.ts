type Role = "BORROWER" | "LOAN_OFFICER" | "UNDERWRITER" | "ADMIN";

const rolePermissions: Record<Role, string[]> = {
  BORROWER: ["view_own_application"],
  LOAN_OFFICER: ["view_pipeline", "manage_conditions", "message_borrower"],
  UNDERWRITER: ["view_pipeline", "uw_decision", "uw_conditions"],
  ADMIN: ["view_all", "manage_users", "manage_exceptions", "build_closing"],
};

export function hasPermission(role: Role, permission: string): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}
