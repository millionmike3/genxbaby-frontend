export const WEIGHTS = {
  deviceCount: 0.15,
  bluetoothDensity: 0.25,
  ipReputation: 0.30,
  incomeVolatility: 0.20,
  ageRisk: 0.10,
};

// Tuned using real outcome data (defaults, chargebacks, fraud flags)
function riskFromIP(ipRep: string) {
  switch (ipRep) {
    case "bad":
      return 90;
    case "suspicious":
      return 65;
    case "unknown":
      return 45;
    default:
      return 20;
  }
}

function volatilityScore(incomeVolatility: number) {
  if (incomeVolatility >= 0.8) return 80;
  if (incomeVolatility >= 0.5) return 60;
  if (incomeVolatility >= 0.3) return 40;
  return 20;
}

function ageRisk(age: number) {
  if (age < 21) return 70;
  if (age < 30) return 50;
  if (age < 50) return 30;
  return 20;
}

export function scoreRisk(input: {
  age: number;
  incomeVolatility: number;
  deviceCount: number;
  bluetoothDensity: number;
  ipReputation: string;
}) {
  const weights = {
    age: 0.10,
    incomeVolatility: 0.20,
    deviceCount: 0.15,
    bluetoothDensity: 0.25,
    ipReputation: 0.30,
  };

  const ipScore =
    input.ipReputation === "bad" ? 1 :
    input.ipReputation === "unknown" ? 0.5 :
    0;

  return (
    input.age * weights.age +
    input.incomeVolatility * weights.incomeVolatility +
    input.deviceCount * weights.deviceCount +
    input.bluetoothDensity * weights.bluetoothDensity +
    ipScore * weights.ipReputation
  );
}
