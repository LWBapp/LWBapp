
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download, Mail, Share as LucideShare, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { EmailModal } from "@/components/EmailModal";

type QuizResultActionsProps = {
  title: string;
  resultMain: string;
  description: string;
  shareTeaser?: string;
};

const APP_URL = "https://lifewithoutborders.xyz/quiz?ref=share";

const defaultTeaser = "Discover your soul country at Life Without Borders!";

export const QuizResultActions: React.FC<QuizResultActionsProps> = ({
  title,
  resultMain,
  description,
  shareTeaser,
}) => {
  // For image/pdf export
  const cardRef = useRef<HTMLDivElement>(null);

  // Email modal
  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);

  // Social message
  const fullMessage = `${title}: ${resultMain}\n${shareTeaser || defaultTeaser}\n${APP_URL}`;

  // Download PDF (visual screenshot)
  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [480, 480] });
      pdf.addImage(imgData, "PNG", 0, 0, 480, 480);
      pdf.save("quiz-result.pdf");
    } catch (e) {
      toast({
        title: "PDF Error",
        description: "Could not generate PDF. Try again.",
        variant: "destructive"
      });
    }
  };

  // Email PDF (visual screenshot)
  const handleSendEmail = async (email: string) => {
    if (!cardRef.current) return;
    setSending(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      // Email sending logic goes here (example endpoint)
      const response = await fetch("https://qnrnhncmfhcsktkhekzx.supabase.co/functions/v1/email-soulmap-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          image: imgData,
          name: "",
          quizTitle: title,
          country: resultMain,
          description,
          date: new Date().toLocaleDateString(),
        }),
      });
      if (!response.ok) throw new Error("Failed to send email.");
      toast({ title: "Check your inbox!", description: "Result sent.", variant: "default" });
      setModalOpen(false);
    } catch (e: any) {
      toast({ title: "Email Error", description: e.message || "Could not send email.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  // Copy link/message
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);
      toast({ title: "Copied!", description: "Share text copied to clipboard.", variant: "default" });
    } catch {
      toast({ title: "Could not copy.", description: "Try again.", variant: "destructive" });
    }
  };

  // Native share API fallback
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: fullMessage,
        url: APP_URL
      });
      return;
    }
    handleCopy();
  };

  // Visually hidden card for export/email
  return (
    <div className="w-full flex flex-col gap-2 mt-6 items-center">
      {/* visually hidden card */}
      <div
        ref={cardRef}
        style={{
          width: 480,
          minHeight: 340,
          position: "absolute",
          pointerEvents: "none",
          zIndex: -99,
          top: -20000,
          left: -20000,
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <div className="w-[480px] min-h-[340px] flex flex-col items-center bg-gradient-to-br from-blush-light via-lavender-light to-honey-light rounded-2xl border-4 border-honey-dark shadow-2xl overflow-hidden p-8 mx-auto">
          <h2 className="text-2xl font-playfair text-honey-dark font-bold mb-2 text-center">
            {title}
          </h2>
          <div className="text-md text-ocean-dark mb-2 font-semibold">{resultMain}</div>
          <p className="text-base text-gray-800 text-center whitespace-pre-line mb-2">
            {description}
          </p>
          <div className="mt-auto w-full text-center text-sm text-gray-400 font-medium">
            <span>{new Date().toLocaleDateString()}</span>
            <div className="mt-2">lifewithoutborders.app</div>
          </div>
        </div>
      </div>
      {/* Actions row */}
      <div className="flex flex-wrap gap-3 justify-center w-full mb-1">
        <Button variant="outline" onClick={handleShare} className="gap-2 rounded-full" title="Share">
          <LucideShare size={18} />Share
        </Button>
        <Button variant="outline" onClick={handleCopy} className="gap-2 rounded-full" title="Copy">
          <Copy size={18} />Copy
        </Button>
        <Button variant="outline" onClick={handleDownloadPDF} className="gap-2 rounded-full" title="Download">
          <Download size={18} />Download
        </Button>
        <Button variant="outline" onClick={() => setModalOpen(true)} className="gap-2 rounded-full" title="Email me">
          <Mail size={18} />Email Me
        </Button>
      </div>
      <div className="text-xs text-center text-gray-400">
        Download or email your quiz as a keepsake—or share your results!
      </div>
      <EmailModal
        open={modalOpen}
        sending={sending}
        onSend={handleSendEmail}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default QuizResultActions;

