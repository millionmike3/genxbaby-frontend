import { Pillar } from "../types/Pillars";

export function classify(score: number, pillar: Pillar) {
  if (pillar === "STOCK_SANITIZER") {
    if (score <= 25) return "stable";
    if (score <= 50) return "reactive";
    if (score <= 75) return "impulsive";
    return "volatile";
  }

  if (pillar === "CUSTOMER") {
    if (score <= 30) return "stable";
    if (score <= 60) return "reactive";
    if (score <= 80) return "impulsive";
    return "volatile";
  }

  if (pillar === "INVESTOR") {
    if (score <= 25) return "stable";
    if (score <= 50) return "reactive";
    if (score <= 75) return "impulsive";
    return "volatile";
  }

  return "stable";
}
