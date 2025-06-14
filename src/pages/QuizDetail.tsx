import React from "react";
import { useParams } from "react-router-dom";
import CountryChaosQuizForm from "@/components/CountryChaosQuizForm";
import RomanticCityQuizForm from "@/components/romantic-city/RomanticCityQuizForm";

const QUIZ_DATA: Record<
  string,
  { title: string; subtitle: string; description?: string }
> = {
  "country-chaos": {
    title: "What Country Matches Your Chaos?",
    subtitle: "A witty, self-deprecating personality quiz for beautifully unhinged souls.",
    description: "Are you as wild as a Brazilian carnival or as serene as a Swiss alp? Take the quiz and find out!",
  },
  "introvert-vs-adventurer": {
    title: "Introvert or Adventurer?",
    subtitle: "Discover your travel alter-ego with this snappy personality test.",
    description: "Is your soul craving a book by the fire or an offbeat adventure?",
  },
  "romantic-city": {
    title: "Where Would You Fall Madly in Love (With Life)?",
    subtitle: "A dreamy, poetic quiz to reveal your cinematic life city.",
    description: "Let your heart daydream: where in the world would your story explode in color, romance, and wonder? Take the quiz and see your poetic match.",
  },
  // Add more quizzes here matching the id in QuizLibrary!
};

const QuizDetail: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const quiz = quizId ? QUIZ_DATA[quizId] : undefined;

  if (!quiz) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Quiz not found</h2>
        <p>The quiz you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lwb-primary-gradient">
      <div className="w-full max-w-2xl mx-auto px-6 py-16 bg-white/95 rounded-xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal-line mb-4">{quiz.title}</h2>
        <p className="text-lg text-charcoal-soft mb-6">{quiz.subtitle}</p>
        {quiz.description && (
          <p className="mb-8 text-gray-600">{quiz.description}</p>
        )}
        <div className="w-full flex justify-center">
          {quizId === "country-chaos" ? (
            <div className="w-full max-w-xl">
              <CountryChaosQuizForm />
            </div>
          ) : quizId === "romantic-city" ? (
            <div className="w-full max-w-xl">
              <RomanticCityQuizForm />
            </div>
          ) : (
            <p className="italic text-gray-400">[Quiz content coming soon!]</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
