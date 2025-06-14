
import React from "react";
import { Facebook, Twitter, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

// If you want to easily change these later:
const APP_URL = "https://lifewithoutborders.xyz/quiz?ref=share";
// If this should be dynamic, pass as a prop.

type ShareButtonsProps = {
  country: string;
  teaser: string;
};

const shareText = (country: string, teaser: string) =>
  `My Soul Country is ${country} 🌊✨\n${teaser}\n${APP_URL}`;

export const ShareButtons: React.FC<ShareButtonsProps> = ({ country, teaser }) => {
  const message = shareText(country, teaser);

  // X/Twitter
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;

  // Facebook
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(APP_URL)}&quote=${encodeURIComponent(message)}`;
  
  // WhatsApp
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  // Threads (Threads does not have an official share URL; fallback to copying or a link)
  const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      alert("Link copied to clipboard!");
    } catch {
      alert("Could not copy link.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="flex flex-wrap gap-2 mb-2 justify-center">
        <a
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
            size="sm"
            type="button"
          >
            <Facebook size={18} /> Facebook
          </Button>
        </a>
        {/* Threads */}
        <a
          href={threadsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Threads"
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full border-black text-black hover:bg-gray-100"
            size="sm"
            type="button"
          >
            {/* No icon in lucide-react; fallback to emoji. */}
            <span style={{ fontSize: "1.1em" }}>𝕋</span> Threads
          </Button>
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full border-black text-black hover:bg-gray-100"
            size="sm"
            type="button"
          >
            <Twitter size={18} /> X
          </Button>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share via WhatsApp"
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full border-green-600 text-green-600 hover:bg-green-50"
            size="sm"
            type="button"
          >
            <MessageCircle size={18} /> WhatsApp
          </Button>
        </a>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full border-gray-400 text-gray-600 hover:bg-gray-50"
          size="sm"
          type="button"
          onClick={handleCopy}
        >
          <Share size={18} /> Copy Link
        </Button>
      </div>
      <div className="text-center mt-1 text-xs text-gray-400">
        Tag us <span className="font-semibold text-ocean-dark">@_life.without.borders_</span> so we can see where your soul belongs
      </div>
    </div>
  );
};

export default ShareButtons;
