import "server-only";

const secretValue = process.env.JWT_SECRET;

if (!secretValue || secretValue.length < 32) {
  throw new Error(
    "JWT_SECRET must be configured and contain at least 32 characters."
  );
}

export const JWT_SECRET = new TextEncoder().encode(secretValue);

export const JWT_ISSUER = process.env.JWT_ISSUER;
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE;

if (!JWT_ISSUER || !JWT_AUDIENCE) {
  throw new Error(
    "JWT_ISSUER and JWT_AUDIENCE must match the authentication backend configuration."
  );
}

export const JWT_ALGORITHMS = ["HS256"] as const;

export const VALID_ROLES = [
  "ADMIN",
  "OWNER",
  "UNDERWRITER",
  "INVESTOR",
  "LOAN_OFFICER",
  "PROCESSOR",
  "SERVICING",
  "STAFF",
  "BORROWER",
] as const;

export type AppRole = (typeof VALID_ROLES)[number];

export function isAppRole(value: unknown): value is AppRole {
  return (
    typeof value === "string" &&
    (VALID_ROLES as readonly string[]).includes(value)
  );
}