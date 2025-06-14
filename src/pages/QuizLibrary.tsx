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
  // Add more quizzes here as needed
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
