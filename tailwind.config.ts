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
        white: "#FFF",
        black: "#000",
        blackFaded: "rgba(0, 0, 0, 0.8)",
        red01: "#C4161C",
        red02: "#D04449",
        red03: "#DC7377",
        red04: "#E8A2A4",
        red05: "#F3D0D2",
        blue01: "#314C64",
        blue02: "#5A6F83",
        blue03: "#8393A2",
        blue04: "#ADB7C1",
        blue05: "#D6DBE0",
        dark01: "#414042",
        dark02: "#676668",
        dark03: "#8D8D8E",
        dark04: "#B3B3B3",
        dark05: "#D9D9D9",
        light01: "#F1F1F2",
        light02: "#F4F4F5",
        light03: "#F1F1F2",
        light04: "#F9FAFA",
        light05: "#FCFCFC",
        green01: "#31644b",
      },
    },
  },
  plugins: [],
};
export default config;
