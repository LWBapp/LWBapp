
import React from "react";
import { TRAVEL_EMOJI_RESULTS, TravelEmojiResultKey } from "./results";
import { Button } from "@/components/ui/button";

type Props = {
  resultKey: TravelEmojiResultKey;
  emojiCombo: string;
  onRetake: () => void;
};

const TravelEmojiResultCard: React.FC<Props> = ({
  resultKey,
  emojiCombo,
  onRetake,
}) => {
  const result = TRAVEL_EMOJI_RESULTS[resultKey];
  if (!result) return null;

  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-xl mx-auto text-center animate-fadeIn" style={{ animationDuration: "1.2s" }}>
      <div className="text-5xl mb-3">{result.emojiCombo}</div>
      <h2 className="font-bold text-2xl font-playfair mb-1 text-soul-purple">{result.city}</h2>
      <div className="mb-3 text-gray-500">Your emoji picks: <span className="font-bold">{emojiCombo}</span></div>
      <div className="text-charcoal text-lg mb-6">{result.explanation}</div>
      <Button variant="secondary" className="mt-2" onClick={onRetake}>
        Retake Quiz
      </Button>
    </div>
  );
};

export default TravelEmojiResultCard;
