
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreatorInviteModalProps {
  open: boolean;
  onClose: () => void;
}

const TARGET_EMAIL = "anca.n.bujor@gmail.com";

const CreatorInviteModal: React.FC<CreatorInviteModalProps> = ({
  open,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    setSuccess(false);
    // For now, we mock the submission. Replace with an API call to your backend to send email.
    try {
      // await fetch("/api/send-creator-invite", { ... })
      // Simulate delay
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess(true);
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  // Reset form on modal close
  React.useEffect(() => {
    if (!open) {
      setEmail("");
      setMessage("");
      setError("");
      setSuccess(false);
      setSending(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl p-7 w-[380px]">
        <DialogHeader className="mb-3">
          <DialogTitle>Become a Soul Quiz Creator</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div>
            <p className="mb-3 text-sm text-charcoal-soft">
              Submit your details to start building your own Soul Country Map quiz. We’ll reach out at <span className="font-semibold text-soul-purple">{TARGET_EMAIL}</span>.
            </p>
            {success ? (
              <div className="text-green-700 border border-green-200 bg-green-50 rounded-md p-3 mb-3 text-center">
                Thank you! Your interest has been sent. We’ll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={sending}
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Optional message or idea"
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 resize-none"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={sending}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-xs -mt-2">{error}</div>
                )}
                <div className="flex gap-2 mt-2">
                  <Button
                    className="flex-1"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Submit"}
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="flex-1"
                      type="button"
                      disabled={sending}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </form>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorInviteModal;
