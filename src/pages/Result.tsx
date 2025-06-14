import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultCard } from "@/components/ResultCard";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Supabase Edge Function URL
const EDGE_FUNCTION_URL = "https://qnrnhncmfhcsktkhekzx.supabase.co/functions/v1/generate-soul-country";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const form = location.state;

  useEffect(() => {
    if (!form) {
      navigate("/quiz");
      return;
    }

    const fetchResult = async () => {
      setLoading(true);
      try {
        const res = await fetch(EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ form }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.error || "Edge function error.");
        }
        const data = await res.json();
        setCountry(data.country);
        setDescription(data.description);
      } catch (e: any) {
        toast({
          title: "Something went wrong",
          description: "Could not generate your soul country. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
    // eslint-disable-next-line
  }, []);

  if (!form) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-ocean-light via-blush-light to-honey-light">
      <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col items-center">
        {loading ? (
          <div className="bg-white/90 rounded-2xl shadow-2xl border border-muted px-8 py-16 flex flex-col items-center gap-6 animate-fadeIn">
            <Loader2 className="animate-spin text-lavender-dark mb-4" size={48} />
            <h2 className="text-xl font-playfair font-semibold text-gray-900 text-center">
              Opening the map of your soul...
            </h2>
            <p className="text-gray-600 text-center">
              Listening for the country's call. One moment.
            </p>
          </div>
        ) : (
          <ResultCard country={country} description={description} />
        )}
      </div>
    </div>
  );
};

export default Result;
