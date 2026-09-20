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

const MOTION_TIERS = [
  { label: "Micro", duration: "duration-150", note: "150ms · hovers, presses" },
  { label: "Standard", duration: "duration-300", note: "300ms · reveals, color shifts" },
  { label: "Emphasis", duration: "duration-700", note: "700ms · imagery, hero motion" },
];

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
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {NEUTRAL_RAMP.map((cls) => (
                <div key={cls} className={`h-8 flex-1 ${cls}`} />
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
              One blue accent — 600 for fills, 400 on dark surfaces, 500 for
              focus rings. Green and red are reserved for success and error
              states, not decoration. No decorative gradients on content. The
              gradients that do ship are functional: scrims behind text on
              project images, the cursor-tracked sheen that gives the 3D
              cards their specular highlight, and the desktop/mobile OS
              wallpaper, which is chrome rather than content. Body text
              measures 7.56:1 in light mode
              (gray-600 on white) and 12.0:1 in dark (gray-300 on gray-900),
              against the 4.5:1 WCAG AA threshold.
            </p>
          </LabCard>

          <LabCard title="Typography scale">
            <div className="space-y-5">
              <TypeSample
                label="Display · JetBrains Mono · text-4xl / bold"
                className="font-display text-4xl font-bold"
                text="Building useful things"
              />
              <TypeSample
                label="Heading · JetBrains Mono · text-2xl / bold"
                className="font-display text-2xl font-bold"
                text="Section headings"
              />
              <TypeSample
                label="Body · text-base 16px / text-lg 18px · line-height 1.5+"
                className="text-base text-gray-600 dark:text-gray-300"
                text="Long-form copy — About, the hero and section intros — is 16 to 18px."
              />
              <TypeSample
                label="Dense body · text-sm 14px"
                className="text-sm text-gray-600 dark:text-gray-300"
                text="Case studies, experience bullets and form fields are 14px. That is the floor for running text."
              />
              <TypeSample
                label="Caption · text-xs 12px · labels 10–11px"
                className="text-xs font-medium text-gray-600 dark:text-gray-300"
                text="Tags, metadata and keyboard hints: 12px, down to 10px for compact chips and kbd."
              />
            </div>
          </LabCard>

          <LabCard title="Components & states">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Primary
              </button>
              <button
                type="button"
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold py-2.5 px-6 rounded-full hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Outline
              </button>
              <button
                type="button"
                disabled
                className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-full opacity-50 cursor-not-allowed"
              >
                Disabled
              </button>
              <span className="text-sm px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-700">
                Tag chip
              </span>
            </div>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 list-disc list-inside">
              <li>Every interactive element has hover, focus, and active states</li>
              <li>Keyboard focus is always visible (never `outline: none` alone)</li>
              <li>
                White-on-blue-600 buttons measure 5.17:1, rising to 6.70:1 on
                hover (blue-700)
              </li>
            </ul>
          </LabCard>

          <LabCard title="Motion system">
            <div className="grid grid-cols-3 gap-4 mb-5">
              {MOTION_TIERS.map((tier) => (
                <div key={tier.label} className="text-center">
                  <div className="h-20 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group cursor-pointer">
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
              Motion conveys hierarchy, not decoration. Content reveals use
              the 300ms Standard tier; 700ms is reserved for imagery. A global{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                prefers-reduced-motion
              </code>{" "}
              rule cuts every transition and animation on the page to ~0ms.
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
                All four are CSS 3D on real DOM — no WebGL, no dependencies.
                That is deliberate for content: these stay focusable,
                selectable and screen-reader legible, which a{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                  canvas
                </code>{" "}
                gallery could not be. Under{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                  prefers-reduced-motion
                </code>{" "}
                every tilt, flip and rotation stops; what is left is static
                Z-offset, which doesn&apos;t move.
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
                Dark mode is a first-class theme seeded from your system
                preference — not an inverted afterthought. Try the toggle in
                the navbar.
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
    <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
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
          : "bg-gray-50 border-gray-200"
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
      <span
        className={`inline-block text-xs px-3 py-1 rounded-full ${
          isDark
            ? "bg-blue-900/40 text-blue-300"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        Accent chip
      </span>
    </div>
  );
}
