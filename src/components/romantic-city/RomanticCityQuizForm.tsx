
import React, { useState } from "react";
import { QUESTIONS } from "./questions";
import { tallyResults } from "./tallyResult";
import { CITY_RESULTS } from "./cityResults";
import RomanticCityStep from "./RomanticCityStep";
import RomanticCityResultCard from "../RomanticCityResultCard";

const RomanticCityQuizForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(""));
  const [complete, setComplete] = useState(false);
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleOption = (value: string) => {
    const nextAnswers = [...answers];
    nextAnswers[step] = value;
    setAnswers(nextAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
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
    return (
      <RomanticCityResultCard
        cityKey={resultKey}
        onRetake={restart}
      />
    );
  }

  const { question, options } = QUESTIONS[step];

  return (
    <RomanticCityStep
      question={question}
      options={options}
      currentStep={step}
      totalSteps={QUESTIONS.length}
      answer={answers[step]}
      onOption={handleOption}
      onBack={() => setStep((s) => Math.max(0, s - 1))}
    />
  );
};

export default RomanticCityQuizForm;
