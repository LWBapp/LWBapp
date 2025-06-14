
import React from "react";
import { Button } from "@/components/ui/button";
import { QUESTIONS } from "./questions";

type RomanticCityStepProps = {
  question: string;
  options: { label: string; value: string }[];
  currentStep: number;
  totalSteps: number;
  answer: string;
  onOption: (value: string) => void;
  onBack: () => void;
};

const RomanticCityStep: React.FC<RomanticCityStepProps> = ({
  question,
  options,
  currentStep,
  totalSteps,
  answer,
  onOption,
  onBack,
}) => (
  <form
    className="w-full max-w-xl mx-auto flex flex-col gap-8 animate-fadeIn"
    style={{ animationDuration: "1s" }}
    onSubmit={(e) => e.preventDefault()}
  >
    <div className="mb-2 text-center">
      <div className="text-md mb-4 font-semibold text-pink-600">
        Where Would You Fall Madly in Love (With Life)?
      </div>
      <div className="mb-0.5 text-charcoal text-base font-playfair">{question}</div>
      <div className="mt-2 text-xs text-gray-500">
        Question {currentStep + 1} of {totalSteps}
      </div>
    </div>
    <div className="grid gap-4">
      {options.map((opt) => (
        <Button
          type="button"
          key={opt.value}
          className={`w-full py-4 rounded-full text-md font-medium transition shadow
            ${answer === opt.value
              ? "bg-pink-600 text-white border-pink-600"
              : "bg-white border-gray-300 text-charcoal hover:bg-pink-50"
            }`}
          variant="outline"
          onClick={() => onOption(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
    <div className="flex justify-between w-full mt-8">
      <Button
        type="button"
        variant="ghost"
        disabled={currentStep === 0}
        onClick={onBack}
      >
        Back
      </Button>
      <div />
    </div>
  </form>
);
export default RomanticCityStep;
