/**
 * Determine result city based on answer patterns for the quiz:
 * "Where Would You Fall Madly in Love (With Life)?"
 *
 * Logic:
 * - Mostly A = Paris
 * - Mostly B = Buenos Aires
 * - Mostly C = Kyoto
 * - Mostly D = Barcelona
 * - If mix: (A + C) = Florence, (B + D) = Cape Town, else default to Paris
 */
const keyToCity = {
  a: "paris",
  b: "buenosaires",
  c: "kyoto",
  d: "barcelona"
};

export function tallyResults(answers: string[]): string {
  // Count each answer type
  const tally: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
  for (const ans of answers) {
    const val = ans.toLowerCase();
    if (tally[val] !== undefined) tally[val]++;
  }
  // Find most common
  const maxEntry = Object.entries(tally).reduce(
    (a, b) => (a[1] >= b[1] ? a : b),
    ["a", 0]
  );
  const [maxKey, maxCount] = maxEntry;

  // Get sorted counts for all
  const counts = Object.values(tally);
  const sorted = [...Object.keys(tally)].sort((k1, k2) => tally[k2] - tally[k1]);
  const [first, second] = sorted;
  // Mixed: A+C = Florence, B+D = Cape Town (if those are tied and highest)
  if (
    tally.a === tally.c &&
    tally.a > 0 &&
    tally.a === Math.max(...counts)
  ) {
    return "florence";
  }
  if (
    tally.b === tally.d &&
    tally.b > 0 &&
    tally.b === Math.max(...counts)
  ) {
    return "capetown";
  }
  // Otherwise, use dominant
  if (tally[maxKey] > 0) {
    return keyToCity[maxKey as keyof typeof keyToCity] || "paris";
  }
  // Fallback
  return "paris";
}
