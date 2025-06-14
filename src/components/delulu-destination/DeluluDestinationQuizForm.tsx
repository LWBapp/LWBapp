
import React, { useState } from "react";
import { DELULU_QUESTIONS } from "./questions";
import { tallyDeluluResults } from "./tallyResult";
import { DELULU_RESULTS } from "./results";
import DeluluResultCard from "./DeluluResultCard";
import RomanticCityStep from "../romantic-city/RomanticCityStep";

const mockAIResult = (prompt: string, cityKey: string) => {
  // In reality, you would call an API for OpenAI to generate result. For now return a lorem-like placeholder:
  const mockResults: Record<string, string> = {
    "monte-carlo": "💸 Your alter ego is The Heiress in Hiding. The Monte Carlo delusion is alive: you glide from yacht party to secret casino, sipping ’23 rosé while everyone wonders who you really are. No one’s seen your face—just your shoes and your Salvatore Ferragamo wallet. \n\n In your mind, gossip columnists invent rumors about your past, and your phone only gets calls from ‘unknown number’ (because obviously, someone’s trying to get your fortune). Life is a blur of velvet ropes and champagne destinies.",
    "dubai": "🌴 You are The Desert Visionary. In Dubai, you wake up already manifesting—because your morning routines include both sun salutations and trading stocks. You attend brunch in a flying car, your Instagram is a mood board for quantum leaping, and all your friends call you 'the CEO of vibes.' \n\n Someday soon, the Burj Khalifa will have a penthouse suite named after you and every sunset will feature your personal fireworks show—sponsored by the universe, obviously.",
    "tulum": "🧘‍♀️ Meet The Soft Life Guru. You detox, you retwist your mala beads, and you journal about your quantum climax to the gentle sound of jungle rain. All your food is 'sun-charged,' and your yoga mat is made of ethically-sourced linen and delusion. \n\n Every DM is a brand deal waiting to happen, and your aura? Untouchable. In your fantasy, you heal everyone just by vibing barefoot through a new moon cacao ceremony, with a crystal ballin’ playlist on loop.",
    "seoul": "🎤 Your alter ego: The Undiscovered Idol. In Seoul, you’re the viral dance queen, #1 fan on K-Dramas, and the hidden fifth member of a secret K-pop group (they just haven’t called you...yet). You’ve got a fan group dedicated to screenshots of your imaginary debut. \n\n By night, you livestream your shower routines, waiting for the right agency to discover you. Every glance in the mirror is a teaser drop; every TikTok is an audiotrack leak.",
    "beverly-hills": "💅 You are The Vibe Curator. Beverly Hills is your playground: you hop from Pilates to power brunch, all while curating a ‘soft launch’ of your real self somewhere on a private Finsta. \n\n Your dog wears sunglasses, your iced matcha has an NDA, and you manifest one viral Co-Star notification daily. The trolling is high-concept, the drama aesthetic, and you block anyone who doesn’t match your candle budget.",
    "mykonos": "🏝️ You’re The Beach Party Oracle. On Mykonos, you attract yacht invitations with nothing but a playlist and a wink; even the seagulls take selfies with you. \n\n You keep a caftan in every color, and every sunrise is either a poetry reading or a silent disco. In your fantasy, you host the world’s only astrology-powered foam party — and every sign leaves reborn (and sparkling).",
  };
  return mockResults[cityKey] || "Your delulu vision awaits! (AI result will display here.)";
};

const DeluluDestinationQuizForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(DELULU_QUESTIONS.length).fill(""));
  const [complete, setComplete] = useState(false);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [aiResult, setAIResult] = useState<string | null>(null);

  const handleOption = (value: string) => {
    const nextAnswers = [...answers];
    nextAnswers[step] = value;
    setAnswers(nextAnswers);
    if (step < DELULU_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const key = tallyDeluluResults(nextAnswers);
      setResultKey(key);
      setComplete(true);
      // For demo: Load mock result. To-GPT: Replace with async OpenAI fetch with DELULU_RESULTS[key].openAIPrompt if you wish!
      setAIResult(mockAIResult(DELULU_RESULTS[key].openAIPrompt, key));
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers(Array(DELULU_QUESTIONS.length).fill(""));
    setComplete(false);
    setResultKey(null);
    setAIResult(null);
  };

  if (complete && resultKey) {
    return (
      <DeluluResultCard
        resultKey={resultKey}
        aiResult={aiResult}
        onRetake={restart}
      />
    );
  }

  const { question, options } = DELULU_QUESTIONS[step];

  return (
    <RomanticCityStep
      question={question}
      options={options}
      currentStep={step}
      totalSteps={DELULU_QUESTIONS.length}
      answer={answers[step]}
      onOption={handleOption}
      onBack={() => setStep((s) => Math.max(0, s - 1))}
    />
  );
};
export default DeluluDestinationQuizForm;
