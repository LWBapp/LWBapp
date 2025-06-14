
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import SocialShareCard from "@/components/SocialShareCard";
import { Download, Mail } from "lucide-react";
import { toPng } from "html-to-image";
import { SoulmapCard } from "./SoulmapCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { EmailModal } from "./EmailModal";
import { toast } from "@/hooks/use-toast";
import ShareButtons from "@/components/ShareButtons";
import SoulCountryResult from "./SoulCountryResult";

type Props = {
  country: string;
  description: string;
  archetype: string;
  flavor: string;
  emoji: string;
  onRetake: () => void;
};

const quizTitle = "What Country Matches Your Chaos?";
const quote = "You’re in a season of becoming…";

export const CountryChaosResultCard: React.FC<Props> = ({
  country,
  description,
  archetype,
  flavor,
  emoji,
  onRetake,
}) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const soulmapRef = useRef<HTMLDivElement>(null);

  const [userName] = useState(""); // For future: personalize
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
        variant: "destructive",
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
      // Email edge function endpoint (same as onboarding)
      const response = await fetch(
        "https://qnrnhncmfhcsktkhekzx.supabase.co/functions/v1/email-soulmap-pdf",
        {
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
            quote,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send email.");
      }
      toast({
        title: "Check your inbox!",
        description: "Your soulmap PDF has been emailed.",
        variant: "default",
      });
      setEmailModalOpen(false);
    } catch (e: any) {
      toast({
        title: "Email Error",
        description: e.message || "Could not send email.",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // --- Add this teaser for sharing (optional per quiz, adjust as desired) ---
  const teaser = "Which country matches YOUR beautifully unhinged inner chaos?";

  return (
    <div className="bg-white/95 rounded-2xl shadow-2xl border border-blush-peach px-8 py-14 flex flex-col items-center gap-6 animate-fadeIn">
      {/* Hero Result */}
      <div className="flex flex-col items-center gap-2 pb-2">
        <div className="text-7xl mb-1">{emoji}</div>
        <div className="text-2xl md:text-3xl font-bold font-playfair text-soul-purple">{country}</div>
        <div className="text-lg font-semibold text-pink-700 italic">{archetype}</div>
        <div className="text-base text-charcoal text-center">{description}</div>
        <div className="text-sm text-honey-dark italic">{flavor}</div>
      </div>

      <hr className="w-1/3 border-blush-light my-3" />

      {/* Share Buttons */}
      <ShareButtons country={country} teaser={teaser} />

      {/* Visually Hidden Card for Social Sharing */}
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
          quote={quote}
        />
      </div>

      {/* Utilities Buttons */}
      <div className="mt-7 w-full flex flex-col items-center">
        <div className="text-xl font-playfair text-soul-purple font-bold mb-3 flex items-center gap-2">
          <span role="img" aria-label="note">📝</span> Keep Your Soulmap
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
            type="button"
          >
            <Mail size={18} /> Email Me This Result
          </Button>
        </div>
      </div>
      <div className="text-xs text-charcoal-soft text-center mt-2">
        Download or email yourself your soulmap as a beautiful keepsake.
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full py-3 rounded-full border-soul-purple text-soul-purple font-semibold text-md hover:bg-peach-puff transition"
        onClick={onRetake}
        size="lg"
        type="button"
      >
        Retake Quiz
      </Button>
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

export default CountryChaosResultCard;
