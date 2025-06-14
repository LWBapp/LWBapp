
import { EscapeArtistOption } from "./questions";
import { EscapeArtistResult } from "./results";

interface TallyInput {
  answers: EscapeArtistOption[];
}

export function getEscapeArtistResult({ answers }: TallyInput): EscapeArtistResult {
  const counts: Record<EscapeArtistOption, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => { if (counts[a] !== undefined) counts[a]++; });
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  // Pure majorities
  if (entries[0][1] > entries[1][1]) {
    switch (entries[0][0]) {
      case "A": return "Iceland";
      case "B": return "Morocco";
      case "C": return "Costa Rica";
      case "D": return "Tokyo";
    }
  }

  // Mixed logic:
  // If A+C highest (total is 6, and both 3 each), or just the highest two
  if ((counts["A"] === counts["C"] && counts["A"] + counts["C"] === 6 && counts["A"] === 3) ||
      (counts["A"] && counts["C"] && counts["A"] + counts["C"] === 6)) {
    return "Patagonia";
  }
  // If B+D highest (total is 6, and both 3 each)
  if ((counts["B"] === counts["D"] && counts["B"] + counts["D"] === 6 && counts["B"] === 3) ||
      (counts["B"] && counts["D"] && counts["B"] + counts["D"] === 6)) {
    return "Amalfi Coast";
  }

  // Default: return most frequent
  switch (entries[0][0]) {
    case "A": return "Iceland";
    case "B": return "Morocco";
    case "C": return "Costa Rica";
    case "D": return "Tokyo";
    default: return "Iceland";
  }
}
