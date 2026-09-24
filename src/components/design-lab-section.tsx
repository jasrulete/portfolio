import SectionHeading from "./section-heading";
import {
  DepthLayersDemo,
  FlipCardDemo,
  RingCarouselDemo,
  ScrollDepthDemo,
} from "./design-lab-3d";

const BRAND_COLORS = [
  { name: "Blue 600", hex: "#2563EB", className: "bg-blue-600", role: "Accent fills" },
  { name: "Blue 400", hex: "#60A5FA", className: "bg-blue-400", role: "Dark-mode accent" },
  { name: "Blue 500", hex: "#3B82F6", className: "bg-blue-500", role: "Focus rings" },
  { name: "Green 600", hex: "#16A34A", className: "bg-green-600", role: "Success" },
  { name: "Red 600", hex: "#DC2626", className: "bg-red-600", role: "Errors" },
];

const NEUTRAL_RAMP = [
  "bg-gray-50",
  "bg-gray-100",
  "bg-gray-200",
  "bg-gray-300",
  "bg-gray-400",
  "bg-gray-500",
  "bg-gray-600",
  "bg-gray-700",
  "bg-gray-800",
  "bg-gray-900",
];

// Two tiers, because two is all the site uses. Outside this page every
// transition in src/ is duration-150 or duration-200; there is no third tier
// to document.
const MOTION_TIERS = [
  {
    label: "Micro",
    duration: "duration-150",
    note: "150ms · hover, press, border colour",
  },
  {
    label: "Standard",
    duration: "duration-200",
    note: "200ms · mobile menu, image fade-in",
  },
];

/**
 * Transfer sizes, gzipped, from the `npm run build` output of the commit that
 * ships this page — not from a lab tool and not from a browser. If the build
 * output changes, change these, or the page starts lying again.
 */
const PAYLOAD = {
  home: { html: "2.62", css: "7.13", js: "94.24", total: "104.0" },
  // This page's own HTML and JS embed content-hashed filenames, so printing a
  // number here changes it by up to 0.01 kB. Both are quoted to 1 dp, which is
  // stable across builds.
  design: { html: "1.4", css: "7.13", js: "74.8", total: "83.3" },
};

