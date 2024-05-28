/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    // Add additional paths if needed
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "outline-active": "#22C55E",
        "outline-primary": "#D1D5DB",
        "badge-primary": "#16A34A",
        "badge-secondary": "#7367F0",
        "badge-tertiary": "#FF9A62",

        // BACKGROUND
        "bg-primary-hovered": "#F9FAFB",
        "bg-success": "#F0FDF4",
        "badge-primary-bg": "#DFFFEB",
        "badge-secondary-bg": "#F3EAFF",
        "badge-tertiary-bg": "#FFF3EC",

        // BORDER
        "badge-primary-border": "#22C55E",
        "badge-secondary-border": "#A582F7",
        "badge-tertiary-border": "#FF9A62",

        // FOREGROUND
        "fg-disabled": "#D1D5DB",
        "fg-brand": "#22C35E",
        "fg-badge-primary": "#22C55E",
        "fg-badge-secondary": "#7367F0",
        "fg-badge-tertiary": "#FF9A62",

        primary: "#22C55E",
        secondary: "#FFFFFF",
        tertiary: "#D1D5DB",
        green: {
          200: "#F0FDF4",
          600: "#22C35E",
        },
        gray: {
          100: "#F9FAFB",
          200: "#9CA3AF",
          300: "#6B7280",
          400: "#374151",
          500: "#F5F6F7",
        },
      },
      backgroundColor: {
        "datepicker-bg": "#fff",
      },
      fontFamily: {
        'poppins': ['Poppins'],
        'redHat': ['Red Hat Display'],
        "cabinet-black": ['"Cabinet Grotesk Black"', "sans-serif"],
        "cabinet-extra": ['"Cabinet Grotesk Extra Bold"', "sans-serif"],
        "cabinet-bold": ['"Cabinet Grotesk Bold"', "sans-serif"],
        "cabinet-normal": ['"Cabinet Grotesk Normal"', "sans-serif"],
        "cabinet-regular": ['"Cabinet Grotesk Regular"', "sans-serif"],
        "geist-black": ['"Geist Black"', "sans-serif"],
        "geist-extra": ['"Geist Ultra Black"', "sans-serif"],
        "geist-bold": ['"Geist Bold"', "sans-serif"],
        "geist-normal": ['"Geist Medium"', "sans-serif"],
        "geist-regular": ['"Geist Regular', "sans-serif"],
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
