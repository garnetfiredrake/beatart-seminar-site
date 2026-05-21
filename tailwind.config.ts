import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#010101",
        frost: "#C4EEFF",
        mist: "#D3D3D3",
        electric: "#01B4FF",
        ocean: "#007EDE",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        serif: ['"Libre Baskerville"', "serif"],
        button: ["Corbel", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        cta: "0 0 0 1px rgba(196, 238, 255, 0.75), 0 22px 80px rgba(1, 180, 255, 0.24)",
        portrait: "0 24px 80px rgba(0, 126, 222, 0.18)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(90deg, #007EDE 0%, #8EDEFF 100%)",
        "row-gradient": "linear-gradient(90deg, rgba(0, 84, 157, 0.5) 0%, rgba(0, 126, 222, 0.5) 65%, rgba(1, 180, 255, 0.5) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
