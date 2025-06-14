
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

    // Compose prompt with very explicit output template and stricter style
    const prompt = `Given the quiz answers below, recommend ONE world country as a person's "soul country." 
Always format your response exactly like this (on separate lines):

<Country Name>
<Short, vivid subheading of 1-2 lines.>
<Paragraph 1 describing why this country fits them (simple, easy to read).>
<Paragraph 2 (optional, more details, still clear and concrete).>
<Paragraph 3 (optional, only if truly useful).>

Make sure the COUNTRY NAME is on its own first line as a heading (no punctuation or extra words). 
The SUBHEADING should be inviting, evocative, but concise — do NOT copy or combine with the country line.
Keep the description practical, upbeat, and easy to read (not poetic, not abstract, not repetitive).
Use short paragraphs, avoid repeating the country name, and avoid any awkward merging of heading and subheading.
Write as if making a friendly, concrete travel recommendation to a curious reader.

If any answers are missing, use your best intuition.

Sample format:
---
Italy

A sun-drenched haven of timeless beauty and comfort.

Italy offers gentle warmth, vibrant cities, and a landscape that soothes the senses. If you crave a slower pace, café culture, and the inspiring blend of history and modern joy, this country is ready to welcome your spirit.

Find comfort in coastal towns, rolling vines, or the bustle of ancient streets. Whatever your emotional season, Italy’s caring energy invites you to rest, savor, and embrace new possibilities.
---

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
            content:
`You are a soulful-but-clear travel expert. Your job is:
- Always output exactly this structure:
  1. Country Name (first line only)
  2. Blank line.
  3. Subheading (one or two simple, inviting lines, NOT merged with country name)
  4. Blank line.
  5. 1–3 short, friendly, concrete paragraphs with vivid but clear reasons.
- The format must always be:
CountryName
<blank line>
<subheading>
<blank line>
<paragraphs>
- The country name should NOT be blended into the subheading. Never combine these or repeat words.
- Write for easy reading and sharing.
- Avoid cliches, over-poetic language, or run-on sentences.
- Use concrete details and an inviting, energetic but clear style.
- Never prepend, append, or merge the country name except as a separate heading.
- No unnecessary repetition.
`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.75,
      }),
    });

    if (!openAIRes.ok) {
      const text = await openAIRes.text();
      console.error("OpenAI Error", openAIRes.status, text);
      return new Response(JSON.stringify({ error: "OpenAI response error.", details: text }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await openAIRes.json();
    const resultText: string = data.choices?.[0]?.message?.content || "";

    // Heuristic: extract the first line as country, per new template
    // Extract first non-empty, non-HTML tag line as the country name
    const allLines = resultText.split("\n").map(l => l.trim()).filter(l => l);
    let guessedCountry = allLines[0] || "";

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
