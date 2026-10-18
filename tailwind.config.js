/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // Every `hover:` utility is emitted inside
  // `@media (hover: hover) and (pointer: fine)`, after mikewilcockdesign.com,
  // which gates its pointer-dependent interactions at `(pointer: coarse)`.
  // Touch browsers apply :hover on tap and keep it until the next tap, which
  // left buttons and project cards stuck in their hover colour. `active:`
  // states are not affected, so press feedback on touch is unchanged.
  // Known cost: the Design Lab motion demo (design-lab-section.tsx:215-218)
  // is driven by `group-hover:` and therefore no longer demonstrates anything
  // on a touch device. See motion-devices-spec.md §3.7.
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"JetBrains Mono"', "ui-monospace", "monospace"],
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
