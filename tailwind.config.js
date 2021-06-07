const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./src/{components,pages}/**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "#100F13",
        hotPink: "#C049FF",
        light: "#c1c1c1",
        gray: "#6B7280",
        box: "#16141A",
        border: "#2C2F35",
        dim: "#837F90",
      },
    },
  },
};
