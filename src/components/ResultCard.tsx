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
import AmbientBackground from "./AmbientBackground";

type Props = {
  country: string;
  description: string;
};

export const ResultCard: React.FC<Props> = ({ country, description }) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const soulmapRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // New: state for the Soulmap info (in a real quiz, you'd probably get these from form/context)
  const [userName] = useState(""); // You can pull this from quiz state if available
  const quizTitle = "Soul Country Quiz";
  const quote = "You’re in a season of becoming…";
  const date = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Email modal UI state
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  // New parsing for archetype and soul quote for sharing
  // Convention: description[0]=Archetype, description[1]=One-liner
  const lines = description?.split("\n").map(l => l.trim()).filter(Boolean) ?? [];
  const archetype = lines[0] || "";
  const soulQuote = lines[1] || "";

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
          quote,
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

  // Update the teaser for sharing
  const teaser = soulQuote || "My soul found its match…";

  // For this version, you can pass "fitBullets" manually or infer
  // Example: fitBullets for Portugal, otherwise leave empty
  let fitBullets: string[] = [];
  if (country.toLowerCase() === "portugal") {
    fitBullets = [
      "You said you’re seeking peace and spaciousness.",
      "You feel most alive near the ocean or in quiet towns.",
      "You thrive around warm, grounded people.",
    ];
  }

  // Optionally: A subtle CTA button
  const cta = {
    text: "Get My City Matches",
    onClick: () => {
      // For demo, could open a not-yet-implemented modal or alert
      toast({
        title: "Coming soon!",
        description: `We'll send you soulful places to explore in ${country}.`,
        variant: "default"
      });
    }
  };

  // Updated: always ensure heading shows valid country
  const safeCountry = country || "Your Country";

  return (
    <div className="relative w-full">
      {/* Ambient background visual */}
      <AmbientBackground />
      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl border border-blush-peach px-8 py-14 flex flex-col items-center gap-6 animate-fadeIn">
        {/* Soul Country Hero Output (with new poetic structure) */}
        <SoulCountryResult
          country={safeCountry}
          description={description}
          cta={cta}
        />

        {/* --- NEW: Social Sharing Buttons --- */}
        <ShareButtons country={country} teaser={teaser} />

        {/* --- Shareable Story Card --- */}
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
            description={archetype}
            soulQuote={soulQuote}
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

        {/* SOULMAP UTILITIES SECTION */}
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
          onClick={handleFindAnother}
          size="lg"
          type="button"
        >
          Find Another Country
        </Button>

        {/* Email Modal */}
        <EmailModal
          open={emailModalOpen}
          onClose={() => setEmailModalOpen(false)}
          onSend={handleSendEmail}
          sending={sendingEmail}
        />
      </div>
    </div>
  );
};

// The file is >200 lines. Consider refactoring this component into modular parts for better maintainability.
