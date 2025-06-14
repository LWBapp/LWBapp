
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lwb-primary-gradient">
      <div className="w-full max-w-xl mx-auto px-6 py-20 flex flex-col items-center bg-white/80 rounded-xl shadow-xl border border-blush-peach">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal-line mb-4 tracking-tight">
          This isn’t just a travel quiz. <br />
          It’s a <span className="text-soul-purple">mirror</span>.
        </h2>
        <p className="text-lg text-charcoal-soft mb-10 text-center max-w-md">
          Answer with your spirit, not your passport.<br />Let intuition be your compass.
        </p>
        <Link
          to="/quiz"
          className="px-8 py-4 bg-soul-purple text-white rounded-full font-bold shadow-lg text-lg hover:bg-lavender-mist transition duration-200"
        >
          Start the Journey
        </Link>
      </div>
    </div>
  );
};

export default Start;
