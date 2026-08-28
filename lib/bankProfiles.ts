// lib/bankProfiles.ts

import { prisma } from "./db/prisma";

/**
 * Fetch ALL bank profiles.
 */
export async function getBankProfiles() {
  try {
    const profiles = await prisma.bankProfile.findMany({
      orderBy: { id: "asc" },
    });

    return profiles;
  } catch (err) {
    console.error("Error fetching bank profiles:", err);
    return [];
  }
}

/**
 * Fetch a single bank profile by ID (string or number).
 */
export async function getBankProfile(id: string | number) {
  try {
    const profile = await prisma.bankProfile.findUnique({
      where: { id: Number(id) }, // FIXED
    });

    return profile;
  } catch (err) {
    console.error("Error fetching bank profile:", err);
    return null;
  }
}

/**
 * Fetch a single bank profile by ID (string only).
 * This is identical to getBankProfile but kept for compatibility.
 */
export async function getBankProfileById(id: string) {
  try {
    const profile = await prisma.bankProfile.findUnique({
      where: { id: Number(id) }, // FIXED
    });

    return profile;
  } catch (error) {
    console.error(`Error fetching bank profile ${id}:`, error);
    throw new Error("Failed to load bank profile");
  }
}
