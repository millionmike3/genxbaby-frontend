export function generateAmortization(principal: number, rate: number, termMonths: number) {
  const schedule = [];
  const monthlyRate = rate / 12;
  const payment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));

  let balance = principal;

  for (let i = 1; i <= termMonths; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = payment - interest;
    balance = Math.max(balance - principalPaid, 0);

    schedule.push({
      month: i,
      payment: +payment.toFixed(2),
      principal: +principalPaid.toFixed(2),
      interest: +interest.toFixed(2),
      balance: +balance.toFixed(2),
    });
  }

  return schedule;
}
