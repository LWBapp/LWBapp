
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

    // Compose prompt - updated to be easier to read and follow the new structure
    const prompt = `You are a seasoned, soulful travel guide. Given the following quiz answers, suggest one (and only one) world country for the person's "soul country." 

Format your response like this, on separate lines:

Country Name

A creative, vivid, and inviting 2-3 paragraph explanation of why this country matches their energy right now. Write clearly, with structure and fresh details—more uplifting, less poetic—so it's really easy for someone to read, share, and feel inspired. Keep sentences concise and use simple language.

Here are the answers: 
Craving: ${form.craving}
Feelings: ${form.feelings?.join(", ")}
Imagery: ${form.scenes?.join(", ")}
Emotional Season: ${form.emotional_season}
Place Type: ${form.place_type}
`;

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
            content: "Your job is to recommend a single country (as a heading on the first line), then provide a clear, organized, uplifting, and creative explanation (2-3 paragraphs) for your choice. Your explanations are easy to read and upbeat, rather than overly poetic or abstract. Always start with the country name as the first line title, followed by a blank line, then the rest."
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
