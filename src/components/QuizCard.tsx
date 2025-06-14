
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface QuizCardProps {
  title: string;
  subtitle: string;
  link: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, subtitle, link }) => (
  <Card className="flex flex-col h-full justify-between hover:shadow-lg transition">
    <CardHeader>
      <CardTitle className="text-lg font-playfair">{title}</CardTitle>
      <CardDescription>{subtitle}</CardDescription>
    </CardHeader>
    <CardFooter className="pt-2">
      <Button asChild className="w-full" variant="secondary">
        <Link to={link}>Take Quiz</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default QuizCard;

