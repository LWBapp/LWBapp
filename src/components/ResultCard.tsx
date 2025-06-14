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

  // --- Add this teaser for sharing (can be customized or maybe made dynamic) ---
  const teaser = "Where foggy cliffs meet quiet healing…";

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

      {/* --- NEW: Social Sharing Buttons --- */}
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

      {/* SOULMAP UTILITIES SECTION */}
      <div className="mt-7 w-full flex flex-col items-center">
        <div className="text-xl font-playfair text-ocean-dark font-bold mb-3 flex items-center gap-2">
          <span role="img" aria-label="note">📝</span> Keep Your Soulmap
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-ocean-dark text-white rounded-full font-bold shadow transition flex items-center gap-2 justify-center"
            size="lg"
          >
            <Download size={18} /> Download as PDF
          </Button>
          <Button
            onClick={() => setEmailModalOpen(true)}
            className="px-4 py-2 bg-honey-dark text-white rounded-full font-bold shadow transition flex items-center gap-2 justify-center"
            size="lg"
          >
            <Mail size={18} /> Email Me This Result
          </Button>
        </div>
      </div>

      <div className="text-xs text-gray-400 text-center mt-2">
        Download or email yourself your soulmap as a beautiful keepsake.
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
