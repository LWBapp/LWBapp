
export type BeatFriendAnswer = "A" | "B" | "C" | "D";

export interface BeatFriendQuestion {
  question: string;
  options: {
    value: BeatFriendAnswer;
    label: string;
    points: number;
  }[];
}

// The quiz: "Beat Your Best Friend’s City Score"
export const beatFriendQuestions: BeatFriendQuestion[] = [
  {
    question: "What’s your ideal city vibe?",
    options: [
      { value: "A", label: "Chill and charming", points: 10 },
      { value: "B", label: "Loud and legendary", points: 15 },
      { value: "C", label: "Trendy and techy", points: 20 },
      { value: "D", label: "Exotic and unpredictable", points: 25 },
    ],
  },
  {
    question: "What's your food rule?",
    options: [
      { value: "A", label: "Comfort first", points: 10 },
      { value: "B", label: "Instagram first", points: 15 },
      { value: "C", label: "Try everything", points: 25 },
      { value: "D", label: "Health goddess", points: 20 },
    ],
  },
  {
    question: "What’s your chaos tolerance?",
    options: [
      { value: "A", label: "Low", points: 10 },
      { value: "B", label: "Medium", points: 15 },
      { value: "C", label: "High", points: 25 },
      { value: "D", label: "Bring it on", points: 30 },
    ],
  },
  {
    question: "Your relationship with routine?",
    options: [
      { value: "A", label: "Love it", points: 10 },
      { value: "B", label: "Hate it", points: 25 },
      { value: "C", label: "Bend it", points: 20 },
      { value: "D", label: "Ignore it", points: 15 },
    ],
  },
  {
    question: "What excites you most about travel?",
    options: [
      { value: "A", label: "People watching", points: 10 },
      { value: "B", label: "Culture shock", points: 25 },
      { value: "C", label: "Self-discovery", points: 20 },
      { value: "D", label: "Food and fun", points: 15 },
    ],
  },
  {
    question: "How do you pack?",
    options: [
      { value: "A", label: "Strategically", points: 10 },
      { value: "B", label: "Chaotically", points: 25 },
      { value: "C", label: "Stylishly", points: 15 },
      { value: "D", label: "Lightly", points: 20 },
    ],
  },
];

export function calculateBeatFriendScore(
  answers: BeatFriendAnswer[]
): number {
  if (!answers || answers.length !== 6) return 0;
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    const q = beatFriendQuestions[i];
    const opt = q.options.find((o) => o.value === answers[i]);
    if (opt) score += opt.points;
  }
  return score;
}
