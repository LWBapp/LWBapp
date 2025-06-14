
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Start from "./pages/Start";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import QuizLibrary from "./pages/QuizLibrary";
import Tools from "./pages/Tools";
import SoulfulToolsDirectory from "@/pages/SoulfulToolsDirectory";
import SoulfulToolDetail from "@/pages/SoulfulToolDetail";
import SoulmapJournal from "@/pages/SoulmapJournal";
import QuizDetail from "./pages/QuizDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <div className="pt-20 min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/start" element={<Start />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/:quizId" element={<QuizDetail />} />
              <Route path="/result" element={<Result />} />
              <Route path="/library" element={<QuizLibrary />} />
              <Route path="/tools" element={<Tools />} />
              {/* new directory and detail routes */}
              <Route path="/tools-directory" element={<SoulfulToolsDirectory />} />
              <Route path="/tools/:id" element={<SoulfulToolDetail />} />
              <Route path="/soulmap-journal" element={<SoulmapJournal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
