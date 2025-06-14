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
  // New for poetic identity
  const [identity, setIdentity] = useState<string | undefined>("");
  const [traits, setTraits] = useState<string | undefined>("");
  const [quote, setQuote] = useState<string | undefined>("");
  const form = location.state;
  const fromJournal = form?.fromJournal;

  useEffect(() => {
    if (!form) {
      navigate("/quiz");
      return;
    }

    if (fromJournal) {
      setCountry(form.country || "Your Country");
      setDescription(form.description);
      // fallback: skip poetic identity if missing from journal
      setIdentity(form.identity || "");
      setTraits(form.traits || "");
      setQuote(form.quote || "");
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

          if (!res.ok) {
            let errorMsg = "Edge function error.";
            let details = "";
            try {
              const err = await res.json();
              errorMsg = err?.error || errorMsg;
              details = err?.details || "";
              console.error("[Soul Country Function Error]", errorMsg, details);
            } catch {
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
          setCountry(data.country || "Your Country");
          setDescription(data.description);
          setIdentity(data.identity || "");
          setTraits(data.traits || "");
          setQuote(data.quote || "");

          // Save to Soulmap Journal (localStorage)
          const entry = {
            id: Date.now().toString(),
            title: form.quizTitle || "Soul Country Quiz",
            country: data.country,
            description: data.description,
            identity: data.identity,
            traits: data.traits,
            quote: data.quote,
            date: new Date().toISOString(),
          };
          saveSoulmap(entry);

          // Log quiz submission to Supabase
          logQuizSubmission({
            quizType: "soul_country",
            quizTitle: form.quizTitle || "Soul Country Quiz",
            resultMain: data.country,
            resultDescription: data.description,
            rawAnswers: form,
          });
        } catch (e: any) {
          const msg = e?.message || "Could not generate your soul country. Please try again later.";
          toast({
            title: "Something went wrong",
            description: msg,
            variant: "destructive"
          });
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
          <ResultCard
            country={country || "Your Country"}
            description={description}
            identity={identity}
            traits={traits}
            quote={quote}
          />
        )}
      </div>
    </div>
  );
};
export default Result;
