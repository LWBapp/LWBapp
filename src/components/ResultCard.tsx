import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import SocialShareCard from "@/components/SocialShareCard";
import { Download, Mail } from "lucide-react";
import { toPng } from "html-to-image";
import { useNavigate } from "react-router-dom";
import { SoulmapCard } from "./SoulmapCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { EmailModal } from "./EmailModal";
import { toast } from "@/hooks/use-toast";
import ShareButtons from "@/components/ShareButtons";
import SoulCountryResult from "./SoulCountryResult";

// Helper mapping for country → gradient/animation
const countryBgMap: Record<string, string> = {
  portugal: "bg-gradient-to-br from-[#fcd5ce] via-[#b191f0] to-[#2b2b2b] animate-fadeIn",
  japan: "bg-gradient-to-br from-[#e6e8f9] via-[#fae1dd] to-[#afdedc] animate-fadeIn",
  india: "bg-gradient-to-br from-[#ffe7b7] via-[#ffb997] to-[#b191f0] animate-fadeIn",
  iceland: "bg-gradient-to-br from-[#cae9ff] via-[#ddefff] to-[#446fa6] animate-fadeIn",
  brazil: "bg-gradient-to-br from-[#ffecc7] via-[#80d9ce] to-[#276749] animate-fadeIn",
};

function getBgClass(country: string) {
  if (!country) return "bg-lwb-primary-gradient";
  const key = country.toLowerCase().replace(/\s/g, "");
  return countryBgMap[key] || "bg-lwb-primary-gradient";
}

type Props = {
  country: string;
  description: string;
  identity?: string; // archetype title
  traits?: string;   // one-liner
  quote?: string;    // poetic paragraph
};

