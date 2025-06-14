
export function tallyMoodMapResult(answer: string): string {
  switch (answer) {
    case "A":
      return "prague";
    case "B":
      return "mexico-city";
    case "C":
      return "reykjavik";
    case "D":
      return "naples";
    case "E":
      return "marrakech";
    case "F":
      return "seoul";
    default:
      return "prague";
  }
}
