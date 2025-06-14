import React from "react";
import QuizCard from "@/components/QuizCard";

const quizzes = [
  {
    id: "country-chaos",
    title: "What Country Matches Your Chaos?",
    subtitle: "A witty, self-deprecating personality quiz for beautifully unhinged souls.",
  },
  {
    id: "introvert-vs-adventurer",
    title: "Introvert or Adventurer?",
    subtitle: "Discover your travel alter-ego with this snappy personality test.",
  },
  {
    id: "romantic-city",
    title: "Where Would You Fall Madly in Love (With Life)?",
    subtitle: "A dreamy, poetic quiz to reveal your cinematic life city.",
  },
  {
    id: "delulu-destination",
    title: "What’s Your Delulu Destination?",
    subtitle: "Go viral with a fun, totally delusional lifestyle quiz.",
  },
  {
    id: "music-vibe",
    title: "Which Global Vibe Matches Your Mood Music?",
    subtitle: "Aesthetic, vibey, emotional quiz: find your city-match by music.",
  },
  {
    id: "mood-map",
    title: "Your Instant Mood-to-City Map",
    subtitle: "Pick your mood, meet your city! Direct, quirky, visual fast match.",
  },
  {
    id: "travel-emoji",
    title: "Which Travel Emoji = Your Next City?",
    subtitle: "Pick emojis to match your mood—and see which destination it unlocks.",
  },
  {
    id: "beat-friend",
    title: "Beat Your Best Friend’s City Score",
    subtitle: "Compete for the highest city score! Get your total & matched city, then challenge a friend.",
  },
  {
    id: "nervous-system-climate",
    title: "What’s Your Nervous System’s Ideal Climate?",
    subtitle:
      "A soothing, restorative personality quiz to discover your wellness-supporting climate.",
  },
  {
    id: "escape-artist",
    title: "What Kind of Escape Artist Are You?",
    subtitle:
      "Discover your psychological escapist archetype—and the destination that fits your secret urge to run.",
  },
];

const QuizLibrary = () => (
  <div className="min-h-screen py-10 px-4 flex flex-col items-center">
    <h1 className="text-3xl font-playfair font-bold mb-4">Quiz Library</h1>
    <p className="text-lg text-gray-600 text-center max-w-md mb-8">
      Browse and explore soulful discovery quizzes. Tap a quiz to begin your next journey!
    </p>
    <div className="w-full max-w-3xl grid gap-6 grid-cols-1 sm:grid-cols-2">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          title={quiz.title}
          subtitle={quiz.subtitle}
          link={`/quiz/${quiz.id}`}
        />
      ))}
    </div>
  </div>
);

export default QuizLibrary;
