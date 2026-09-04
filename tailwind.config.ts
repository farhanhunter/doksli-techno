import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#123F7F",
        navyDeep: "#0A2A54",
        teal: "#1C8A8C",
        tealSoft: "#E6F2F2",
        ink: "#1A2433",
        surface: "#FFFFFF",
        canvas: "#F5F8FB",
        hairline: "#DDE5ED",
      },
    },
  },
  plugins: [],
} satisfies Config;
