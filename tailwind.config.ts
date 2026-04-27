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
        primary: "#C41E3A", // WSJ red
        dark: "#111111",
        light: "#FFFFFF",
        body: "#222222",
        muted: "#666666",
        border: "#E0E0E0",
        bg: "#FAFAFA",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      columns: {
        '3': '3',
        '4': '4',
      },
    },
  },
  plugins: [],
} satisfies Config;
