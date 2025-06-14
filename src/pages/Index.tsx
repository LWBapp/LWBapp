
import { Link } from "react-router-dom";
import { Zap, Star, Check, WandSparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lwb-primary-gradient">
      <div className="w-full max-w-2xl mx-auto px-6 py-20 flex flex-col items-center">
        <h1
          className="text-5xl md:text-7xl font-playfair font-bold tracking-tight text-charcoal-line"
          style={{ letterSpacing: "-0.03em" }}
        >
          Life Without Borders
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-charcoal font-medium text-center max-w-2xl">
          Discover the place your soul belongs.
        </p>
        <div className="mt-10 w-full max-w-xl bg-white/90 rounded-2xl shadow-lg border border-blush-peach flex flex-col items-center p-8 animate-fade-in">
          <h2 className="text-2xl font-playfair font-bold text-soul-purple mb-4 text-center">
            Take the Soul Quiz
          </h2>
          <ul className="w-full flex flex-col gap-4 mb-6">
            <li className="flex items-start gap-3">
              <Zap className="text-coral-pink mt-1" size={28} />
              <div>
                <span className="font-semibold text-charcoal">Feel Aligned:</span>{" "}
                <span className="text-charcoal-soft">Reveal cities that ignite your core emotions.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Star className="text-soul-purple mt-1" size={28} />
              <div>
                <span className="font-semibold text-charcoal">Resonate Deeply:</span>{" "}
                <span className="text-charcoal-soft">Match with destinations that echo your inner world.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-cloud-blue mt-1" size={28} />
              <div>
                <span className="font-semibold text-charcoal">Unlock Surprise:</span>{" "}
                <span className="text-charcoal-soft">Gain soulful insights you never saw coming.</span>
              </div>
            </li>
          </ul>
          <Link
            to="/start"
            className="px-8 py-4 bg-soul-purple text-white rounded-full font-bold shadow-lg text-lg hover:bg-lavender-mist transition duration-200"
          >
            Start the Journey
          </Link>
        </div>
        {/* Creator Invitation Section */}
        <div className="mt-10 w-full max-w-xl bg-cloud-blue/90 rounded-2xl shadow-md border border-blush-peach flex flex-col items-center p-7 gap-4 animate-fade-in-slow">
          <div className="flex items-center gap-3 mb-2">
            <WandSparkles className="text-soul-purple" size={26} />
            <span className="font-playfair text-xl font-bold text-soul-purple">
              For Creators & Dreamers
            </span>
          </div>
          <p className="text-charcoal-soft text-center text-base">
            Want to inspire your audience with a soulful discovery experience?
            <br />
            Craft your own <span className="font-semibold text-soul-purple">Soul Country Map</span> quiz with our locked template—designed for beautiful style and unique, emotional outcomes.
          </p>
          <Link
            to="#"
            className="mt-2 px-7 py-3 bg-soul-purple text-white rounded-full font-bold shadow hover:bg-lavender-mist transition text-base"
            aria-label="Are you a creator? Build your own Soul Country Map for your followers."
          >
            Are you a creator? Build your own Soul Country Map for your followers.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

