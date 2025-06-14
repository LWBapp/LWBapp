
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
        // Map all CSS variable tokens to Tailwind color utilities!
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",

        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",

        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Custom sidebar tokens
        "sidebar-background": "hsl(var(--sidebar-background))",
        "sidebar-foreground": "hsl(var(--sidebar-foreground))",
        "sidebar-primary": "hsl(var(--sidebar-primary))",
        "sidebar-primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        "sidebar-accent": "hsl(var(--sidebar-accent))",
        "sidebar-accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        "sidebar-border": "hsl(var(--sidebar-border))",
        "sidebar-ring": "hsl(var(--sidebar-ring))",

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
      borderColor: {
        DEFAULT: "#e5e7eb",
        "charcoal-line": "#2b2b2b",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

