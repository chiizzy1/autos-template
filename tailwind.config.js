/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "#f9f9f9",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        dimPurple: "#40196d",
        textColor: "#979797",
        offBlue: "#eff1ff",
        offGreen: "rgba(72,211,138,0.5)",
        successColorTans: "#dcffec",
        bgOffset: "#f4f4f4",
        lightBlue: "#1dcbef",
        successColor: "#48d38a",
        negativeColor: "#f7685b",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(15rem, 1fr))",
        footer: "repeat(auto-fit, minmax(10rem, 1fr))",
        tile: "repeat(auto-fit, minmax(6rem, 1fr))"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1020px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [ require("daisyui"), require('tailwindcss-animate'), require('@tailwindcss/typography'), require('tailwind-scrollbar'),],
}