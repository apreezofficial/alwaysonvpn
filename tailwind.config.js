/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090c",
        surface: "#0e1117",
        "surface-card": "rgba(18, 22, 31, 0.75)",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        "cyber-cyan": "#00f0ff",
        "cyber-emerald": "#00e699",
        "cyber-crimson": "#ff2a5f",
        "cyber-amber": "#ffb800",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        jp: ["'Noto Sans JP'", "'Hiragino Kaku Gothic ProN'", "Meiryo", "sans-serif"],
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