export const ResultCard: React.FC<Props> = ({
  country,
  description,
  identity,
  traits,
  quote,
}) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const soulmapRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // New: state for the Soulmap info (in a real quiz, you'd probably get these from form/context)
  const [userName] = useState(""); // You can pull this from quiz state if available
  const quizTitle = "Soul Country Quiz";
  const quoteText = "You’re in a season of becoming…";
  const date = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Email modal UI state
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Download Soulmap as PDF
  const handleDownloadPDF = async () => {
    if (!soulmapRef.current) return;
    try {
      const canvas = await html2canvas(soulmapRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [480, 640],
      });
      pdf.addImage(imgData, "PNG", 0, 0, 480, 640);
      pdf.save("soulmap.pdf");
    } catch (e) {
      toast({
        title: "PDF Error",
        description: "Could not generate PDF. Try again.",
        variant: "destructive"
      });
    }
  };

  // Email Soulmap PDF
  const handleSendEmail = async (email: string) => {
    if (!soulmapRef.current) return;
    setSendingEmail(true);
    try {
      const canvas = await html2canvas(soulmapRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      // Send to edge function as base64 PNG
      const response = await fetch("https://qnrnhncmfhcsktkhekzx.supabase.co/functions/v1/email-soulmap-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          image: imgData,
          name: userName,
          quizTitle,
          country,
          description,
          date,
          quote: quoteText,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send email.");
      }
      toast({
        title: "Check your inbox!",
        description: "Your soulmap PDF has been emailed.",
        variant: "default"
      });
      setEmailModalOpen(false);
    } catch (e: any) {
      toast({
        title: "Email Error",
        description: e.message || "Could not send email.",
        variant: "destructive"
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const handleFindAnother = () => {
    navigate("/quiz");
  };

  const teaser = "Where foggy cliffs meet quiet healing…";
  let fitBullets: string[] = [];
  if (country.toLowerCase() === "portugal") {
    fitBullets = [
      "You said you’re seeking peace and spaciousness.",
      "You feel most alive near the ocean or in quiet towns.",
      "You thrive around warm, grounded people.",
    ];
  }
  const cta = {
    text: "Get My City Matches",
    onClick: () => {
      toast({
        title: "Coming soon!",
        description: `We'll send you soulful places to explore in ${country}.`,
        variant: "default"
      });
    }
  };

  const safeCountry = country || "Your Country";

  // Instagram Story Card info
  // Let the SocialShareCard receive archetype and quote for display.
  const archetype = identity ?? "";
  const vibeQuote = quote ?? "";

  // --- Begin main poetic layout ---
  return (
    <div className={`relative min-w-full md:min-w-0 bg-white/80 rounded-2xl shadow-2xl border border-blush-peach px-0 md:px-8 py-14 flex flex-col items-center gap-6 animate-fadeIn overflow-hidden`}>
      {/* Animated/subtle gradient background */}
      <div
        className={`absolute inset-0 -z-10 ${getBgClass(country)} opacity-60 animate-fadeIn`}
        aria-hidden="true"
      />

      {/* Centerpiece: Archetype Title */}
      {identity && (
        <div className="w-full text-4xl md:text-5xl font-playfair font-extrabold text-soul-purple drop-shadow mb-2 text-center animate-fadeIn">
          {identity}
        </div>
      )}

      {/* One-liner Soul Match */}
      {traits && (
        <div className="text-lg md:text-2xl text-peach-puff font-semibold mb-3 text-center leading-snug animate-fadeIn">
          {traits}
        </div>
      )}

      {/* Vivid Sensory Visualization Paragraph (quote or poetically-structured description) */}
      {(quote || description) && (
        <div className="max-w-xl text-lg md:text-xl text-charcoal font-serif text-center mt-2 mb-4 whitespace-pre-line animate-fadeIn">
          {quote && (
            <span className="italic block mb-2">“{quote}”</span>
          )}
          {/* If the OpenAI data has newlines, keep them. Otherwise, show a poetic block. */}
          {description && (
            <span>{description}</span>
          )}
        </div>
      )}

      {/* -- Instagram Story Style shareable card -- */}
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
          country={safeCountry}
          description={vibeQuote}
          archetype={archetype}
        />
      </div>

      {/* Social share section */}
      <ShareButtons country={country} teaser={vibeQuote || traits || "My soul country revealed..."} />

      {/* Soul Travel Kit CTA */}
      <div className="mt-10 w-full flex flex-col items-center animate-fadeIn">
        <div className="text-xl md:text-2xl font-playfair font-bold text-soul-purple mb-3 flex items-center gap-2">
          <span role="img" aria-label="suitcase">🧳</span>
          Your Soul Travel Kit for <span className="ml-1 text-[1.2em] font-extrabold text-lavender-mist">{safeCountry}</span>
        </div>
        <div className="text-base md:text-lg text-charcoal-soft font-serif mb-4 max-w-lg text-center">
          Gather essential tools, visa tips, and rituals to begin your journey.
          {/* Can expand this text dynamically based on country in the future */}
        </div>
        <Button
          onClick={() =>
            window.open("https://nomadkit.co/country/" + encodeURIComponent(safeCountry), "_blank")
          }
          className="px-6 py-3 rounded-full bg-soul-purple text-white hover:bg-lavender-mist shadow font-semibold text-lg animate-scaleIn"
          size="lg"
          type="button"
        >
          Explore Soul Travel Kit
        </Button>
      </div>

      {/* Findings, download, or email options */}
      <div className="mt-10 w-full flex flex-col items-center">
        <div className="text-sm text-charcoal-soft text-center mb-2 animate-fadeIn">
          Download or email yourself your soulmap as a beautiful keepsake.
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-cloud-blue text-charcoal-line rounded-full font-bold shadow transition flex items-center gap-2 justify-center hover:bg-peach-puff"
            size="lg"
          >
            <Download size={18} /> Download as PDF
          </Button>
          <Button
            onClick={() => setEmailModalOpen(true)}
            className="px-4 py-2 bg-soul-purple text-white rounded-full font-bold shadow transition flex items-center gap-2 justify-center hover:bg-lavender-mist"
            size="lg"
          >
            <Mail size={18} /> Email Me This Result
          </Button>
        </div>
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full py-3 rounded-full border-soul-purple text-soul-purple font-semibold text-md hover:bg-peach-puff transition"
        onClick={handleFindAnother}
        size="lg"
        type="button"
      >
        Find Another Country
      </Button>

      {/* Visually Hidden Soulmap Card for PDF */}
      <div
        style={{
          position: "absolute",
          top: "-20000px",
          left: "-20000px",
          zIndex: -1,
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <SoulmapCard
          ref={soulmapRef}
          name={userName}
          quizTitle={quizTitle}
          country={country}
          description={description}
          date={date}
          quote={quoteText}
        />
      </div>

      {/* Email Modal */}
      <EmailModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSend={handleSendEmail}
        sending={sendingEmail}
      />
    </div>
  );
};

// The file is >200 lines. Consider refactoring this component into modular parts for better maintainability.
export default ResultCard;
