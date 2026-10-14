export function analyzeStock(stock: any) {
  const volatility = Math.abs(stock.changePercent);
  const riskScore = Math.min(100, volatility * 2 + (stock.volume / 100000));

  return {
    volatility,
    riskScore,
    sector: stock.sector ?? "UNKNOWN",
  };
}
