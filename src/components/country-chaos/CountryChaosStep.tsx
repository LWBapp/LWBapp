
import React from "react";
import { Button } from "@/components/ui/button";
import type { QUESTIONS } from "./questions";

type CountryChaosStepProps = {
  question: string;
  options: { label: string; value: string; countryKey: string }[];
  currentStep: number;
  totalSteps: number;
  answer: string;
  onOption: (countryKey: string) => void;
  onBack: () => void;
};

const CountryChaosStep: React.FC<CountryChaosStepProps> = ({
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
      <div className="text-md mb-4 font-semibold text-soul-purple">
        What Country Matches Your Chaos?
      </div>
      <div className="mb-0.5 text-charcoal text-base font-playfair">
        {question}
      </div>
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
              ${answer === opt.countryKey
                ? "bg-soul-purple text-white border-soul-purple"
                : "bg-white border-gray-300 text-charcoal hover:bg-lavender-mist"
              }`}
          variant="outline"
          onClick={() => onOption(opt.countryKey)}
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

export default CountryChaosStep;
