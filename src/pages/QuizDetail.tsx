
import React from "react";
import { useParams } from "react-router-dom";
import CountryChaosQuizForm from "@/components/CountryChaosQuizForm";
import RomanticCityQuizForm from "@/components/romantic-city/RomanticCityQuizForm";
import DeluluDestinationQuizForm from "@/components/delulu-destination/DeluluDestinationQuizForm";
import MusicVibeQuizForm from "@/components/music-vibe/MusicVibeQuizForm";
import MoodMapQuizForm from "@/components/mood-map/MoodMapQuizForm";
import TravelEmojiQuizForm from "@/components/travel-emoji/TravelEmojiQuizForm";
import BeatFriendQuizForm from "@/components/beat-the-friend/BeatFriendQuizForm";
import NervousSystemClimateQuizForm from "@/components/nervous-system-climate/NervousSystemClimateQuizForm";
import EscapeArtistQuizForm from "@/components/escape-artist/EscapeArtistQuizForm";

const QUIZ_DATA: Record<
  string,
  { title: string; subtitle: string; description?: string }
> = {
  "country-chaos": {
    title: "What Country Matches Your Chaos?",
    subtitle: "A witty, self-deprecating personality quiz for beautifully unhinged souls.",
    description: "Are you as wild as a Brazilian carnival or as serene as a Swiss alp? Take the quiz and find out!",
  },
  // Removed "introvert-vs-adventurer"
  "romantic-city": {
    title: "Where Would You Fall Madly in Love (With Life)?",
    subtitle: "A dreamy, poetic quiz to reveal your cinematic life city.",
    description: "Let your heart daydream: where in the world would your story explode in color, romance, and wonder? Take the quiz and see your poetic match.",
  },
  "delulu-destination": {
    title: "What’s Your Delulu Destination?",
    subtitle: "Go viral with a fun, totally delusional lifestyle quiz.",
    description: "Pick your delulu vibes and get a meme-worthy city + alter ego—because manifestation is a lifestyle.",
  },
  "music-vibe": {
    title: "Which Global Vibe Matches Your Mood Music?",
    subtitle: "Aesthetic, emotional, travel-music personality quiz.",
    description: "Which city truly fits your music energy? Pick your sounds, moods, and musical moments — we’ll find your city by vibe.",
  },
  "mood-map": {
    title: "Your Instant Mood-to-City Map",
    subtitle: "Pick your mood, meet your city! Direct, quirky, visually driven fast match.",
    description: "One-question quiz: What’s your vibe right now? Get a city as your instant mood match, plus a punchy, personalized description!",
  },
  "travel-emoji": {
    title: "Which Travel Emoji = Your Next City?",
    subtitle: "Pick emojis to match your mood—and see which destination it unlocks.",
    description: "3 quick emoji picks = your travel energy in city form! Will you get Paris, Tokyo, Bali, or somewhere else? Pick brain, heart, and energy vibes to reveal your destination.",
  },
  "beat-friend": {
    title: "Beat Your Best Friend’s City Score",
    subtitle: "Compete for the highest city score! Get your total & matched city, then challenge a friend.",
    description: "Play this competitive city quiz! Answer 6 playful questions, find your score, see which city matches your vibes, and tag a friend to see who beats who.",
  },
  "nervous-system-climate": {
    title: "What’s Your Nervous System’s Ideal Climate?",
    subtitle: "A soothing, restorative personality quiz to discover your wellness-supporting climate.",
    description:
      "Is your soul restored by gentle sunlight or misty mornings? Find which global climate helps your nervous system thrive — with a healing, sensory-focused match and archetype name.",
  },
  "escape-artist": {
    title: "What Kind of Escape Artist Are You?",
    subtitle:
      "Discover your psychological escapist archetype—and the destination that fits your secret urge to run.",
    description:
      "Take a playful, revealing quiz to discover your deepest motives for escape, and find the global spot that heals or stirs your soul.",
  },
};

const QuizDetail: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const quiz = quizId ? QUIZ_DATA[quizId] : undefined;

  if (!quiz) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Quiz not found</h2>
        <p>The quiz you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lwb-primary-gradient">
      <div className="w-full max-w-2xl mx-auto px-6 py-16 bg-white/95 rounded-xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal-line mb-4">{quiz.title}</h2>
        <p className="text-lg text-charcoal-soft mb-6">{quiz.subtitle}</p>
        {quiz.description && (
          <p className="mb-8 text-gray-600">{quiz.description}</p>
        )}
        <div className="w-full flex justify-center">
          {quizId === "country-chaos" ? (
            <div className="w-full max-w-xl">
              <CountryChaosQuizForm />
            </div>
          ) : quizId === "nervous-system-climate" ? (
            <div className="w-full max-w-xl">
              <NervousSystemClimateQuizForm />
            </div>
          ) : quizId === "romantic-city" ? (
            <div className="w-full max-w-xl">
              <RomanticCityQuizForm />
            </div>
          ) : quizId === "delulu-destination" ? (
            <div className="w-full max-w-xl">
              <DeluluDestinationQuizForm />
            </div>
          ) : quizId === "music-vibe" ? (
            <div className="w-full max-w-xl">
              <MusicVibeQuizForm />
            </div>
          ) : quizId === "mood-map" ? (
            <div className="w-full max-w-xl">
              <MoodMapQuizForm />
            </div>
          ) : quizId === "travel-emoji" ? (
            <div className="w-full max-w-xl">
              <TravelEmojiQuizForm />
            </div>
          ) : quizId === "beat-friend" ? (
            <div className="w-full max-w-xl">
              <BeatFriendQuizForm />
            </div>
          ) : quizId === "escape-artist" ? (
            <div className="w-full max-w-xl">
              <EscapeArtistQuizForm />
            </div>
          ) : (
            <p className="italic text-gray-400">[Quiz content coming soon!]</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;

