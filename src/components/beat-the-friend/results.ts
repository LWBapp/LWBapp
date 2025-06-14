
export type BeatFriendResultCity =
  | "Copenhagen"
  | "Lisbon"
  | "Tel Aviv"
  | "Mexico City"
  | "Bangkok";

export function getBeatFriendResult(score: number): BeatFriendResultCity {
  if (score >= 60 && score <= 80) return "Copenhagen";
  if (score >= 81 && score <= 100) return "Lisbon";
  if (score >= 101 && score <= 120) return "Tel Aviv";
  if (score >= 121 && score <= 140) return "Mexico City";
  if (score >= 141 && score <= 150) return "Bangkok";
  // fallback
  return "Copenhagen";
}
