
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, List, Search } from "lucide-react";

const navLinks = [
  {
    label: "Home",
    to: "/",
    icon: <Home size={18} />
  },
  {
    label: "Find My Country",
    to: "/quiz",
    icon: <Search size={18} />
  },
  {
    label: "Explore Quizzes",
    to: "/library",
    icon: <List size={18} />
  },
  {
    label: "Travel Tools",
    to: "/tools",
    icon: <List size={18} />
  }
];

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className="w-full fixed top-0 left-0 z-40 bg-white/80 border-b border-blush-light backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto flex items-center px-4 py-2">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Home">
          <span
            className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 tracking-normal"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: 1
            }}
          >
            Life Without<br className="hidden sm:block" />Borders
          </span>
        </Link>
        <div className="flex-1" />
        <ul className="flex gap-2 md:gap-4 items-center">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                  pathname === link.to
                    ? "bg-honey-dark text-gray-900"
                    : "text-gray-700 hover:bg-honey-light"
                }`}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
