import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultCard } from "@/components/ResultCard";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { saveSoulmap } from "@/utils/soulmapStorage";
import { logQuizSubmission } from "@/utils/logQuizSubmission";

// Supabase Edge Function URL
const EDGE_FUNCTION_URL = "https://qnrnhncmfhcsktkhekzx.supabase.co/functions/v1/generate-soul-country";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucm5obmNtZmhjc2t0a2hla3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTQ3NTksImV4cCI6MjA2NTQ3MDc1OX0.wutKw3m4VzwChl09M4tgCvhPMvbv9BN-hhy6l05AXpU";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const form = location.state;
  const fromJournal = form?.fromJournal;

  useEffect(() => {
    if (!form) {
      navigate("/quiz");
      return;
    }

    if (fromJournal) {
      setCountry(form.country);
      setDescription(form.description);
      setLoading(false);
    } else {
      const fetchResult = async () => {
        setLoading(true);
        try {
          const res = await fetch(EDGE_FUNCTION_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": SUPABASE_ANON_KEY,
              "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ form }),
          });

          // If there's an error, try to show the exact message from the function
          if (!res.ok) {
            let errorMsg = "Edge function error.";
            let details = "";
            try {
              const err = await res.json();
              errorMsg = err?.error || errorMsg;
              details = err?.details || "";
              // Log response for further debugging
              console.error("[Soul Country Function Error]", errorMsg, details);
            } catch {
              // fallback
              errorMsg = res.statusText;
            }
            toast({
              title: "Something went wrong",
              description: `${errorMsg} ${details}`,
              variant: "destructive",
            });
            setLoading(false);
            return;
          }
          const data = await res.json();
          setCountry(data.country);
          setDescription(data.description);

          // Save to Soulmap Journal (localStorage)
          const entry = {
            id: Date.now().toString(),
            title: form.quizTitle || "Soul Country Quiz",
            country: data.country,
            description: data.description,
            date: new Date().toISOString(),
          };
          saveSoulmap(entry);

          // --------- Log quiz submission to Supabase ---------
          logQuizSubmission({
            quizType: "soul_country",
            quizTitle: form.quizTitle || "Soul Country Quiz",
            resultMain: data.country,
            resultDescription: data.description,
            rawAnswers: form, // store full form submission as JSON
            // Optionally: pass email/info if you know it (currently none)
          });
        } catch (e: any) {
          // Surface network or code errors
          const msg = e?.message || "Could not generate your soul country. Please try again later.";
          toast({
            title: "Something went wrong",
            description: msg,
            variant: "destructive"
          });
          // Log for debugging
          console.error("[Soul Country Fetch Exception]", e);
        } finally {
          setLoading(false);
        }
      };

      fetchResult();
    }
    // eslint-disable-next-line
  }, []);

  if (!form) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lwb-primary-gradient">
      <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col items-center">
        {loading ? (
          <div className="bg-white/90 rounded-2xl shadow-2xl border border-blush-peach px-8 py-16 flex flex-col items-center gap-6 animate-fadeIn">
            <Loader2 className="animate-spin text-soul-purple mb-4" size={48} />
            <h2 className="text-xl font-playfair font-semibold text-charcoal-line text-center">
              Opening the map of your soul...
            </h2>
            <p className="text-charcoal-soft text-center">
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
