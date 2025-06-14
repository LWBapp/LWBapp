
export type EscapeArtistResult =
  | "Iceland"
  | "Morocco"
  | "Costa Rica"
  | "Tokyo"
  | "Amalfi Coast"
  | "Patagonia";

interface EscapeArtistResultDescription {
  archetype: string;
  destination: string;
  description: string;
}

export const RESULT_DESCRIPTIONS: Record<EscapeArtistResult, EscapeArtistResultDescription> = {
  Iceland: {
    archetype: "The Solitude Seeker",
    destination: "Iceland",
    description:
      "You crave vast, wild spaces — a landscape where your thoughts find their echo in icy silence. Iceland is your refuge: dramatic, otherworldly, stripped of clutter and noise. Here, your emotional escape is about surrender, awe, and the deep need to vanish into raw nature.",
  },
  Morocco: {
    archetype: "The Mystic Escaper",
    destination: "Morocco",
    description:
      "You run toward color and complexity, craving a reality full of magic and sensual surprises. Morocco’s alleys, scents, and mysteries spark your imagination and give your mind a thousand wonders to chase. Your escape is about fascination, not absence — you want to be dazzled and transformed.",
  },
  "Costa Rica": {
    archetype: "The Raw Wanderer",
    destination: "Costa Rica",
    description:
      "You want to feel every heartbeat, every drop of sweat, every laugh — alive, present, vital. Costa Rica’s jungles and beaches invite you to move, play, and restore your spirit through pure, embodied freedom.",
  },
  Tokyo: {
    archetype: "The Neon Drifter",
    destination: "Tokyo",
    description:
      "You seek to dissolve, to be unseen yet fully alive in the current of perpetual novelty. Tokyo’s lights and crowds make you invisible in the best way. Here, you lose and rediscover yourself, feeding on the pulse of possibility.",
  },
  Patagonia: {
    archetype: "The Remote Adventurer",
    destination: "Patagonia",
    description:
      "Part glacier, part wild soul — you yearn for the edge where endurance meets awe. Patagonia answers the call of both your solitude and your wild curiosity, a place to shout into the wind and listen for your own echo.",
  },
  "Amalfi Coast": {
    archetype: "The Dreamy Hedonist",
    destination: "Amalfi Coast",
    description:
      "Part chaos and part charm, you thrive on the beauty hidden in life’s unpredictability. On the Amalfi Coast you blend in — a wanderer rejoicing in sunlight, rituals, and small sensual pleasures. Here, escape is both delicious and dizzying.",
  },
};
