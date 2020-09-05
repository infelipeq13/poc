const { fontFamily } = require("./tailwind/theme");

module.exports = {
  plugins: [require("@tailwindcss/ui")],
  purge: {
    content: ["src/**/*.tsx"],
    enabled: process.env.NODE_ENV === "production",
  },
  theme: {
    extend: {
      fontFamily,
    },
  },
};
