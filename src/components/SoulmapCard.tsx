
import React from "react";

interface SoulmapCardProps {
  name?: string;
  quizTitle: string;
  country: string;
  description: string;
  date: string;
  quote?: string;
}

export const SoulmapCard = React.forwardRef<HTMLDivElement, SoulmapCardProps>(
  ({ name, quizTitle, country, description, date, quote }, ref) => (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="w-[480px] min-h-[600px] flex flex-col items-center bg-gradient-to-br from-blush-light via-lavender-light to-honey-light rounded-2xl border-4 border-honey-dark shadow-2xl overflow-hidden p-8 mx-auto"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <h2 className="text-3xl font-playfair text-honey-dark font-bold mb-2 text-center">
        Life Without Borders
      </h2>
      <div className="text-md text-ocean-dark mb-2">{quizTitle}</div>
      {name && (
        <div className="text-lg text-blush-dark font-semibold mb-2">
          For: {name}
        </div>
      )}
      <div className="w-full bg-white/90 rounded-xl px-6 py-6 mb-3">
        <div className="text-lg font-playfair italic font-bold text-ocean-dark text-center mb-2">
          {country}
        </div>
        <p className="text-base text-gray-800 text-center whitespace-pre-line mb-1">
          {description}
        </p>
        {quote && (
          <p className="text-base text-gray-500 text-center italic mt-3">{quote}</p>
        )}
      </div>
      <div className="mt-auto w-full text-center text-sm text-gray-400 font-medium">
        <span>{date}</span>
        <div className="mt-2">lifewithoutborders.app</div>
      </div>
    </div>
  )
);

SoulmapCard.displayName = "SoulmapCard";
