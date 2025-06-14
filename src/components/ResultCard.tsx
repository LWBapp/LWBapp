
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  country: string;
  description: string;
};

export const ResultCard: React.FC<Props> = ({ country, description }) => {
  const downloadCard = () => {
    const element = document.createElement("a");
    const blob = new Blob(
      [
        `Life Without Borders\nSoul Country: ${country}\n\n${description}`
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(blob);
    element.download = "soul-country.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-2xl border border-honey-dark px-8 py-14 flex flex-col items-center gap-6 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-playfair font-bold text-honey-dark mb-3 text-center">
        {country ? (
          <>
            <span className="block">Your Soul Country:</span>
            <span className="italic text-blush-dark font-playfair">{country}</span>
          </>
        ) : (
          <>Your Soul Country</>
        )}
      </h2>
      <p className="text-lg text-gray-700 text-center whitespace-pre-line">{description}</p>
      <Button
        onClick={downloadCard}
        className="mt-7 px-6 py-3 bg-ocean-dark text-white rounded-full font-bold shadow-lg text-md hover:bg-ocean transition duration-200"
        size="lg"
      >
        Download My Soul Country Card
      </Button>
    </div>
  );
};
