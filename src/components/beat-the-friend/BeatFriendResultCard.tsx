
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuizResultActions from "@/components/QuizResultActions";

interface BeatFriendResultCardProps {
  score: number;
  city: string;
  onRetake: () => void;
}

const cityTaglines: Record<string, string> = {
  "Copenhagen": "Chill vibes win! But can your friend top your city score?",
  "Lisbon": "Lisbon legend! Bet you can’t be beat here.",
  "Tel Aviv": "Party in Tel Aviv—dare your friend to match your energy!",
  "Mexico City": "You run on chaos… but is anyone bolder? Challenge a friend!",
  "Bangkok": "Bangkok blast! Are you THE icon? Prove it—tag a friend to beat you.",
};

const BeatFriendResultCard: React.FC<BeatFriendResultCardProps> = ({
  score,
  city,
  onRetake,
}) => {
  const tagline = cityTaglines[city] || "Tag a friend to play!";

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Your City Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center text-xl font-semibold">
          Total Score: <span className="text-soul-purple">{score}</span>
        </div>
        <div className="mb-4 text-center text-2xl font-playfair">
          Matched City: <span className="text-soul-purple">{city}</span>
        </div>
        <p className="mb-6 text-center text-charcoal-soft">{tagline}</p>
        <QuizResultActions
          title="Beat Your Best Friend’s City Score"
          resultMain={city}
          description={tagline}
          shareTeaser={`I scored ${score}!`}
        />
        <div className="flex justify-center gap-2 mt-4">
          <Button variant="secondary" onClick={onRetake}>
            Try Again
          </Button>
          <Button variant="default" onClick={() => navigator.share?.({
            title: "Beat Your Best Friend’s City Score",
            text: `My score: ${score} | City: ${city} — Can you beat me?`,
            url: window.location.href
          })}>
            Tag a Friend
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeatFriendResultCard;
