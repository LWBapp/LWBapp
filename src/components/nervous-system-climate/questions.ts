
export type NervousSystemClimateOption = "A" | "B" | "C" | "D";

export interface NervousSystemClimateQuestion {
  id: number;
  text: string;
  options: { value: NervousSystemClimateOption; label: string }[];
}

export const questions: NervousSystemClimateQuestion[] = [
  {
    id: 1,
    text: "What does your nervous system crave first thing in the morning?",
    options: [
      { value: "A", label: "Gentle sun through sheer curtains" },
      { value: "B", label: "Cool air and a walk by water" },
      { value: "C", label: "Jungle humidity and birdsong" },
      { value: "D", label: "A crisp breeze and quiet order" },
    ],
  },
  {
    id: 2,
    text: "How does stress show up for you?",
    options: [
      { value: "A", label: "Tension and over-planning" },
      { value: "B", label: "Restlessness and distraction" },
      { value: "C", label: "Dissociation and emotional fog" },
      { value: "D", label: "Overstimulation and burnout" },
    ],
  },
  {
    id: 3,
    text: "What’s your ideal rest activity?",
    options: [
      { value: "A", label: "Floating in warm water" },
      { value: "B", label: "Watching rain and journaling" },
      { value: "C", label: "Being barefoot in nature" },
      { value: "D", label: "Curling up with cozy layers" },
    ],
  },
  {
    id: 4,
    text: "Which element feels most healing to you?",
    options: [
      { value: "A", label: "Sunlight" },
      { value: "B", label: "Water" },
      { value: "C", label: "Earth" },
      { value: "D", label: "Air" },
    ],
  },
  {
    id: 5,
    text: "What’s your climate dealbreaker?",
    options: [
      { value: "A", label: "Too dry" },
      { value: "B", label: "Too hot" },
      { value: "C", label: "Too noisy" },
      { value: "D", label: "Too dark" },
    ],
  },
  {
    id: 6,
    text: "What helps you come back to center?",
    options: [
      { value: "A", label: "A perfect, simple meal" },
      { value: "B", label: "Music and misty mornings" },
      { value: "C", label: "Nature and movement" },
      { value: "D", label: "Silence and structure" },
    ],
  },
];
