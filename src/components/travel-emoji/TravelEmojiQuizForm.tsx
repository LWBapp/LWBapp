
import React, { useState } from "react";
import { EMOJI_QUESTIONS } from "./questions";
import { tallyTravelEmojiResult } from "./tallyResult";
import TravelEmojiResultCard from "./TravelEmojiResultCard";
import { Button } from "@/components/ui/button";

const initialAnswers = { q1: "", q2: "", q3: "" };

const TravelEmojiQuizForm: React.FC = () => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [showResult, setShowResult] = useState(false);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [emojiCombo, setEmojiCombo] = useState<string>("");

  const handleAnswer = (qkey: string, val: string) => {
    setAnswers({ ...answers, [qkey]: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.q1 || !answers.q2 || !answers.q3) return;
    const { resultKey, emojiCombo } = tallyTravelEmojiResult(
      answers.q1,
      answers.q2,
      answers.q3
    );
    setResultKey(resultKey);
    setEmojiCombo(emojiCombo);
    setShowResult(true);
  };

  const handleRetake = () => {
    setShowResult(false);
    setAnswers(initialAnswers);
    setResultKey(null);
    setEmojiCombo("");
  };

  if (showResult && resultKey) {
    return (
      <TravelEmojiResultCard
        resultKey={resultKey as any}
        emojiCombo={emojiCombo}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-4 bg-white rounded-lg shadow-md animate-fadeIn"
      style={{ animationDuration: "1s" }}
    >
      <h3 className="text-xl font-playfair font-bold text-center mb-2">
        Which Travel Emoji = Your Next City?
      </h3>
      {EMOJI_QUESTIONS.map((q, idx) => (
        <div key={q.key} className="mb-6">
          <div className="text-charcoal text-base font-semibold mb-2">{idx + 1}. {q.question}</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {q.answers.map(ans => (
              <label
                key={ans.value}
                htmlFor={`${q.key}-${ans.value}`}
                className={`cursor-pointer flex flex-col items-center px-3 py-2 rounded-lg border transition
                  ${answers[q.key as keyof typeof answers] === ans.value
                    ? "bg-lavender-mist border-soul-purple"
                    : "bg-white border-gray-200 hover:bg-cloud-blue"}`}
              >
                <input
                  id={`${q.key}-${ans.value}`}
                  type="radio"
                  name={q.key}
                  value={ans.value}
                  checked={answers[q.key as keyof typeof answers] === ans.value}
                  onChange={() => handleAnswer(q.key, ans.value)}
                  className="hidden"
                />
                <span className="text-3xl">{ans.emoji}</span>
                <span className="text-xs mt-1">{ans.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <Button type="submit" disabled={!answers.q1 || !answers.q2 || !answers.q3}>
          Reveal My City!
        </Button>
      </div>
    </form>
  );
};

export default TravelEmojiQuizForm;
