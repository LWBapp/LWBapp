
import React, { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  sending: boolean;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  open,
  onClose,
  onSend,
  sending,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onSend(email);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
        aria-modal="true"
      >
        <div className="bg-white rounded-xl shadow-xl p-8 w-[360px]">
          <h3 className="text-lg font-bold mb-2 text-ocean-dark">Email Me This Result</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending}
            autoFocus
          />
          {error && <div className="text-red-500 text-xs mb-1">{error}</div>}
          <div className="flex gap-2 mt-3">
            <Button
              className="flex-1"
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={sending}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
