
import { TravelEmojiResultKey } from "./results";

// Helper to convert answers to the emoji string
const emojiMap: Record<string, string> = {
  // Q1
  A: "🌀",
  B: "💡",
  C: "🌸",
  D: "🔮",
  // Q2
  "2A": "❤️",
  "2B": "🔥",
  "2C": "💧",
  "2D": "💫",
  // Q3
  "3A": "💤",
  "3B": "🎉",
  "3C": "🧘‍♀️",
  "3D": "✈️",
};

// Map answer combos to result key
const comboToResult: Record<string, TravelEmojiResultKey> = {
  "🌀❤️🎉": "tokyo",
  "💡🔥✈️": "amsterdam",
  "🌸💧🧘‍♀️": "bali",
  "🔮💫💤": "cairo",
  "💡❤️🧘‍♀️": "paris",
  "🔮🔥✈️": "tulum",
};

export function tallyTravelEmojiResult(
  a1: string,
  a2: string,
  a3: string
): { resultKey: TravelEmojiResultKey; emojiCombo: string } {
  const brain = emojiMap[a1] || "";
  const heart = emojiMap["2" + a2] || "";
  const energy = emojiMap["3" + a3] || "";

  const combo = `${brain}${heart}${energy}`;
  const resultKey = comboToResult[combo] || "paris"; // fallback: Paris

  return { resultKey, emojiCombo: combo };
}
