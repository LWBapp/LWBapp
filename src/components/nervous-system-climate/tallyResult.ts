
import { NervousSystemClimateOption } from "./questions";
import { NervousSystemClimateResult } from "./results";

interface TallyInput {
  answers: NervousSystemClimateOption[];
}

export function getNervousSystemClimateResult({
  answers,
}: TallyInput): NervousSystemClimateResult {
  const counts: Record<NervousSystemClimateOption, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => {
    if (counts[a] !== undefined) counts[a]++;
  });

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const [top, second] = entries;

  // All same or clear majority winner
  if (entries[0][1] > entries[1][1]) {
    switch (entries[0][0]) {
      case "A":
        return "Santorini";
      case "B":
        return "Vancouver";
      case "C":
        return "Ubud";
      case "D":
        return "Stockholm";
    }
  }

  // Two-way tie: check specific mixes
  if (
    (counts["A"] === counts["C"] && counts["A"] + counts["C"] === 6 && counts["A"] === 3) ||
    (counts["A"] && counts["C"] && counts["A"] + counts["C"] === 6)
  ) {
    return "Medellín";
  }
  if (
    (counts["B"] === counts["D"] && counts["B"] + counts["D"] === 6 && counts["B"] === 3) ||
    (counts["B"] && counts["D"] && counts["B"] + counts["D"] === 6)
  ) {
    return "Madeira";
  }

  // Default to top pick
  switch (entries[0][0]) {
    case "A":
      return "Santorini";
    case "B":
      return "Vancouver";
    case "C":
      return "Ubud";
    case "D":
      return "Stockholm";
    default:
      return "Santorini";
  }
}
