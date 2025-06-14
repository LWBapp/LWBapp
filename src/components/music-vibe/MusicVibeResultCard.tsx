
import React from "react";
import { MUSIC_VIBE_RESULTS } from "./results";
import { Button } from "@/components/ui/button";
import QuizResultActions from "@/components/QuizResultActions";

interface MusicVibeResultCardProps {
  resultKey: string;
  aiResult: string | null;
  onRetake: () => void;
}
const MusicVibeResultCard: React.FC<MusicVibeResultCardProps> = ({
  resultKey,
  aiResult,
  onRetake,
}) => {
  const res = MUSIC_VIBE_RESULTS[resultKey];
  if (!res) return null;

  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-xl mx-auto text-center animate-fadeIn" style={{ animationDuration: "1.2s" }}>
      <div className="text-6xl mb-2">{res.emoji}</div>
      <h2 className="font-bold text-2xl font-playfair mb-2 text-soul-purple">{res.city}</h2>
      <div className="italic text-coral-pink mb-2">{res.archetype}</div>
      <div className="mb-4 text-gray-600">{res.description}</div>
      {aiResult ? (
        <p className="mb-6 text-charcoal text-lg">{aiResult}</p>
      ) : (
        <div className="text-gray-400 mb-6 italic">Loading your music-matched mood city...</div>
      )}
      <QuizResultActions
        title="Which Global Vibe Matches Your Mood Music?"
        resultMain={res.city}
        description={aiResult || res.description}
        shareTeaser={res.archetype}
      />
      <Button variant="secondary" className="mt-4" onClick={onRetake}>
        Retake Quiz
      </Button>
    </div>
  );
};

export default MusicVibeResultCard;
