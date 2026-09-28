import { getPrisma } from "../db/prisma";

export const db = await getPrisma();

export * from "./leads";
export * from "./events";
export * from "./contacts";
