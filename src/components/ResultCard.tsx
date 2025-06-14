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
  const subheading = "In this land, you find:";

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl border border-blushPeach px-6 py-12 md:px-10 md:py-16 flex flex-col items-center gap-6 animate-fadeIn"
      style={{
        background: "linear-gradient(115deg, #fcd5ce 0%, #f9dcc4 40%, #cdb4db 100%)",
        borderColor: "#fcd5ce"
      }}
    >
      <div className="w-full flex flex-col items-center mb-3">
        <div className="text-xl md:text-2xl font-playfair font-bold text-soulPurple text-center mb-1 tracking-tight"
          style={{ color: "#7f4edb" }}
        >
          Your Soul Country:
        </div>
        <div className="text-3xl md:text-5xl font-playfair font-bold italic text-deepCharcoal text-center mb-3"
          style={{ color: "#2b2b2b", textShadow: "0 1px 0 #b191f0" }}
        >
          {country}
        </div>
        <div className="text-lg text-soulPurple font-semibold text-center mb-1"
          style={{ color: "#7f4edb" }}
        >
          {subheading}
        </div>
        <div className="text-base text-charcoalBlack text-center whitespace-pre-line font-medium"
          style={{ color: "#333333" }}
        >
          {description}
        </div>
      </div>

      {/* Social Sharing Buttons */}
      <ShareButtons country={country} teaser={teaser} />

      {/* Visually Hidden Share Card (no brand changes needed) */}
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
        <div className="text-lg font-playfair text-soulPurple font-bold mb-3 flex items-center gap-2"
          style={{ color: "#7f4edb" }}
        >
          <span role="img" aria-label="note">📝</span> Keep Your Soulmap
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-full font-bold shadow transition flex items-center gap-2 justify-center"
            style={{
              background: "#7f4edb",
              color: "#fff"
            }}
            size="lg"
          >
            <Download size={18} /> Download as PDF
          </Button>
          <Button
            onClick={() => setEmailModalOpen(true)}
            className="px-4 py-2 rounded-full font-bold shadow transition flex items-center gap-2 justify-center"
            style={{
              background: "#ffb4a2",
              color: "#2b2b2b"
            }}
            size="lg"
          >
            <Mail size={18} /> Email Me This Result
          </Button>
        </div>
      </div>

      <div className="text-xs text-smokySlate text-center mt-2"
        style={{ color: "#5e5e5e" }}>
        Download or email yourself your soulmap as a beautiful keepsake.
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full py-3 rounded-full border-soulPurple font-semibold text-md transition"
        style={{
          borderColor: "#7f4edb",
          color: "#7f4edb"
        }}
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

export default ResultCard;
