
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SoulfulToolCard, { SoulfulTool } from "@/components/SoulfulToolCard";
import { Button } from "@/components/ui/button";

const fetchTools = async (): Promise<SoulfulTool[]> => {
  const { data, error } = await supabase
    .from("soulful_tools")
    .select("id, name, logo_url, category, short_description, offer_available, offer_text, affiliate_link")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

function uniqueCategories(tools: SoulfulTool[]): string[] {
  const set = new Set<string>();
  for (const tool of tools) {
    if (tool.category) set.add(tool.category);
  }
  return Array.from(set).sort();
}

const SoulfulToolsDirectory: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [onlyOffers, setOnlyOffers] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["soulful_tools"],
    queryFn: fetchTools,
  });

  const categories = useMemo(() => (data ? uniqueCategories(data) : []), [data]);

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (activeCategory) list = list.filter((t) => t.category === activeCategory);
    if (onlyOffers) list = list.filter((t) => t.offer_available);
    return list;
  }, [data, activeCategory, onlyOffers]);

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-playfair font-bold mb-4">Soulful Travel Tools</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
        Curated travel resources and tools for living and traveling without borders. Use the filters to find tools by category or exclusive offers.
      </p>
      {isLoading && (
        <div className="text-center text-gray-500 py-8">Loading tools…</div>
      )}
      {error && (
        <div className="text-center text-red-500 py-8">Couldn't load travel tools. Please try again later.</div>
      )}
      {(!isLoading && !error) && (
        <>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => setActiveCategory(null)}
              size="sm"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
            <Button
              variant={onlyOffers ? "default" : "outline"}
              onClick={() => setOnlyOffers((v) => !v)}
              size="sm"
              className="ml-4"
            >
              {onlyOffers ? "Showing Offers" : "Only Show Offers"}
            </Button>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No tools found for the selected filter.
            </div>
          ) : (
            <div className="w-full max-w-6xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool) => (
                <SoulfulToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SoulfulToolsDirectory;
