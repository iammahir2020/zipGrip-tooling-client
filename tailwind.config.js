module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#003b73",
          secondary: "#0074b7",
          accent: "#bfd7ed",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
