
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

/**
 * Expects "description" in the format:
 * Line 1: Archetype (e.g., "You’re The Reflective Visionary.")
 * Line 2: Soul-match one-liner
 * Lines 3+: Vivid 3–5 sentence visualization paragraph
 */
type SoulCountryResultProps = {
  country: string;
  description: string;
  cta?: { text: string; onClick: () => void };
};

export const SoulCountryResult: React.FC<SoulCountryResultProps> = ({
  country,
  description,
  cta,
}) => {
  // Parse format
  // Country must come from prop, NOT description.
  // Split lines for archetype, one-liner, then visualization.
  const lines = description?.split("\n").map(l => l.trim()).filter(Boolean) ?? [];
  const archetype = lines[0] || "—";
  const oneLiner = lines[1] || "";
  const visualization = lines.slice(2).join(" ");

  return (
    <div className="w-full flex flex-col items-center px-2 pt-6 pb-9 bg-gradient-to-br from-blush-peach via-soft-apricot to-lavender-blush rounded-3xl shadow-xl border border-cloud-blue/40 relative max-w-2xl mx-auto overflow-hidden animate-fadeIn" style={{minHeight: 500}}>
      {/* Hero: Country Name */}
      <h1 className="font-playfair text-5xl md:text-6xl font-black text-soul-purple drop-shadow mb-2 mt-2 text-center tracking-tight">
        {country}
      </h1>
      {/* Archetype Subheading */}
      <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-coral-pink mb-4 text-center">
        {archetype}
      </h2>
      {/* Soul-match Oneliner */}
      <div className="text-lg md:text-xl font-serif text-charcoal-soft italic mb-6 text-center max-w-xl">
        {oneLiner}
      </div>
      {/* Vivid Visualization */}
      <div className="text-md md:text-lg font-serif text-charcoal leading-relaxed text-center px-2 mb-8 max-w-prose">
        {visualization}
      </div>
      {/* CTA: Soul Travel Kit */}
      <div className="w-full flex flex-col items-center mt-2">
        <div className="flex items-center gap-2 text-soul-purple font-playfair font-semibold text-xl mb-3">
          <Sparkles className="text-coral-pink" size={22} />
          Your Soul Travel Kit for <span>{country}</span>
        </div>
        <Button
          className="px-7 py-2 bg-cloud-blue text-soul-purple font-bold rounded-full shadow hover:bg-lavender-mist transition text-md"
          onClick={cta ? cta.onClick : () => {
            window.open("https://lifewithoutborders.xyz/tools", "_blank");
          }}
        >
          {cta ? cta.text : "Explore Soulful Tools"}
        </Button>
        <div className="mt-3 text-charcoal-soft text-sm font-serif text-center max-w-xs">
          Essentials for travelers & dreamers: eSIM, global banking, spiritual retreats, visa tips...
        </div>
      </div>
    </div>
  );
};

export default SoulCountryResult;

