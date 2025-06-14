
import React from "react";
import { MOOD_MAP_RESULTS } from "./results";
import { Button } from "@/components/ui/button";
import QuizResultActions from "@/components/QuizResultActions";

interface MoodMapResultCardProps {
  resultKey: string;
  aiResult: string | null;
  onRetake: () => void;
}
const MoodMapResultCard: React.FC<MoodMapResultCardProps> = ({
  resultKey,
  aiResult,
  onRetake,
}) => {
  const res = MOOD_MAP_RESULTS[resultKey];
  if (!res) return null;

  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-xl mx-auto text-center animate-fadeIn" style={{ animationDuration: "1.2s" }}>
      <div className="text-6xl mb-2">{res.emoji}</div>
      <h2 className="font-bold text-2xl font-playfair mb-2 text-soul-purple">{res.city}</h2>
      <div className="italic text-coral-pink mb-2">{res.archetype}</div>
      {aiResult ? (
        <p className="mb-6 text-charcoal text-lg">{aiResult}</p>
      ) : (
        <div className="text-gray-400 mb-6 italic">Loading your mood-matched city vibe...</div>
      )}
      <QuizResultActions
        title="Your Instant Mood-to-City Map"
        resultMain={res.city}
        description={aiResult || res.archetype}
        shareTeaser={res.archetype}
      />
      <Button variant="secondary" className="mt-4" onClick={onRetake}>
        Retake Quiz
      </Button>
    </div>
  );
};

export default MoodMapResultCard;
