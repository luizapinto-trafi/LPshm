import type { Config } from "tailwindcss";

/**
 * Colores: siempre vía variables de Shapermint DS (globals + colors_and_type).
 * preflight: false evita choques con styled-components en otras landings.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/landings/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        sans: ["var(--font-body)"],
      },
      colors: {
        ink: {
          50: "var(--ink-050)",
          100: "var(--ink-100)",
          200: "var(--ink-200)",
          500: "var(--ink-500)",
          600: "var(--ink-600)",
          700: "var(--ink-700)",
          900: "var(--ink-900)",
          1000: "var(--ink-1000)",
        },
        white: "var(--white)",
        gruns: {
          primary: "var(--gruns-primary)",
          "primary-light": "var(--gruns-primary-light)",
          "primary-dark": "var(--gruns-primary-dark)",
          gold: "var(--gruns-gold)",
          peach: "var(--gruns-peach)",
          cream: "var(--gruns-cream)",
          dark: "var(--gruns-dark)",
          gray: "var(--gruns-gray)",
        },
        gold: {
          500: "var(--gold-500)",
        },
        coral: {
          50: "var(--coral-050)",
          100: "var(--coral-100)",
          200: "var(--coral-200)",
          250: "var(--coral-250)",
          300: "var(--coral-300)",
          400: "var(--coral-400)",
          450: "var(--coral-450)",
          500: "var(--coral-500)",
          550: "var(--coral-550)",
          600: "var(--coral-600)",
        },
        cream: {
          200: "var(--cream-200)",
        },
      },
      boxShadow: {
        brutal: "3px 3px 0 0 var(--ink-1000)",
        "brutal-sm": "2px 2px 0 0 var(--ink-1000)",
        "brutal-active": "1px 1px 0 0 var(--ink-1000)",
      },
    },
  },
  plugins: [],
};

export default config;