export default function DesignLabSection() {
  return (
    <section id="design" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Design Lab" className="mb-3" />
        <p className="text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-sm max-w-2xl">
          The design system behind this site — tokens, components, and motion
          rules, documented the way I&apos;d hand them to a team.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LabCard title="Color tokens">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {BRAND_COLORS.map((c) => (
                <div key={c.name}>
                  <div className={`h-12 rounded-lg shadow-inner ${c.className}`} />
                  <p className="mt-2 text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    <code>{c.hex}</code> · {c.role}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
              Neutral ramp
            </p>
            <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
              {NEUTRAL_RAMP.map((cls) => (
                <div key={cls} className={`h-8 flex-1 ${cls}`} />
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
              One blue accent — 600 for fills, 400 on dark surfaces, 500 for
              focus rings. In page content, green and red appear only as
              contact-form status; the simulated desktop OS is chrome and keeps
              its own palette. Every gradient that ships is functional: the
              scrim behind the text on project banners, the desktop-OS wallpaper
              and the loading screen that matches it, and the cursor-tracked
              sheen on the tilt card below — which exists only on this page.
              Nothing on the homepage carries a decorative gradient. Secondary
              body text measures{" "}
              <strong className="font-semibold">7.23:1</strong> on the page
              surface (gray-600 on gray-50) and{" "}
              <strong className="font-semibold">7.56:1</strong> inside a card
              (gray-600 on white); in dark mode,{" "}
              <strong className="font-semibold">12.04:1</strong> on the page
              (gray-300 on gray-900) and{" "}
              <strong className="font-semibold">9.95:1</strong> in a card
              (gray-300 on gray-800). The floor here is 4.5:1 for all text,
              including large text.
            </p>
          </LabCard>

          <LabCard title="Typography scale">
            <div className="space-y-5">
              <TypeSample
                label="Display · JetBrains Mono · text-4xl → sm:text-5xl / bold"
                className="font-display text-4xl font-bold"
                text="Building useful things"
              />
              <TypeSample
                label="Heading · JetBrains Mono · text-2xl → sm:text-3xl / bold"
                className="font-display text-2xl font-bold"
                text="Section headings"
              />
              <TypeSample
                label="Body · text-base 16px / text-lg 18px · line-height 1.5+"
                className="text-base text-gray-600 dark:text-gray-300"
                text="Long-form copy — the hero lines and the About bio — runs 16 to 20px."
              />
              <TypeSample
                label="Dense body · text-sm 14px"
                className="text-sm text-gray-600 dark:text-gray-300"
                text="Case studies, experience bullets and section intros are 14px. That is the floor for running text."
              />
              <TypeSample
                label="Caption · text-xs 12px · hard floor"
                className="text-xs font-medium text-gray-600 dark:text-gray-300"
                text="Tags, metadata and keyboard hints are 12px. Nothing in the codebase is smaller — there is not one arbitrary font size in src/."
              />
            </div>
            <p className="mt-5 text-xs text-gray-600 dark:text-gray-300">
              In page content, monospace has one job: the name in the hero and
              the navbar, the section headings, and the cursor mark after it.
              Everything else, card titles included, is the system sans stack —
              no body webfont is loaded, and exactly two weights of JetBrains
              Mono are fetched, 500 and 700.
            </p>
          </LabCard>

          <LabCard title="Components & states">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* These are the real class strings, not an approximation of
                  them: rounded-lg, a 1px border, no shadow, 150ms, 44px tall.
                  If the site's buttons change, change these with them. */}
              <button
                type="button"
                className="inline-flex items-center px-5 py-3 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
              >
                Primary
              </button>
              <button
                type="button"
                className="inline-flex items-center px-5 py-3 text-sm font-semibold rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700 active:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
              >
                Secondary
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center px-5 py-3 text-sm font-semibold rounded-lg bg-blue-600 text-white opacity-50 cursor-not-allowed"
              >
                Disabled
              </button>
              <span className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
                Tag chip
              </span>
            </div>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 list-disc list-inside">
              <li>
                One button shape: <code className="text-xs">rounded-lg</code>.
                Pills are for chips only
              </li>
              <li>
                Buttons change fill on hover and again on press (blue-600 → 700
                → 800). Nothing lifts, scales or gains a shadow — there is no{" "}
                <code className="text-xs">hover:scale-*</code> left in the
                codebase
              </li>
              <li>
                <code className="text-xs">focus:outline-none</code> never ships
                alone — there is not one instance of it in the codebase without
                a replacement. In page content the ring is 2px blue-500 sitting
                2px off the control in the surface colour; text fields take it
                inset so the field doesn&apos;t jump
              </li>
              <li>
                White-on-blue-600 buttons measure 5.17:1, rising to 6.70:1 on
                hover (blue-700). The ring itself is 3.68:1 on white and 4.82:1
                on gray-900, against the 3:1 a focus indicator needs
              </li>
              <li>
                Primary actions — hero buttons, the two project links, Send —
                are 44px tall; nav links, icon buttons and form fields are 40px;
                chips are 36px, over the 24px WCAG 2.2 minimum and spaced 8px
                apart
              </li>
            </ul>
          </LabCard>

          <LabCard title="Motion system">
            <div className="grid grid-cols-2 gap-4 mb-5">
              {MOTION_TIERS.map((tier) => (
                <div key={tier.label} className="text-center">
                  <div className="h-20 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center group cursor-pointer">
                    <div
                      className={`w-8 h-8 rounded-lg bg-blue-600 transition-transform ${tier.duration} group-hover:-translate-y-3 group-hover:rotate-6`}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">{tier.label}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {tier.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              There is no third tier. Project cards enter with a CSS
              scroll-driven animation —{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                animation-timeline: view()
              </code>{" "}
              — and no JavaScript: no scroll listener, no observer, and no{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                opacity: 0
              </code>{" "}
              starting state, so a browser without it and a visitor with
              JavaScript off both see finished cards. A global{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                prefers-reduced-motion
              </code>{" "}
              rule cuts every transition and animation to 0.01ms. The only
              durations above 200ms anywhere in the codebase are on this page:
              the flip and the ring below run at 500ms, and the tilt card&apos;s
              sheen fades at 300ms.
            </p>
          </LabCard>

          <div className="lg:col-span-2">
            <LabCard title="Depth & 3D">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <DepthLayersDemo />
                <FlipCardDemo />
                <ScrollDepthDemo />
                <RingCarouselDemo />
              </div>
              <p className="mt-5 text-sm text-gray-600 dark:text-gray-300">
                All four are CSS 3D on real DOM — no WebGL, no 3D library. That
                is deliberate: the text stays selectable and screen-reader
                legible and the controls stay real buttons, which a{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  canvas
                </code>{" "}
                gallery could not be. Under{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  prefers-reduced-motion
                </code>{" "}
                the cursor tilt and the scroll depth switch off entirely, and
                the flip and the ring change state instantly instead of
                animating — the content is never withheld, only the movement.
                None of this ships on the homepage: it lives here, on its own
                page, so a visitor who came to read the work doesn&apos;t
                download it.
              </p>
            </LabCard>
          </div>

          <div className="lg:col-span-2">
            <LabCard title="One token set, two themes">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ThemePreview variant="light" />
                <ThemePreview variant="dark" />
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Dark mode is a first-class theme, not an inverted afterthought:
                a stored choice wins, otherwise the system preference decides.
                An inline script in the page head applies it before the
                stylesheet loads, so a dark-preferring visitor never gets a
                white first frame. The toggle itself lives in the portfolio
                navbar; this page has no navbar, so it follows whatever you last
                chose there.
              </p>
            </LabCard>
          </div>

          <div className="lg:col-span-2">
            <LabCard title="What it weighs">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <caption className="sr-only">
                    Gzipped transfer size of each page, by asset type
                  </caption>
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th scope="col" className="py-2 pr-4 font-semibold">
                        Page
                      </th>
                      <th scope="col" className="py-2 pr-4 font-semibold">
                        HTML
                      </th>
                      <th scope="col" className="py-2 pr-4 font-semibold">
                        CSS
                      </th>
                      <th scope="col" className="py-2 pr-4 font-semibold">
                        JS
                      </th>
                      <th scope="col" className="py-2 font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-300">
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th scope="row" className="py-2 pr-4 font-normal">
                        Portfolio home
                      </th>
                      <td className="py-2 pr-4">{PAYLOAD.home.html} kB</td>
                      <td className="py-2 pr-4">{PAYLOAD.home.css} kB</td>
                      <td className="py-2 pr-4">{PAYLOAD.home.js} kB</td>
                      <td className="py-2 font-semibold text-gray-900 dark:text-white">
                        {PAYLOAD.home.total} kB
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-2 pr-4 font-normal">
                        This page
                      </th>
                      <td className="py-2 pr-4">{PAYLOAD.design.html} kB</td>
                      <td className="py-2 pr-4">{PAYLOAD.design.css} kB</td>
                      <td className="py-2 pr-4">{PAYLOAD.design.js} kB</td>
                      <td className="py-2 font-semibold text-gray-900 dark:text-white">
                        {PAYLOAD.design.total} kB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Gzipped, on a cold load, excluding images — copied out of this
                project&apos;s{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  npm run build
                </code>{" "}
                output. The two pages are separate Vite entries, so the homepage
                never downloads the 3D demos on this one; they share React and
                the stylesheet, which is most of both numbers. There is no
                Lighthouse score here, because I have not run one against this
                build — an invented score would be the exact kind of claim this
                page exists to avoid.
              </p>
            </LabCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    // Elevation 1, the same treatment every resting card on the site gets:
    // shadow-sm over a gray-300/gray-700 hairline. shadow-md is reserved for
    // the sticky navbar and the command palette.
    <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-sm border border-gray-300 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

function TypeSample({
  label,
  className,
  text,
}: {
  label: string;
  className: string;
  text: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </p>
      <p className={className}>{text}</p>
    </div>
  );
}

/** Static previews (no dark: variants) so both themes render regardless of the page theme. */
function ThemePreview({ variant }: { variant: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div
      className={`rounded-lg p-5 border ${
        isDark
          ? "bg-gray-900 border-gray-700"
          : "bg-gray-50 border-gray-300"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wider mb-3 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {isDark ? "Dark" : "Light"}
      </p>
      <p className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
        Card heading
      </p>
      <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        Same components, same spacing, theme-aware tokens.
      </p>
      {/* The real tag chip, in both themes. No project count here on purpose:
          a hard-coded number on this page would drift against profile.ts. */}
      <span
        className={`inline-block text-xs px-3 py-1.5 rounded-full border ${
          isDark
            ? "bg-gray-700 border-gray-700 text-gray-300"
            : "bg-gray-100 border-gray-300 text-gray-600"
        }`}
      >
        PostgreSQL
      </span>
    </div>
  );
}
