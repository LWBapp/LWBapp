
import React from "react";

type Props = {
  country: string;
  description: string;
};

const SocialShareCard = React.forwardRef<HTMLDivElement, Props>(({
  country,
  description,
}, ref) => {
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="w-[600px] h-[600px] flex flex-col justify-center items-center bg-gradient-to-br from-blush-light via-lavender-light to-honey-light rounded-3xl border-4 border-honey-dark shadow-2xl overflow-hidden relative"
      style={{
        fontFamily: "'Playfair Display', serif",
        padding: "32px",
      }}
    >
      <h2 className="text-[2.2rem] font-playfair text-honey-dark font-bold mb-8 text-center leading-snug drop-shadow-lg">
        Life Without Borders
      </h2>
      <div className="flex flex-col items-center bg-white/90 rounded-xl px-8 py-8 w-full">
        <div className="text-xl md:text-2xl font-semibold text-blush-dark text-center mb-2">
          Your Soul Country
        </div>
        <div className="text-[2.6rem] leading-tight font-playfair italic font-bold text-ocean-dark mb-4 text-center">
          {country}
        </div>
        <div className="w-10 h-1 bg-honey-dark rounded-full mb-5" />
        <p className="text-base text-gray-700 text-center whitespace-pre-line leading-normal mb-2">
          {description}
        </p>
      </div>
      <span className="absolute bottom-6 left-0 right-0 text-center text-[1rem] text-gray-400 font-medium" style={{ letterSpacing: "0.025em" }}>
        lifewithoutborders.app
      </span>
    </div>
  );
});

SocialShareCard.displayName = "SocialShareCard";

export default SocialShareCard;
