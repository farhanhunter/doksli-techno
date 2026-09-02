import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f0f",
        paper: "#faf7f2",
        brass: "#c8a24a",
      },
    },
  },
  plugins: [],
} satisfies Config;
