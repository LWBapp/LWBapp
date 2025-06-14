import React from "react";
import QuizCard from "@/components/QuizCard";

// New set of quizzes with concepts & prompts
const quizzes = [
  {
    title: "What Country Matches Your Chaos?",
    subtitle: "Find out which wild destination mirrors your beautiful mess.",
    link: "/quiz?type=chaos-country",
  },
  {
    title: "Soul Country Mirror",
    subtitle: "Discover which country reflects your spirit’s landscape.",
    link: "/quiz?type=soul-country",
  },
  {
    title: "City of Creativity",
    subtitle: "Find the city that vibrates with your artistic energy.",
    link: "/quiz?type=city-creativity",
  },
  {
    title: "Where You’ll Find True Balance",
    subtitle: "Reveal the destination that harmonizes your mind, body, and purpose.",
    link: "/quiz?type=balance",
  },
  {
    title: "Ambition’s Map",
    subtitle: "Which country best matches the fire of your ambitions?",
    link: "/quiz?type=ambition",
  },
  {
    title: "Nature or Neon?",
    subtitle: "Are you called by wild lands or vibrant city lights?",
    link: "/quiz?type=escape",
  },
  {
    title: "Continent of Curiosity",
    subtitle: "Which continent is your explorer’s heart wired for?",
    link: "/quiz?type=curiosity",
  },
  {
    title: "Thrive: Your Next Chapter",
    subtitle: "Where on earth will you flourish in this season of life?",
    link: "/quiz?type=thrive",
  },
  {
    title: "Healing Place Guide",
    subtitle: "Find the locale that soothes and supports your deepest healing.",
    link: "/quiz?type=healing",
  },
  {
    title: "Adventure Archetype",
    subtitle: "What world adventure perfectly matches your energy?",
    link: "/quiz?type=adventure",
  },
  {
    title: "Cultural Homecoming",
    subtitle: "Which culture feels like the home your soul remembers?",
    link: "/quiz?type=culture",
  },
];

const QuizLibrary = () => (
  <div className="min-h-screen py-10 px-4 flex flex-col items-center">
    <h1 className="text-3xl font-playfair font-bold mb-4">Quiz Library</h1>
    <p className="text-lg text-gray-600 text-center max-w-md mb-8">
      Explore soulful discovery quizzes. Tap a quiz to begin your next journey!
    </p>
    <div className="w-full max-w-6xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
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
