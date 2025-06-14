
import React, { useState } from "react";
import { ESCAPE_ARTIST_QUESTIONS, EscapeArtistOption } from "./questions";
import { getEscapeArtistResult } from "./tallyResult";
import EscapeArtistResultCard from "./EscapeArtistResultCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EscapeArtistResult } from "./results";

const EscapeArtistQuizForm: React.FC = () => {
  const [answers, setAnswers] = useState<Array<EscapeArtistOption | null>>(
    Array(ESCAPE_ARTIST_QUESTIONS.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  // Update type here!
  const [result, setResult] = useState<EscapeArtistResult | null>(null);

  const handleSelect = (qIdx: number, value: EscapeArtistOption) => {
    const updated = [...answers];
    updated[qIdx] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const completed = answers.every((a) => !!a);
    if (!completed) return;
    const finalAnswers = answers as EscapeArtistOption[];
    const res = getEscapeArtistResult({ answers: finalAnswers });
    setResult(res);
    setShowResult(true);
  };

  const handleRetake = () => {
    setAnswers(Array(ESCAPE_ARTIST_QUESTIONS.length).fill(null));
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return <EscapeArtistResultCard result={result} onRetake={handleRetake} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {ESCAPE_ARTIST_QUESTIONS.map((q, idx) => (
        <div key={idx} className="mb-2">
          <div className="mb-3 font-semibold text-lg font-playfair">{q.question}</div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {q.options.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "cursor-pointer flex items-center gap-2 border rounded-lg px-4 py-2 hover:border-soul-purple transition",
                  answers[idx] === opt.value ? "border-soul-purple bg-cloud-blue/30 font-bold" : "border-gray-300 bg-white"
                )}
              >
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={opt.value}
                  checked={answers[idx] === opt.value}
                  onChange={() => handleSelect(idx, opt.value as EscapeArtistOption)}
                  className="accent-soul-purple"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button
        type="submit"
        className="self-center mt-4"
        disabled={answers.some((a) => !a)}
      >
        Reveal My Escape Archetype
      </Button>
    </form>
  );
};

export default EscapeArtistQuizForm;
