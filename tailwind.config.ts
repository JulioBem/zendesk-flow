import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        black: "#000000",
        white: "#ffffff",
        vibrantRed: "#ff0000",
        darkRed: "#8b0000",
        lightGray: "#f2f2f2",
        darkGray: "#333333",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
export default config;
