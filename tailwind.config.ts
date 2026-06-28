import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        "surface-mid": "#1A1A1A",
        "surface-dark": "#222222",
        foreground: "#FFFFFF",
        "foreground-mid": "#CCCCCC",
        muted: "#888888",
        border: "#2A2A2A",
        "border-mid": "#333333",
        accent: {
          DEFAULT: "#84cc16",
          hover: "#65a30d",
          light: "#1a2e0a",
          fore: "#0A0A0A",
        },
        success: "#84cc16",
        signal: "#65a30d",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.4)",
        hover: "0 8px 24px rgba(132, 204, 22, 0.15)",
      },
      keyframes: {
        "field-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 8px rgba(132, 204, 22, 0.3), 0 0 20px rgba(132, 204, 22, 0.1)",
            borderColor: "rgba(132, 204, 22, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 16px rgba(132, 204, 22, 0.5), 0 0 36px rgba(132, 204, 22, 0.2)",
            borderColor: "rgba(132, 204, 22, 0.5)",
          },
        },
        "ball-bounce": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "20%": { transform: "translateY(-30px) rotate(72deg)" },
          "40%": { transform: "translateY(0) rotate(144deg)" },
          "60%": { transform: "translateY(-15px) rotate(216deg)" },
          "80%": { transform: "translateY(0) rotate(288deg)" },
        },
      },
      animation: {
        "field-pulse": "field-pulse 3s ease-in-out infinite",
        "ball-bounce": "ball-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
