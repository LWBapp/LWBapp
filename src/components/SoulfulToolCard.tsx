
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface SoulfulTool {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  short_description: string | null;
  offer_available: boolean | null;
  offer_text: string | null;
  affiliate_link: string | null;
}

export interface SoulfulToolCardProps {
  tool: SoulfulTool;
}

const SoulfulToolCard: React.FC<SoulfulToolCardProps> = ({ tool }) => {
  return (
    <Card className="flex flex-col h-full justify-between hover:shadow-lg transition">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {tool.logo_url && (
            <img
              src={tool.logo_url}
              alt={`${tool.name} logo`}
              className="h-10 w-10 rounded-lg object-contain bg-gray-100 border"
            />
          )}
          <CardTitle className="text-lg font-playfair">{tool.name}</CardTitle>
        </div>
        <CardDescription className="mt-1">{tool.short_description}</CardDescription>
      </CardHeader>
      {tool.offer_available && tool.offer_text && (
        <CardContent className="py-2">
          <span className="inline-block bg-pink-200/60 text-pink-700 text-xs rounded px-2 py-1 font-semibold">
            {tool.offer_text}
          </span>
        </CardContent>
      )}
      <CardFooter className="pt-2 flex gap-2">
        <Button asChild className="flex-1" variant="secondary">
          <Link to={`/tools/${tool.id}`}>Details</Link>
        </Button>
        {tool.affiliate_link && (
          <Button asChild className="flex-1" variant="outline">
            <a href={tool.affiliate_link} target="_blank" rel="noopener noreferrer">
              Visit
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SoulfulToolCard;
