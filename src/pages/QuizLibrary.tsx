
import React from "react";
import QuizCard from "@/components/QuizCard";

const quizzes = [
  {
    title: "What City Matches Your Creativity?",
    subtitle: "Find your artistic twin in the world.",
    link: "/quiz?type=creativity",
  },
  {
    title: "Where Should You Move For True Balance?",
    subtitle: "Discover the city that reflects your soul’s harmony.",
    link: "/quiz?type=balance",
  },
  {
    title: "Which Country Mirrors Your Ambition?",
    subtitle: "Match your drive to your dream destination.",
    link: "/quiz?type=ambition",
  },
  {
    title: "Your Ideal Escape: Nature or Neon?",
    subtitle: "Find out if you belong in the wild or the city lights.",
    link: "/quiz?type=escape",
  },
  {
    title: "What Continent Fits Your Curiosity?",
    subtitle: "Reveal which part of the world calls you to explore.",
    link: "/quiz?type=curiosity",
  },
  {
    title: "Where Will You Thrive Next?",
    subtitle: "Uncover the place with vibes that lift you up.",
    link: "/quiz?type=thrive",
  }
  // Add more quizzes here as needed!
];

const QuizLibrary = () => (
  <div className="min-h-screen py-10 px-4 flex flex-col items-center">
    <h1 className="text-3xl font-playfair font-bold mb-4">Quiz Library</h1>
    <p className="text-lg text-gray-600 text-center max-w-md mb-8">
      Browse and explore soulful discovery quizzes. Tap a quiz to begin your next journey!
    </p>
    <div className="w-full max-w-6xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz, idx) => (
        <QuizCard
          key={quiz.title}
          title={quiz.title}
          subtitle={quiz.subtitle}
          link={quiz.link}
        />
      ))}
    </div>
  </div>
);

export default QuizLibrary;
