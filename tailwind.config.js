module.exports = {
  content: ["./index.html", "./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      typography: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
