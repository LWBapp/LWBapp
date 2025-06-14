import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

  // Reset email field & error on modal close
  React.useEffect(() => {
    if (!open) {
      setEmail("");
      setError("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="rounded-xl p-8 w-[360px]"
      >
        <DialogHeader className="flex flex-row justify-between items-start p-0 m-0">
          <DialogTitle asChild>
            <h3 className="text-lg font-bold text-ocean-dark m-0">Email Me This Result</h3>
          </DialogTitle>
          <DialogClose asChild>
            <button
              className="ml-auto text-gray-400 hover:text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-honey-dark"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              <X size={20} />
            </button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription asChild>
          <div>
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
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={sending}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
