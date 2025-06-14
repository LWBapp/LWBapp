
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { form } = await req.json();

    // Compose prompt
    const prompt = `You are a soulful travel guide who maps people's emotional seasons to the energy of countries. Your answers are poetic, intuitive, and emotionally resonant. Based on the following inputs: Craving: ${form.craving}, Feelings: ${form.feelings?.join(", ")}, Imagery: ${form.scenes?.join(", ")}, Emotional Season: ${form.emotional_season}, Place Type: ${form.place_type}, suggest one country that matches their emotional season and describe why, using poetic tone.`;

    const openAIRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
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
        temperature: 0.82,
      }),
    });

    if (!openAIRes.ok) {
      const text = await openAIRes.text();
      console.error("OpenAI Error", openAIRes.status, text);
      return new Response(JSON.stringify({ error: "OpenAI response error.", details: text }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await openAIRes.json();
    const resultText: string = data.choices?.[0]?.message?.content || "";

    // Heuristics: extract first mentioned country
    const match = resultText.match(/([A-Z][A-Za-z\s]+)[\:\,]/);
    let guessedCountry = "";
    if (match) {
      guessedCountry = match[1].trim();
    } else {
      // fallback: first sentence's proper noun
      guessedCountry = resultText.split(".")[0].match(/[A-Z][a-z]+/g)?.[0] ?? "";
    }

    return new Response(
      JSON.stringify({ country: guessedCountry, description: resultText.trim() }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Edge function error", e);
    return new Response(JSON.stringify({ error: "Function error.", details: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
