
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Country keys, archetypes, poetic results:
const countryResults = {
  Italy: {
    archetype: "The Dramatic Dreamer",
    description:
      "Italy matches your beautiful chaos—expressive, passionate, a little unpredictable. Here, emotion is a second language and the opera of life never stops. You belong where espresso is strong and hand gestures are stronger."
  },
  Brazil: {
    archetype: "The Carnival Catalyst",
    description:
      "Brazil welcomes your wild heart—vivid, spontaneous, unstoppable. Your inner party merges with samba rhythms, tropical storms of color, and laughter that lasts till sunrise. Chaos is just another word for celebration."
  },
  Spain: {
    archetype: "The Unapologetic Firecracker",
    description:
      "Spain resonates with your irrepressible flair. Bulls run, music blares, and dinner never starts before 9. Your passion finds kinship in late-night wanderings, passionate debates, and siestas that save you from your own energy."
  },
  Japan: {
    archetype: "The Spirited Rule-Breaker",
    description:
      "Japan is a paradox of order and mischief—your happy place. You respect tradition, then gleefully flip it upside down at 2 AM. Neon lights and ancient temples fuel your impulsive curiosity."
  },
  USA: {
    archetype: "The High-Octane Hustler",
    description:
      "America matches your restless ambition—fast, loud, and boundlessly bold. There’s always a new dream, a side quest, or a 3AM pancake diner. You thrive where the mood, accent, and weather can change in a minute."
  },
  Thailand: {
    archetype: "The Wild Spirit Wanderer",
    description:
      "Thailand welcomes your improvisational energy. From Bangkok’s never-ending buzz to serene islands, chaos here is an art form. You’re never lost, just taking the scenic route—with extra chili and spontaneous detours."
  }
} as const;

type Country = keyof typeof countryResults;

// Questions, answers, and mapping to country points
const questions = [
  {
    title: "Your ideal spontaneous night involves:",
    options: [
      { text: "An impromptu street festival—dancing whether you know the steps or not.", country: "Brazil" },
      { text: "A table for twenty—loud dinner with passionate debates.", country: "Italy" },
      { text: "Opening a new karaoke bar, then talking to strangers in neon lights.", country: "Japan" },
      { text: "A spontaneous road trip through cities you can't pronounce.", country: "USA" },
      { text: "Ending up at a sunrise beach rave.", country: "Thailand" },
      { text: "Tapping a friend for a midnight churros run, then a flamenco show.", country: "Spain" },
    ],
  },
  {
    title: "How do you handle conflict?",
    options: [
      { text: "Turn it into a passionate group discussion. Volume is a sign of affection.", country: "Italy" },
      { text: "Dance it out—maybe literal samba, maybe metaphorical.", country: "Brazil" },
      { text: "Challenge them to a game or quirky contest. Winner buys ramen.", country: "Japan" },
      { text: "Defend your stance, then move on quickly—there’s more chaos to chase.", country: "USA" },
      { text: "Diffuse tension with wild humor, or disappear to a hidden noodle shop.", country: "Thailand" },
      { text: "Retort with a spicy comeback and laugh. Maybe throw in a flamenco stomp.", country: "Spain" },
    ],
  },
  {
    title: "Your friends describe you as:",
    options: [
      { text: "Passionate, dramatic, and a little unpredictable.", country: "Italy" },
      { text: "Vibrant, positive, and always up for adventure.", country: "Brazil" },
      { text: "Inventive, impulsive, and open-minded.", country: "Japan" },
      { text: "Bold, energetic, and full of restless dreams.", country: "USA" },
      { text: "Spontaneous, cheerful, and mysteriously everywhere at once.", country: "Thailand" },
      { text: "Fiery, social, with dramatic entrances and exits.", country: "Spain" },
    ],
  },
  {
    title: "Pick your chaos anthem:",
    options: [
      { text: "\"Livin’ la Vida Loca\"", country: "Spain" },
      { text: "\"That’s Amore\" with surprising sincerity.", country: "Italy" },
      { text: "\"Mas Que Nada\"—a samba beat for your soul.", country: "Brazil" },
      { text: "\"Tokyo Drift\" soundtrack at max volume.", country: "Japan" },
      { text: "\"Born in the USA\" blasting with the windows down.", country: "USA" },
      { text: "\"One Night in Bangkok\"—what happens there, stays there.", country: "Thailand" },
    ],
  },
  {
    title: "You handle stress by:",
    options: [
      { text: "Spewing out ideas until one sticks, and ten more follow.", country: "USA" },
      { text: "Yelling passionately, then hugging it out. Maybe pasta helps.", country: "Italy" },
      { text: "Escaping to a riotous marketplace or joining a parade.", country: "Brazil" },
      { text: "Taking three naps (plus a siesta) to reset.", country: "Spain" },
      { text: "Zipping through neon-lit city streets for snacks.", country: "Japan" },
      { text: "Booking a last-minute island getaway.", country: "Thailand" },
    ],
  },
  {
    title: "What’s your chaotic superpower?",
    options: [
      { text: "Turning any meal into a theatrical event.", country: "Italy" },
      { text: "Throwing a party with zero planning and everyone shows up.", country: "Brazil" },
      { text: "Mastering ancient wisdom then mixing it with weird gadgets.", country: "Japan" },
      { text: "Convincing friends to join questionable adventures.", country: "USA" },
      { text: "Being surrounded by friends no matter what continent you wake up on.", country: "Thailand" },
      { text: "Starting dance-offs in random places.", country: "Spain" },
    ]
  }
];

