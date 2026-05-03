import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C41E3A",
        dark: "#111111",
        light: "#FFFFFF",
        body: "#222222",
        muted: "#666666",
        border: "#E0E0E0",
        bg: "#FAFAFA",
        "wsj-navy": "#0f1729",
        "wsj-navy-mid": "#1e293b",
        "wsj-gold": "#c5a572",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
        ui: ["var(--font-libre)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      columns: {
        '3': '3',
        '4': '4',
      },
    },
  },
  plugins: [],
} satisfies Config;
