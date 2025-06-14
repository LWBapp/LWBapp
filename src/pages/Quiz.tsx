import { QuizForm } from "@/components/QuizForm";
import ChaosCountryQuiz from "@/quizzes/ChaosCountryQuiz";

// Add support for the chaos-country route
import { useLocation } from "react-router-dom";
const Quiz = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  if (type === "chaos-country") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-lwb-primary-gradient">
        <div className="w-full max-w-2xl mx-auto px-6 py-16">
          <ChaosCountryQuiz />
        </div>
      </div>
    );
  }

  // Otherwise, default to the original quiz
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lwb-primary-gradient">
      <div className="w-full max-w-2xl mx-auto px-6 py-16">
        <QuizForm />
      </div>
    </div>
  );
};
export default Quiz;
