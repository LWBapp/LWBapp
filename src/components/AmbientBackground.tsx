
import React from "react";

/**
 * Simple floating blobs/pastel circles, softly animated in the background.
 */
const AmbientBackground: React.FC = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0 animate-fadeIn"
    aria-hidden
    style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 0,
      transition: "all 0.4s",
    }}
  >
    <svg width="100%" height="100%" viewBox="0 0 1440 900" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="g1" cx="70%" cy="40%" r="70%" gradientTransform="rotate(-15)">
          <stop offset="0%" stopColor="#fcd5ce" stopOpacity="0.32" />
          <stop offset="80%" stopColor="#fcd5ce" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="30%" cy="60%" r="70%" gradientTransform="rotate(9)">
          <stop offset="0%" stopColor="#cdb4db" stopOpacity="0.34" />
          <stop offset="80%" stopColor="#cdb4db" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g3" cx="48%" cy="90%" r="40%">
          <stop offset="0%" stopColor="#f9dcc4" stopOpacity="0.27" />
          <stop offset="80%" stopColor="#f9dcc4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="1200" cy="320" r="480" fill="url(#g1)">
        <animate attributeName="cy" values="320;400;320" dur="9s" repeatCount="indefinite" />
      </circle>
      <circle cx="420" cy="720" r="380" fill="url(#g2)">
        <animate attributeName="cx" values="420;580;420" dur="13s" repeatCount="indefinite" />
      </circle>
      <circle cx="720" cy="300" r="260" fill="url(#g3)">
        <animate attributeName="cy" values="300;180;300" dur="11s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export default AmbientBackground;
