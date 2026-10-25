const defaultTheme = require("tailwindcss/defaultTheme");

// Brand colours resolve to the CSS variables in src/index.css, so one class
// (`bg-surface`, `text-accent`) serves both themes. See docs/brand.md.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // Every `hover:` utility is emitted inside
  // `@media (hover: hover) and (pointer: fine)`, after mikewilcockdesign.com,
  // which gates its pointer-dependent interactions at `(pointer: coarse)`.
  // Touch browsers apply :hover on tap and keep it until the next tap, which
  // left buttons and project cards stuck in their hover colour. `active:`
  // states are not affected, so press feedback on touch is unchanged.
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: token("surface"),
        line: token("line"),
        ink: token("ink"),
        muted: token("muted"),
        accent: token("accent"),
        "accent-fill": token("accent-fill"),
        "on-accent": token("on-accent"),
        focus: token("focus"),
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
