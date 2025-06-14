
export type NervousSystemClimateResult =
  | "Santorini"
  | "Vancouver"
  | "Ubud"
  | "Stockholm"
  | "Medellín"
  | "Madeira";

export const RESULT_DESCRIPTIONS: Record<NervousSystemClimateResult, { archetype: string; climate: string; description: string }> = {
  "Santorini": {
    archetype: "The Luminous Harmonizer",
    climate: "Gentle Mediterranean",
    description:
      "You thrive in sensory serenity—where sunlight pours through open windows and the air is softly warm. Your nervous system settles when you’re surrounded by beauty, effortless ease, and reflections of simplicity. Santorini is your soul’s climate mirror.",
  },
  "Vancouver": {
    archetype: "The Reflective Flow Seeker",
    climate: "Cool Coastal & Misty",
    description:
      "You need the rhythm of water—soft rains, cool air, and the background music of waves. Journaling, reflection, and cozy nooks by water renew you. Vancouver, with its ever-changing light and mild climate, matches your gentle, spacious replenishment.",
  },
  "Ubud": {
    archetype: "The Earthy Revivalist",
    climate: "Lush Tropical",
    description:
      "Humidity, jungle sounds, and vibrant nature regulate your inner world. Being barefoot, moving, and savoring the energy of life all around you restores calm. Ubud’s green, living embrace is your healing ecosystem.",
  },
  "Stockholm": {
    archetype: "The Cozy Orderly",
    climate: "Crisp Nordic",
    description:
      "You recharge with quiet, structure, and spaces that let you retreat and reset. Brisk air, cozy blankets, and structured simplicity bring your system back into balance. Stockholm’s gentle order and peaceful energy is your climate refuge.",
  },
  "Medellín": {
    archetype: "The Balanced Adventurer",
    climate: "Springlike & Alive",
    description:
      "Your soul finds balance in dynamic but not overwhelming climates—a perfect harmony of warmth and cool, vibrancy and ease. Medellín’s eternal spring supports both your moments of grounding and playful expansion.",
  },
  "Madeira": {
    archetype: "The Misty Wanderer",
    climate: "Mild Atlantic Islands",
    description:
      "You’re most at ease where ocean breezes mingle with soft green hills—a land of gentle contrasts and restorative variety. Madeira’s mild climate and misty paths offer renewal, inviting you into quiet wonder and subtle adventure.",
  },
};
