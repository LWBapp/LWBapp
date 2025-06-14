import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * SoulCountryResult
 * Props:
 * - country: string (Required)
 * - description: string (OpenAI text, Required)
 * - fitBullets?: string[] (optional list of reasons for "Why This Fits You")
 * - cta?: { text: string; onClick: () => void } (optional)
 */
type SoulCountryResultProps = {
  country: string;
  // The OpenAI text should either already be in the 3-section format, or is split using heuristics below
  description: string;
  fitBullets?: string[];
  cta?: { text: string; onClick: () => void };
};

export const SoulCountryResult: React.FC<SoulCountryResultProps> = ({
  country,
  description,
  fitBullets,
  cta,
}) => {
  // Heuristic: Split sections if not given explicit parts
  // You can refine these splits as needed!
  const [expanded, setExpanded] = useState(false);

  // Helper splitting logic: Assume OpenAI gives country, summary, then rest is description.
  const lines = description?.split("\n").map(l => l.trim()).filter(Boolean) ?? [];
  let heading = country;
  let subheading = "";
  let body = "";

  if (lines.length > 1) {
    // Heuristic: look for "—" or ":" to split after country and summary
    const firstContent = lines[0].replace(/^([A-Za-z\s]+)([—:])?/, "").trim();
    if (firstContent.length > 10 && !country || lines[0].toLowerCase().includes(country.toLowerCase())) {
      subheading = firstContent;
      body = lines.slice(1).join(" ");
    } else {
      subheading = lines[1];
      body = lines.slice(2).join(" ") || lines[0];
    }
  } else {
    body = lines[0] ?? "";
  }

  // If bullets are not provided, optionally infer them from the text (advanced: skipped for now)
  // For now, only use fitBullets if explicitly passed

  return (
    <div className="w-full flex flex-col items-center gap-8">

      {/* --- Country Heading and Subheading --- */}
      <div className="text-4xl md:text-5xl font-playfair font-bold text-soul-purple drop-shadow-sm mb-2 text-center">
        {heading}
      </div>
      {subheading && (
        <div className="text-lg md:text-xl text-peach-puff font-semibold mb-2 text-center leading-snug">
          {subheading}
        </div>
      )}
      {body && (
        <div className="max-w-xl text-base md:text-lg text-charcoal mt-2 text-center md:text-left whitespace-pre-line font-serif">
          {body}
        </div>
      )}
      {/* Why this fits you */}
      {fitBullets && fitBullets.length > 0 && (
        <div className="w-full max-w-md mt-7">
          <button
            className="flex items-center gap-2 text-soul-purple text-base font-semibold hover:underline focus:outline-none"
            aria-expanded={expanded}
            onClick={() => setExpanded((x) => !x)}
            type="button"
          >
            <span role="img" aria-label="why this fits you">🌿</span>
            Why this fits you
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded && (
            <div className="bg-cloud-blue/40 rounded-md mt-2 p-4 animate-fadeIn">
              <ul className="list-disc pl-5 text-charcoal text-sm space-y-1">
                {fitBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* CTA section */}
      {cta && (
        <div className="mt-8 flex flex-col items-center">
          <div className="mb-2 flex items-center gap-2 text-charcoal-soft text-base">
            <span role="img" aria-label="plane">✈️</span>
            Want a deeper guide to <span className="font-bold">{country}</span>?
          </div>
          <Button
            onClick={cta.onClick}
            className="px-6 py-2 rounded-full bg-soul-purple text-white hover:bg-lavender-mist shadow font-semibold"
          >
            {cta.text}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SoulCountryResult;
