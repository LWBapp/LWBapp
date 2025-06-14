
import { QuizForm } from "@/components/QuizForm";

const Quiz = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tl from-honey-light via-lavender-light to-blush-light">
      <div className="w-full max-w-2xl mx-auto px-6 py-16">
        <QuizForm />
      </div>
    </div>
  );
};
export default Quiz;
