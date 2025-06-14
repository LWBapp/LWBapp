
import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
      },
      colors: {
        // Core Brand Neutrals & Accents
        charcoal: "#333333",
        "charcoal-soft": "#5e5e5e",
        "charcoal-line": "#2b2b2b",
        "soul-purple": "#7f4edb",
        "lavender-mist": "#b191f0",
        "coral-pink": "#ffb4a2",
        "peach-puff": "#ffdab9",
        "cloud-blue": "#cce3f0",
        "misty-sage": "#dcedc1",
        // Gradient stops
        "blush-peach": "#fcd5ce",
        "soft-apricot": "#f9dcc4",
        "lavender-blush": "#cdb4db",
      },
      backgroundImage: {
        // Primary hero/section gradient
        "lwb-primary-gradient":
          "linear-gradient(120deg, #fcd5ce 0%, #f9dcc4 56%, #cdb4db 100%)"
      },
      // For experimental component border colors, if needed
      borderColor: {
        DEFAULT: "#e5e7eb",
        "charcoal-line": "#2b2b2b",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
