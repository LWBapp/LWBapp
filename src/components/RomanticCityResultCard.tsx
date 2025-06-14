
import React from "react";
import { Button } from "@/components/ui/button";
import { CITY_RESULTS } from "./romantic-city/cityResults";

type RomanticCityResultCardProps = {
  cityKey: string;
  onRetake: () => void;
};

const RomanticCityResultCard: React.FC<RomanticCityResultCardProps> = ({
  cityKey,
  onRetake,
}) => {
  const res = CITY_RESULTS[cityKey];
  if (!res) return null;
  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-xl mx-auto text-center animate-fadeIn" style={{ animationDuration: "1.2s" }}>
      <div className="text-6xl mb-2">{res.emoji}</div>
      <h2 className="font-bold text-2xl font-playfair mb-2 text-pink-600">{res.name}</h2>
      <div className="italic text-pink-800 mb-2">{res.archetype}</div>
      <p className="mb-6 text-charcoal text-lg">{res.description}</p>
      <Button variant="secondary" className="mt-4" onClick={onRetake}>
        Retake Quiz
      </Button>
    </div>
  );
};
export default RomanticCityResultCard;
