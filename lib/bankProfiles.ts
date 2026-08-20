// lib/bankProfiles.ts

import { prisma } from "./db/prisma";

/**
 * Fetch all bank profiles from the database.
 * This function runs ONLY on the server.
 */
export async function getBankProfiles() {
  try {
    const profiles = await prisma.bankProfile.findMany({
      orderBy: { bankName: "asc" },
    });

    return profiles;
  } catch (error) {
    console.error("Error fetching bank profiles:", error);
    throw new Error("Failed to load bank profiles");
  }
}

/**
 * Fetch a single bank profile by ID.
 */
export async function getBankProfileById(id: string) {
  try {
    const profile = await prisma.bankProfile.findUnique({
      where: { id },
    });

    return profile;
  } catch (error) {
    console.error(`Error fetching bank profile ${id}:`, error);
    throw new Error("Failed to load bank profile");
  }
}
