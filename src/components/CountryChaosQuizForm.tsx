
import React, { useState } from "react";
import CountryChaosResultCard from "./CountryChaosResultCard";
import { QUESTIONS } from "./country-chaos/questions";
import { COUNTRY_RESULTS } from "./country-chaos/countryResults";
import { tallyResults } from "./country-chaos/tallyResult";
import CountryChaosStep from "./country-chaos/CountryChaosStep";

const CountryChaosQuizForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(""));
  const [complete, setComplete] = useState(false);
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleOption = (countryKey: string) => {
    const nextAnswers = [...answers];
    nextAnswers[step] = countryKey;
    setAnswers(nextAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const res = tallyResults(nextAnswers, Object.keys(COUNTRY_RESULTS));
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

  const { question, options } = QUESTIONS[step];

  return (
    <CountryChaosStep
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

export default CountryChaosQuizForm;
