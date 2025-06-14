
export function tallyDeluluResults(answers: string[]): string {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const ans of answers) {
    if (["A", "B", "C", "D"].includes(ans)) counts[ans]++;
  }
  const max = Math.max(counts.A, counts.B, counts.C, counts.D);
  const tops = Object.keys(counts).filter((k) => counts[k as keyof typeof counts] === max);

  if (tops.length === 1) {
    const resMap = { A: "monte-carlo", B: "dubai", C: "tulum", D: "seoul" };
    return resMap[tops[0] as keyof typeof resMap] || "monte-carlo";
  }
  // Mixed logic
  if (tops.includes("A") && tops.includes("B") && tops.length === 2) {
    return "beverly-hills";
  }
  if (tops.includes("C") && tops.includes("D") && tops.length === 2) {
    return "mykonos";
  }
  // Fallback
  return "monte-carlo";
}
