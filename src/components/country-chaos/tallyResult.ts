
/**
 * Tally the most frequent countryKey in answers.
 * Fallback is "ireland".
 */
export function tallyResults(answers: string[], allowedKeys: string[]): string {
  const tally: Record<string, number> = {};
  for (const ans of answers) {
    tally[ans] = (tally[ans] || 0) + 1;
  }
  let topCountry = "ireland";
  let max = 0;
  for (const key of allowedKeys) {
    if ((tally[key] || 0) > max) {
      topCountry = key;
      max = tally[key];
    }
  }
  return topCountry;
}
