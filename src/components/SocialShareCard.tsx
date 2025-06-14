
import React from "react";

type Props = {
  country: string;
  description: string; // Use as archetype title for sharing
  soulQuote?: string;  // Add soul quote for sharing
};

const SocialShareCard = React.forwardRef<HTMLDivElement, Props>(({
  country,
  description,
  soulQuote,
}, ref) => {
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="w-[600px] h-[600px] flex flex-col justify-center items-center bg-gradient-to-br from-blush-light via-lavender-light to-honey-light rounded-3xl border-4 border-honey-dark shadow-2xl overflow-hidden relative"
      style={{
        fontFamily: "'Playfair Display', serif",
        padding: "36px",
      }}
    >
      <h2 className="text-[2.7rem] font-playfair text-honey-dark font-bold mb-7 text-center leading-snug drop-shadow-lg">
        {country}
      </h2>
      <div className="flex flex-col items-center bg-white/95 rounded-xl px-6 py-8 w-full">
        {/* Archetype */}
        <div className="text-lg md:text-xl font-semibold text-blush-dark text-center mb-2 font-playfair">
          {description}
        </div>
        {/* Soul quote */}
        {soulQuote && (
          <div className="text-xl italic font-playfair text-ocean-dark mb-3 text-center leading-snug">
            “{soulQuote}”
          </div>
        )}
      </div>
      <span className="absolute bottom-6 left-0 right-0 text-center text-[1rem] text-gray-400 font-medium" style={{ letterSpacing: "0.025em" }}>
        lifewithoutborders.app
      </span>
    </div>
  );
});

SocialShareCard.displayName = "SocialShareCard";

export default SocialShareCard;
