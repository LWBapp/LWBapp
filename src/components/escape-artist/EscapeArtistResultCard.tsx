
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RESULT_DESCRIPTIONS, EscapeArtistResult } from "./results";
import QuizResultActions from "@/components/QuizResultActions";

interface Props {
  result: EscapeArtistResult;
  onRetake: () => void;
}

const EscapeArtistResultCard: React.FC<Props> = ({ result, onRetake }) => {
  const r = RESULT_DESCRIPTIONS[result];
  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-3">
          Escape Mode: <span className="text-soul-purple">{result}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-center text-xl font-playfair font-semibold">
          {r.archetype}
        </div>
        <div className="mb-3 text-center text-charcoal-soft">
          <strong>Archetype</strong>: {r.archetype} <br />
          <strong>Destination</strong>: {r.destination}
        </div>
        <div className="mb-6 text-center text-charcoal">{r.description}</div>
        <QuizResultActions
          title="What Kind of Escape Artist Are You?"
          resultMain={result}
          description={r.archetype + " | " + r.destination + "\n" + r.description}
          shareTeaser={r.archetype}
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

export default EscapeArtistResultCard;
