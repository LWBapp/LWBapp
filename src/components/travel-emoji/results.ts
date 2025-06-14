
export type TravelEmojiResultKey = "tokyo" | "amsterdam" | "bali" | "cairo" | "paris" | "tulum";

export interface TravelEmojiResultType {
  city: string;
  emojiCombo: string;
  explanation: string;
}

export const TRAVEL_EMOJI_RESULTS: Record<TravelEmojiResultKey, TravelEmojiResultType> = {
  tokyo: {
    city: "Tokyo",
    emojiCombo: "🌀❤️🎉",
    explanation:
      "You’re a swirl of vibrant energy and fun, with big heart and a love for the electric. Tokyo’s neon buzz and quirky magic are your mood match—always something new, always a dash of delightful chaos!",
  },
  amsterdam: {
    city: "Amsterdam",
    emojiCombo: "💡🔥✈️",
    explanation:
      "Curious, creative, and ready to move—your brain buzzes with bright ideas and a fierce passion for new adventures. Amsterdam’s canals and culture keep your spirit in constant motion.",
  },
  bali: {
    city: "Bali",
    emojiCombo: "🌸💧🧘‍♀️",
    explanation:
      "Soft soul, gentle heart, and pure zen energy. You’re all about peace, healing, and flow—Bali’s warm blossoms and tranquil beaches vibe with your need for beauty and calm.",
  },
  cairo: {
    city: "Cairo",
    emojiCombo: "🔮💫💤",
    explanation:
      "Old soul with cosmic dreams and a sleepy mystique—wisdom, wonder, and magic flow through you. Cairo’s history and golden glow match your poetic, mystical side.",
  },
  paris: {
    city: "Paris",
    emojiCombo: "💡❤️🧘‍♀️",
    explanation:
      "Romantic intellect with a balanced spirit: you blend clever curiosity, big-hearted vibes, and a calm core. Paris—city of dreamy art and effortless chic—is your cinematic fit.",
  },
  tulum: {
    city: "Tulum",
    emojiCombo: "🔮🔥✈️",
    explanation:
      "Wild, magical, and always craving the next trip! You’re a passionate explorer with mystical magnetism. Tulum’s beaches, mystery, and jungle adventure are made for you.",
  },
};
