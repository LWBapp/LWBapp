
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RESULT_DESCRIPTIONS, NervousSystemClimateResult } from "./results";
import QuizResultActions from "@/components/QuizResultActions";

interface NervousSystemClimateResultCardProps {
  result: NervousSystemClimateResult;
  onRetake: () => void;
}

const NervousSystemClimateResultCard: React.FC<NervousSystemClimateResultCardProps> = ({
  result,
  onRetake,
}) => {
  const { archetype, climate, description } = RESULT_DESCRIPTIONS[result];
  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">
          Your Ideal Climate: <span className="text-soul-purple">{result}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-center text-xl font-playfair font-semibold">
          {archetype}
        </div>
        <div className="mb-3 text-center text-charcoal-soft text-base">
          <strong>Climate:</strong> {climate}
        </div>
        <div className="mb-6 text-center text-charcoal">{description}</div>
        <QuizResultActions
          title="What’s Your Nervous System’s Ideal Climate?"
          resultMain={result}
          description={archetype + " | " + climate + "\n" + description}
          shareTeaser={archetype}
        />
        <div className="flex justify-center">
          <Button variant="secondary" onClick={onRetake}>
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NervousSystemClimateResultCard;
