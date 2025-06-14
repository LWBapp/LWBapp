
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultCard } from "@/components/ResultCard";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Use GPT-4o to generate result
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

function buildPrompt(form: any) {
  return `You are a soulful travel guide who maps people's emotional seasons to the energy of countries. Your answers are poetic, intuitive, and emotionally resonant. Based on the following inputs: Craving: ${form.craving}, Feelings: ${form.feelings?.join(", ")}, Imagery: ${form.scenes?.join(", ")}, Emotional Season: ${form.emotional_season}, Place Type: ${form.place_type}, suggest one country that matches their emotional season and describe why, using poetic tone.`;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const form = location.state;

  useEffect(() => {
    if (!form) {
      navigate("/quiz");
      return;
    }

    const fetchResult = async () => {
      setLoading(true);
      try {
        // --- IMPORTANT: User must set their OpenAI key manually ---
        const apiKey = localStorage.getItem("openai_api_key");
        if (!apiKey) {
          toast({
            title: "Missing OpenAI Key",
            description: (
              <span>
                You need to provide your OpenAI API key to get your Soul Country result.
                <br />
                <b>Go back and enter your key at the top right.</b>
              </span>
            ),
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const prompt = buildPrompt(form);
        const res = await fetch(OPENAI_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: "Be soulful, emotionally intuitive, and poetic. Suggest a single world country only, then explain why in a sensitive, evocative, beautiful way."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 400,
            temperature: 0.82
          })
        });

        if (!res.ok) throw new Error("OpenAI response error.");
        const data = await res.json();
        // Extract: look for "Country: X" on first line, or infer
        const resultText: string =
          data.choices?.[0]?.message?.content || "";
        // Heuristics: take first country referenced
        const match = resultText.match(/([A-Z][A-Za-z\s]+)[\:\,]/);
        let guessedCountry = "";
        if (match) {
          guessedCountry = match[1].trim();
        } else {
          // fallback: first sentence's proper noun
          guessedCountry =
            resultText.split(".")[0].match(/[A-Z][a-z]+/g)?.[0] ?? "";
        }
        setCountry(guessedCountry);
        setDescription(resultText.trim());
      } catch (e: any) {
        toast({
          title: "Something went wrong",
          description:
            "Could not generate your soul country. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
    // eslint-disable-next-line
  }, []);

  if (!form) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-ocean-light via-blush-light to-honey-light">
      <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col items-center">
        {loading ? (
          <div className="bg-white/90 rounded-2xl shadow-2xl border border-muted px-8 py-16 flex flex-col items-center gap-6 animate-fadeIn">
            <Loader2 className="animate-spin text-lavender-dark mb-4" size={48} />
            <h2 className="text-xl font-playfair font-semibold text-gray-900 text-center">
              Opening the map of your soul...
            </h2>
            <p className="text-gray-600 text-center">
              Listening for the country's call. One moment.
            </p>
          </div>
        ) : (
          <ResultCard country={country} description={description} />
        )}
      </div>
    </div>
  );
};

export default Result;
