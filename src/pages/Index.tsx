
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-soul-gradient">
      <div className="w-full max-w-2xl mx-auto px-6 py-20 flex flex-col items-center">
        <h1
          className="text-5xl md:text-7xl font-playfair font-bold tracking-tight text-gray-900"
          style={{ letterSpacing: "-0.03em" }}
        >
          Life Without Borders
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-700 font-medium text-center max-w-2xl">
          Discover the place your soul belongs.
        </p>
        <Link
          to="/start"
          className="mt-10 px-8 py-4 bg-lavender-dark text-white rounded-full font-bold shadow-lg text-lg hover:bg-lavender transition duration-200"
        >
          Find My Soul Country
        </Link>
      </div>
    </div>
  );
};
export default Index;
