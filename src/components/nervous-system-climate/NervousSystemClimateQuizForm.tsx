
import React, { useState } from "react";
import { questions, NervousSystemClimateOption } from "./questions";
import { getNervousSystemClimateResult } from "./tallyResult";
import { RESULT_DESCRIPTIONS, NervousSystemClimateResult } from "./results";
import NervousSystemClimateResultCard from "./NervousSystemClimateResultCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup } from "@radix-ui/react-radio-group";

const NervousSystemClimateQuizForm: React.FC = () => {
  const [answers, setAnswers] = useState<(NervousSystemClimateOption | null)[]>(Array(6).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<NervousSystemClimateResult | null>(null);

  const handleOption = (qIdx: number, opt: NervousSystemClimateOption) => {
    const next = [...answers];
    next[qIdx] = opt;
    setAnswers(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some((a) => a === null)) return;
    const quizAnswers = answers as NervousSystemClimateOption[];
    const resultCity = getNervousSystemClimateResult({ answers: quizAnswers });
    setResult(resultCity);
    setShowResult(true);
  };

  const handleRetake = () => {
    setAnswers(Array(6).fill(null));
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <NervousSystemClimateResultCard
        result={result}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((q, i) => (
        <Card key={q.id} className="mb-0">
          <CardContent className="p-4 space-y-3">
            <p className="font-playfair text-lg mb-2">{q.text}</p>
            <RadioGroup className="flex flex-col gap-2" value={answers[i] ?? undefined} onValueChange={(value) => handleOption(i, value as NervousSystemClimateOption)}>
              {q.options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer font-normal">
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={opt.value}
                    checked={answers[i] === opt.value}
                    onChange={() => handleOption(i, opt.value)}
                    className="accent-soul-purple"
                    required={answers[i] === null}
                  />
                  <span className="text-charcoal">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button
        type="submit"
        variant="default"
        className="w-full mt-4"
        disabled={answers.some((a) => a === null)}
      >
        See My Climate Match
      </Button>
    </form>
  );
};

export default NervousSystemClimateQuizForm;
