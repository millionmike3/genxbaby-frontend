import { prisma } from "../prisma";

export const db = prisma;

export * from "./leads";
export * from "./events";
export * from "./contacts";