type QuizState = {
  answers: number[], // index of selected option per question
  step: number // current question index (0-based)
};

const initialState: QuizState = {
  answers: [],
  step: 0,
};

export const ChaosCountryQuiz: React.FC = () => {
  const [state, setState] = useState<QuizState>(initialState);
  const [showResult, setShowResult] = useState(false);

  // Progression logic
  const handleOption = (optionIdx: number) => {
    if (state.step < questions.length) {
      setState((s) => ({
        answers: [...s.answers, optionIdx],
        step: s.step + 1,
      }));
      if (state.step + 1 === questions.length) {
        setTimeout(() => setShowResult(true), 250);
      }
    }
  };

  // Calculate result!
  let resultCountry: Country | null = null;
  if (showResult && state.answers.length === questions.length) {
    // Tally up answers per country
    const tally: Record<Country, number> = {
      Italy: 0, Brazil: 0, Spain: 0, Japan: 0, USA: 0, Thailand: 0,
    };
    state.answers.forEach((idx, qIdx) => {
      const country = questions[qIdx].options[idx].country as Country;
      tally[country]++;
    });
    // Find the country with the highest points (tie: pick the first)
    resultCountry = (Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0] as Country);
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card className="shadow-2xl border-2 border-blush-peach rounded-3xl p-0">
        <CardHeader>
          <CardTitle className="font-playfair text-2xl text-soul-purple text-center">
            What Country Matches Your Chaos?
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            6 questions. One perfectly chaotic match. Playful, witty, and as impulsive as you are.
          </p>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <div className="mt-7">
                <h3 className="font-bold text-lg text-rose-600 mb-3">
                  {questions[state.step].title}
                </h3>
                <div className="flex flex-col gap-4">
                  {questions[state.step].options.map((option, i) => (
                    <Button
                      key={i}
                      onClick={() => handleOption(i)}
                      className="w-full text-left px-5 py-3 rounded-lg bg-honey-dark hover:bg-honey-light text-white transition shadow font-medium"
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
                <div className="mt-6 text-sm text-charcoal-soft text-center">
                  Question {state.step + 1} of {questions.length}
                </div>
              </div>
            </>
          ) : (
            resultCountry && (
              <div className="animate-fadeIn flex flex-col gap-5 items-center py-6">
                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-soul-purple mb-3">
                  {resultCountry}
                </h3>
                <div className="mb-1 text-peach-puff font-semibold text-lg">
                  {countryResults[resultCountry].archetype}
                </div>
                <div className="text-base md:text-lg text-charcoal-soft text-center font-serif max-w-md">
                  {countryResults[resultCountry].description}
                </div>
                <Button
                  className="mt-6 rounded-full bg-blush-dark text-white font-semibold px-8 py-3"
                  onClick={() => setState(initialState) || setShowResult(false)}
                >
                  Try Again (embrace more chaos)
                </Button>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChaosCountryQuiz;
