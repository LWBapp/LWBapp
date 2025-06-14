
import React, { useState } from "react";
import { beatFriendQuestions, BeatFriendAnswer, calculateBeatFriendScore } from "./questions";
import { getBeatFriendResult } from "./results";
import BeatFriendResultCard from "./BeatFriendResultCard";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const BeatFriendQuizForm: React.FC = () => {
  const [answers, setAnswers] = useState<BeatFriendAnswer[]>(Array(6).fill("" as BeatFriendAnswer));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const handleSelect = (answer: BeatFriendAnswer) => {
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (step < beatFriendQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const handleRetake = () => {
    setAnswers(Array(6).fill("" as BeatFriendAnswer));
    setStep(0);
    setDone(false);
  };

  if (done) {
    const score = calculateBeatFriendScore(answers);
    const city = getBeatFriendResult(score);
    return <BeatFriendResultCard score={score} city={city} onRetake={handleRetake} />;
  }

  const currentQ = beatFriendQuestions[step];
  const selected = answers[step];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl">
          {`Q${step + 1}: ${currentQ.question}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selected}
          onValueChange={v => handleSelect(v as BeatFriendAnswer)}
          className="flex flex-col gap-4"
        >
          {currentQ.options.map((opt) => (
            <label key={opt.value} className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${selected === opt.value ? "border-soul-purple bg-cloud-blue" : "border-gray-200"}`}>
              <RadioGroupItem value={opt.value} id={`${step}-option-${opt.value}`} />
              <span className="font-medium">{opt.label}</span>
            </label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selected}
          className="w-full"
        >
          {step < beatFriendQuestions.length - 1 ? "Next" : "See Result"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BeatFriendQuizForm;
