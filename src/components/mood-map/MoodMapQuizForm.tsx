
import React, { useState } from "react";
import { MOOD_MAP_QUESTION } from "./questions";
import { tallyMoodMapResult } from "./tallyResult";
import { Button } from "@/components/ui/button";
import MoodMapResultCard from "./MoodMapResultCard";

// Simulate an async OpenAI output (replace with API call if available)
const fetchAICityMoodResult = async (mood: string, city: string) => {
  // In production, call your backend/edge function with OpenAI
  // Here, return a placeholder string for demo purposes
  const prompts: Record<string, string> = {
    prague: "You’re in a dreamy, magical mood – soaking up the gothic fairytale of Prague. Like the city’s misty bridges, your mind wanders and the world feels enchanted. Today, you embrace wonder at its weird, whimsical best.",
    "mexico-city": "You picked spicy & flirty! Your energy matches the rhythmic, technicolor rush of Mexico City. Each plaza sizzles with bold possibility. It’s a big-hearted, flirtatious kind of day, and you’re glowing like neon pulsing over midnight tacos.",
    reykjavik: "Burnt out and blank? Reykjavik’s icy calm has your back. Drift through the quiet, recharge in steamy baths – and let the northern lights flicker a little new magic into your foggy headspace.",
    naples: "Bold & chaotic: you ARE the heart of Naples. Wild alleys, roaring Vespas, food that shouts back – your mood is pure, messy joy. If life hands you lemons, you squirt them at fate and laugh.",
    marrakech: "Moody & deep wins – so you’re channeling Marrakech. Candlelight, textured shadows, and a swirl of stories all around you. It’s not brooding; it’s poetic, and every corner feels like a new secret.",
    seoul: "Fast & focused – Seoul is your spirit city. Zipping from idea to idea, mastering the art of cool, caffeinated brilliance. Under all those neon lights, you’re unstoppable.",
  };
  // Simulate brief delay
  return new Promise<string>((resolve) => setTimeout(() => resolve(prompts[city]), 800));
};

const MoodMapQuizForm: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = async (value: string) => {
    setSelected(value);
    const cityKey = tallyMoodMapResult(value);
    setResult(cityKey);
    setLoading(true);
    setAiResult(null);
    // Simulate fetching OpenAI custom output
    const res = await fetchAICityMoodResult(value, cityKey);
    setAiResult(res);
    setLoading(false);
  };

  const handleRetake = () => {
    setSelected(null);
    setResult(null);
    setAiResult(null);
  };

  if (result) {
    return (
      <MoodMapResultCard
        resultKey={result}
        aiResult={aiResult}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-xl font-playfair font-bold mb-2">{MOOD_MAP_QUESTION.question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        {MOOD_MAP_QUESTION.answers.map((a) => (
          <Button
            key={a.value}
            className="w-full py-4 text-base"
            variant="outline"
            onClick={() => handleAnswer(a.value)}
            disabled={!!selected}
          >
            {a.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodMapQuizForm;
