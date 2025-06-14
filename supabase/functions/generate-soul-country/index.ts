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

    // Updated prompt to include a poetic identity section
    const prompt = `Given the quiz answers below, recommend ONE world country as a person's "soul country."
Always format your response exactly like this, on separate lines, no extra words or explanations:

<Poetic Identity Title, e.g., "You are The Soft Wanderer">
<Traits — 2–3 adjectives or identity phrases, comma-separated, e.g., "gentle, imaginative, quietly resilient">
<Encapsulating quote or micro-manifesto, in quotes, e.g., "You seek stillness, create beauty, and bloom in quiet chaos.">

<Country Name>
<Short, vivid subheading of 1-2 lines.>
<Paragraph 1 describing why this country fits them (simple, easy to read).>
<Paragraph 2 (optional, more details, still clear and concrete).>
<Paragraph 3 (optional, only if truly useful).>

Guidelines:
- Identity and quote should be creative but easy to understand (not abstract or generic).
- Poetic lines first, then a blank line, then the structured country summary as before.
- Do NOT merge or combine these lines. Each is a separate line.
- The final format must ALWAYS be:
Poetic Identity
Traits (comma separated)
"Quote or motto"
<blank line>
Country Name
<blank line>
Subheading
<blank line>
Paragraph(s)
Sample:

You are The Soft Wanderer
gentle, imaginative, quietly resilient
"You seek stillness, create beauty, and bloom in quiet chaos."

Portugal

A coastal sanctuary where gentleness meets color.

Portugal soothes your spirit with pastel seaside villages and the rhythm of the ocean. If you crave room to dream, moments of beauty in daily life, and kindhearted connections, this is your country's embrace.

Find yourself walking quiet streets, painting sunrise memories, and growing in the hush between waves.

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
`You are a soulful-but-clear travel personality expert.
- ALWAYS output result in this EXACT order, SEPARATE LINES:
  1. Identity title (e.g., 'You are The Soft Wanderer')
  2. 2–3 adjectives/traits (comma separated)
  3. A single-quote-in-quotes line ('"..."')
  4. Blank line
  5. Country name (standalone)
  6. Blank line
  7. Subheading (summary, not merged)
  8. Blank line
  9+. Paragraph(s): short, inviting, clear
Never add extra merging, combining, or extra words! Make it easy to parse programmatically.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 700,
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

    // Parse by lines: [identity, traits, quote, blank, country, blank, subheading, blank, paragraphs...]
    const lines = resultText.split("\n").map(l => l.trim());
    const identity = lines[0] || "";
    const traits = lines[1] || "";
    const quote = (lines[2] || "").replace(/^"|"$/g, ""); // remove extra quotes
    // Find index of first blank line after traits + quote (should be line 3 is blank)
    const firstBlankIdx = lines.findIndex((l, i) => i > 2 && l === "");
    // Country, subheading, body after first blank line
    let country = "";
    let subheading = "";
    let body = "";
    if (firstBlankIdx > -1) {
      country = lines[firstBlankIdx + 1] || "";
      // subheading is after next blank line (should be two blank lines after country)
      const idx2 = lines.findIndex((l, i) => i > firstBlankIdx + 1 && l === "");
      subheading = lines[idx2 + 1] || "";
      // paragraphs start after next blank
      const idx3 = lines.findIndex((l, i) => i > idx2 + 1 && l === "");
      body = lines.slice(idx3 + 1).join("\n").trim();
    }

    return new Response(
      JSON.stringify({
        country,
        description: [country, "", subheading, "", body].join("\n").trim(),
        identity,
        traits,
        quote,
      }),
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
