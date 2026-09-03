// genxbaby-backend/services/bluetooth-engine/fingerprint.ts

import crypto from "crypto";

export function buildDeviceFingerprint(deviceId: string | null, name: string): string {
  const base = `${deviceId || "no-id"}::${name}`;
  return crypto.createHash("sha256").update(base).digest("hex");
}
