
import { QUESTIONS } from "./questions";

// Tally the quiz answers and determine the result.
// Mostly A = Paris, B = Buenos Aires, C = Kyoto, D = Barcelona
// If equal high count A + C: Florence. If equal high count B + D: Cape Town. Defaults to Paris.
export function tallyResults(answers: string[]): string {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const ans of answers) {
    if (["A", "B", "C", "D"].includes(ans)) counts[ans]++;
  }
  const max = Math.max(counts.A, counts.B, counts.C, counts.D);
  const tops = Object.keys(counts).filter((k) => counts[k as keyof typeof counts] === max);
  if (tops.length === 1) {
    const resMap = { A: "paris", B: "buenos-aires", C: "kyoto", D: "barcelona" };
    return resMap[tops[0] as keyof typeof resMap] || "paris";
  }
  // Mixed logic
  if (tops.includes("A") && tops.includes("C") && tops.length === 2) return "florence";
  if (tops.includes("B") && tops.includes("D") && tops.length === 2) return "cape-town";
  // Fallback to Paris
  return "paris";
}
