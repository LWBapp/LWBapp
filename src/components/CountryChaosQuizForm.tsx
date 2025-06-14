import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Define Q/A for "What Country Matches Your Chaos?"
const QUESTIONS: {
  question: string;
  options: { label: string; value: string; countryKey: string }[];
}[] = [
  {
    question: "1. What does your inner chaos look like?",
    options: [
      { label: "Loud, passionate, and colorful", value: "a", countryKey: "brazil" },
      { label: "Quiet, mysterious, and intense", value: "b", countryKey: "iceland" },
      { label: "Energetic, creative, ever-changing", value: "c", countryKey: "japan" },
      { label: "Orderly, thoughtful, but with wild streaks", value: "d", countryKey: "switzerland" },
      { label: "Dreamy, poetic, unpredictable", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "2. You’re at your messiest when:",
    options: [
      { label: "Your feelings explode out of you", value: "a", countryKey: "brazil" },
      { label: "You isolate & go cold", value: "b", countryKey: "iceland" },
      { label: "You jump into new projects & leave a creative wake", value: "c", countryKey: "japan" },
      { label: "You stress-clean or overthink everything", value: "d", countryKey: "switzerland" },
      { label: "You write a poem/novel/manifesto in your head at 2am", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "3. Your friends describe you as:",
    options: [
      { label: "Expressive, vibrant, funny", value: "a", countryKey: "brazil" },
      { label: "Elusive, enigmatic, intriguing", value: "b", countryKey: "iceland" },
      { label: "Inventive, quirky, surprising", value: "c", countryKey: "japan" },
      { label: "Reliable, calm, with a playful secret side", value: "d", countryKey: "switzerland" },
      { label: "Romantic, soulful, a little unhinged", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "4. A perfect day reinventing yourself is:",
    options: [
      { label: "Dancing until sunrise", value: "a", countryKey: "brazil" },
      { label: "A solo hike, lost in thought", value: "b", countryKey: "iceland" },
      { label: "Learning a new craft/art/skill", value: "c", countryKey: "japan" },
      { label: "Planning a mini-adventure (with snacks packed)", value: "d", countryKey: "switzerland" },
      { label: "Spontaneous road trip with friends and good music", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "5. Your chaos superpower is:",
    options: [
      { label: "Joyful intensity", value: "a", countryKey: "brazil" },
      { label: "Deep introspection", value: "b", countryKey: "iceland" },
      { label: "Reinvention", value: "c", countryKey: "japan" },
      { label: "Hidden passion, strong boundaries", value: "d", countryKey: "switzerland" },
      { label: "Magnetic imagination", value: "e", countryKey: "ireland" },
    ],
  },
];

// Mapping of countryKey to result description
const COUNTRY_RESULTS: Record<string, { name: string; emoji: string; flavor: string; description: string; archetype: string }> = {
  brazil: {
    name: "Brazil",
    emoji: "🎉",
    archetype: "The Joyful Catalyst",
    flavor: "Fiesta Spirit",
    description:
      "You embody vibrant color, passion, wild spontaneity, and embrace your chaos like a carnival—loud, beautiful, and unapologetic. You make everyone feel alive.",
  },
  iceland: {
    name: "Iceland",
    emoji: "❄️",
    archetype: "The Secret Storm",
    flavor: "Mystic Calm",
    description:
      "Your chaos is hidden beneath stillness—a land of fire and ice. You survive and thrive in isolation, channeling your messiness into mysterious power.",
  },
  japan: {
    name: "Japan",
    emoji: "🗻",
    archetype: "The Inventive Alchemist",
    flavor: "Creative Flux",
    description:
      "You’re always evolving—fusing tradition with daring artistry. Your beautiful disorder is innovation in motion, never boring and always surprising.",
  },
  switzerland: {
    name: "Switzerland",
    emoji: "⛰️",
    archetype: "The Orderly Wild",
    flavor: "Hidden Whimsy",
    description:
      "You seem calm, but your depths are wild. Steady as an alpine train, charming as a lakeside picnic—your chaos is reliable, well-dressed, and ready for a twist.",
  },
  ireland: {
    name: "Ireland",
    emoji: "🌈",
    archetype: "The Soulful Trickster",
    flavor: "Poetic Mayhem",
    description:
      "Romantic, magical, a little unpredictable: you dance through inner storms, spinning stories out of mayhem and laughter out of longing.",
  },
};

function tallyResults(answers: string[]): string {
  // Count the highest frequency countryKey in answers; fallback is "ireland"
  const tally: Record<string, number> = {};
  for (const ans of answers) {
    tally[ans] = (tally[ans] || 0) + 1;
  }
  let topCountry = "ireland";
  let max = 0;
  for (const key of Object.keys(COUNTRY_RESULTS)) {
    if ((tally[key] || 0) > max) {
      topCountry = key;
      max = tally[key];
    }
  }
  return topCountry;
}

import CountryChaosResultCard from "./CountryChaosResultCard";

const CountryChaosQuizForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(""));
  const [complete, setComplete] = useState(false);
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleOption = (qIndex: number, countryKey: string) => {
    const nextAnswers = [...answers];
    nextAnswers[qIndex] = countryKey;
    setAnswers(nextAnswers);
    if (qIndex < QUESTIONS.length - 1) {
      setStep(qIndex + 1);
    } else {
      const res = tallyResults(nextAnswers);
      setResultKey(res);
      setComplete(true);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(""));
    setComplete(false);
    setResultKey(null);
  };

  if (complete && resultKey) {
    const { name, emoji, description, archetype, flavor } = COUNTRY_RESULTS[resultKey];
    // Use new Result Card with share/email/download utilities
    return (
      <CountryChaosResultCard
        country={name}
        emoji={emoji}
        description={description}
        archetype={archetype}
        flavor={flavor}
        onRetake={restart}
      />
    );
  }

  // Current question
  const { question, options } = QUESTIONS[step];

  return (
    <form
      className="w-full max-w-xl mx-auto flex flex-col gap-8 animate-fadeIn"
      style={{ animationDuration: "1s" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mb-2 text-center">
        <div className="text-md mb-4 font-semibold text-soul-purple">
          What Country Matches Your Chaos?
        </div>
        <div className="mb-0.5 text-charcoal text-base font-playfair">
          {question}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Question {step + 1} of {QUESTIONS.length}
        </div>
      </div>
      <div className="grid gap-4">
        {options.map((opt, i) => (
          <Button
            type="button"
            key={opt.value}
            className={`w-full py-4 rounded-full text-md font-medium transition shadow 
              ${answers[step] === opt.countryKey
                ? "bg-soul-purple text-white border-soul-purple"
                : "bg-white border-gray-300 text-charcoal hover:bg-lavender-mist"
              }`}
            variant="outline"
            onClick={() => handleOption(step, opt.countryKey)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
      <div className="flex justify-between w-full mt-8">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <div />
      </div>
    </form>
  );
};

export default CountryChaosQuizForm;
