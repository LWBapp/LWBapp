
export function tallyMusicVibeResult(answers: string[]): string {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const ans of answers) {
    if (["A", "B", "C", "D"].includes(ans)) counts[ans]++;
  }
  const max = Math.max(counts.A, counts.B, counts.C, counts.D);
  const top = Object.keys(counts).filter((k) => counts[k as keyof typeof counts] === max);

  if (top.length === 1) {
    switch (top[0]) {
      case "A": return "tokyo";
      case "B": return "rio";
      case "C": return "berlin";
      case "D": return "new-orleans";
    }
  }
  // Mixed answer logic:
  if (top.includes("A") && top.includes("D") && top.length === 2) {
    return "copenhagen";
  }
  if (top.includes("B") && top.includes("C") && top.length === 2) {
    return "vienna";
  }
  // Fallback:
  return "tokyo";
}
