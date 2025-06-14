
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const fetchToolDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("soulful_tools")
    .select(
      "id, name, logo_url, category, short_description, full_description, offer_available, offer_text, affiliate_link, extra_notes"
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const SoulfulToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: tool,
    isLoading,
    error
  } = useQuery({
    queryKey: ["soulful_tool_detail", id],
    queryFn: () => fetchToolDetail(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Loading…</div>;
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <div className="text-red-500">Could not load tool details.</div>
        <Button onClick={() => navigate("/tools")} className="mt-4">
          Back to Tools
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white/85 rounded-xl border p-8 shadow flex flex-col items-center">
        <Button asChild variant="ghost" size="sm" className="self-start mb-4">
          <Link to="/tools">
            <ArrowLeft className="mr-1 inline" size={18} /> Back
          </Link>
        </Button>
        {tool.logo_url && (
          <img
            src={tool.logo_url}
            alt={`${tool.name} logo`}
            className="h-16 w-16 mb-3 rounded-lg object-contain bg-gray-100 border"
          />
        )}
        <h1 className="text-2xl font-playfair font-bold mb-2">{tool.name}</h1>
        {tool.category && (
          <span className="text-xs bg-blush-light font-semibold px-2 py-1 rounded mb-2">{tool.category}</span>
        )}
        <div className="text-base text-gray-700 mb-3 text-center">{tool.short_description}</div>
        <div className="prose prose-sm prose-p:my-1 max-w-none text-gray-800 text-left w-full mb-3">
          {tool.full_description || "(No further information provided.)"}
        </div>
        {tool.offer_available && tool.offer_text && (
          <div className="mb-3">
            <span className="inline-block bg-pink-200/60 text-pink-700 text-xs rounded px-2 py-1 font-semibold">
              {tool.offer_text}
            </span>
          </div>
        )}
        {tool.affiliate_link && (
          <Button asChild className="w-full my-2" variant="secondary" size="lg">
            <a href={tool.affiliate_link} target="_blank" rel="noopener noreferrer">
              Visit & Use {tool.name}
            </a>
          </Button>
        )}
        {tool.extra_notes && (
          <div className="text-xs mt-3 text-gray-500 italic text-center max-w-lg">{tool.extra_notes}</div>
        )}
      </div>
    </div>
  );
};

export default SoulfulToolDetail;
