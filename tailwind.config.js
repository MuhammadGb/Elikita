/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "brand-50": "#eceef0",
        "brand-100": "#c3cad1",
        "brand-200": "#a6b0ba",
        "brand-300": "#7e8c9b",
        "brand-400": "#657687",
        "brand-500": "#3e5469",
        "brand-600": "#384c60",
        "brand-700": "#2c3c4b",
        "brand-800": "#222e3a",
        "brand-900": "#1a232c",
        "brand-1000": "#4D6FED",
        "secondary-green": "#008000",
        "secondary-yellow": "#FFAA37",
        "secondary-black": "#000",
        "neutral-orange": "#C14015",
        "neutral-gray": "#d0d0d0",
        "table-text-primary": "#3E5469",
        "table-text-secondary": "#587C98",
        "table-text-main": "#D2E5F4",
        "table-dark-600": "#394E75",
        "table-dark-200": "#9BA6BC",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      gridTemplateColumns: {
        // Complex site-specific column configuration
        list: "70px 1fr 100px",
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["24px", "28px"],
        big: ["20px", "20px"],
        xl: ["28px", "40px"],
        xxl: ["32px", "32px"],
        "2xl": ["40px", "48px"],
        "3xl": ["48px", "64px"],
        "4xl": ["60px", "72px"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
};
