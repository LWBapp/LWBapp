
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import SocialShareCard from "@/components/SocialShareCard";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { useNavigate } from "react-router-dom";

type Props = {
  country: string;
  description: string;
};

export const ResultCard: React.FC<Props> = ({ country, description }) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Download as PNG when user clicks button
  const downloadCard = async () => {
    if (shareCardRef.current) {
      try {
        const dataUrl = await toPng(shareCardRef.current, { cacheBust: true });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "soul-country.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        alert("Failed to generate image. Please try again!");
      }
    }
  };

  const handleFindAnother = () => {
    navigate("/quiz");
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

      {/* Visually Hidden Card for Download */}
      <div
        style={{
          position: "absolute",
          top: "-10000px",
          left: "-10000px",
          width: 600,
          height: 600,
          pointerEvents: "none",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <SocialShareCard
          ref={shareCardRef}
          country={country}
          description={description}
        />
      </div>

      <Button
        onClick={downloadCard}
        className="mt-7 px-6 py-3 bg-ocean-dark text-white rounded-full font-bold shadow-lg text-md hover:bg-ocean transition duration-200 flex items-center gap-2"
        size="lg"
      >
        <Download size={22} />
        Download for Social Sharing
      </Button>
      <div className="text-xs text-gray-400 text-center mt-2">
        Generates a beautiful PNG card for Instagram, Stories, and more.
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full py-3 rounded-full border-honey-dark text-honey-dark font-semibold text-md hover:bg-honey-light transition"
        onClick={handleFindAnother}
        size="lg"
        type="button"
      >
        Find Another Country
      </Button>
    </div>
  );
};
