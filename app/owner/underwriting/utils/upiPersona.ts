export type PersonaInput = {
  underwriterId: string;
  riskAlignment: number;
  fraudAlignment: number;
  riskCritical: number;
  fraudCritical: number;
  biasScore: number;
  speedScore: number;
  driftScore: number;
  anomalyScore: number;
};

export type PersonaResult = {
  underwriterId: string;
  persona: string;
};

export function computeUPIPersonas(data: PersonaInput[]): PersonaResult[] {
  return data.map((u) => {
    const { riskAlignment, fraudAlignment, riskCritical, fraudCritical, biasScore, speedScore, driftScore, anomalyScore } = u;

    // Conservative
    if (riskCritical === 0 && fraudCritical === 0 && driftScore < 0.1 && anomalyScore < 0.1) {
      return { underwriterId: u.underwriterId, persona: "Conservative" };
    }

    // Aggressive
    if (riskAlignment < 60 && fraudAlignment < 60 && speedScore > 70 && driftScore > 0.2) {
      return { underwriterId: u.underwriterId, persona: "Aggressive" };
    }

    // Balanced
    if (riskAlignment > 75 && fraudAlignment > 75 && biasScore < 20 && anomalyScore < 0.2) {
      return { underwriterId: u.underwriterId, persona: "Balanced" };
    }

    // Volatile
    if (driftScore > 0.4 || anomalyScore > 0.4) {
      return { underwriterId: u.underwriterId, persona: "Volatile" };
    }

    // Risk-Blind
    if (riskCritical > 10 && riskAlignment < 50) {
      return { underwriterId: u.underwriterId, persona: "Risk-Blind" };
    }

    // Fraud-Blind
    if (fraudCritical > 10 && fraudAlignment < 50) {
      return { underwriterId: u.underwriterId, persona: "Fraud-Blind" };
    }

    // Default fallback
    return { underwriterId: u.underwriterId, persona: "Balanced" };
  });
}
