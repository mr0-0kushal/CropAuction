import { transform } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Barlow: ["Barlow", "sans-serif"],
      },
      screens: {
        vsm: "400px",
        mlg: { max: "1200px" },
      },
      colors: {
        "body-bg": "#FFFFFF",
        "body-text-color": "#1B3D1B",
        "heading-color": "#1B3D1B",
        "theme-color": "#4CAF50",
        "theme-bg": "#4CAF50",
        "theme-bg2": "#2E7D32",
        "theme-bg-light": "#E8F5E9",
        "theme-color-light": "#8BC34A",
        "color-white": "#ffffff",
        "color-dark": "#1B3D1B",
        "color-success": "#2E7D32",
        "color-primary": "#4CAF50",
        "color-info": "#8BC34A",
        "color-danger": "#FF7782",
        "color-warning": "#FFBB55",
        "color-secondary": "#1B3D1B",
        hover: "#2E7D32",
        "border-info-color": "#4CAF5040",
        "border-white-color": "#ffffff14",
        "footer-bg": "#1B3D1B",
        "footer-text-color": "#E8F5E9",
      },
      backgroundImage: {
        "hero-img": "url(./assets/bg.jpg)",
      },
      backgroundPosition: {
        'center-center': 'center center',
      },
      backgroundSize: {
        'cover-full': 'cover',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
      },
      keyframes: {
        fadeinkey: {
          "0%": {
            transform: "scale(0)",
            visibility: "hidden",
            opacity: 0,
          },

          "100%": {
            transform: "scale(1)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeoutkey: {
          "0%": {
            visibility: "visible",
            opacity: 1,
          },
          
          "100%": { visibility: "hidden", opacity: 0 },
        },
        floatkey: {
          "0,100%": {
            transform: "translate(0,0)",
          },
          
          "50%": {
            transform: "translate(0,10px)",
          },
        },
        counterspin: {
          to: {
            transform: "rotate(-360deg) ",
          },
        },
        clockspin: {
          to: {
            transform: "rotate(360deg) ",
          },
        },
        successkey: {
          "0%": {
            transform: "translate(0,100px)",
            visibility: "hidden",
            opacity: 0,
          },

          "100%": {
            transform: "translate(0,0)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeinoutkey: {
          "0,100%": {  
            visibility: "visible",
            opacity: 1,
          },

          "50%": {                   
            visibility: "hidden",
            opacity: 0,
          },
        },
      },
      animation: {
        fadein: "fadeinkey 300ms ",
        fadeout: "fadeoutkey 300ms",
        float: "floatkey 3s ease-in-out infinite",
        counterspin: "counterspin 2s infinite",
        successpayment: "successkey 1s ease-in-out",
        fadeinout: "fadeinoutkey 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("inputs", "& input");
      addVariant("button", "& button");
      addVariant("select", "& select");
      addVariant("link", "& a");
    },
  ],
};
