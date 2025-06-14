
import React from "react";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
  <footer className="w-full mt-12 border-t border-blush-light bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-8 gap-4 md:gap-0 text-gray-600 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900">Life Without Borders</span>
        <span className="hidden md:inline">|</span>
        <a href="https://blog.lifewithoutboardsers.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-honey-dark transition-colors">
          Blog
        </a>
      </div>
      <div className="text-center md:text-right w-full md:w-auto flex flex-col md:block gap-1">
        <span>© {currentYear} Life Without Borders. All rights reserved.</span>
        <span className="block text-xs mt-1 text-gray-400">This site is for entertainment & inspiration only. No travel or life advice implied.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
