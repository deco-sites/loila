import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        extend: {
          extend: {
            fontFamily: {
              ubuntu: ["Ubuntu", "sans-serif"],
            },
            colors: {
              light: {
                primary: "#3aa094",
                secondary: "#3f70ab",
                tertiary: "#95A9AF",
                tech: "#9F9FFF",
                growth: "#FF877B",
                house: "#6BC970",
              },
              dark: {
                primary: "#1A202C",
                secondary: "#2D3748",
                // Outras cores para o tema escuro
              },
            },
          },
          animation: {
            sliding: "sliding 30s linear infinite",
          },
          keyframes: {
            sliding: {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          },
        },
      },
    ],
    logs: false,
  },
  content: [
    "./**/*.tsx",
  ],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#1CA0B5",
        tech: "#9F9FFF",
        growth: "#FF877B",
        house: "#6BC970",
        borderTech: "#9F9FFF",
        borderGrowth: "#FF877B",
        borderHouse: "#6BC970",
        textPrimary: "#08151D",
        textSecondary: "#95A9AF",
        textAccent: "#1CA0B5",
        white: "#FFFFFF",
      },
    },
    animation: {
      sliding: "sliding 30s linear infinite",
    },
    keyframes: {
      sliding: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    },
  },
};
