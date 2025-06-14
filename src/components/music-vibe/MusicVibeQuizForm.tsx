
import React, { useState } from "react";
import { MUSIC_VIBE_QUESTIONS } from "./questions";
import { tallyMusicVibeResult } from "./tallyResult";
import MusicVibeResultCard from "./MusicVibeResultCard";
import { toast } from "@/components/ui/use-toast";

const AI_PROMPT = `Write a mood-rich result for the quiz "Which Global Vibe Matches Your Mood Music?". Include the matching city, a music moment description like "Lo-fi beats in Tokyo at midnight", and a 2-paragraph summary of what the energy feels like there.`;

const MusicVibeQuizForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleOption(option: string) {
    if (step < MUSIC_VIBE_QUESTIONS.length) {
      setAnswers((prev) => {
        const next = [...prev];
        next[step] = option;
        return next;
      });
      setStep(step + 1);
    }
  }

  async function handleFinish() {
    const resKey = tallyMusicVibeResult(answers);
    setResultKey(resKey);
    setLoading(true);
    setAiResult(null);
    try {
      // Fetch AI result from edge function (replace with your real endpoint)
      const resp = await fetch("/functions/music-vibe-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          resultKey: resKey,
          prompt: AI_PROMPT,
          city: resKey,
        }),
      });
      if (!resp.ok) throw new Error("AI failed");
      const data = await resp.json();
      setAiResult(data.generatedText || "");
    } catch (e) {
      setAiResult(null);
      toast({
        title: "Couldn't get your music mood description",
        description: "Please try again or just vibe with your result!",
      });
    }
    setLoading(false);
  }

  function handleRetake() {
    setStep(0);
    setAnswers([]);
    setResultKey(null);
    setAiResult(null);
  }

  React.useEffect(() => {
    if (step === MUSIC_VIBE_QUESTIONS.length) {
      handleFinish();
    }
    // eslint-disable-next-line
  }, [step]);

  if (resultKey) {
    return (
      <MusicVibeResultCard resultKey={resultKey} aiResult={aiResult} onRetake={handleRetake} />
    );
  }

  const q = MUSIC_VIBE_QUESTIONS[step];

  return (
    <div className="w-full max-w-lg mx-auto px-2 py-8 bg-white rounded-xl shadow max-h-[95vh] flex flex-col items-center animate-fadeIn" style={{ animationDuration: "1s" }}>
      <div className="text-soul-purple text-lg font-bold mb-2">Question {step + 1} of {MUSIC_VIBE_QUESTIONS.length}</div>
      <div className="font-playfair text-xl mb-6 text-center">{q.question}</div>
      <div className="flex flex-col gap-4 w-full">
        {q.options.map((opt) => (
          <button
            type="button"
            key={opt.value}
            className="block w-full rounded-lg border-2 border-cloud-blue px-4 py-3 bg-cloud-blue/30 hover:bg-peach-puff text-charcoal text-base font-medium shadow transition"
            onClick={() => handleOption(opt.value)}
            disabled={loading}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="mt-8 text-sm text-gray-400">Vibe and pick honestly — we'll match your music soul!</div>
    </div>
  );
};

export default MusicVibeQuizForm;
